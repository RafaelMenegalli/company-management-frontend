import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import type { FormEvent } from "react"
import { PasswordInput } from "./PasswordInput"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate()

    const handleSubmitLogin = (event: FormEvent) => {
        event.preventDefault()
        navigate("/dashboard")
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Entre com sua conta</CardTitle>
                    <CardDescription>
                        Insira seu email abaixo para fazer login
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmitLogin}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@gmail.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Senha</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Esqueceu sua senha?
                                    </a>
                                </div>
                                <PasswordInput id="password" required />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Entrar
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Entrar com Google
                                </Button>
                            </div>
                        </div>
                        {/* <div className="mt-4 text-center text-sm">
                            Nao tem uma conta?{" "}
                            <a href="#" className="underline underline-offset-4">
                                Cadastre-se
                            </a>
                        </div> */}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
