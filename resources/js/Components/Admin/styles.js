// Shared button/control styles for the admin console (Aerium quiet-luxury theme).
// Kept as class strings so pages can compose them with the icon buttons.

export const btn =
    'inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:bg-white/[0.09] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/15 disabled:pointer-events-none disabled:opacity-50';

export const btnPrimary =
    'inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background shadow-[0_10px_30px_-12px_rgba(255,255,255,0.5)] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 disabled:pointer-events-none disabled:opacity-50';

export const btnGhost =
    'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-foreground';

export const iconBtn =
    'inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground backdrop-blur-md transition-colors hover:bg-white/[0.08] hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-white/15';
