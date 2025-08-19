export function RequiredAsterisk() {
    return (
        <span className="relative ml-[-3px] text-destructive cursor-help group" aria-hidden="true">
            *
            <span className="w-[125px] flex items-center justify-center absolute left-1/2 -translate-x-1/2 -top-7 px-2 py-1 text-xs text-white bg-black rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                Campo obrigatório
            </span>
        </span>
    )
}
