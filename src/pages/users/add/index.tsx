import { PasswordInput } from "@/components/common/PasswordInput";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";

export default function UserAddModal() {
    return (
        <>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button>Adicionar</Button>
                    </DialogTrigger>

                    <DialogContent className="">

                        <DialogHeader>
                            <DialogTitle>Adicionando Usuário</DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name-1">Nome</Label>
                                <Input id="name" name="name" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" />
                            </div>
                            <div className="grid gap-3">
                                <Label>Senha</Label>
                                <PasswordInput id="password" name="password" placeholder="Digite sua senha" />
                            </div>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="destructive">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit">Adicionar</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}