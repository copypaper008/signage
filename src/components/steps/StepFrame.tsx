import { useWizardStore } from '../../store/wizardStore'
import { SwatchPicker } from '../SwatchPicker'
import { FRAME_COLORS } from '../../utils/color'

export function StepFrame() {
  const { frameColor, setFrameColor } = useWizardStore()

  return (
    <div className="step">
      <h2>Pick a frame finish</h2>
      <p className="step-hint">
        The frame is the extruded aluminum case around the light box. Choose a standard finish or
        set a custom color.
      </p>
      <SwatchPicker swatches={FRAME_COLORS} value={frameColor} onChange={setFrameColor} />
    </div>
  )
}
