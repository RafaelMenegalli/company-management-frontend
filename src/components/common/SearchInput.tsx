import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface SearchInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    iconPosition?: "left" | "right"
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
    ({ className, iconPosition = "left", ...props }, ref) => {
        return (
            <div className="relative w-full">
                {iconPosition === "left" && (
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                )}

                <Input
                    ref={ref}
                    className={cn(
                        "pl-9",
                        iconPosition === "right" && "pr-9 pl-3",
                        className
                    )}
                    {...props}
                />

                {iconPosition === "right" && (
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                )}
            </div>
        )
    }
)

SearchInput.displayName = "SearchInput"
