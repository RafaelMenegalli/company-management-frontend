import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Trash2 } from "lucide-react"
import { useState } from "react"

interface DeleteDialogDropdownItemProps {
    itemName: string
    onConfirm: () => Promise<void> | void
}

export function ConfirmDeleteDialog({
    itemName,
    onConfirm,
}: DeleteDialogDropdownItemProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        setLoading(true)
        await onConfirm()
        setLoading(false)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem
                    className="flex items-center gap-2 text-destructive focus:text-destructive"
                    onSelect={(e) => {
                        e.preventDefault()
                        setOpen(true)
                    }}
                >
                    <Trash2 className="h-4 w-4 text-destructive" />
                    Excluir
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Excluir "{itemName}"?</DialogTitle>
                    <DialogDescription>
                        Essa ação não poderá ser desfeita.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? "Excluindo..." : "Excluir"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
