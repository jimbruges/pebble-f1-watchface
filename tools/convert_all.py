#!/usr/bin/env python3
"""Convert F1 circuit SVG files to C waypoint arrays for the Pebble watchface.

Usage:
    python3 tools/convert_all.py [--svg-dir PATH] [--output-dir PATH]

Defaults:
    --svg-dir     ../f1-circuits-svg/circuits/minimal/black
    --output-dir  src/c/  (appends to main.c)

Requires: f1-circuits-svg repo cloned as a sibling directory.
https://github.com/julesr0y/f1-circuits-svg
"""
import re, math, os, glob, sys, argparse

def cubic_bezier(p0, p1, p2, p3, t):
    u = 1 - t
    return (
        u**3*p0[0] + 3*u**2*t*p1[0] + 3*u*t**2*p2[0] + t**3*p3[0],
        u**3*p0[1] + 3*u**2*t*p1[1] + 3*u*t**2*p2[1] + t**3*p3[1]
    )

def dist(a, b):
    return math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2)

def parse_svg_path(path_d):
    tokens = re.findall(r'[a-zA-Z]|[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?', path_d)
    segments = []
    cur_x, cur_y = 0.0, 0.0
    last_cx, last_cy = 0.0, 0.0  # last control point for S/s
    last_cmd = ''
    i = 0
    while i < len(tokens):
        cmd = tokens[i]; i += 1
        if cmd in ('M', 'm'):
            if cmd == 'M':
                cur_x = float(tokens[i]); cur_y = float(tokens[i+1])
            else:
                cur_x += float(tokens[i]); cur_y += float(tokens[i+1])
            i += 2
        elif cmd in ('C', 'c'):
            while i < len(tokens) and not tokens[i][0].isalpha():
                if cmd == 'C':
                    p1 = (float(tokens[i]), float(tokens[i+1]))
                    p2 = (float(tokens[i+2]), float(tokens[i+3]))
                    p3 = (float(tokens[i+4]), float(tokens[i+5]))
                else:
                    p1 = (cur_x+float(tokens[i]), cur_y+float(tokens[i+1]))
                    p2 = (cur_x+float(tokens[i+2]), cur_y+float(tokens[i+3]))
                    p3 = (cur_x+float(tokens[i+4]), cur_y+float(tokens[i+5]))
                segments.append(((cur_x, cur_y), p1, p2, p3))
                last_cx, last_cy = p2
                cur_x, cur_y = p3
                i += 6
        elif cmd in ('S', 's'):
            # Smooth cubic: reflect last control point
            while i < len(tokens) and not tokens[i][0].isalpha():
                if last_cmd.lower() not in ('c', 's'):
                    p1 = (cur_x, cur_y)
                else:
                    p1 = (2*cur_x - last_cx, 2*cur_y - last_cy)
                if cmd == 'S':
                    p2 = (float(tokens[i]), float(tokens[i+1]))
                    p3 = (float(tokens[i+2]), float(tokens[i+3]))
                else:
                    p2 = (cur_x+float(tokens[i]), cur_y+float(tokens[i+1]))
                    p3 = (cur_x+float(tokens[i+2]), cur_y+float(tokens[i+3]))
                segments.append(((cur_x, cur_y), p1, p2, p3))
                last_cx, last_cy = p2
                cur_x, cur_y = p3
                i += 4
        elif cmd in ('L', 'l'):
            while i < len(tokens) and not tokens[i][0].isalpha():
                if cmd == 'L':
                    nx = float(tokens[i]); ny = float(tokens[i+1])
                else:
                    nx = cur_x + float(tokens[i]); ny = cur_y + float(tokens[i+1])
                segments.append(((cur_x, cur_y), (cur_x, cur_y), (nx, ny), (nx, ny)))
                cur_x, cur_y = nx, ny
                i += 2
        elif cmd in ('A', 'a'):
            # Arc command: approximate with cubic beziers
            while i < len(tokens) and not tokens[i][0].isalpha():
                if cmd == 'A':
                    rx = float(tokens[i]); ry = float(tokens[i+1])
                    angle = float(tokens[i+2])
                    large = int(float(tokens[i+3]))
                    sweep = int(float(tokens[i+4]))
                    ex = float(tokens[i+5]); ey = float(tokens[i+6])
                else:
                    rx = float(tokens[i]); ry = float(tokens[i+1])
                    angle = float(tokens[i+2])
                    large = int(float(tokens[i+3]))
                    sweep = int(float(tokens[i+4]))
                    ex = cur_x + float(tokens[i+5]); ey = cur_y + float(tokens[i+6])
                # Approximate arc with line segments
                dx = ex - cur_x
                dy = ey - cur_y
                d = math.sqrt(dx*dx + dy*dy)
                if d < 0.01:
                    i += 7; continue
                steps = max(8, int(d / 3.0))
                for s in range(1, steps + 1):
                    t = s / steps
                    # Linear interpolation as fallback (good enough for small arcs)
                    px = cur_x + t * dx
                    py = cur_y + t * dy
                    if s == 1:
                        seg_start = (cur_x, cur_y)
                    prev_px = cur_x + (s-1)/steps * dx if s > 1 else seg_start[0]
                    prev_py = cur_y + (s-1)/steps * dy if s > 1 else seg_start[1]
                # Just use linear segments through the arc
                segments.append(((cur_x, cur_y), (cur_x, cur_y), (ex, ey), (ex, ey)))
                cur_x, cur_y = ex, ey
                i += 7
        elif cmd == 'z' or cmd == 'Z':
            pass
        else:
            pass
        last_cmd = cmd
    return segments

def sample_path(segments, N=45):
    if not segments:
        return []
    densified = []
    DENSIFY = 50  # points per bezier segment for accuracy
    for p0, p1, p2, p3 in segments:
        for j in range(DENSIFY):
            densified.append(cubic_bezier(p0, p1, p2, p3, j / DENSIFY))
    densified.append(segments[-1][3])

    # Compute cumulative arc length
    cum_len = [0.0]
    for idx in range(1, len(densified)):
        cum_len.append(cum_len[-1] + dist(densified[idx-1], densified[idx]))
    total_len = cum_len[-1]
    if total_len == 0:
        return []

    # Sample N evenly-spaced points along arc length
    sampled = []
    for k in range(N):
        target = k * total_len / N
        for idx in range(1, len(cum_len)):
            if cum_len[idx] >= target:
                seg_len = cum_len[idx] - cum_len[idx-1]
                frac = (target - cum_len[idx-1]) / seg_len if seg_len > 0 else 0
                x = densified[idx-1][0] + frac * (densified[idx][0] - densified[idx-1][0])
                y = densified[idx-1][1] + frac * (densified[idx][1] - densified[idx-1][1])
                sampled.append((x, y))
                break

    # Scale to 0-80 coordinate space (leave room for centroid shift)
    min_x = min(p[0] for p in sampled)
    max_x = max(p[0] for p in sampled)
    min_y = min(p[1] for p in sampled)
    max_y = max(p[1] for p in sampled)
    bb_w = max_x - min_x
    bb_h = max_y - min_y
    if bb_w == 0 or bb_h == 0:
        return []
    scale = 80.0 / max(bb_w, bb_h)
    pts = [(round((x - min_x) * scale), round((y - min_y) * scale)) for x, y in sampled]

    # Compute polygon centroid (shoelace formula) and shift so centroid is at (50, 50).
    # This ensures the screen centre always falls inside the track loop.
    cx, cy = 0.0, 0.0
    area = 0.0
    n = len(pts)
    for i in range(n):
        j = (i + 1) % n
        cross = pts[i][0] * pts[j][1] - pts[j][0] * pts[i][1]
        area += cross
        cx += (pts[i][0] + pts[j][0]) * cross
        cy += (pts[i][1] + pts[j][1]) * cross
    if abs(area) > 0.001:
        cx /= (3.0 * area)
        cy /= (3.0 * area)
    else:
        cx = sum(p[0] for p in pts) / n
        cy = sum(p[1] for p in pts) / n
    dx = 50.0 - cx
    dy = 50.0 - cy
    return [(round(x + dx), round(y + dy)) for x, y in pts]

# Map SVG filename to circuit key and display name
# key: used for phone app matching, display_name: shown on watch
circuit_info = {
    "adelaide-1": ("adelaide", "ADELAIDE"),
    "aida-1": ("aida", "AIDA"),
    "ain-diab-1": ("aindiab", "AIN DIAB"),
    "aintree-1": ("aintree", "AINTREE"),
    "anderstorp-1": ("anderstorp", "ANDERSTORP"),
    "austin-1": ("austin", "AUSTIN"),
    "avus-1": ("avus", "AVUS"),
    "bahrain-1": ("bahrain", "BAHRAIN"),
    "bahrain-2": ("bahrain2", "BAHRAIN II"),
    "bahrain-3": ("bahrain3", "BAHRAIN III"),
    "baku-1": ("baku", "BAKU"),
    "brands-hatch-1": ("brandshatch", "BRANDS HATCH"),
    "brands-hatch-2": ("brandshatch2", "BRANDS HATCH II"),
    "bremgarten-1": ("bremgarten", "BREMGARTEN"),
    "buddh-1": ("buddh", "BUDDH"),
    "buenos-aires-1": ("buenosaires", "BUENOS AIRES"),
    "buenos-aires-2": ("buenosaires2", "BUENOS AIRES II"),
    "buenos-aires-3": ("buenosaires3", "BUENOS AIRES III"),
    "buenos-aires-4": ("buenosaires4", "BUENOS AIRES IV"),
    "bugatti-1": ("bugatti", "BUGATTI"),
    "caesars-palace-1": ("caesarspalace", "CAESARS PALACE"),
    "catalunya-1": ("catalunya", "CATALUNYA"),
    "catalunya-2": ("catalunya2", "CATALUNYA II"),
    "catalunya-3": ("catalunya3", "CATALUNYA III"),
    "catalunya-4": ("catalunya4", "CATALUNYA IV"),
    "catalunya-5": ("catalunya5", "CATALUNYA V"),
    "catalunya-6": ("catalunya6", "CATALUNYA VI"),
    "clermont-ferrand-1": ("clermontferrand", "CLERMONT FERRAND"),
    "dallas-1": ("dallas", "DALLAS"),
    "detroit-1": ("detroit", "DETROIT"),
    "detroit-2": ("detroit2", "DETROIT II"),
    "dijon-1": ("dijon", "DIJON"),
    "dijon-2": ("dijon2", "DIJON II"),
    "donington-1": ("donington", "DONINGTON"),
    "east-london-1": ("eastlondon", "EAST LONDON"),
    "estoril-1": ("estoril", "ESTORIL"),
    "estoril-2": ("estoril2", "ESTORIL II"),
    "fuji-1": ("fuji", "FUJI"),
    "fuji-2": ("fuji2", "FUJI II"),
    "hockenheimring-1": ("hockenheim", "HOCKENHEIM"),
    "hockenheimring-2": ("hockenheim2", "HOCKENHEIM II"),
    "hockenheimring-3": ("hockenheim3", "HOCKENHEIM III"),
    "hockenheimring-4": ("hockenheim4", "HOCKENHEIM IV"),
    "hungaroring-1": ("hungaroring", "HUNGARORING"),
    "hungaroring-2": ("hungaroring2", "HUNGARORING II"),
    "hungaroring-3": ("hungaroring3", "HUNGARORING III"),
    "imola-1": ("imola", "IMOLA"),
    "imola-2": ("imola2", "IMOLA II"),
    "imola-3": ("imola3", "IMOLA III"),
    "indianapolis-1": ("indianapolis", "INDIANAPOLIS"),
    "indianapolis-2": ("indianapolis2", "INDIANAPOLIS II"),
    "interlagos-1": ("interlagos", "INTERLAGOS"),
    "interlagos-2": ("interlagos2", "INTERLAGOS II"),
    "istanbul-1": ("istanbul", "ISTANBUL"),
    "jacarepagua-1": ("jacarepagua", "JACAREPAGUA"),
    "jarama-1": ("jarama", "JARAMA"),
    "jarama-2": ("jarama2", "JARAMA II"),
    "jeddah-1": ("jeddah", "JEDDAH"),
    "jerez-1": ("jerez", "JEREZ"),
    "jerez-2": ("jerez2", "JEREZ II"),
    "kyalami-1": ("kyalami", "KYALAMI"),
    "kyalami-2": ("kyalami2", "KYALAMI II"),
    "las-vegas-1": ("lasvegas", "LAS VEGAS"),
    "long-beach-1": ("longbeach", "LONG BEACH"),
    "long-beach-2": ("longbeach2", "LONG BEACH II"),
    "long-beach-3": ("longbeach3", "LONG BEACH III"),
    "lusail-1": ("lusail", "LUSAIL"),
    "madring-1": ("madrid", "MADRID"),
    "magny-cours-1": ("magnycours", "MAGNY COURS"),
    "magny-cours-2": ("magnycours2", "MAGNY COURS II"),
    "magny-cours-3": ("magnycours3", "MAGNY COURS III"),
    "marina-bay-1": ("marinabay", "MARINA BAY"),
    "marina-bay-2": ("marinabay2", "MARINA BAY II"),
    "marina-bay-3": ("marinabay3", "MARINA BAY III"),
    "marina-bay-4": ("marinabay4", "MARINA BAY IV"),
    "melbourne-1": ("melbourne", "MELBOURNE"),
    "melbourne-2": ("melbourne2", "MELBOURNE II"),
    "mexico-city-1": ("mexicocity", "MEXICO CITY"),
    "mexico-city-2": ("mexicocity2", "MEXICO CITY II"),
    "mexico-city-3": ("mexicocity3", "MEXICO CITY III"),
    "miami-1": ("miami", "MIAMI"),
    "monaco-1": ("monaco", "MONACO"),
    "monaco-2": ("monaco2", "MONACO II"),
    "monaco-3": ("monaco3", "MONACO III"),
    "monaco-4": ("monaco4", "MONACO IV"),
    "monaco-5": ("monaco5", "MONACO V"),
    "monaco-6": ("monaco6", "MONACO VI"),
    "monsanto-1": ("monsanto", "MONSANTO"),
    "mont-tremblant-1": ("monttremblant", "MONT TREMBLANT"),
    "montjuic-1": ("montjuic", "MONTJUIC"),
    "montreal-1": ("montreal", "MONTREAL"),
    "montreal-2": ("montreal2", "MONTREAL II"),
    "montreal-3": ("montreal3", "MONTREAL III"),
    "montreal-4": ("montreal4", "MONTREAL IV"),
    "montreal-5": ("montreal5", "MONTREAL V"),
    "montreal-6": ("montreal6", "MONTREAL VI"),
    "monza-1": ("monza", "MONZA"),
    "monza-2": ("monza2", "MONZA II"),
    "monza-3": ("monza3", "MONZA III"),
    "monza-4": ("monza4", "MONZA IV"),
    "monza-5": ("monza5", "MONZA V"),
    "monza-6": ("monza6", "MONZA VI"),
    "monza-7": ("monza7", "MONZA VII"),
    "mosport-1": ("mosport", "MOSPORT"),
    "mugello-1": ("mugello", "MUGELLO"),
    "nivelles-1": ("nivelles", "NIVELLES"),
    "nurburgring-1": ("nurburgring", "NURBURGRING"),
    "nurburgring-2": ("nurburgring2", "NURBURGRING II"),
    "nurburgring-3": ("nurburgring3", "NURBURGRING III"),
    "nurburgring-4": ("nurburgring4", "NURBURGRING IV"),
    "paul-ricard-1": ("paulricard", "PAUL RICARD"),
    "paul-ricard-2": ("paulricard2", "PAUL RICARD II"),
    "paul-ricard-3": ("paulricard3", "PAUL RICARD III"),
    "pedralbes-1": ("pedralbes", "PEDRALBES"),
    "pescara-1": ("pescara", "PESCARA"),
    "phoenix-1": ("phoenix", "PHOENIX"),
    "phoenix-2": ("phoenix2", "PHOENIX II"),
    "portimao-1": ("portimao", "PORTIMAO"),
    "porto-1": ("porto", "PORTO"),
    "reims-1": ("reims", "REIMS"),
    "reims-2": ("reims2", "REIMS II"),
    "riverside-1": ("riverside", "RIVERSIDE"),
    "rouen-1": ("rouen", "ROUEN"),
    "rouen-2": ("rouen2", "ROUEN II"),
    "sebring-1": ("sebring", "SEBRING"),
    "sepang-1": ("sepang", "SEPANG"),
    "shanghai-1": ("shanghai", "SHANGHAI"),
    "silverstone-1": ("silverstone", "SILVERSTONE"),
    "silverstone-2": ("silverstone2", "SILVERSTONE II"),
    "silverstone-3": ("silverstone3", "SILVERSTONE III"),
    "silverstone-4": ("silverstone4", "SILVERSTONE IV"),
    "silverstone-5": ("silverstone5", "SILVERSTONE V"),
    "silverstone-6": ("silverstone6", "SILVERSTONE VI"),
    "silverstone-7": ("silverstone7", "SILVERSTONE VII"),
    "silverstone-8": ("silverstone8", "SILVERSTONE VIII"),
    "sochi-1": ("sochi", "SOCHI"),
    "spa-francorchamps-1": ("spa", "SPA"),
    "spa-francorchamps-2": ("spa2", "SPA II"),
    "spa-francorchamps-3": ("spa3", "SPA III"),
    "spa-francorchamps-4": ("spa4", "SPA IV"),
    "spielberg-1": ("spielberg", "SPIELBERG"),
    "spielberg-2": ("spielberg2", "SPIELBERG II"),
    "spielberg-3": ("spielberg3", "SPIELBERG III"),
    "suzuka-1": ("suzuka", "SUZUKA"),
    "suzuka-2": ("suzuka2", "SUZUKA II"),
    "valencia-1": ("valencia", "VALENCIA"),
    "watkins-glen-1": ("watkinsGlen", "WATKINS GLEN"),
    "watkins-glen-2": ("watkinsGlen2", "WATKINS GLEN II"),
    "watkins-glen-3": ("watkinsGlen3", "WATKINS GLEN III"),
    "yas-marina-1": ("yasmarina", "YAS MARINA"),
    "yas-marina-2": ("yasmarina2", "YAS MARINA II"),
    "yeongam-1": ("yeongam", "YEONGAM"),
    "zandvoort-1": ("zandvoort", "ZANDVOORT"),
    "zandvoort-2": ("zandvoort2", "ZANDVOORT II"),
    "zandvoort-3": ("zandvoort3", "ZANDVOORT III"),
    "zandvoort-4": ("zandvoort4", "ZANDVOORT IV"),
    "zandvoort-5": ("zandvoort5", "ZANDVOORT V"),
    "zeltweg-1": ("zeltweg", "ZELTWEG"),
    "zolder-1": ("zolder", "ZOLDER"),
    "zolder-2": ("zolder2", "ZOLDER II"),
}

parser = argparse.ArgumentParser(description="Convert F1 circuit SVGs to C waypoints")
parser.add_argument("--svg-dir", default=None,
                    help="Directory containing SVG files (default: ../f1-circuits-svg/circuits/minimal/black)")
parser.add_argument("--output-dir", default=None,
                    help="Output directory for generated files (default: src/c/)")
args = parser.parse_args()

# Resolve paths relative to this script's location
script_dir = os.path.dirname(os.path.abspath(__file__))
repo_root = os.path.dirname(script_dir)

svg_dir = args.svg_dir or os.path.join(repo_root, "..", "f1-circuits-svg", "circuits", "minimal", "black")
output_dir = args.output_dir or os.path.join(repo_root, "src", "c")

svg_dir = os.path.abspath(svg_dir)
output_dir = os.path.abspath(output_dir)

if not os.path.isdir(svg_dir):
    print(f"ERROR: SVG directory not found: {svg_dir}")
    print("Clone f1-circuits-svg as a sibling directory:")
    print("  cd .. && git clone https://github.com/julesr0y/f1-circuits-svg.git")
    sys.exit(1)

os.makedirs(output_dir, exist_ok=True)

svg_files = sorted(glob.glob(os.path.join(svg_dir, "*.svg")))

print(f"Found {len(svg_files)} SVG files")

# Process each SVG
c_arrays = []
c_entries = []
failed = []

for svg_path in svg_files:
    basename = os.path.splitext(os.path.basename(svg_path))[0]
    if basename not in circuit_info:
        print(f"WARNING: No mapping for {basename}, skipping")
        failed.append(basename)
        continue
    
    key, display_name = circuit_info[basename]
    
    with open(svg_path, 'r') as f:
        content = f.read()
    
    # Extract path d attribute
    match = re.search(r'd="([^"]+)"', content)
    if not match:
        print(f"WARNING: No path in {basename}, skipping")
        failed.append(basename)
        continue
    
    path_d = match.group(1)
    segments = parse_svg_path(path_d)
    if not segments:
        print(f"WARNING: No segments in {basename}, skipping")
        failed.append(basename)
        continue
    pts = sample_path(segments, 45)
    if not pts:
        print(f"WARNING: No points in {basename}, skipping")
        failed.append(basename)
        continue
    
    # Find the point inside the polygon that is furthest from any track segment.
    # This is the "deepest" point in the enclosed area — the centre of the
    # largest inscribed circle.
    n = len(pts)
    def point_in_poly(px, py):
        inside = False
        for i in range(n):
            j = (i + 1) % n
            yi, yj = pts[i][1], pts[j][1]
            xi, xj = pts[i][0], pts[j][0]
            if ((yi > py) != (yj > py)) and (px < (xj - xi) * (py - yi) / (yj - yi) + xi):
                inside = not inside
        return inside

    def seg_dist(px, py):
        best = float('inf')
        for i in range(n):
            j = (i + 1) % n
            ax, ay = pts[i]
            bx, by = pts[j]
            dx, dy = bx - ax, by - ay
            len2 = dx * dx + dy * dy
            if len2 == 0:
                d = ((px - ax)**2 + (py - ay)**2) ** 0.5
            else:
                t = max(0, min(1, ((px - ax) * dx + (py - ay) * dy) / len2))
                nx = ax + t * dx - px
                ny = ay + t * dy - py
                d = (nx * nx + ny * ny) ** 0.5
            if d < best:
                best = d
        return best

    # Iterative refinement: start coarse, zoom in on the best region
    best_x, best_y = 50, 50
    best_d = 0
    # Start with full range, step=4
    lo_x, hi_x, lo_y, hi_y = 0.0, 100.0, 0.0, 100.0
    for iteration in range(5):  # 5 rounds of refinement
        step = 2.0 if iteration == 0 else (hi_x - lo_x) / 10
        gx = lo_x
        while gx <= hi_x:
            gy = lo_y
            while gy <= hi_y:
                if point_in_poly(gx, gy):
                    d = seg_dist(gx, gy)
                    if d > best_d:
                        best_d = d
                        best_x, best_y = gx, gy
                gy += step
            gx += step
        # Narrow search to ±2 steps around best
        span = step * 2
        lo_x = max(0, best_x - span)
        hi_x = min(100, best_x + span)
        lo_y = max(0, best_y - span)
        hi_y = min(100, best_y + span)

    centre_x = round(best_x)
    centre_y = round(best_y)
    
    # Build C array
    arr_name = f"c_{key}"
    lines = []
    for i in range(0, len(pts), 8):
        chunk = pts[i:i+8]
        line_parts = [f"{{{x},{y}}}" for x, y in chunk]
        lines.append("    " + ",".join(line_parts) + ",")
    

    c_array = f"static const GPoint {arr_name}[] = {{\n"
    for line in lines[:-1]:
        c_array += line + "\n"
    # Fix last line comma
    c_array += lines[-1].rstrip(",") + "\n"
    c_array += "};"
    
    c_arrays.append((key, display_name, c_array, centre_x, centre_y))
    c_entries.append(f'    CIRCUIT({arr_name}, "{display_name}", "{key}", {centre_x}, {centre_y}),')

# Output
print(f"\nProcessed: {len(c_arrays)} circuits")
print(f"Failed: {len(failed)} - {failed}")

# Write C arrays to file
arrays_path = os.path.join(output_dir, "circuit_arrays.h")
with open(arrays_path, "w") as f:
    f.write("// Auto-generated circuit waypoint arrays\n")
    f.write("// Each circuit has 45 waypoints scaled to 0-100 coordinate space\n")
    f.write("// Generated by tools/convert_all.py from f1-circuits-svg SVGs\n\n")
    for key, display_name, c_array, cx, cy in c_arrays:
        f.write(f"// {display_name} ({key})\n")
        f.write(c_array + "\n\n")

# Write C entries to file
entries_path = os.path.join(output_dir, "circuit_entries.h")
with open(entries_path, "w") as f:
    f.write("// Auto-generated circuit table entries\n")
    f.write("// Paste into s_circuits[] in main.c\n\n")
    for entry in c_entries:
        f.write(entry + "\n")

print(f"\nFiles written:")
print(f"  {arrays_path}")
print(f"  {entries_path}")
print(f"\nTo update main.c, paste the contents of circuit_entries.h into the s_circuits[] array.")
