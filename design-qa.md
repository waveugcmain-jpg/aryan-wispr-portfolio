# Home visual QA

Source visual truth: ../01-passengers-journal.png and ../02-red-dossier.png, with explicit user changes (folder navigation, no AI, larger notebook, movable photo placeholder, draped white cloth).

Implementation evidence: qa/updated-home.jpg (1440 CSS viewport), qa/updated-tablet.jpg (768), qa/updated-mobile.jpg (375). Tablet/mobile captures precede the final cloth image replacement; geometry unchanged. Earlier desktop folder labels were obscured; absolute label positioning fixed them. Photo card clipped at intermediate desktop width; left offset corrected.

Fonts: local Newsreader, Manrope, IBM Plex Mono loaded. Palette follows approved tokens. Layout: desktop spread, tablet spread, stacked phone leaves. No horizontal overflow at checked widths. Keyboard focus visible; photo movement with arrow keys verified. Navigation intentionally inactive. Build passes; no browser console errors during initial checks.

Image fidelity: final actual fabric scene replaces rejected flat CSS textured surface. Notebook and text remain HTML/CSS as requested. No portrait supplied, so placeholder retained. Tablet/mobile final fabric crop still needs a final screenshot check. Formal paired image comparison not yet recorded.

final result: blocked

Remaining QA: final cloth responsive captures and formal reference comparison. Source saved as a reviewable visual draft.
