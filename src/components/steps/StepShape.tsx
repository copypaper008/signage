import { useWizardStore } from '../../store/wizardStore'
import type { CornerStyle } from '../../types'

const OPTIONS: Array<{ value: CornerStyle; label: string; description: string }> = [
  { value: 'square', label: 'Square corners', description: 'Sharp, modern edges' },
  { value: 'rounded', label: 'Rounded corners', description: 'Softened corners, most popular' },
  { value: 'pill', label: 'Full pill / capsule', description: 'Fully rounded ends' },
]

export function StepShape() {
  const { corner, setCorner } = useWizardStore()

  return (
    <div className="step">
      <h2>Choose a shape</h2>
      <p className="step-hint">The frame corners can be squared off or rounded for a softer look.</p>

      <div className="option-cards">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`option-card${corner === opt.value ? ' selected' : ''}`}
            onClick={() => setCorner(opt.value)}
          >
            <span className={`shape-swatch shape-${opt.value}`} />
            <strong>{opt.label}</strong>
            <span className="option-desc">{opt.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
