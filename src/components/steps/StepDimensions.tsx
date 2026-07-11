import { useWizardStore } from '../../store/wizardStore'

const PRESETS: Array<{ label: string; w: number; h: number }> = [
  { label: '24" × 12"', w: 24, h: 12 },
  { label: '36" × 18"', w: 36, h: 18 },
  { label: '48" × 24"', w: 48, h: 24 },
  { label: '60" × 24"', w: 60, h: 24 },
]

export function StepDimensions() {
  const { widthIn, heightIn, setDimensions } = useWizardStore()

  return (
    <div className="step">
      <h2>What size lightbox do you need?</h2>
      <p className="step-hint">
        Under-awning lightboxes are typically 12"–30" tall and sized to fit the depth of your
        awning. You can fine-tune the exact dimensions below.
      </p>

      <div className="preset-row">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            className={`preset${widthIn === p.w && heightIn === p.h ? ' selected' : ''}`}
            onClick={() => setDimensions(p.w, p.h)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="field-row">
        <label className="field">
          Width (inches)
          <input
            type="number"
            min={12}
            max={120}
            value={widthIn}
            onChange={(e) => setDimensions(Number(e.target.value) || widthIn, heightIn)}
          />
        </label>
        <label className="field">
          Height (inches)
          <input
            type="number"
            min={8}
            max={60}
            value={heightIn}
            onChange={(e) => setDimensions(widthIn, Number(e.target.value) || heightIn)}
          />
        </label>
      </div>
    </div>
  )
}
