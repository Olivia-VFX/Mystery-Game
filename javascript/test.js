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

function displayResults(results, container, formatter) {
  container.innerHTML = '';

if (results.length === 0) {
  container.innerHTML = '<li>No results found</li>';
  return;
}

results.forEach(item => {
  const li = document.createElement('li');
  li.textContent = formatter(item.id);
  container.appendChild(li);
});
}

search.addEventListener('input', () => {
  const query = search.value.trim().toLowerCase();

  const filteredClues = clues.filter(clue =>
    clue.id.toLowerCase().includes(query)
  );
  const filteredSuspects = Object.values(suspects).filter(suspects =>
    suspects.name.toLowerCase().includes(query)
    );

  displayResults(filteredClues, clueResults, clues => `${clues.id}`);
  displayResults(filteredSuspects, suspectResults, suspects => `${suspects.name}`);
});

displayResults(clues, clueResults, clue => `${clue.id}`);
displayResults(suspects, suspectResults, suspects => `${suspects.name}`);
