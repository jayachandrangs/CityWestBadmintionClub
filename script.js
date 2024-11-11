// Utility function to go to another page
function goToPage(page) {
  window.location.href = page;
}

// Initialize required variables
const NUMPLAYERS = 25;
let UNSETNUMBERS = 0;
let REMOVALOT;
const UNSETNUM = Array(10).fill(0);
const playerInfo = {};
let isLoading = false;

// Load players from GitHub CSV or prompt for upload if not available
async function loadPlayers() {
  if (isLoading) {
    console.log("Already loading, please wait.");
    return;
  }

  isLoading = true;
  console.log("Loading players...");

  const playerButtonsDiv = document.getElementById('playerButtons');

  try {
    const response = await fetch("https://raw.githubusercontent.com/jayachandrangs/CityWestBadmintionClub/main/docs/playerlist.csv");
    if (!response.ok) {
      throw new Error('CSV not found on GitHub.');
    }

    const csvData = await response.text();
    processCSV(csvData);
  } catch (error) {
    alert("Could not load playerlist.csv from GitHub. Please upload a CSV file.");
    promptForCSVUpload();
  }

  isLoading = false;
}

// Process CSV data
function processCSV(csvData) {
  const rows = csvData.split('\n');
  console.log(`Loaded ${rows.length} rows from CSV`);

  let playerCount = 0;
  const playerButtonsDiv = document.getElementById('playerButtons');
  playerButtonsDiv.innerHTML = '';

  rows.forEach((row, index) => {
    const [playerName, division] = row.split(',');

    if (index === 0 && playerName.toLowerCase().includes('name')) return;
    if (!playerName.trim()) return;

    playerCount++;
    const playerDiv = document.createElement('div');
    playerDiv.classList.add('player-div');
    playerDiv.onclick = () => togglePlayerNumber(playerName, playerDiv);
    playerDiv.innerText = `${playerName}`;
    playerDiv.id = `player-${playerName.replace(/\s+/g, '-')}`;
    playerButtonsDiv.appendChild(playerDiv);

    playerInfo[playerName] = { number: null, division: division.trim() };
  });

  console.log(`Added ${playerCount} players to the display`);
}

// Prompt for CSV file upload if not found on GitHub
function promptForCSVUpload() {
  const fileInput = document.getElementById('fileInput');
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => processCSV(event.target.result);
      reader.readAsText(file);
    }
  });
  fileInput.click();
}

// Toggle player number assignment
function togglePlayerNumber(playerName, playerDiv) {
  const existingBubble = playerDiv.querySelector('.player-number');
  if (existingBubble) playerDiv.removeChild(existingBubble);

  if (playerInfo[playerName].number === null) {
    if (UNSETNUMBERS === 0) {
      const numberToAssign = Object.values(playerInfo).filter(info => info.number).length + 1;
      if (numberToAssign <= NUMPLAYERS) {
        playerInfo[playerName].number = numberToAssign;
        createNumberBubble(playerDiv, numberToAssign);
      } else {
        alert("All numbers are already allocated.");
      }
    } else {
      const UNUM = UNSETNUMBERS;
      playerInfo[playerName].number = UNSETNUM[UNUM];
      UNSETNUM[UNUM] = 0;
      UNSETNUMBERS--;
      createNumberBubble(playerDiv, playerInfo[playerName].number);
    }
  } else {
    REMOVALOT = playerInfo[playerName].number;
    playerInfo[playerName].number = null;
    UNSETNUMBERS++;
    UNSETNUM[UNSETNUMBERS] = REMOVALOT;
  }
}

// Create number bubble for assigned players
function createNumberBubble(playerDiv, number) {
  const numberBubble = document.createElement('div');
  numberBubble.classList.add('player-number');
  numberBubble.innerText = number;
  playerDiv.appendChild(numberBubble);
}

// Reset players
function resetPlayers() {
  const playerButtonsDiv = document.getElementById('playerButtons');
  playerButtonsDiv.innerHTML = '';

  Object.keys(playerInfo).forEach(playerName => {
    playerInfo[playerName].number = null;
    const playerDiv = document.createElement('div');
    playerDiv.classList.add('player-div');
    playerDiv.onclick = () => togglePlayerNumber(playerName, playerDiv);
    playerDiv.innerText = `${playerName} - ${playerInfo[playerName].division}`;
    playerDiv.id = `player-${playerName.replace(/\s+/g, '-')}`;
    playerButtonsDiv.appendChild(playerDiv);
  });

  UNSETNUMBERS = 0;
  UNSETNUM.fill(0);
}

// Confirm allocation and store in sessionStorage
function confirmAllocation() {
  try {
    const playersWithNumbers = Object.keys(playerInfo)
      .filter(player => playerInfo[player].number !== null)
      .map(player => ({
        number: playerInfo[player].number,
        name: player,
        division: playerInfo[player].division
      }));

    if (playersWithNumbers.length !== 25) {
      alert("25 players are not selected. Please select exactly 25 players.");
      return;
    }

    playersWithNumbers.sort((a, b) => a.number - b.number);
    sessionStorage.setItem('sortedPlayers', JSON.stringify(playersWithNumbers));
    alert("Player selections confirmed. Redirecting to reordering page.");
    window.location.href = 'page13.html';
  } catch (error) {
    console.error("Error confirming player selections:", error);
    alert("There was an error confirming player selections. Please try again.");
  }
}

// Execute loadPlayers only when Page12 opens
document.addEventListener('DOMContentLoaded', loadPlayers);
