import { useState, useMemo } from 'react'

function bmiCategory(bmi) {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal weight'
  if (bmi < 30) return 'Overweight'
  return 'Obesity'
}

function BmiCalculator() {
  const [heightCm, setHeightCm] = useState('')
  const [weightKg, setWeightKg] = useState('')

  const bmi = useMemo(() => {
    const h = parseFloat(heightCm) / 100
    const w = parseFloat(weightKg)
    if (!h || !w || h <= 0 || w <= 0) return null
    return w / (h * h)
  }, [heightCm, weightKg])

  return (
    <div className="border border-line rounded-2xl p-6 bg-white max-w-md">
      <h2 className="font-display text-xl font-medium mb-1">BMI Calculator</h2>
      <p className="text-sm text-ink/60 mb-5">Body mass index with WHO category ranges.</p>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium block mb-1">Height (cm)</label>
          <input
            type="number"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            className="w-full border border-line rounded-lg px-3 py-2"
            placeholder="170"
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Weight (kg)</label>
          <input
            type="number"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            className="w-full border border-line rounded-lg px-3 py-2"
            placeholder="65"
          />
        </div>
      </div>

      {bmi !== null && (
        <div className="mt-5 pt-5 border-t border-line">
          <p className="text-3xl font-display font-semibold">{bmi.toFixed(1)}</p>
          <p className="text-teal text-sm font-medium">{bmiCategory(bmi)}</p>
        </div>
      )}

      <p className="text-xs text-ink/40 mt-5">
        Educational use only - not a substitute for professional medical advice.
      </p>
    </div>
  )
}

export default function Tools() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <h1 className="font-display text-3xl font-semibold mb-3">Healthcare &amp; Digital Health Tools</h1>
      <p className="text-ink/65 max-w-2xl mb-10">
        Practical tools for healthcare professionals, students, researchers and digital
        health practitioners. More tools (eGFR, corrected sodium, digital health maturity
        assessments) plug into this same page as they're added.
      </p>
      <BmiCalculator />
    </div>
  )
}
