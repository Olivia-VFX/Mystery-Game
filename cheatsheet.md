# HTML / CSS / JS Cheat Sheet — Mystery Game Reference
 
A grab-bag reference for building the theme park mystery game solo. Organized by topic, each with a short explanation of *why* it works the way it does, not just the syntax.
 
---
 
## 1. Sharing data/functions across multiple JS files
 
**Simplest option — plain scripts, loaded in order.** Anything declared in an earlier `<script>` tag is available to every script loaded after it, no import/export needed:
```html
<script src="javascript/data.js"></script>
<script src="javascript/notebook.js"></script>
<script src="javascript/game.js"></script>
```
Good enough for a project this size. The only rule: **order matters** — a file can only use things declared in files loaded *before* it.
 
**More advanced option — ES Modules.** Explicitly `export` from one file, `import` into another. Requires `type="module"` on your script tag. Stricter and avoids naming collisions, but more setup than you likely need yet.
 
---
 
## 2. Importing images
 
- **In HTML:** `<img src="images/barker.png" alt="Barker the mascot">`
- **In CSS:** `background-image: url('../images/barker.png');` — note the `../`: CSS paths are relative to the **CSS file's location**, not the HTML file's.
- **In JS:** `img.src = 'images/barker.png';` — here the path is relative to the **HTML file**, not the JS file. This inconsistency between CSS and JS paths is a common trip-up.
Suggested folder structure:
```
/your-project/
  index.html
  css/
    notebook.css
  javascript/
    data.js
    game.js
  images/
    barker.png
```
 
---
 
## 3. Core JS concepts recap
 
**Objects vs arrays:**
- Object `{ }` — labeled data, accessed by key: `suspects.owner.name`
- Array `[ ]` — ordered list, accessed by searching: `clues.find(c => c.id === "clue1")`
- `Object.values(obj)` / `Object.entries(obj)` — convert an object into an array so you can use array methods (`.filter()`, `.forEach()`) on it
**Useful array methods:**
- `.find(fn)` — returns the *first* matching item, or `undefined` if none match
- `.filter(fn)` — returns *all* matching items as a new array
- `.every(fn)` — `true` only if *all* items pass the test (used in your `checkFile()` logic)
- `.includes(value)` — `true` if the array contains that exact value
- `.forEach(fn)` — runs a function once per item, doesn't return anything (used for building lists)
- `.flat()` — flattens an array of arrays into one single array
**Arrow functions as a parameter:**
```js
clues.filter(clue => clue.belongsTo === "owner")
```
Read as: "for each item (call it `clue`), check if this condition is true." The parameter name is your choice — singular naming (`clue` not `clues`) makes code easier to read since it represents one item at a time.
 
**Closures (why click listeners "remember" their data):**
When you create a click listener inside a loop, each one captures the value of the loop variable *as it was* at that point in the loop — so each `<li>` correctly remembers its own clue/suspect, even though the loop variable changes on every pass.
 
---
 
## 4. DOM basics
 
- `document.getElementById('id')` — grabs one element by its `id`. Returns `null` if no match — a very common source of silent bugs.
- `document.createElement('li')` — creates an element in memory only; not visible until you...
- `element.appendChild(child)` — actually inserts it into the page
- `element.textContent = "..."` — sets the visible text inside an element
- `element.innerHTML = ''` — clears everything inside an element (used at the top of every `render` function, so old content doesn't pile up)
- `element.classList.add('selected')` / `.remove('selected')` — toggles a CSS class on/off; purely visual, has zero effect without a matching CSS rule
- `element.addEventListener('click', fn)` — runs `fn` whenever that element is clicked
---
 
## 5. CSS concepts used in this project
 
- **CSS variables** (`:root { --bg: #161225; }`, used via `var(--bg)`) — define a color once, reuse everywhere; change the palette by editing one place
- **`display: flex`** — lays child elements out side by side (with `flex-wrap: wrap` as a safety net for narrow screens)
- **`clip-path: polygon(...)`** — cuts a custom shape out of a box; used for the torn-paper panel edges
- **`filter: drop-shadow()` vs `box-shadow`** — `box-shadow` only follows the rectangular box; `drop-shadow` follows the actual visible (e.g. clipped) shape, which is why it's used on the torn-edge panels instead of `box-shadow`
---
 
## 6. Game-specific concepts worth understanding
 
**Separate your data from your logic from your display.** This project already follows this pattern — keep it up as it grows:
- *Data* — `suspects`, `clues`, `suspectFiles` (what things ARE)
- *Logic* — `checkFile()`, `placeClue()` (what HAPPENS)
- *Display* — `renderClues()`, `renderSuspects()` (what the player SEES)
Why this matters: when a bug shows up, you can usually tell right away which of the three categories it's in (wrong data? broken logic? display not updating?), which massively narrows down where to look.
 
**The "render from data" pattern.** Every `render...()` function in this project does the same thing: clear the container, then rebuild it entirely from whatever the current data says. This means you never have to manually add/remove individual elements when something changes — you just update the data (e.g. `suspectFiles`) and call the render function again. This is the same core idea behind how frameworks like React work, just done by hand.
 
**Game state.** Right now your "state" (the stuff that changes as the player plays) includes things like `selectedClue`, `suspectFiles`, and eventually `foundClues`. As the game grows (adding locations, an inventory, story progress), it's worth keeping all of this in one clearly-named place (e.g. a single `gameState` object) rather than scattering loose variables everywhere — makes it much easier to reason about "what does the game currently know?"
 
**Saving progress (for later).** Since this is a real website (not a Claude artifact), you *can* use `localStorage` to save a player's progress between visits — something like:
```js
localStorage.setItem('gameState', JSON.stringify(gameState));
// later, to load it back:
const saved = JSON.parse(localStorage.getItem('gameState'));
```
Not needed for v1, but worth knowing it's available when you want a "continue where I left off" feature.
 
**Accessibility — `aria-live`.** Already used for `#suspectFilesDisplay` — it tells screen readers to announce content changes automatically. Worth adding to `#resultMessage` too, so screen reader users hear "file complete" the same way sighted players see it appear.
 
**Debugging habits (from bugs you've actually hit):**
- Something does nothing on click, no visible error? → Check the browser Console (F12) first. A function name mismatch (calling `selectClue` instead of `selectSuspect`) won't throw an error but will silently misbehave.
- Styles or scripts not appearing at all? → Check the Network tab for 404s. This instantly catches file path/filename typos or mismatches (happened with both your CSS and JS files already).
- A `.filter()` or `.forEach()` error mentioning "is not a function"? → You're probably calling an array method on something that's actually an object — check if you need `Object.values()` first.
---
 
## 7. Things to figure out next as the game grows
 
- How will "exploring a location" actually work — separate pages/sections per location, or one page with a location switcher?
- How will "found" clues differ from "placed" clues, structurally? (Likely: a `found: true/false` flag on each clue, separate from `suspectFiles`.)
- At what point do you want to introduce `localStorage` for saving progress?
- Will Barker's dialogue be randomly picked from a list, or triggered by specific events? (A simple array of lines + `Math.floor(Math.random() * array.length)` is the easiest starting approach for random dry-humor lines.)
