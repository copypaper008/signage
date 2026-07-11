export function lighten(hex: string, amount: number): string {
  const c = hex.replace('#', '')
  const full = c.length === 3 ? c.split('').map((ch) => ch + ch).join('') : c
  const num = parseInt(full, 16)
  const r = (num >> 16) & 0xff
  const g = (num >> 8) & 0xff
  const b = num & 0xff
  const mix = (channel: number) => Math.round(channel + (255 - channel) * amount)
  const toHex = (v: number) => v.toString(16).padStart(2, '0')
  return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`
}

export const FRAME_COLORS = [
  { label: 'Satin Black', value: '#2b2b2b' },
  { label: 'Bright White', value: '#f4f4f2' },
  { label: 'Brushed Silver', value: '#b8bcc2' },
  { label: 'Bronze', value: '#6b4a34' },
  { label: 'Dark Gray', value: '#4a4d52' },
]

export const FACE_COLORS = [
  { label: 'Opal White', value: '#f5f5f0' },
  { label: 'Warm Ivory', value: '#f2e9d8' },
  { label: 'Soft Black', value: '#1c1c1c' },
  { label: 'Sky Blue', value: '#cfe6f2' },
]

export const LED_COLORS = [
  { label: 'Warm White', value: '#fff6d8' },
  { label: 'Cool White', value: '#eaf4ff' },
  { label: 'Daylight', value: '#ffffff' },
]
