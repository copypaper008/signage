import { useWizardStore } from '../store/wizardStore'

export const STEP_LABELS = [
  'Size',
  'Shape',
  'Frame',
  'Face & light',
  'Graphics',
  'Placement',
  'Review',
]

export function Stepper() {
  const { step, goToStep } = useWizardStore()

  return (
    <ol className="stepper">
      {STEP_LABELS.map((label, i) => (
        <li key={label} className={i === step ? 'active' : i < step ? 'done' : ''}>
          <button type="button" onClick={() => goToStep(i)}>
            <span className="step-index">{i + 1}</span>
            <span className="step-label">{label}</span>
          </button>
        </li>
      ))}
    </ol>
  )
}
