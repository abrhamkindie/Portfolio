import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Custom cursor modelled on the site: a dot that follows the pointer with
 * quick easing, a ring that trails it, and a pill label on [data-cursor] targets.
 * Only active on fine pointers (desktop); native cursor is hidden via CSS.
 *
 * The cursor auto-detects the background: inside any .dark-section (or an
 * element with [data-cursor*="invert"]) it renders white, otherwise dark.
 */
export function Cursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const pillRef = useRef(null);

    useEffect(() => {
        const fine = window.matchMedia(
            "(hover: hover) and (pointer: fine)",
        ).matches;
        if (!fine) return;

        document.documentElement.classList.add("has-custom-cursor");

        const dot = dotRef.current;
        const ring = ringRef.current;
        const pill = pillRef.current;

        const xDot = gsap.quickTo(dot, "x", {
            duration: 0.15,
            ease: "power3.out",
        });
        const yDot = gsap.quickTo(dot, "y", {
            duration: 0.15,
            ease: "power3.out",
        });
        const xRing = gsap.quickTo(ring, "x", {
            duration: 0.5,
            ease: "power3.out",
        });
        const yRing = gsap.quickTo(ring, "y", {
            duration: 0.5,
            ease: "power3.out",
        });

        const onMove = (e) => {
            xDot(e.clientX);
            yDot(e.clientY);
            xRing(e.clientX);
            yRing(e.clientY);
        };

        /**
         * Determine whether the element sits on a dark background.
         * Any ancestor with the .dark-section class (or data-cursor containing
         * "invert") flips the cursor to light colours.
         */
        const isDark = (el) => {
            if (!el) return false;
            const section = el.closest(
                '.dark-section, [data-cursor*="invert"]',
            );
            if (!section) return false;
            // Only treat as dark if the matching section is actually a dark bg
            // (data-cursor="invert" on a light element should still invert).
            return true;
        };

        /**
         * Resolve the cursor state from the element under the pointer.
         * - `variant`: dot (idle), hover (interactive), or a label string
         * - `text`: pill label (e.g. "View", "Verify")
         * - `invert`: true when over a dark background
         */
        const resolve = (el) => {
            const invert = isDark(el);
            let node = el;
            while (node) {
                const cursor = node.dataset?.cursor;
                if (cursor && cursor !== "dot-invert" && cursor !== "invert") {
                    return {
                        variant: cursor,
                        text: node.dataset.cursorText || "",
                        invert,
                    };
                }
                node = node.parentElement;
            }
            if (
                el?.closest?.('a,button,[role="button"],input,textarea,select')
            ) {
                return { variant: "hover", text: "", invert };
            }
            return { variant: "dot", text: "", invert };
        };

        const setVariant = (variant, text, invert) => {
            const hovering = variant !== "dot";
            const enlarge =
                variant === "hover" ||
                variant === "dot-hover" ||
                variant === "dot-hover-invert";

            // Colours: invert → white cursor on dark bg; otherwise dark cursor.
            const dotInk = invert ? "#ffffff" : "#0f0f0f";
            const ringInk = invert
                ? "rgba(255,255,255,0.4)"
                : "rgba(10,10,10,0.25)";
            const pillBg = invert ? "#ffffff" : "#0f0f0f";
            const pillText = invert ? "#0a0a0a" : "#ffffff";

            dot.style.backgroundColor = dotInk;
            ring.style.borderColor = ringInk;
            if (pill) {
                pill.style.backgroundColor = pillBg;
                pill.style.color = pillText;
            }

            gsap.to(ring, {
                scale: hovering ? 1.8 : 1,
                opacity: 1,
                duration: 0.35,
                ease: "power3.out",
            });
            gsap.to(dot, {
                scale: enlarge ? 0.6 : 1,
                duration: 0.25,
                ease: "power2.out",
            });

            if (pill) {
                pill.textContent = text || "";
                gsap.to(pill, {
                    autoAlpha: text ? 1 : 0,
                    scale: text ? 1 : 0.6,
                    duration: 0.3,
                    ease: "power3.out",
                });
            }
        };

        const apply = (el) => {
            const { variant, text, invert } = resolve(el);
            setVariant(variant, text, invert);
        };

        const onOver = (e) => apply(e.target);
        const onOut = (e) => {
            if (!e.relatedTarget) {
                // Mouse left the window — reset to default (assume light).
                setVariant("dot", "", false);
            }
        };

        // While scrolling (e.g. a pinned section), the element under the pointer
        // changes without a mouse event, so re-resolve it from the last position.
        let last = null;
        let frame = null;
        const onMoveTrack = (e) => {
            last = { x: e.clientX, y: e.clientY };
        };
        const onScroll = () => {
            if (!last || frame) return;
            frame = requestAnimationFrame(() => {
                frame = null;
                const el = document.elementFromPoint(last.x, last.y);
                if (el) apply(el);
            });
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mousemove", onMoveTrack, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        document.addEventListener("mouseover", onOver, true);
        document.addEventListener("mouseout", onOut, true);

        return () => {
            document.documentElement.classList.remove("has-custom-cursor");
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mousemove", onMoveTrack);
            window.removeEventListener("scroll", onScroll);
            if (frame) cancelAnimationFrame(frame);
            document.removeEventListener("mouseover", onOver, true);
            document.removeEventListener("mouseout", onOut, true);
        };
    }, []);

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[100] hidden [@media(hover:hover)_and_(pointer:fine)]:block"
        >
            <div
                ref={ringRef}
                className="absolute left-0 top-0 h-[52px] w-[52px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0a0a0a]/30"
            />
            <div
                ref={dotRef}
                className="absolute left-0 top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0f0f0f]"
            />
            <div
                ref={pillRef}
                className="absolute left-0 top-0 -translate-x-1/2 translate-y-6 rounded-full bg-[#0f0f0f] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.04em] text-white opacity-0"
                style={{ visibility: "hidden" }}
            />
        </div>
    );
}
