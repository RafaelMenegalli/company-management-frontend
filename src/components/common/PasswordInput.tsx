import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  id: string
}

export function PasswordInput({ label = "Senha", id, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const toggleVisibility = () => setShowPassword((prev) => !prev)

  return (
    <div className="grid gap-2">
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          className="pr-10"
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={toggleVisibility}
          className="absolute right-1 top-1/2 -translate-y-1/2"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  )
}
