import { forwardRef } from 'react'
import { Group, Rect, Text, Image as KonvaImage } from 'react-konva'
import useImage from 'use-image'
import type Konva from 'konva'
import type { CornerStyle, GraphicMode } from '../types'
import { lighten } from '../utils/color'

export interface LightboxDesignProps {
  x?: number
  y?: number
  width: number
  height: number
  corner: CornerStyle
  frameColor: string
  faceColor: string
  illuminationOn: boolean
  ledColor: string
  graphicMode: GraphicMode
  text: string
  textColor: string
  fontFamily: string
  logoDataUrl: string | null
  rotation?: number
  draggable?: boolean
  onDragEnd?: (e: Konva.KonvaEventObject<DragEvent>) => void
  onClick?: (e: Konva.KonvaEventObject<MouseEvent>) => void
  onTap?: (e: Konva.KonvaEventObject<Event>) => void
  listening?: boolean
}

function cornerRadius(corner: CornerStyle, w: number, h: number) {
  const m = Math.min(w, h)
  if (corner === 'square') return 0
  if (corner === 'pill') return m / 2
  return m * 0.12
}

export const LightboxDesign = forwardRef<Konva.Group, LightboxDesignProps>(function LightboxDesign(
  {
    x = 0,
    y = 0,
    width,
    height,
    corner,
    frameColor,
    faceColor,
    illuminationOn,
    ledColor,
    graphicMode,
    text,
    textColor,
    fontFamily,
    logoDataUrl,
    rotation = 0,
    draggable = false,
    onDragEnd,
    onClick,
    onTap,
    listening = true,
  },
  ref,
) {
  const [logoImage] = useImage(logoDataUrl ?? '', 'anonymous')
  const radius = cornerRadius(corner, width, height)
  const frameThickness = Math.max(3, Math.min(width, height) * 0.035)
  const faceW = Math.max(1, width - frameThickness * 2)
  const faceH = Math.max(1, height - frameThickness * 2)
  const faceRadius = Math.max(0, radius - frameThickness)
  const fontSize = Math.max(6, faceH * 0.32)
  const logoScale = Math.min((faceW * 0.8) / (logoImage?.width || 1), (faceH * 0.8) / (logoImage?.height || 1))

  return (
    <Group
      ref={ref}
      x={x}
      y={y}
      offsetX={width / 2}
      offsetY={height / 2}
      rotation={rotation}
      draggable={draggable}
      onDragEnd={onDragEnd}
      onClick={onClick}
      onTap={onTap}
      listening={listening}
    >
      {illuminationOn && (
        <Rect
          width={width}
          height={height}
          cornerRadius={radius}
          fill={ledColor}
          shadowColor={ledColor}
          shadowBlur={Math.min(width, height) * 0.55}
          shadowOpacity={0.85}
          shadowOffset={{ x: 0, y: 0 }}
        />
      )}
      <Rect width={width} height={height} cornerRadius={radius} fill={frameColor} />
      <Rect
        x={frameThickness}
        y={frameThickness}
        width={faceW}
        height={faceH}
        cornerRadius={faceRadius}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{ x: 0, y: faceH }}
        fillLinearGradientColorStops={
          illuminationOn ? [0, lighten(faceColor, 0.25), 1, faceColor] : [0, faceColor, 1, faceColor]
        }
      />
      {graphicMode === 'text' && text && (
        <Text
          x={frameThickness}
          y={frameThickness}
          width={faceW}
          height={faceH}
          text={text}
          fontFamily={fontFamily}
          fontStyle="bold"
          fontSize={fontSize}
          fill={textColor}
          align="center"
          verticalAlign="middle"
          padding={faceW * 0.06}
          wrap="word"
        />
      )}
      {graphicMode === 'logo' && logoImage && (
        <KonvaImage
          image={logoImage}
          x={frameThickness + faceW / 2}
          y={frameThickness + faceH / 2}
          width={logoImage.width * logoScale}
          height={logoImage.height * logoScale}
          offsetX={(logoImage.width * logoScale) / 2}
          offsetY={(logoImage.height * logoScale) / 2}
        />
      )}
    </Group>
  )
})
