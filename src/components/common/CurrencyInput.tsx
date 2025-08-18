import { Input } from "@/components/ui/input"
import { useState } from "react"

interface CurrencyInputProps {
  value: number
  onChange: (value: number) => void
  placeholder?: string
  disabled?: boolean
}

export function CurrencyInput({
  value,
  onChange,
  placeholder = "0,00",
  disabled = false,
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState(formatCurrency(value))

  // Formata o número para "1.234,56"
  function formatCurrency(amount: number): string {
    return amount.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).replace(/^R\$\s?/, "") // remove o "R$" porque já exibimos manualmente
  }

  // Extrai apenas dígitos e converte para number
  function parseToNumber(input: string): number {
    const onlyDigits = input.replace(/\D/g, "")
    return Number(onlyDigits) / 100
  }

  // Manipula a digitação
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value
    const numeric = parseToNumber(raw)

    onChange(numeric)
    setDisplayValue(formatCurrency(numeric))
  }

  // Bloqueia letras/símbolos
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ]
    if (
      !/^[0-9]$/.test(e.key) &&
      !allowedKeys.includes(e.key)
    ) {
      e.preventDefault()
    }
  }

  return (
    <div className="relative w-full">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
        R$
      </span>
      <Input
        value={displayValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="pl-8"
        inputMode="numeric"
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  )
}
