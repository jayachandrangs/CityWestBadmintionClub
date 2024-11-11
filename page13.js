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
      exportToCSV(); // Export players to CSV when this button is clicked
      setTimeout(() => {
        window.location.href = 'MPlay.html'; // Redirect to MPlay.html after 500ms to allow CSV download
      }, 500); // Adjust time as necessary for download delay
    });

    document.getElementById('allotCourtSimpleButton').addEventListener('click', () => {
      alert("Allot Court Simple action selected.");
      renderPlayers(); // Refresh display for now
    });
});
