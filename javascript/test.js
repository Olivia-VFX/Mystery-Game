const suspects = {
  suspect1: { name: "1", correctClues: ["clue1", "clue2"] },
  suspect2: { name: "2", correctClues: ["clue3", "clue4"] },
};

const clues = [
  {id: "clue1", text: "abc", belongsTo: "suspect1"},
  {id: "clue2", text: "ghi", belongsTo: "suspect1"},
  {id: "clue3", text: "def", belongsTo: "suspect2"},
  {id: "clue4", text: "jkl", belongsTo: "suspect2"},
  {id: "clueX", text: "red herring", belongsTo: null },
]; 

const suspectFiles = {
  suspect1: [],
  suspect2: [],
};

const clueResults = document.getElementById('cluesResults');
const suspectResults = document.getElementById('suspectResults');
const resultMessage = document.getElementById('resultMessage');

let selectedClue = null;
let selectedClueEl = null;

function renderClues() {
  clueResults.innerHTML = ''; 
  const placedClueIds = Object.values(suspectFiles).flat();
  clues.filter(clue => !placedClueIds.includes(clue.id)).forEach(clue => {
    const li = document.createElement('li');
    li.textContent = clue.text;
    li.addEventListener('click', () => selectClue(clue, li));
    clueResults.appendChild(li);
  });
}

function selectClue(clue, el) {
  if (selectedClueEl) selectedClueEl.classList.remove('selected');

  selectedClue = clue;
  selectedClueEl = el;
  el.classList.add('selected');
}

function renderSuspects() {
  suspectResults.innerHTML = ''; 
  Object.entries(suspects).forEach(([suspectId, suspect]) => {
    const li = document.createElement('li');
    li.textContent = suspect.name;
    li.addEventListener('click', () => selectSuspect(suspect, li));
    suspectResults.appendChild(li);
  });
}

function checkFile(suspectId) {
  const placed = suspectFiles[suspectId];
  const correct = suspects[suspectId].correctClues;
  const hasAllCorrect = correct.every(id => placed.includes(id));
  const hasOnlyCorrect = placed.every(id => correct.includes(id));

  if (hasAllCorrect && hasOnlyCorrect) {
    resultMessage.textContent = `${suspects[suspectId].name}'s file is complete!`;
  }
}

function placeClue(suspectId) {
  if (!selectedClue) return;
  suspectFiles[suspectId].push(selectedClue.id);
  selectedClueEl.classList.remove('selected');
  selectedClue = null;
  selectedClueEl = null;
  renderClues();
  checkFile(suspectId);
}

