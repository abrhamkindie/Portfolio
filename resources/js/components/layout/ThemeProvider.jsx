// The design is a single black & white terminal theme, so there is no
// light/dark switch. This component is kept as a thin wrapper so existing
// imports keep working.
export function ThemeProvider({ children }) {
    return <>{children}</>;
}

export function useTheme() {
    return { theme: 'dark' };
}
