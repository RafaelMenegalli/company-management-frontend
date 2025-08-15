import { SearchInput } from "@/components/common/SearchInput";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { User } from "@/types/UserT";
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Eye, EyeOff, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import UserAddModal from "./add";

const users: User[] = [
    { name: "João Silva", email: "joao@example.com", password: "senha123" },
    { name: "Maria Souza", email: "maria@example.com", password: "abcDEF@1" },
    { name: "Carlos Lima", email: "carlos@example.com", password: "pass@456" },
]

export default function UsersPage() {
    const [visiblePasswords, setVisiblePasswords] = useState<Record<number, boolean>>({})

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "name",
            header: "Nome",
            // cell: ({ getValue }) => <span className="truncate">{getValue() as string}</span>,
            // size: 200,
        },
        {
            accessorKey: "email",
            header: "Email",
            // cell: ({ getValue }) => <span className="truncate">{getValue() as string}</span>,
            // size: 250,
        },
        {
            id: "password",
            header: "Senha",
            cell: ({ row }) => {
                const index = row.index
                const password = row.original.password
                const isVisible = visiblePasswords[index]

                return (
                    <div className="flex items-center gap-2">
                        {isVisible ? (
                            <span className="font-mono">{password}</span>
                        ) : (
                            <span className="text-muted-foreground italic">••••••••</span>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                                setVisiblePasswords((prev) => ({
                                    ...prev,
                                    [index]: !prev[index],
                                }))
                            }
                        >
                            {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                    </div>
                )
            },
            size: 150,
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
                            <DropdownMenuItem
                                onClick={() => alert(`Excluir ${row.original.name}`)}
                                className="flex items-center gap-2 text-destructive focus:text-destructive"
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                                Excluir
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ),
            size: 100,
        },
    ]

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Card>
            <div className="px-4 flex flex-col gap-4">
                <div className="flex justify-between gap-4">
                    <SearchInput placeholder="Pesquise por qualquer coisa..." />
                    <UserAddModal />
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