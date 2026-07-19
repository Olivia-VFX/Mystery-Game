# Haunted Theme Park Mystery — Master Reference Sheet
 
A standalone card/case-file deduction game, built as a stepping stone toward the bigger [CSS teaching game]. This is v1 (case #1) of a larger planned "Mystery Machine roadtrip" structure, where future stops could add new cases later.
 
---
 
## Concept Summary
 
- Small standalone card/board-style **mystery deduction** game, inspired by Scooby Doo, Gravity Falls, and similar mystery/adventure shows.
- **Frame:** A Mystery Machine-style roadtrip is the overarching structure — the detective crew travels between mysteries/stops. This haunted theme park case is stop #1. Future stops (e.g. a summer camp case) can be added later without redesigning the mechanic.
- **v1 scope:** Just one case (the theme park), built deep, rather than spreading effort across multiple settings.
---
 
## Core Mechanic
 
**Loop:** Explore → collect clue cards → sort into suspect case-files → resolve guilt/innocence.
 
1. **Explore** the park (Duck Detective-style) — click around locations/objects/characters to surface clue cards.
2. **Collect** clues into a notebook/journal as they're found.
3. **Sort** clues into the correct suspect's case-file slot.
4. **Resolve** each file — correct clues placed (and no wrong ones) "completes" a file and reveals guilty/cleared status.
5. Some clues are **red herrings** — they don't belong in any suspect's file.
6. **Low-pressure**: unlimited tries, no mistake penalty/limit.
7. Repeat until all suspects are resolved. The reporter is revealed as guilty of press exaggeration; all other human suspects are cleared. The real "haunting" source (the mascot) is revealed in a separate final story beat, not through the case-file mechanic.
### Prototype data structure (JS)
```js
const suspects = {
  suspect1: { name: "...", correctClues: ["clue1", "clue2"] },
  // ...
};
const clues = [
  { id: "clue1", text: "...", belongsTo: "suspect1" },
  { id: "clueX", text: "red herring", belongsTo: null },
];
const suspectFiles = {
  suspect1: [],
  // one array per suspect, populated as clues are placed
};
```
**Match-check logic:** `selectedSuspect.correctClues.includes(selectedClue.id)`
 
**Key functions built so far:** `renderClues()`, `renderSuspects()`, `renderSuspectFiles()`, `selectClue()`, `placeClue()`, `checkFile()`, `removeClue()`.
 
---
 
## Story
 
**Setup:** The park is renovating for its big anniversary/reopening. Guests and staff report "hauntings" — flickering lights, moved props, a ride that stalls at exactly the wrong moment. Local press has run with it, and the town half-believes the park is cursed. The detective crew rolls in during their roadtrip, drawn by the story.
 
**The truth:** The "hauntings" are botched attempts by the park's ghost mascot to slow/stop changes to what the park originally was. Not malicious — just clumsy. The mascot is **morally grey**, not a villain.
 
**Incident timeline:**
1. Renovation begins; contractor starts removing part of the original layout.
2. First incident — tools go missing overnight, delaying renovation. (Mascot, trying to slow things down.)
3. Second incident — a new sign glitches/falls during a press preview. (Mascot again, more visibly botched.)
4. The reporter runs a big "Is [Park] Cursed?" story, exaggerating what actually happened — this is their actual guilt, separate from the real hauntings.
5. Third incident, the big one — something happens the night before reopening that seriously threatens the event. This is the case the player is actually brought in to solve.
6. The reveal — evidence points away from every human suspect, until the mascot's glowing name tag gives it away.
**Ending (bittersweet):** The player exposes the mascot to the owner, who — instead of reacting with anger — chooses to preserve the mascot's suit/history as part of the renovation. The mascot becomes an **ongoing ally for future roadtrip stops**, feeling indebted to the player.
 
---
 
## Cast
 
| Suspect | Name | Motive | Home Base | Notes |
|---|---|---|---|---|
| **The Owner** | **Owen Patch** | Sympathetic; trying to save the park financially via renovation | The Office | Exhausted but stubbornly optimistic; overly sentimental about the park's history. Red herring — assumed suspicious for "changing things," but innocent |
| **The Contractor** | **Marcus Boyle** | Pushing renovations harder/faster; bonus tied to finishing early | The Renovation Site | Brisk, no-nonsense, doesn't get the sentimentality |
| **The Skeptical Employee** | **Nadia Voss** | Trying to debunk the hauntings (bad for business) | Roams (Boardwalk / Founder's Ride) | Sarcastic, over-caffeinated, secretly a little spooked |
| **The Ghost Tour Operator** | **Mortimer Vance** | Profits off haunting rumors; ticket sales tied to "how haunted" the park seems | The Ghost Walk | Theatrical, proud of his fake props, fun rather than sinister |
| **The Reporter** | **June Ashford** | **Actually guilty** — exaggerating minor mishaps into "proof of a curse" for career/attention | Roams (Boardwalk / wherever's "newsworthy") | Charming, a little too eager, always taking notes/photos |
| **The Mascot (Ringmaster)** | **Barker** | The real, unaccusable source of the hauntings | Backstage | Ghost, vintage worn mascot-suit aesthetic; dry humor/deadpan tone; morally grey; glowing name tag is the visual "tell" |
 
### Barker's dialogue (dry-humor tone) — starting lines
- **On a correct placement:** *"Huh. Look at that. Even a broken clock's right twice a day — and so, apparently, are you."*
- **On an incorrect placement:** *"Bold theory. Wrong, but bold."*
- **A deflecting hint:** *"I'd tell you to follow the money, but between us? Follow the paint fumes."*
- **The reveal moment, once cornered:** *"...Okay. So maybe I've been a little dramatic. In my defense, I've had eighty years to get bored."*
### Ending scene (rough draft)
Owen Patch finds Barker's badge glowing in the wreckage of the final incident. Instead of anger, a long pause — then: *"You could've just asked me to slow down."* Barker, deadpan: *"Would you have listened?"* Owen decides to restore the Founder's Ride properly, badge and all, rather than replace it — and Barker sticks around, muttering that someone has to make sure the detective doesn't mess it up worse.
 
---
 
## Locations (6 total)
 
1. **The Boardwalk** — main midway; busiest, most "alive" location
2. **The Founder's Ride** — the historic original attraction
3. **Backstage** — mascot's dressing room
4. **The Renovation Site** — contractor's territory
5. **The Office** — owner's paperwork space
6. **The Ghost Walk** — haunted attraction/tour operator's staged spookiness
---
 
## Visual Direction
 
**Overall look:** Aged-parchment / vintage notebook aesthetic — warm paper background, dark ink text, vintage circus/poster-style headers (bold, worn lettering) — combined with torn-paper-edge, stamp-style panel borders. The neon glow color is used **rarely and deliberately**, reserved for "wrongness" moments (mascot badge glow, mystery-specific clues) so it stands out against all the warmth.
 
### Core palette (hex)
- `--paper`: `#e8dcc3` (background)
- `--paper-dark`: `#d8c7a3` (panel backgrounds)
- `--ink`: `#3a2a1e` (main text)
- `--ink-faded`: `#6b5744` (secondary text)
- `--stamp-red`: `#8c3b2e` (small accents, result messages)
- `--signal`: `#4dfff0` (electric cyan — reserved ONLY for mystery/mascot glow moments)
### Fonts
- **Rye** (Google Font) — bold vintage circus/western poster lettering, headers only
- **Special Elite** (Google Font) — typewriter-style, body/notebook text
### CSS techniques used
- CSS variables (`:root`) for the whole palette
- `clip-path: polygon(...)` for torn-paper panel edges (not an image)
- `filter: drop-shadow()` (not `box-shadow`) so shadows follow the torn silhouette
- `.selected` class gets a glowing `box-shadow` in the signal color — the one "wow" moment
### Location-specific palettes (mood references: Scooby Doo's "Foul Play in Funland" backgrounds + Gravity Falls forest/mystery tones)
- **The Boardwalk** (cheerful baseline) — mustard `#e8b23d`, faded teal `#3f8f86`, warm bulb-light glow `#fdf1d6`
- **The Founder's Ride** (best spot for the signal color to break through) — rust orange `#b5551f`, faded forest green `#3c5c42`, aged brass `#a8843f`
- **Backstage** (dim, intimate) — mossy green `#4a5c3a`, dusty plum `#5c3f56`, warm lamp-orange `#d98a3d`
- **The Renovation Site** (deliberately cold/clashing — "foreign intrusion") — vest orange `#e08430`, concrete grey `#7a7d7a`, tarp blue `#4d7ea8`
- **The Office** (tired, overworked warmth) — manila tan `#d9c48f`, mahogany brown `#5c3a26`, dusty gold `#b89b5e`
- **The Ghost Walk** (deliberately theatrical/fake-feeling) — exaggerated purple `#5c3d7a`, fog grey-white `#c9c9c9`, cobweb silver `#9a9aa0`
*(Old, now-superseded dark palette — kept here for reference in case useful for a future case/stop:)*
- Background `#161225`, midground `#3b2a4a`, secondary `#1f3a2e`, text `#f2ece1`, signal `#4dfff0`, secondary accent `#ff5fae`
---
 
## Clues
 
### Owen Patch (Owner)
- Crumpled loan paperwork in the office trash bin
- Owen seems torn about losing the park's history
- Security log shows Owen signed in until 2am the night of the incident
- A yellowed photo of opening day, pinned above his desk
### Marcus Boyle (Contractor)
- A torn work order with a rushed, unrealistic deadline
- Marcus's bonus is tied to finishing the renovation early
- A time-stamped delivery receipt places him elsewhere during the incident
- Blueprint margin notes complaining about "old junk slowing us down"
### Nadia Voss (Skeptical Employee)
- A debunking kit (EMF meter, notebook) left near the Founder's Ride
- Nadia wants the hauntings disproven — bad for business
- Break-room sign-in sheet places her on shift elsewhere
- A sarcastic note mocking the "curse," stuck to a locker
### Mortimer Vance (Ghost Tour Operator)
- Fake cobweb material, suspiciously similar to a "clue" found elsewhere
- Ticket sales are directly tied to how haunted the park seems
- Witnessed mid-tour by a group of paying guests
- An overly dramatic flyer he's clearly proud of
### June Ashford (Reporter — guilty)
- Photos of the incident, taken suspiciously early
- Her career depends on the curse story staying big
- Her claimed alibi doesn't match a contradicting timestamp
- A headline draft, written before the incident actually happened
### Red herrings (belong to no suspect)
- Muddy footprints — just the groundskeeper's rounds
- A broken lightbulb — old wiring, unrelated
- A torn fabric scrap — just a cleaning rag
- An overheard rumor that leads nowhere
### Code-ready versions
```js
const clues = [
  // Owen Patch (Owner)
  { id: "patch1", text: "Crumpled loan paperwork in the office trash bin", belongsTo: "owner" },
  { id: "patch2", text: "Owen seems torn about losing the park's history", belongsTo: "owner" },
  { id: "patch3", text: "Security log shows Owen signed in until 2am the night of the incident", belongsTo: "owner" },
  { id: "patch4", text: "A yellowed photo of opening day, pinned above his desk", belongsTo: "owner" },
 
  // Marcus Boyle (Contractor)
  { id: "boyle1", text: "A torn work order with a rushed, unrealistic deadline", belongsTo: "contractor" },
  { id: "boyle2", text: "Marcus's bonus is tied to finishing the renovation early", belongsTo: "contractor" },
  { id: "boyle3", text: "A time-stamped delivery receipt places him elsewhere during the incident", belongsTo: "contractor" },
  { id: "boyle4", text: "Blueprint margin notes complaining about 'old junk slowing us down'", belongsTo: "contractor" },
 
  // Nadia Voss (Skeptical Employee)
  { id: "voss1", text: "A debunking kit (EMF meter, notebook) left near the Founder's Ride", belongsTo: "employee" },
  { id: "voss2", text: "Nadia wants the hauntings disproven — bad for business", belongsTo: "employee" },
  { id: "voss3", text: "Break-room sign-in sheet places her on shift elsewhere", belongsTo: "employee" },
  { id: "voss4", text: "A sarcastic note mocking the 'curse', stuck to a locker", belongsTo: "employee" },
 
  // Mortimer Vance (Ghost Tour Operator)
  { id: "vance1", text: "Fake cobweb material, suspiciously similar to a 'clue' found elsewhere", belongsTo: "tourGuide" },
  { id: "vance2", text: "Ticket sales are directly tied to how haunted the park seems", belongsTo: "tourGuide" },
  { id: "vance3", text: "Witnessed mid-tour by a group of paying guests", belongsTo: "tourGuide" },
  { id: "vance4", text: "An overly dramatic flyer he's clearly proud of", belongsTo: "tourGuide" },
 
  // June Ashford (Reporter — guilty)
  { id: "ashford1", text: "Photos of the incident, taken suspiciously early", belongsTo: "reporter" },
  { id: "ashford2", text: "Her career depends on the curse story staying big", belongsTo: "reporter" },
  { id: "ashford3", text: "Her claimed alibi doesn't match a contradicting timestamp", belongsTo: "reporter" },
  { id: "ashford4", text: "A headline draft, written before the incident actually happened", belongsTo: "reporter" },
 
  // Red herrings
  { id: "herring1", text: "Muddy footprints — just the groundskeeper's rounds", belongsTo: null },
  { id: "herring2", text: "A broken lightbulb — old wiring, unrelated", belongsTo: null },
  { id: "herring3", text: "A torn fabric scrap — just a cleaning rag", belongsTo: null },
  { id: "herring4", text: "An overheard rumor that leads nowhere", belongsTo: null },
];
 
const suspects = {
  owner: { name: "Owen Patch", correctClues: ["patch1", "patch2", "patch3", "patch4"] },
  contractor: { name: "Marcus Boyle", correctClues: ["boyle1", "boyle2", "boyle3", "boyle4"] },
  employee: { name: "Nadia Voss", correctClues: ["voss1", "voss2", "voss3", "voss4"] },
  tourGuide: { name: "Mortimer Vance", correctClues: ["vance1", "vance2", "vance3", "vance4"] },
  reporter: { name: "June Ashford", correctClues: ["ashford1", "ashford2", "ashford3", "ashford4"] },
};
```
 
---
 
## To-Do List (pick up here)
 
**Content / writing:**
- [x] Name the five human suspects + mascot
- [x] Give each suspect a personality quirk + "home base" location
- [x] Write the actual clue list per suspect
- [x] Decide/write red herring clues
- [x] Convert the location mood-boards into actual hex-code palettes
- [x] Write mascot dialogue/flavor text starting lines (dry-humor tone)
- [x] Write a rough draft of the bittersweet ending scene
- [ ] Design the mascot's specific look in more visual detail (species/role already decided: ringmaster) — final illustration/description
- [ ] Expand Barker's dialogue further (more hint lines, more reactions) once the game has more content to react to
- [ ] Polish/finalize the ending scene dialogue (currently a rough draft)
**Code / build:**
- [ ] Expand suspect/clue data to the full cast (5 suspects, multiple clues each, red herrings included)
- [ ] Wire up location-based exploration (currently just flat clue/suspect lists — no location layer built yet)
- [ ] Apply finished location palettes to each location's visual treatment
- [ ] Test full loop with full cast: explore → collect → sort → resolve all 5 files
- [ ] Build the final mascot reveal/ending scene (separate from the case-file mechanic)
- [ ] Pick and apply body copy font pairing polish once content is in (currently Rye + Special Elite)
**Reminders from earlier debugging (good habits going forward):**
- If something "does nothing" on click with no visible error, check the browser console first (F12) — a wrong function name (e.g. calling `selectClue` instead of `selectSuspect`) won't throw an error but will silently do the wrong thing.
- If elements/styles don't load, check the Network tab for 404s — this catches file path/filename mismatches instantly (this happened twice: once with the CSS file, once with the JS file after a rename).
- Arrays need `.find()`/`.filter()` to search by value; objects can be accessed directly by key. `Object.values()` / `Object.entries()` convert an object to an array when you need array methods on it.
 
