import * as React from "react";

type Theme = "light" | "dark" | "system";

export const ThemeContext = React.createContext<{
    theme: Theme;
    setTheme: (theme: Theme) => void;
}>({ theme: "system", setTheme: () => { } });

type Props = React.PropsWithChildren<{
    defaultTheme?: Theme;
    storageKey?: string;
}>;

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
}: Props) {
    const [theme, setTheme] = React.useState<Theme>(() => {
        const stored = localStorage.getItem(storageKey) as Theme | null;
        return stored ?? defaultTheme;
    });

    React.useEffect(() => {
        localStorage.setItem(storageKey, theme);
        const root = window.document.documentElement;
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.remove("light", "dark");
        if (theme === "system") root.classList.add(systemDark ? "dark" : "light");
        else root.classList.add(theme);
    }, [theme, storageKey]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => React.useContext(ThemeContext);
