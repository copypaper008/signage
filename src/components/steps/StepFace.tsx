import { useWizardStore } from '../../store/wizardStore'
import { SwatchPicker } from '../SwatchPicker'
import { FACE_COLORS, LED_COLORS } from '../../utils/color'

export function StepFace() {
  const { faceColor, setFaceColor, illuminationOn, setIlluminationOn, ledColor, setLedColor } =
    useWizardStore()

  return (
    <div className="step">
      <h2>Face color &amp; illumination</h2>
      <p className="step-hint">
        The face is the translucent acrylic panel that lights up. Pick its color and how it should
        glow after dark.
      </p>

      <div className="subsection">
        <h3>Face color</h3>
        <SwatchPicker swatches={FACE_COLORS} value={faceColor} onChange={setFaceColor} />
      </div>

      <div className="subsection">
        <label className="toggle-row">
          <input
            type="checkbox"
            checked={illuminationOn}
            onChange={(e) => setIlluminationOn(e.target.checked)}
          />
          Illuminated (LED backlit)
        </label>

        {illuminationOn && (
          <>
            <h3>LED color temperature</h3>
            <SwatchPicker swatches={LED_COLORS} value={ledColor} onChange={setLedColor} allowCustom={false} />
          </>
        )}
      </div>
    </div>
  )
}
