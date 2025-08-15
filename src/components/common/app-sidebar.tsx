"use client"

import * as React from "react"
import {
    BookOpen,
    Bot,
    FolderPen,
    Settings2,
    SquareTerminal,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"

// import { NavProjects } from "./nav-projects"

const data = {
    user: {
        name: "Rafael Menegalli",
        email: "rafaelmenegalli@gmail.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Cadastros",
            url: "#",
            icon: FolderPen,
            isActive: true,
            items: [
                {
                    title: "Usuários",
                    url: "/users",
                },
                // {
                //     title: "Explorer",
                //     url: "#",
                // },
                // {
                //     title: "Quantum",
                //     url: "#",
                // },
            ],
        },
        {
            title: "Configurações",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "Geral",
                    url: "#",
                },
                {
                    title: "Permissões de Usuário",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentação",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introdução",
                    url: "#",
                },
                {
                    title: "Cadastros",
                    url: "#",
                },
                {
                    title: "Relatórios",
                    url: "#",
                },
                {
                    title: "Dicas",
                    url: "#",
                },
            ],
        },
        {
            title: "Temporário",
            url: "#",
            icon: SquareTerminal,
            items: [
                {
                    title: "Login",
                    url: "/",
                },
                // {
                //     title: "Starred",
                //     url: "#",
                // },
                // {
                //     title: "Settings",
                //     url: "#",
                // },
            ],
        },
    ],

    // projects: [
    //     {
    //         name: "Design Engineering",
    //         url: "#",
    //         icon: Frame,
    //     },
    //     {
    //         name: "Sales & Marketing",
    //         url: "#",
    //         icon: PieChart,
    //     },
    //     {
    //         name: "Travel",
    //         url: "#",
    //         icon: Map,
    //     },
    // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarHeader className="flex items-center gap-2 px-4 py-3">
                    <Bot className="w-6 h-6 shrink-0" />
                    <span className="text-lg font-semibold truncate hidden sidebar-expanded:block">
                        Meu Sistema
                    </span>
                </SidebarHeader>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavProjects projects={data.projects} /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
