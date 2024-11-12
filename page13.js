document.addEventListener('DOMContentLoaded', function() {
    const playerList = document.getElementById('playerList');
    let sortedPlayers = JSON.parse(sessionStorage.getItem('sortedPlayers')) || [];

    let ROTATENUM = 0; // To track the free number index
    const FREENUM = Array(15).fill(0); // Array to hold free numbers

    function createPlayerRow(player) {
        const row = document.createElement('div');
        row.className = 'player-row';
        
        const playerNameDiv = document.createElement('div');
        playerNameDiv.className = 'player-name';
        playerNameDiv.innerText = `${player.name || 'Unknown Player'}`; // Default name if undefined
        
        const numberDiv = document.createElement('div');
        numberDiv.className = 'player-number';
        numberDiv.innerText = player.number !== null ? player.number : '';

        playerNameDiv.onclick = () => togglePlayerNumber(player);

        row.appendChild(playerNameDiv);
        row.appendChild(numberDiv);
        
        return row;
    }

    function renderPlayers() {
        sortedPlayers.sort((a, b) => (a.number || Infinity) - (b.number || Infinity));
        playerList.innerHTML = '';
        sortedPlayers.forEach(player => {
            playerList.appendChild(createPlayerRow(player));
        });
    }

    function togglePlayerNumber(player) {
        const currentNumber = player.number;

        if (currentNumber !== null) {
            ROTATENUM++;
            FREENUM[ROTATENUM - 1] = currentNumber;
            player.number = null;
        } else if (ROTATENUM > 0) {
            const freeNumber = FREENUM[ROTATENUM - 1];
            player.number = freeNumber;
            FREENUM[ROTATENUM - 1] = 0;
            ROTATENUM--;
        }

        sessionStorage.setItem('sortedPlayers', JSON.stringify(sortedPlayers));
        renderPlayers();
    }

    function exportToCSV() {
        const csvContent = "data:text/csv;charset=utf-8," 
            + sortedPlayers.map(player => `${player.number || ''},${player.name || 'Unnamed'},${player.division || ''}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "players.csv");
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file named "players.csv"
    }

    renderPlayers();

    // Action button functionalities
    document.getElementById('backButton').addEventListener('click', () => {
      window.location.href = 'page12.html';
    });

    document.getElementById('refreshButton').addEventListener('click', () => {
      sortedPlayers = JSON.parse(sessionStorage.getItem('sortedPlayers')) || [];
      renderPlayers();
      alert("Screen refreshed with current data.");
    });

   document.getElementById('allotCourtMixedButton').addEventListener('click', () => {
     try {
       const playersWithNumbers = sortedPlayers
         .filter(player => player.number !== null)
         .map(player => `${player.number},${player.name},${player.division}`);

       // Check if exactly 25 players are selected
       if (playersWithNumbers.length !== 25) {
         alert("25 players are not selected. Please select exactly 25 players.");
         return;
       }

       // Sort the array by player number
       playersWithNumbers.sort((a, b) => {
         const numA = parseInt(a.split(',')[0]);
         const numB = parseInt(b.split(',')[0]);
         return numA - numB;
      });

       // Store the data as a single string in sessionStorage
       sessionStorage.setItem('playerDataForMPlay', playersWithNumbers.join('\n'));

       // Export to CSV (if you still want to keep this functionality)
       //exportToCSV();

       alert("Player selections confirmed. Redirecting to MPlay page.");
       window.location.href = 'MPlay.html';
     } catch (error) {
       console.error("Error confirming player selections:", error);
      alert("There was an error confirming player selections. Please try again.");
     }
   });

    document.getElementById('refreshButton').addEventListener('click', () => {
      sortedPlayers = JSON.parse(sessionStorage.getItem('sortedPlayers')) || [];
      renderPlayers();
      alert("Screen refreshed with current data.");
    });

   document.getElementById('allotCourtSimpleButton').addEventListener('click', () => {
     try {
       const playersWithNumbers = sortedPlayers
         .filter(player => player.number !== null)
         .map(player => `${player.number},${player.name},${player.division}`);

       // Check if exactly 25 players are selected
       if (playersWithNumbers.length !== 25) {
         alert("25 players are not selected. Please select exactly 25 players.");
         return;
       }

       // Sort the array by player number
       playersWithNumbers.sort((a, b) => {
         const numA = parseInt(a.split(',')[0]);
         const numB = parseInt(b.split(',')[0]);
         return numA - numB;
      });

       // Store the data as a single string in sessionStorage
       sessionStorage.setItem('playerDataForMPlay', playersWithNumbers.join('\n'));

       // Export to CSV (if you still want to keep this functionality)
       //exportToCSV();

       alert("Player selections confirmed. Redirecting to MPlay page.");
       window.location.href = 'NPlay.html';
     } catch (error) {
       console.error("Error confirming player selections:", error);
      alert("There was an error confirming player selections. Please try again.");
     }
   });
});
