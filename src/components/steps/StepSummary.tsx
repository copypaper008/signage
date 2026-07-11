import { Stage, Layer, Image as KonvaImage } from 'react-konva'
import useImage from 'use-image'
import { useWizardStore } from '../../store/wizardStore'
import { LightboxDesign } from '../LightboxDesign'

const STAGE_W = 520
const STAGE_H = 380

const CORNER_LABEL: Record<string, string> = {
  square: 'Square corners',
  rounded: 'Rounded corners',
  pill: 'Full pill / capsule',
}

function buildQuoteBody(s: ReturnType<typeof useWizardStore.getState>) {
  return [
    'Hi, I designed a custom under-awning lightbox and would like a quote:',
    '',
    `Size: ${s.widthIn}" wide x ${s.heightIn}" tall`,
    `Shape: ${CORNER_LABEL[s.corner]}`,
    `Frame color: ${s.frameColor}`,
    `Face color: ${s.faceColor}`,
    `Illuminated: ${s.illuminationOn ? `Yes (${s.ledColor})` : 'No'}`,
    `Graphic: ${s.graphicMode === 'text' ? `Text - "${s.text}"` : 'Uploaded logo'}`,
  ].join('\n')
}

export function StepSummary() {
  const state = useWizardStore()
  const {
    widthIn,
    heightIn,
    corner,
    frameColor,
    faceColor,
    illuminationOn,
    ledColor,
    graphicMode,
    text,
    logoDataUrl,
    envPhotoDataUrl,
    placement,
    goToStep,
  } = state
  const [bgImage] = useImage(envPhotoDataUrl ?? '')

  let stageW = STAGE_W
  let stageH = STAGE_H
  if (bgImage) {
    const ratio = bgImage.width / bgImage.height
    if (STAGE_W / ratio <= STAGE_H) {
      stageW = STAGE_W
      stageH = STAGE_W / ratio
    } else {
      stageH = STAGE_H
      stageW = STAGE_H * ratio
    }
  }

  const baseWidthPx = stageW * 0.32
  const baseHeightPx = baseWidthPx * (heightIn / widthIn)

  const mailtoHref = `mailto:?subject=${encodeURIComponent(
    'Custom lightbox quote request',
  )}&body=${encodeURIComponent(buildQuoteBody(state))}`

  return (
    <div className="step">
      <h2>Review your design</h2>
      <p className="step-hint">Here's your finished lightbox design. Request a quote when you're ready.</p>

      {envPhotoDataUrl ? (
        <div className="placement-stage-wrap">
          <Stage width={stageW} height={stageH}>
            <Layer listening={false}>
              {bgImage && <KonvaImage image={bgImage} width={stageW} height={stageH} />}
              <LightboxDesign
                x={placement.x * stageW}
                y={placement.y * stageH}
                width={baseWidthPx * placement.scale}
                height={baseHeightPx * placement.scale}
                rotation={placement.rotation}
                corner={corner}
                frameColor={frameColor}
                faceColor={faceColor}
                illuminationOn={illuminationOn}
                ledColor={ledColor}
                graphicMode={graphicMode}
                text={text}
                textColor={state.textColor}
                fontFamily={state.fontFamily}
                logoDataUrl={logoDataUrl}
                listening={false}
              />
            </Layer>
          </Stage>
        </div>
      ) : (
        <p className="placeholder-note">
          No environment photo added.{' '}
          <button type="button" className="link-button" onClick={() => goToStep(5)}>
            Add one now
          </button>
        </p>
      )}

      <dl className="summary-list">
        <div>
          <dt>Size</dt>
          <dd>
            {widthIn}" × {heightIn}"
          </dd>
        </div>
        <div>
          <dt>Shape</dt>
          <dd>{CORNER_LABEL[corner]}</dd>
        </div>
        <div>
          <dt>Frame</dt>
          <dd style={{ color: frameColor }}>{frameColor}</dd>
        </div>
        <div>
          <dt>Face</dt>
          <dd>{faceColor}</dd>
        </div>
        <div>
          <dt>Illumination</dt>
          <dd>{illuminationOn ? `On (${ledColor})` : 'Off'}</dd>
        </div>
        <div>
          <dt>Graphic</dt>
          <dd>{graphicMode === 'text' ? `Text — "${text}"` : logoDataUrl ? 'Logo uploaded' : 'None'}</dd>
        </div>
      </dl>

      <a className="primary-button" href={mailtoHref}>
        Request a quote
      </a>
    </div>
  )
}
