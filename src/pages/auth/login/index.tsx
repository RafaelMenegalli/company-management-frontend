import { LoginForm } from "@/components/common/login-form"

export default function LoginPage() {
    return (
        <div className="flex h-screen w-full items-center justify-center p-6 md:p-10 overflow-hidden">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    )
}
