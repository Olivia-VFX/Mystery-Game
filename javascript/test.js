const suspects = {
  suspect1: { name: "1", correctClues: ["clue1", "clue2"] },
  suspect2: { name: "2", correctClues: ["clue3", "clue4"] },
};

const clues = [
  {id: "clue1", text: "abc", belongsTo: "suspect1"},
  {id: "clue3", text: "def", belongsTo: "suspect2"},
]; 

const search = document.getElementById('search');
const clueResults = document.getElementById('cluesResults');
const suspectResults = document.getElementById('suspectResults');
const resultMessage = document.getElementById('resultMessage');

function renderClues() {
  clueResults.innerHTML = ''; 
  clues.forEach(clue => {
    const li = document.createElement('li');
    li.textContent = clue.text;
    li.addEventListener('click', () => selectClue(clue, li));
    clueResults.appendChild(li);
  });
}

let selectedClue = null;
let selectedClueEl = null;

function selectClue(clue, el) {
  if (selectedClueEl) selectedClueEl.classList.remove('selected');

  selectedClue = clue;
  selectedClueEl = el;
  el.classList.add('selected');

  checkMatch();
}

function renderSuspects() {
  suspectResults.innerHTML = ''; 
  Object.values(suspects).forEach(suspect => {
    const li = document.createElement('li');
    li.textContent = suspect.name;
    li.addEventListener('click', () => selectSuspect(suspect, li));
    suspectResults.appendChild(li);
  });
}

let selectedSuspect = null;
let selectedSuspectEl = null;

function selectSuspect(suspect, el) {
  if (selectedSuspectEl) selectedSuspectEl.classList.remove('selected');

  selectedSuspect = suspect;
  selectedSuspectEl = el;
  el.classList.add('selected');

  checkMatch();
}

function checkMatch() {
  if (selectedClue && selectedSuspect) {
    const isMatch = selectedSuspect.correctClues.includes(selectedClue.id);
    resultMessage.textContent = isMatch ? "True!" : "False.";

    selectedClueEl.classList.remove('selected');
    selectedSuspectEl.classList.remove('selected');
    selectedClue = null;
    selectedSuspect = null;
    selectedClueEl = null;
    selectedSuspectEl = null;
  }
}

renderClues();
renderSuspects();
