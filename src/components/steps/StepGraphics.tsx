import { useWizardStore } from '../../store/wizardStore'
import { fileToDataUrl } from '../../utils/file'

const FONTS = [
  { label: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
  { label: 'Georgia (serif)', value: 'Georgia, "Times New Roman", serif' },
  { label: 'Trebuchet', value: '"Trebuchet MS", sans-serif' },
  { label: 'Courier (mono)', value: '"Courier New", monospace' },
]

export function StepGraphics() {
  const {
    graphicMode,
    setGraphicMode,
    text,
    setText,
    textColor,
    setTextColor,
    fontFamily,
    setFontFamily,
    logoDataUrl,
    setLogoDataUrl,
  } = useWizardStore()

  return (
    <div className="step">
      <h2>Add your graphics</h2>
      <p className="step-hint">Use text for your business name, or upload your logo artwork.</p>

      <div className="mode-toggle">
        <button
          type="button"
          className={graphicMode === 'text' ? 'selected' : ''}
          onClick={() => setGraphicMode('text')}
        >
          Text
        </button>
        <button
          type="button"
          className={graphicMode === 'logo' ? 'selected' : ''}
          onClick={() => setGraphicMode('logo')}
        >
          Upload logo
        </button>
      </div>

      {graphicMode === 'text' && (
        <div className="subsection">
          <label className="field">
            Business name / text
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} maxLength={40} />
          </label>
          <div className="field-row">
            <label className="field">
              Text color
              <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
            </label>
            <label className="field">
              Font
              <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                {FONTS.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      )}

      {graphicMode === 'logo' && (
        <div className="subsection">
          <label className="field">
            Logo image
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (file) setLogoDataUrl(await fileToDataUrl(file))
              }}
            />
          </label>
          {logoDataUrl && (
            <div className="logo-preview">
              <img src={logoDataUrl} alt="Uploaded logo preview" />
              <button type="button" onClick={() => setLogoDataUrl(null)}>
                Remove
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
