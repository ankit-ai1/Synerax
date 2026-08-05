/* ─────────────────────────────────────────────────────────────
   Logo — mark plus wordmark, nothing else.

   The previous logo was a single PNG that baked in the mark, the
   name and the "CLOUD TECHNOLOGIES" strapline, so the strapline
   could not be dropped without cropping the image. Splitting it
   into an inline mark and real text also means the lockup takes
   `currentColor`, so it needs no per-theme filter.
   ───────────────────────────────────────────────────────────── */

/* The source asset is favicon-sized, so it renders soft at logo scale.
   Cloudinary is asked for a 160px fit — roughly 5× the on-screen size —
   which keeps the mark crisp on high-DPI screens. */
const MARK_SRC =
  'https://res.cloudinary.com/dtg3lepr4/image/upload/w_160,h_160,c_fit,q_auto,f_auto,dpr_2.0/v1783885429/favicon_synerax_vuwmga.png'

export default function Logo() {
  return (
    <>
      <img className="brand__mark" src={MARK_SRC} alt="" aria-hidden="true" loading="eager" decoding="async" />
      <span className="brand__word">Synerax</span>
    </>
  )
}
