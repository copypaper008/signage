interface Swatch {
  label: string
  value: string
}

interface Props {
  swatches: Swatch[]
  value: string
  onChange: (value: string) => void
  allowCustom?: boolean
}

export function SwatchPicker({ swatches, value, onChange, allowCustom = true }: Props) {
  return (
    <div className="swatch-row">
      {swatches.map((s) => (
        <button
          key={s.value}
          type="button"
          className={`swatch${value.toLowerCase() === s.value.toLowerCase() ? ' selected' : ''}`}
          style={{ backgroundColor: s.value }}
          title={s.label}
          onClick={() => onChange(s.value)}
        >
          <span className="sr-only">{s.label}</span>
        </button>
      ))}
      {allowCustom && (
        <label className="swatch custom-swatch" title="Custom color">
          <input type="color" value={value} onChange={(e) => onChange(e.target.value)} />
        </label>
      )}
    </div>
  )
}
