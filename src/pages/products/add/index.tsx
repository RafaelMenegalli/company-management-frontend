import { CurrencyInput } from "@/components/common/CurrencyInput";
import { NumericInput } from "@/components/common/NumericInput";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProductAddModal() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button>Adicionar</Button>
                </DialogTrigger>

                <DialogContent className="">

                    <DialogHeader>
                        <DialogTitle>Adicionando Produto</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Nome</Label>
                            <Input id="name" name="name" />
                        </div>
                        <div className="grid gap-3 grid-cols-2">
                            <div className="grid gap-3">
                                <Label htmlFor="price">Preço</Label>
                                <CurrencyInput value={0} onChange={() => { }} />
                            </div>

                            <div className="grid gap-3">
                                <Label>Estoque</Label>
                                <NumericInput value={0} onChange={() => { }} />
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label>Descrição</Label>
                            <Textarea id="description" name="description" />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Adicionar</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}