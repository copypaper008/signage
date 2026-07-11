export type CornerStyle = 'square' | 'rounded' | 'pill'

export type GraphicMode = 'text' | 'logo'

export interface Placement {
  x: number
  y: number
  scale: number
  rotation: number
}

export interface WizardState {
  step: number

  // Dimensions (millimeters)
  widthMm: number
  heightMm: number

  // Shape
  corner: CornerStyle

  // Frame / case
  frameColor: string

  // Face + illumination
  faceColor: string
  illuminationOn: boolean
  ledColor: string

  // Graphics
  graphicMode: GraphicMode
  text: string
  textColor: string
  fontFamily: string
  logoDataUrl: string | null

  // Placement (environment photo)
  envPhotoDataUrl: string | null
  placement: Placement
}

export const TOTAL_STEPS = 7
