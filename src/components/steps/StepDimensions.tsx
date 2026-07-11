import { useWizardStore } from '../../store/wizardStore'

const PRESETS: Array<{ label: string; w: number; h: number }> = [
  { label: '600 × 300 mm', w: 600, h: 300 },
  { label: '900 × 450 mm', w: 900, h: 450 },
  { label: '1200 × 600 mm', w: 1200, h: 600 },
  { label: '1500 × 600 mm', w: 1500, h: 600 },
]

export function StepDimensions() {
  const { widthMm, heightMm, setDimensions } = useWizardStore()

  return (
    <div className="step">
      <h2>What size lightbox do you need?</h2>
      <p className="step-hint">
        Under-awning lightboxes are typically 300mm–750mm tall and sized to fit the depth of your
        awning. You can fine-tune the exact dimensions below.
      </p>

      <div className="preset-row">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            className={`preset${widthMm === p.w && heightMm === p.h ? ' selected' : ''}`}
            onClick={() => setDimensions(p.w, p.h)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="field-row">
        <label className="field">
          Width (mm)
          <input
            type="number"
            min={300}
            max={3000}
            step={10}
            value={widthMm}
            onChange={(e) => setDimensions(Number(e.target.value) || widthMm, heightMm)}
          />
        </label>
        <label className="field">
          Height (mm)
          <input
            type="number"
            min={200}
            max={1500}
            step={10}
            value={heightMm}
            onChange={(e) => setDimensions(widthMm, Number(e.target.value) || heightMm)}
          />
        </label>
      </div>
    </div>
  )
}
