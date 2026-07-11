import { useWizardStore } from './store/wizardStore'
import { TOTAL_STEPS } from './types'
import { Stepper } from './components/Stepper'
import { LivePreview } from './components/LivePreview'
import { StepDimensions } from './components/steps/StepDimensions'
import { StepShape } from './components/steps/StepShape'
import { StepFrame } from './components/steps/StepFrame'
import { StepFace } from './components/steps/StepFace'
import { StepGraphics } from './components/steps/StepGraphics'
import { StepPlacement } from './components/steps/StepPlacement'
import { StepSummary } from './components/steps/StepSummary'

const STEPS = [StepDimensions, StepShape, StepFrame, StepFace, StepGraphics, StepPlacement, StepSummary]

function App() {
  const { step, goNext, goBack } = useWizardStore()
  const CurrentStep = STEPS[step]

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Under-Awning Lightbox Designer</h1>
        <p>Design your custom lightbox and preview it on your own storefront.</p>
      </header>

      <Stepper />

      <main className="wizard-body">
        <div className="wizard-panel">
          <CurrentStep />
          <div className="wizard-nav">
            <button type="button" onClick={goBack} disabled={step === 0} className="secondary-button">
              Back
            </button>
            {step < TOTAL_STEPS - 1 && (
              <button type="button" onClick={goNext} className="primary-button">
                Next
              </button>
            )}
          </div>
        </div>

        {step < TOTAL_STEPS - 1 && (
          <aside className="wizard-sidebar">
            <h2>Live preview</h2>
            <LivePreview />
          </aside>
        )}
      </main>
    </div>
  )
}

export default App
