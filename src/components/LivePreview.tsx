import { Stage, Layer, Rect } from 'react-konva'
import { useWizardStore } from '../store/wizardStore'
import { LightboxDesign } from './LightboxDesign'

const STAGE_W = 420
const STAGE_H = 320
const PADDING = 36
const AWNING_H = 74
const SIDEWALK_H = 46
const STRIPE_COUNT = 10

export function LivePreview() {
  const {
    widthMm,
    heightMm,
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
  } = useWizardStore()

  const availW = STAGE_W - PADDING * 2
  const availH = STAGE_H - AWNING_H - SIDEWALK_H - PADDING
  const scale = Math.min(availW / widthMm, availH / heightMm)
  const w = widthMm * scale
  const h = heightMm * scale
  const stripeW = STAGE_W / STRIPE_COUNT

  return (
    <div className="live-preview">
      <Stage width={STAGE_W} height={STAGE_H}>
        <Layer listening={false}>
          <Rect x={0} y={0} width={STAGE_W} height={STAGE_H} fill="#dfe6ea" />
          <Rect x={0} y={0} width={STAGE_W} height={AWNING_H} fill="#7a3636" />
          {Array.from({ length: STRIPE_COUNT }).map((_, i) =>
            i % 2 === 0 ? (
              <Rect
                key={i}
                x={i * stripeW}
                y={0}
                width={stripeW}
                height={AWNING_H}
                fill="#f4ece2"
              />
            ) : null,
          )}
          <Rect x={0} y={AWNING_H} width={STAGE_W} height={4} fill="#3a1c1c" />
          <Rect x={0} y={STAGE_H - SIDEWALK_H} width={STAGE_W} height={SIDEWALK_H} fill="#a9b2b8" />
          <LightboxDesign
            x={STAGE_W / 2}
            y={AWNING_H + h / 2 + 26}
            width={w}
            height={h}
            corner={corner}
            frameColor={frameColor}
            faceColor={faceColor}
            illuminationOn={illuminationOn}
            ledColor={ledColor}
            graphicMode={graphicMode}
            text={text}
            textColor={textColor}
            fontFamily={fontFamily}
            logoDataUrl={logoDataUrl}
            listening={false}
          />
        </Layer>
      </Stage>
      <p className="preview-dims">
        {widthMm}mm wide × {heightMm}mm tall
      </p>
    </div>
  )
}
