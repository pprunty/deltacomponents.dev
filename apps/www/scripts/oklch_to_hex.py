#!/usr/bin/env python3
"""
Convert OKLCH colors to hex codes for meta theme-color
"""

import math

def oklch_to_hex(l, c, h):
    """
    Convert OKLCH to hex color
    l: lightness (0-1)
    c: chroma (0-1, typically)
    h: hue (0-360 degrees)
    """
    # Convert OKLCH to OKLab
    h_rad = math.radians(h)
    a = c * math.cos(h_rad)
    b = c * math.sin(h_rad)
    
    # Convert OKLab to linear RGB
    l_ = l + 0.3963377774 * a + 0.2158037573 * b
    m_ = l - 0.1055613458 * a - 0.0638541728 * b
    s_ = l - 0.0894841775 * a - 1.2914855480 * b
    
    l_cubed = l_ ** 3
    m_cubed = m_ ** 3
    s_cubed = s_ ** 3
    
    r_linear = +4.0767416621 * l_cubed - 3.3077115913 * m_cubed + 0.2309699292 * s_cubed
    g_linear = -1.2684380046 * l_cubed + 2.6097574011 * m_cubed - 0.3413193965 * s_cubed
    b_linear = -0.0041960863 * l_cubed - 0.7034186147 * m_cubed + 1.7076147010 * s_cubed
    
    # Convert linear RGB to sRGB
    def linear_to_srgb(c):
        if c <= 0.0031308:
            return 12.92 * c
        else:
            return 1.055 * (c ** (1.0 / 2.4)) - 0.055
    
    r = linear_to_srgb(r_linear)
    g = linear_to_srgb(g_linear)
    b = linear_to_srgb(b_linear)
    
    # Clamp to [0, 1] and convert to 0-255
    r = max(0, min(1, r)) * 255
    g = max(0, min(1, g)) * 255
    b = max(0, min(1, b)) * 255
    
    # Convert to hex
    return f"#{int(r):02x}{int(g):02x}{int(b):02x}"

# Theme background colors from the CSS files
themes = {
    # Default (light/dark)
    "default": {
        "light": (1, 0, 0),  # Pure white
        "dark": (0.145, 0, 0)  # Very dark gray
    },
    # Dublin (light/dark)
    "dublin": {
        "light": (0.9721, 0.0158, 110.5501),
        "dark": "#292929"  # Already hex in dublin.css
    },
    # Clare (using clare.css)
    "clare": {
        "light": "#faf4ed",  # Already hex in clare.css
        "dark": "#303446"    # Already hex in clare.css
    },
    # Kerry (light/dark)
    "kerry": {
        "light": (0.9851, 0, 0),
        "dark": (0.18, 0.03, 132)
    },
    # Galway (light/dark)
    "galway": {
        "light": (0.9818, 0.0054, 95.0986),
        "dark": (0.2679, 0.0036, 106.6427)
    }
}

print("Theme Background Colors (for meta theme-color):")
print("=" * 50)

for theme_name, colors in themes.items():
    print(f"\n{theme_name.upper()}:")
    
    for mode, color in colors.items():
        if isinstance(color, str):
            # Already hex
            hex_color = color
        elif isinstance(color, tuple):
            # Convert OKLCH to hex
            l, c, h = color
            hex_color = oklch_to_hex(l, c, h)
        
        print(f"  {mode}: {hex_color}")

# Generate the config object
print("\n" + "=" * 50)
print("JavaScript config object:")
print("=" * 50)

config_lines = []
for theme_name, colors in themes.items():
    light_color = colors["light"]
    dark_color = colors["dark"]
    
    if isinstance(light_color, tuple):
        light_hex = oklch_to_hex(*light_color)
    else:
        light_hex = light_color
        
    if isinstance(dark_color, tuple):
        dark_hex = oklch_to_hex(*dark_color)
    else:
        dark_hex = dark_color
    
    config_lines.append(f'  {theme_name}: {{ light: "{light_hex}", dark: "{dark_hex}" }}')

print("export const THEME_META_COLORS = {")
print(",\n".join(config_lines))
print("}")