# Histology slides

Micrographs used by the slide-labelling exercises.

## Two ways to add a slide

**1. Admin → Slide Labeller (easiest).** Upload the image in the browser, click
to place markers, type each label, save. The image is resized and stored in the
browser, so nothing needs to be committed. Good for authoring and trying things
out. Use *Export all* to save your work as JSON.

**2. Commit the file here (for shipping to students).** Drop the image in this
folder and reference it as `histology/<name>.jpg` in the exercise's `image`
field. This is what you want for slides every student should receive, since
browser-stored images live only on the machine that authored them.

## What makes a good labelling slide

- **At least 800px on the short edge.** Students need to see the structure.
- **Even illumination, medium power.** The named structures should all be
  clearly visible in one field.
- **Either annotate or don't — not half.** If your slide already has arrows and
  numbers drawn on it, tick *"My slide already has arrows and numbers"* in the
  labeller and place invisible hotspots over them. Otherwise supply a clean
  slide and let the app draw numbered pins.
- **No burnt-in answers.** A slide with the structure names already printed on
  it gives the exercise away.

## Licensing

Only add images you have the right to redistribute — your own department's
slides, or images under a licence that permits reuse.

Because the app displays slides **unmodified** (markers are an overlay, not a
change to the image file), licences that forbid derivative works are usable
here, unlike the old jigsaw which sliced the image up. You still need a licence
that permits redistribution at all, and non-commercial clauses still bind.

Textbook figures, including Neville's, are copyrighted and must not be
committed here.

Record every image in `ATTRIBUTION.md`, and put the same credit in the
exercise's `credit` field so it renders beneath the slide.
