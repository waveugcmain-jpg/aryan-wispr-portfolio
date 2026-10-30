# Home visual QA

Source visual truth: ../01-passengers-journal.png and ../02-red-dossier.png, with explicit user changes (folder navigation, no AI, larger notebook, movable photo placeholder, draped white cloth).

Implementation evidence: qa/updated-home.jpg (1440 CSS viewport), qa/updated-tablet.jpg (768), qa/updated-mobile.jpg (375). Tablet/mobile captures precede the final cloth image replacement; geometry unchanged. Earlier desktop folder labels were obscured; absolute label positioning fixed them. Photo card clipped at intermediate desktop width; left offset corrected.

Fonts: local Newsreader, Manrope, IBM Plex Mono loaded. Palette follows approved tokens. Layout: desktop spread, tablet spread, stacked phone leaves. No horizontal overflow at checked widths. Keyboard focus visible; photo movement with arrow keys verified. Navigation intentionally inactive. Build passes; no browser console errors during initial checks.

Image fidelity: final actual fabric scene replaces rejected flat CSS textured surface. Notebook and text remain HTML/CSS as requested. No portrait supplied, so placeholder retained. Tablet/mobile final fabric crop still needs a final screenshot check. Formal paired image comparison not yet recorded.

final result: passed

Final follow-up: source board (1536x1024) and desktop implementation (1440 CSS width, full-page capture) opened together for visual comparison. This is an adapted moodboard, not a pixel-identical clone: user requested larger HTML book, folders, no AI, restrained personal props. Typography, shadows, paper, folder labels, and cloth folds were readable in the full comparison; no additional crop needed. Final tablet and mobile evidence: qa/final-tablet.jpg and qa/final-mobile.jpg. Fixed repeated train imagery below the fold by extending only a cropped cloth detail. Rechecked both widths. No remaining P0/P1/P2 issues for the requested visual draft. P3: replace portrait placeholder with user's real photo; refine fabric lighting after portrait selection.

## Two-page letter update
Verified rendered layouts at 1440, 768, and 375px; no horizontal overflow. Desktop/tablet use two pages, phones stack. All three rendered images loaded successfully. Dossier navigation sits above the cover. Ask input is read-only; mic, submit and chips disabled. Production build checked. Desktop evidence: qa/letter-spread-desktop.jpg.

Opening animation: inspected midpoint and final frame. Fixed backface mirroring caused by opacity flattening the 3D cover. Browser reduced-motion preference correctly disables the entrance. Removed temporary paused-frame inspection styles.

Timing refinement: all entrance tracks share 1000ms delay and 2800ms duration with backwards fill, so the closed state holds during the delay. Removed the old internal 12% hold. Reduced-motion override retained.

Verified in preview: cover-open is active with 1s delay, initial identity transform and final 180-degree rotation; cover becomes hidden and letter opacity reaches 1. Removed the fade override per explicit user direction.

Refined spread: verified cover text, initial letter opacity 0, reveal delay 3.85s after 1s+2.8s hinge; settled notebook transform identity and centered. Mobile 375px has no horizontal overflow. Evidence qa/refined-spread.jpg.

Five-chapter pass: verified 5 chapter elements, zero removed illustrations, active Wispr tab after jump, creative 02 selection, and layouts at 1440/768/375. Tablet and phone reported no horizontal overflow. Media slots are placeholders; actual playback awaits assets. Screenshot: qa/wispr-chapter.jpg.

Final letter update: confirmed new letter rendered, reels + views navigates to chapter 4, scene top is 0 at desktop and phone widths, no overflow at 1440/768/375. Evidence qa/final-letter.jpg.

Letter rhythm: desktop spread measured 619px, no horizontal overflow at 1440 or 375px, phone text 18px. Evidence qa/lighter-letter.jpg.
