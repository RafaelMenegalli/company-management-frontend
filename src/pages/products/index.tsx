import { ConfirmDeleteDialog } from "@/components/common/ConfirmDeleteDialog";
import { SearchInput } from "@/components/common/SearchInput";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Product } from "@/types/ProductT";
import { formatBRL } from "@/utils/formatBRL";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Pencil } from "lucide-react";
import ProductAddModal from "./add";

const products: Product[] = [
    { name: "Produto 1", price: 10.99, description: "Descrição do produto 1", stock: 10 },
    { name: "Produto 2", price: 19.99, description: "Descrição do produto 2", stock: 5 },
    { name: "Produto 3", price: 29.99, description: "Descrição do produto 3", stock: 20 },
]

export default function ProductsPage() {
    const handleDelete = () => {
        alert("Excluindo produto")
    }

    const columns: ColumnDef<Product>[] = [
        {
            accessorKey: "name",
            header: "Nome",
        },
        {
            accessorKey: "price",
            header: "Preço",
            cell: ({ row }) => formatBRL(row.getValue("price")),
        },
        {
            accessorKey: "description",
            header: "Descrição",
        },
        {
            accessorKey: "stock",
            header: "Estoque",
        },
        {
            id: "actions",
            header: "",
            enableSorting: false,
            enableHiding: false,
            cell: ({ row }) => (
                <div className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => alert(`Editar ${row.original.name}`)}
                                className="flex items-center gap-2"
                            >
                                <Pencil className="h-4 w-4" />
                                Editar
                            </DropdownMenuItem>
                            <ConfirmDeleteDialog
                                itemName={row.original.name}
                                onConfirm={handleDelete}
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
            size: 100,
        },
    ]

    const table = useReactTable({
        data: products,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Card>
            <div className="px-4 flex flex-col gap-4">
                <div className="flex justify-between gap-4">
                    <SearchInput placeholder="Pesquise por qualquer coisa..." />
                    <ProductAddModal />
                </div>

                <div>
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="text-center">
                                        Nenhum usuário encontrado.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Card>
    )
}