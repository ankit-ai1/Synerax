/* ─────────────────────────────────────────────────────────────
   Logo — the SYNERAX wordmark.

   The source artwork is white letters on a solid navy canvas, which
   would sit on the white navbar as an obvious pasted box. It has
   been cut out to transparent PNGs in two inks (public/brand/):
     -ink    navy letters  → white surfaces (light-theme navbar, mobile sheet)
     -light  white letters → navy surfaces (footer, dark theme)
   Both render; brand.css shows the one that suits the surface.
   ───────────────────────────────────────────────────────────── */

export const WORDMARK_INK = '/brand/synerax-wordmark-ink.png'
export const WORDMARK_LIGHT = '/brand/synerax-wordmark-light.png'

/* The team's favicon artwork — also the mark on the first-visit loader */
export const FAVICON_LIGHT =
  'https://res.cloudinary.com/dtg3lepr4/image/upload/v1793255810/file_000000003248820a89cfbef7459b0960_wz01du.png'
export const FAVICON_DARK =
  'https://res.cloudinary.com/dtg3lepr4/image/upload/v1793255865/file_0000000028e8820aaf22089b4207df3b-removebg-preview_m6j9dh.png'

/* Older cloud mark, kept for any remaining references. */
export const MARK_SRC =
  'https://res.cloudinary.com/dtg3lepr4/image/upload/w_160,h_160,c_fit,q_auto,f_auto,dpr_2.0/v1783885429/favicon_synerax_vuwmga.png'

/* `lockup` is kept for the existing call sites; the wordmark is the same everywhere. */
export default function Logo(_: { lockup?: boolean }) {
  return (
    <span className="brand__wm">
      <img className="brand__wm-img brand__wm-img--ink" src={WORDMARK_INK} alt="Synerax" width={1234} height={160} decoding="async" />
      <img className="brand__wm-img brand__wm-img--light" src={WORDMARK_LIGHT} alt="" aria-hidden="true" width={1234} height={160} decoding="async" />
    </span>
  )
}
