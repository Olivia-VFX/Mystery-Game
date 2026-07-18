const suspects = {
  suspect1: { name: "1", correctClues: ["clue1", "clue2"] },
  suspect2: { name: "2", correctClues: ["clue3", "clue4"] },
};

const clues = [
  {id: "clue1", text: "abc", belongsTo: "suspect1"},
  {id: "clue3", text: "def", belongsTo: "suspect2"},
]; 
