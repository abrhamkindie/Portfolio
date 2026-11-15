// Shared design tokens for the admin console (Aerium quiet-luxury theme).
// Keep class strings here so pages compose the same controls instead of
// re-declaring colors, radii and focus states locally.

export const btn =
    'inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:bg-white/[0.09] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/15 disabled:pointer-events-none disabled:opacity-50';

export const btnPrimary =
    'inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background shadow-[0_10px_30px_-12px_rgba(255,255,255,0.5)] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 disabled:pointer-events-none disabled:opacity-50';

export const btnGhost =
    'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-white/15';

export const iconBtn =
    'inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground backdrop-blur-md transition-colors hover:bg-white/[0.08] hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-white/15 disabled:pointer-events-none disabled:opacity-40';

export const iconBtnDanger = `${iconBtn} hover:border-[#ef4444]/40 hover:bg-[#ef4444]/10 hover:text-[#ef4444] focus-visible:ring-[#ef4444]/30`;

/** Square-ish icon plate used in table/list rows and section headers. */
export const tile =
    'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-white/[0.03] text-muted-foreground';

/** Uppercase meta label (table heads, small section captions). */
export const meta =
    'text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground';

/** Field label, matches Components/Admin/Field. */
export const fieldLabel =
    'text-xs font-medium uppercase tracking-[0.04em] text-muted-foreground';

export const successText = 'text-[#22c55e]';
export const dangerText = 'text-[#ef4444]';

/** Shared file-input styling (avatar + project thumbnail uploads). */
export const fileInput =
    'block w-full cursor-pointer text-xs text-muted-foreground file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-white/10 file:px-3.5 file:py-2 file:text-xs file:font-medium file:text-foreground hover:file:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/15';

/** Tab / segmented-control button. */
export const segmentBtn =
    'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/15';
