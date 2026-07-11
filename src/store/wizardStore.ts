import { create } from 'zustand'
import type { GraphicMode, Placement, WizardState, CornerStyle } from '../types'
import { TOTAL_STEPS } from '../types'

interface WizardActions {
  goNext: () => void
  goBack: () => void
  goToStep: (step: number) => void

  setDimensions: (widthIn: number, heightIn: number) => void
  setCorner: (corner: CornerStyle) => void
  setFrameColor: (color: string) => void
  setFaceColor: (color: string) => void
  setIlluminationOn: (on: boolean) => void
  setLedColor: (color: string) => void
  setGraphicMode: (mode: GraphicMode) => void
  setText: (text: string) => void
  setTextColor: (color: string) => void
  setFontFamily: (font: string) => void
  setLogoDataUrl: (dataUrl: string | null) => void
  setEnvPhotoDataUrl: (dataUrl: string | null) => void
  setPlacement: (placement: Partial<Placement>) => void
  resetPlacementForNewPhoto: () => void
}

const initialPlacement: Placement = { x: 0.5, y: 0.5, scale: 1, rotation: 0 }

const initialState: WizardState = {
  step: 0,
  widthIn: 36,
  heightIn: 18,
  corner: 'rounded',
  frameColor: '#2b2b2b',
  faceColor: '#f5f5f0',
  illuminationOn: true,
  ledColor: '#fff6d8',
  graphicMode: 'text',
  text: 'Your Business Name',
  textColor: '#1a1a1a',
  fontFamily: 'Helvetica, Arial, sans-serif',
  logoDataUrl: null,
  envPhotoDataUrl: null,
  placement: initialPlacement,
}

export const useWizardStore = create<WizardState & WizardActions>((set) => ({
  ...initialState,

  goNext: () => set((s) => ({ step: Math.min(s.step + 1, TOTAL_STEPS - 1) })),
  goBack: () => set((s) => ({ step: Math.max(s.step - 1, 0) })),
  goToStep: (step) => set({ step: Math.max(0, Math.min(step, TOTAL_STEPS - 1)) }),

  setDimensions: (widthIn, heightIn) => set({ widthIn, heightIn }),
  setCorner: (corner) => set({ corner }),
  setFrameColor: (frameColor) => set({ frameColor }),
  setFaceColor: (faceColor) => set({ faceColor }),
  setIlluminationOn: (illuminationOn) => set({ illuminationOn }),
  setLedColor: (ledColor) => set({ ledColor }),
  setGraphicMode: (graphicMode) => set({ graphicMode }),
  setText: (text) => set({ text }),
  setTextColor: (textColor) => set({ textColor }),
  setFontFamily: (fontFamily) => set({ fontFamily }),
  setLogoDataUrl: (logoDataUrl) => set({ logoDataUrl }),
  setEnvPhotoDataUrl: (envPhotoDataUrl) => set({ envPhotoDataUrl }),
  setPlacement: (placement) =>
    set((s) => ({ placement: { ...s.placement, ...placement } })),
  resetPlacementForNewPhoto: () => set({ placement: initialPlacement }),
}))
