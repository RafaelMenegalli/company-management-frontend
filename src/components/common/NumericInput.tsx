import { Input } from "@/components/ui/input"
import { useState } from "react"

interface NumericInputProps {
  value: number
  onChange: (value: number) => void
  placeholder?: string
  disabled?: boolean
  allowDecimal?: boolean
}

export function NumericInput({
  value,
  onChange,
  placeholder,
  disabled = false,
  allowDecimal = false,
}: NumericInputProps) {
  const [displayValue, setDisplayValue] = useState(() => formatNumber(value))

  // Formata valor number para string
  function formatNumber(val: number) {
    return allowDecimal ? String(val).replace(".", ",") : String(Math.floor(val))
  }

  // Converte string para number, usando vírgula ou ponto
  function parseInput(input: string): number {
    const clean = input.replace(",", ".")
    const parsed = parseFloat(clean)
    return isNaN(parsed) ? 0 : parsed
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value

    const regex = allowDecimal ? /^[0-9]*[.,]?[0-9]*$/ : /^[0-9]*$/
    if (!regex.test(raw)) return

    // Remover zero à esquerda automaticamente
    const normalized = raw.replace(/^0+(?=\d)/, "")
    setDisplayValue(normalized === "" ? "0" : normalized)

    const numberValue = parseInput(normalized)
    onChange(numberValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ]

    if (
      allowedKeys.includes(e.key) ||
      (allowDecimal && (e.key === "," || e.key === "."))
    ) {
      return
    }

    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault()
    }
  }

  return (
    <Input
      value={displayValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      inputMode="decimal"
      placeholder={placeholder}
      disabled={disabled}
    />
  )
}
