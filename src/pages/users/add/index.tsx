import { PasswordInput } from "@/components/common/PasswordInput";
import { RequiredAsterisk } from "@/components/common/RequiredAsterisk";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from "@/types/UserT";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";

export default function UserAddModal() {
    const { register, handleSubmit, reset } = useForm<User>()

    const onSubmit = (data: User) => {
        console.log(data)
        reset()
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Adicionar</Button>
                </DialogTrigger>

                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Adicionando Usuário</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nome <RequiredAsterisk /></Label>
                                <Input id="name" {...register("name", { required: true })} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email <RequiredAsterisk /></Label>
                                <Input id="email" type="email" {...register("email", { required: true })} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Senha <RequiredAsterisk /></Label>
                                <PasswordInput id="password" {...register("password", { required: true })} />
                            </div>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit">Adicionar</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}