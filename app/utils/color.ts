export interface HSL {
  h: number
  s: number
  l: number
}

export type ColorScheme = 'triadic' | 'analogous' | 'complementary' | 'split-complementary' | 'tetradic'

export interface ColorSchemeResult {
  original: string
  colors: string[]
  scheme: ColorScheme
}

export function getTriadicColors(color: string): [string, string, string] {
  const hsl = parseColorToHSL(color)
  if (!hsl) throw new Error('Invalid color format. Supported formats: hex, rgb, rgba, hsl, hsla')
  
  const { h, s, l } = hsl
  return [
    hslToHex(h, s, l),               // Original
    hslToHex((h + 1/3) % 1, s, l),   // 120°
    hslToHex((h + 2/3) % 1, s, l)    // 240°
  ]
}

export function getAnalogousColors(color: string): [string, string, string] {
  const hsl = parseColorToHSL(color)
  if (!hsl) throw new Error('Invalid color format. Supported formats: hex, rgb, rgba, hsl, hsla')
  
  const { h, s, l } = hsl
  const offset = 1/12 // 30° in normalized units
  return [
    hslToHex((h - offset + 1) % 1, s, l),  // -30°
    hslToHex(h, s, l),                      // Original
    hslToHex((h + offset) % 1, s, l)        // +30°
  ]
}

export function getComplementaryColors(color: string): [string, string] {
  const hsl = parseColorToHSL(color)
  if (!hsl) throw new Error('Invalid color format. Supported formats: hex, rgb, rgba, hsl, hsla')
  
  const { h, s, l } = hsl
  return [
    hslToHex(h, s, l),               // Original
    hslToHex((h + 0.5) % 1, s, l)    // 180°
  ]
}

export function getSplitComplementaryColors(color: string): [string, string, string] {
  const hsl = parseColorToHSL(color)
  if (!hsl) throw new Error('Invalid color format. Supported formats: hex, rgb, rgba, hsl, hsla')
  
  const { h, s, l } = hsl
  const offset = 1/6 // 30° in normalized units (150° and 210° from original)
  return [
    hslToHex(h, s, l),                     // Original
    hslToHex((h + 0.5 - offset) % 1, s, l), // 150°
    hslToHex((h + 0.5 + offset) % 1, s, l)  // 210°
  ]
}

export function getTetradicColors(color: string): [string, string, string, string] {
  const hsl = parseColorToHSL(color)
  if (!hsl) throw new Error('Invalid color format. Supported formats: hex, rgb, rgba, hsl, hsla')
  
  const { h, s, l } = hsl
  return [
    hslToHex(h, s, l),               // Original
    hslToHex((h + 0.25) % 1, s, l),  // 90°
    hslToHex((h + 0.5) % 1, s, l),   // 180°
    hslToHex((h + 0.75) % 1, s, l)   // 270°
  ]
}

export function getColorScheme(color: string, scheme: ColorScheme): ColorSchemeResult {
  switch (scheme) {
    case 'triadic':
      return { original: color, colors: getTriadicColors(color), scheme }
    case 'analogous':
      return { original: color, colors: getAnalogousColors(color), scheme }
    case 'complementary':
      return { original: color, colors: getComplementaryColors(color), scheme }
    case 'split-complementary':
      return { original: color, colors: getSplitComplementaryColors(color), scheme }
    case 'tetradic':
      return { original: color, colors: getTetradicColors(color), scheme }
    default:
      throw new Error(`Unsupported color scheme: ${scheme}`)
  }
}

export function parseColorToHSL(color: string): HSL | null {
  color = color.trim()
  
  if (color.startsWith('#')) {
    return hexToHSL(color)
  }
  
  const rgbMatch = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*[\d.]+)?\s*\)/i)
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]!)
    const g = parseInt(rgbMatch[2]!)
    const b = parseInt(rgbMatch[3]!)
    return rgbToHSL(r, g, b)
  }
  
  const hslMatch = color.match(/hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*[\d.]+)?\s*\)/i)
  if (hslMatch) {
    const h = parseFloat(hslMatch[1]!) / 360
    const s = parseFloat(hslMatch[2]!) / 100
    const l = parseFloat(hslMatch[3]!) / 100
    return { h, s, l }
  }
  
  return null
}

export function hexToHSL(hex: string): HSL {
  hex = hex.replace('#', '')
  
  if (hex.length === 3) {
    hex = hex[0]! + hex[0]! + hex[1]! + hex[1]! + hex[2]! + hex[2]!
  }
  
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  
  return rgbToHSL(r, g, b)
}

export function rgbToHSL(r: number, g: number, b: number): HSL {
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255
  
  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  const delta = max - min
  
  let h = 0
  let s = 0
  const l = (max + min) / 2
  
  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)
    
    if (max === rNorm) {
      h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) / 6
    } else if (max === gNorm) {
      h = ((bNorm - rNorm) / delta + 2) / 6
    } else {
      h = ((rNorm - gNorm) / delta + 4) / 6
    }
  }
  
  return { h, s, l }
}

export function hslToHex(hue: number, sat: number, light: number): string {
  let r: number, g: number, b: number
  
  if (sat === 0) {
    r = g = b = light
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    
    const q = light < 0.5 ? light * (1 + sat) : light + sat - light * sat
    const p = 2 * light - q
    
    r = hue2rgb(p, q, hue + 1/3)
    g = hue2rgb(p, q, hue)
    b = hue2rgb(p, q, hue - 1/3)
  }
  
  const toHex = (n: number): string => {
    const hex = Math.round(n * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function normalizeToHex(color: string): string {
  // If already hex, return as-is
  if (color.startsWith('#')) {
    return color
  }
  
  // Parse and convert to HSL, then to hex
  const hsl = parseColorToHSL(color)
  if (!hsl) {
    throw new Error('Invalid color format. Supported formats: hex, rgb, rgba, hsl, hsla')
  }
  
  return hslToHex(hsl.h, hsl.s, hsl.l)
}

export function getRelativeLuminance(color: string): number {
  // Convert color to hex format first
  const hex = normalizeToHex(color)
  
  // Convert hex to RGB
  let cleanHex = hex.replace('#', '')
  if (cleanHex.length === 4) { // Handle shorthand hex
    cleanHex = cleanHex[0]! + cleanHex[0]! + cleanHex[1]! + cleanHex[1]! + cleanHex[2]! + cleanHex[2]!
  }
  
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255
  
  // Apply gamma correction for sRGB to linear RGB
  const gammaCorrect = (channel: number): number => {
    return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4)
  }
  
  const rLinear = gammaCorrect(r)
  const gLinear = gammaCorrect(g)
  const bLinear = gammaCorrect(b)
  
  // Calculate relative luminance using WCAG 2.0 weights
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear
}

export function getContrastTextColor(backgroundColor: string): 'black' | 'white' {
  const luminance = getRelativeLuminance(backgroundColor)
  // WCAG recommends using black text on backgrounds with luminance > 0.5
  return luminance > 0.5 ? 'black' : 'white'
}