import { CurrencyInput } from "@/components/common/CurrencyInput";
import { ImageUploaderInput } from "@/components/common/ImageUploaderInput";
import { NumericInput } from "@/components/common/NumericInput";
import { RequiredAsterisk } from "@/components/common/RequiredAsterisk";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/types/ProductT";
import { Controller, useForm } from "react-hook-form";

export default function ProductAddModal() {
    const { register, handleSubmit, reset, control } = useForm<Product>({
        defaultValues: {
            price: 0,
            stock: 0
        }
    })

    const onSubmit = (data: Product) => {
        console.log(data)
        reset({
            name: "",
            price: 0,
            stock: 0,
            description: "",
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Adicionar</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionando Produto</DialogTitle>
                </DialogHeader>

                <form onSubmit={(handleSubmit(onSubmit))} className="grid gap-4">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="image">Foto do Produto</Label>
                            <ImageUploaderInput
                                name="image"
                                control={control}
                            />

                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name-1">Nome <RequiredAsterisk /></Label>
                            <Input id="name" {...register("name", { required: true })} />
                        </div>
                        <div className="grid gap-3 grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="price">Preço <RequiredAsterisk /></Label>
                                <Controller
                                    name="price"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <CurrencyInput
                                            value={field.value || 0}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="stock">Estoque</Label>
                                <Controller
                                    name="stock"
                                    control={control}
                                    rules={{ required: false }}
                                    render={({ field }) => (
                                        <NumericInput
                                            value={field.value || 0}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea id="description" {...register("description", { required: false })} />
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
    )
}