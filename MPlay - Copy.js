// Global variables
let finalPlayersList = [];
let NOD, DOF, PTRS1, NPTR, RESTS, PTRS1_DOF, RESTE;
//NOD ( Number of dummies), DOF (Dummies overflow),PTRS1 (player to rest step1),NPTR (Number of player to rest)
let courtAllocation = {};

function processCSV(csvContent) {
    const lines = csvContent.trim().split('\n');
    if (lines.length !== 25) {
        throw new Error('The CSV file must contain exactly 25 lines of data.');
    }

    finalPlayersList = lines.map((line, index) => {
        const [number, playerName, playerDivision] = line.split(',');
        if (!number || !playerName || !playerDivision) {
            console.error(`Invalid data in line ${index + 1}: ${line}`);
            return null;
        }
        const primaryDivision = parseFloat(playerDivision);
        return {
            number: parseInt(number),
            name: playerName.trim(),
            primaryDivision: primaryDivision,
            secondaryDivision: Number.isInteger(primaryDivision) ? primaryDivision : primaryDivision + 0.5,
            alloted: 0
        };
    }).filter(player => player !== null);

    NOD = finalPlayersList.filter(player => player.name.includes('xDUMMY')).length;
    // Calculate PTRS1_DOF as a decimal value
    PTRS1_DOF = NOD / 5.0;
    PTRS1 = Math.floor(PTRS1_DOF); // Extract integer part
    DOF = Math.round((PTRS1_DOF - PTRS1) * 10) / 10; // Extract decimal part and round to one decimal place
    DOF = Math.round(DOF * 5); // Multiply the rounded decimal by 5
    NPTR = 5 - (DOF + PTRS1);
    RESTS = 1;
    RESTE = (RESTS + (NPTR - 1));
}

function session1courtAllocation() {
    if (NPTR > 0) {
        let RPU = RESTS;
        let RP = 1;
        while (RPU <= RESTE) {
            let player = finalPlayersList.find(p => p.number === RPU); // Corrected reference to `p.number`
            if (player) {
                courtAllocation[`S1R${RP}`] = player.name;
                player.alloted = 1;
            }
            RPU++;
            RP++;
        }
    }

    // Set alloted to 1 for dummy players
    finalPlayersList.forEach(player => {
        if (player.name.includes("xDUMMY")) {
            player.alloted = 1;
        }
    });

    function allocatePlayersToCourtForSession1(courtPrefix, dummyCheck) {
        if (NOD >= dummyCheck) {
            for (let i = 1; i <= 4; i++) {
                courtAllocation[`${courtPrefix}P${i}`] = "DUMMY";
            }
        } else {
            for (let i = 1; i <= 4; i++) {
                let availablePlayers = finalPlayersList.filter(p => p.alloted === 0);
                if (availablePlayers.length > 0) {
                    let maxDivision = Math.max(...availablePlayers.map(p => p.primaryDivision));
                    let eligiblePlayers = availablePlayers.filter(p => p.primaryDivision === maxDivision);
                    let selectedPlayer = eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)];
                    courtAllocation[`${courtPrefix}P${i}`] = selectedPlayer.name;
                    selectedPlayer.alloted = 1;
                } else {
                    courtAllocation[`${courtPrefix}P${i}`] = "No player available";
                }
            }
        }
    }

    allocatePlayersToCourtForSession1("S1C1", 25);
    allocatePlayersToCourtForSession1("S1C2", 20);
    allocatePlayersToCourtForSession1("S1C3", 5);
    allocatePlayersToCourtForSession1("S1C4", 10);
    allocatePlayersToCourtForSession1("S1C5", 15);

    // Reset alloted state for next session
    finalPlayersList.forEach(player => player.alloted = 0);
}

function session2courtAllocation() {
    if (NPTR > 0) {
        RESTS = (RESTE + 1);
        RESTE = (RESTS + (NPTR - 1));
        let RPU = RESTS;
        let RP = 1;
        while (RPU <= RESTE) {
            let player = finalPlayersList.find(p => p.number === RPU); // Corrected reference to `p.number`
            if (player) {
                courtAllocation[`S2R${RP}`] = player.name;
                player.alloted = 1;
            }
            RPU++;
            RP++;
        }
    }

    // Set alloted to 1 for dummy players
    finalPlayersList.forEach(player => {
        if (player.name.includes("xDUMMY")) {
            player.alloted = 1;
        }
    });

    function allocatePlayersToCourtForSession2(courtPrefix, dummyCheck) {
        if (NOD >= dummyCheck) {
            for (let i = 1; i <= 4; i++) {
                courtAllocation[`${courtPrefix}P${i}`] = "DUMMY";
            }
        } else {
            for (let i = 1; i <= 4; i++) {
                let availablePlayers = finalPlayersList.filter(p => p.alloted === 0);
                if (availablePlayers.length > 0) {
                    let minDivision = Math.min(...availablePlayers.map(p => p.secondaryDivision));
                    let eligiblePlayers = availablePlayers.filter(p => p.secondaryDivision === minDivision);
                    let selectedPlayer = eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)];
                    courtAllocation[`${courtPrefix}P${i}`] = selectedPlayer.name;
                    selectedPlayer.alloted = 1;
                } else {
                    courtAllocation[`${courtPrefix}P${i}`] = "No player available";
                }
            }
        }
    }

    allocatePlayersToCourtForSession2("S2C5", 15);
    allocatePlayersToCourtForSession2("S2C4", 10);
    allocatePlayersToCourtForSession2("S2C1", 25);
    allocatePlayersToCourtForSession2("S2C2", 20);
    allocatePlayersToCourtForSession2("S2C3", 5);



    // Reset alloted state for next session
    finalPlayersList.forEach(player => player.alloted = 0);
}

function session3courtAllocation() {
    if (NPTR > 0) {
        RESTS = (RESTE + 1);
        RESTE = (RESTS + (NPTR - 1));
        let RPU = RESTS;
        let RP = 1;
        while (RPU <= RESTE) {
            let player = finalPlayersList.find(p => p.number === RPU); // Corrected reference to `p.number`
            if (player) {
                courtAllocation[`S3R${RP}`] = player.name;
                player.alloted = 1;
            }
            RPU++;
            RP++;
        }
    }

    // Set alloted to 1 for dummy players
    finalPlayersList.forEach(player => {
        if (player.name.includes("xDUMMY")) {
            player.alloted = 1;
        }
    });

    function allocatePlayersToCourtForSession3(courtPrefix, dummyCheck) {
        if (NOD >= dummyCheck) {
            for (let i = 1; i <= 4; i++) {
                courtAllocation[`${courtPrefix}P${i}`] = "DUMMY";
            }
        } else {
            for (let i = 1; i <= 4; i++) {
                let availablePlayers = finalPlayersList.filter(p => p.alloted === 0);
                if (availablePlayers.length > 0) {
                    let minDivision = Math.min(...availablePlayers.map(p => p.secondaryDivision));
                    let eligiblePlayers = availablePlayers.filter(p => p.secondaryDivision === minDivision);
                    let selectedPlayer = eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)];
                    courtAllocation[`${courtPrefix}P${i}`] = selectedPlayer.name;
                    selectedPlayer.alloted = 1;
                } else {
                    courtAllocation[`${courtPrefix}P${i}`] = "No player available";
                }
            }
        }
    }

    allocatePlayersToCourtForSession3("S3C5", 15);
    allocatePlayersToCourtForSession3("S3C4", 10);
    allocatePlayersToCourtForSession3("S3C1", 25);
    allocatePlayersToCourtForSession3("S3C2", 20);
    allocatePlayersToCourtForSession3("S3C3", 5);



    // Reset alloted state for next session
    finalPlayersList.forEach(player => player.alloted = 0);
}

function session4courtAllocation() {
    if (NPTR > 0) {
        RESTS = (RESTE + 1);
        RESTE = (RESTS + (NPTR - 1));
        let RPU = RESTS;
        let RP = 1;
        while (RPU <= RESTE) {
            let player = finalPlayersList.find(p => p.number === RPU); // Corrected reference to `p.number`
            if (player) {
                courtAllocation[`S4R${RP}`] = player.name;
                player.alloted = 1;
            }
            RPU++;
            RP++;
        }
    }

    // Set alloted to 1 for dummy players
    finalPlayersList.forEach(player => {
        if (player.name.includes("xDUMMY")) {
            player.alloted = 1;
        }
    });

    function allocatePlayersToCourtForSession4(courtPrefix, dummyCheck) {
        if (NOD >= dummyCheck) {
            for (let i = 1; i <= 4; i++) {
                courtAllocation[`${courtPrefix}P${i}`] = "DUMMY";
            }
        } else {
            for (let i = 1; i <= 4; i++) {
                let availablePlayers = finalPlayersList.filter(p => p.alloted === 0);
                if (availablePlayers.length > 0) {
                    let minDivision = Math.min(...availablePlayers.map(p => p.secondaryDivision));
                    let eligiblePlayers = availablePlayers.filter(p => p.secondaryDivision === minDivision);
                    let selectedPlayer = eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)];
                    courtAllocation[`${courtPrefix}P${i}`] = selectedPlayer.name;
                    selectedPlayer.alloted = 1;
                } else {
                    courtAllocation[`${courtPrefix}P${i}`] = "No player available";
                }
            }
        }
    }

    allocatePlayersToCourtForSession4("S4C5", 15);
    allocatePlayersToCourtForSession4("S4C4", 10);
    allocatePlayersToCourtForSession4("S4C1", 25);
    allocatePlayersToCourtForSession4("S4C2", 20);
    allocatePlayersToCourtForSession4("S4C3", 5);



    // Reset alloted state for next session
    finalPlayersList.forEach(player => player.alloted = 0);
}



function session5courtAllocation() {
    // Assuming RESTS starts as 1 (or any other initial value that makes sense)
    RESTS = (RESTE + 1);     
    RESTE = (RESTS + (NPTR - 1));
    if (NPTR > 0) {
        let RPU = RESTS;
        let RP = 1;
        while (RPU <= RESTE) {
            let player = finalPlayersList.find(p => p.number === RPU);
            if (player) {
                courtAllocation[`S5R${RP}`] = player.name;
                player.alloted = 1;
            }
            RPU++;
            RP++;
        }
    }

    // Set alloted to 1 for dummy players
    finalPlayersList.forEach(player => {
        if (player.name.includes("xDUMMY")) {
            player.alloted = 1;
        }
    });

    // Function to allocate players to Session 5 courts
    function allocatePlayersToCourtForSession5(courtPrefix, dummyCheck) {
        if (NOD >= dummyCheck) {
            for (let i = 1; i <= 4; i++) {
                courtAllocation[`${courtPrefix}P${i}`] = "DUMMY";
            }
        } else {
            for (let i = 1; i <= 4; i++) {
                let availablePlayers = finalPlayersList.filter(p => p.alloted === 0);
                if (availablePlayers.length > 0) {
                    let maxDivision = Math.max(...availablePlayers.map(p => p.primaryDivision));
                    let eligiblePlayers = availablePlayers.filter(p => p.primaryDivision === maxDivision);
                    let selectedPlayer = eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)];
                    courtAllocation[`${courtPrefix}P${i}`] = selectedPlayer.name;
                    selectedPlayer.alloted = 1;
                } else {
                    courtAllocation[`${courtPrefix}P${i}`] = "No player available";
                }
            }
        }
    }

    // Allocate players to session 5 courts
    allocatePlayersToCourtForSession5("S5C5", 15);
    allocatePlayersToCourtForSession5("S5C4", 10);
    allocatePlayersToCourtForSession5("S5C1", 25);
    allocatePlayersToCourtForSession5("S5C2", 20);
    allocatePlayersToCourtForSession5("S5C3", 5);

    // Reset alloted state for next session
    finalPlayersList.forEach(player => player.alloted = 0);
}


function generateOutput() {
//    let output = "Variable,Value\n";
//    output += `NOD,${NOD}\n`;
//    output += `DOF,${DOF}\n`;
//    output += `PTRS1,${PTRS1}\n`;
//    output += `NPTR,${NPTR}\n`;
//    output += `RESTS,${RESTS}\n`;
//    output += `RESTE,${RESTE}\n\n`;
//
let output = "Session 1 Court Allocations\n";
    for (let court = 1; court <= 5; court++) {
        output += `Court ${court},${courtAllocation[`S1C${court}P1`] || 'N/A'},${courtAllocation[`S1C${court}P2`] || 'N/A'},${courtAllocation[`S1C${court}P3`] || 'N/A'},${courtAllocation[`S1C${court}P4`] || 'N/A'}\n`;
    }
    output += `Rested Players,${courtAllocation.S1R1 || ' '},${courtAllocation.S1R2 || ' '},${courtAllocation.S1R3 || ' '},${courtAllocation.S1R4 || ' '},${courtAllocation.S1R5 || ' '}\n\n`;

//    output += "Player List\n";
//    output += "Number,Name,PrimaryDivision,SecondaryDivision,Alloted\n";
//    finalPlayersList.forEach(player => {
//        output += `${player.number},${player.name},${player.primaryDivision},${player.secondaryDivision},${player.alloted}\n`;
//    });

    output += "Session 2 Court Allocations\n";
    for (let court = 1; court <= 5; court++) {
        output += `Court ${court},${courtAllocation[`S2C${court}P1`] || 'N/A'},${courtAllocation[`S2C${court}P2`] || 'N/A'},${courtAllocation[`S2C${court}P3`] || 'N/A'},${courtAllocation[`S2C${court}P4`] || 'N/A'}\n`;
    }
    output += `Rested Players,${courtAllocation.S2R1 || ' '},${courtAllocation.S2R2 || ' '},${courtAllocation.S2R3 || ' '},${courtAllocation.S2R4 || ' '},${courtAllocation.S2R5 || ' '}\n\n`;

//    output += "Player List\n";
//    output += "Number,Name,PrimaryDivision,SecondaryDivision,Alloted\n";
//    finalPlayersList.forEach(player => {
//        output += `${player.number},${player.name},${player.primaryDivision},${player.secondaryDivision},${player.alloted}\n`;
//    });

    output += "Session 3 Court Allocations\n";
    for (let court = 1; court <= 5; court++) {
        output += `Court ${court},${courtAllocation[`S3C${court}P1`] || 'N/A'},${courtAllocation[`S3C${court}P2`] || 'N/A'},${courtAllocation[`S3C${court}P3`] || 'N/A'},${courtAllocation[`S3C${court}P4`] || 'N/A'}\n`;
    }
    output += `Rested Players,${courtAllocation.S3R1 || ' '},${courtAllocation.S3R2 || ' '},${courtAllocation.S3R3 || ' '},${courtAllocation.S3R4 || ' '},${courtAllocation.S3R5 || ' '}\n\n`;

//    output += "Player List\n";
//    output += "Number,Name,PrimaryDivision,SecondaryDivision,Alloted\n";
//    finalPlayersList.forEach(player => {
//        output += `${player.number},${player.name},${player.primaryDivision},${player.secondaryDivision},${player.alloted}\n`;
//    });

    output += "Session 4 Court Allocations\n";
    for (let court = 1; court <= 5; court++) {
        output += `Court ${court},${courtAllocation[`S4C${court}P1`] || 'N/A'},${courtAllocation[`S4C${court}P2`] || 'N/A'},${courtAllocation[`S4C${court}P3`] || 'N/A'},${courtAllocation[`S4C${court}P4`] || 'N/A'}\n`;
    }
    output += `Rested Players,${courtAllocation.S4R1 || ' '},${courtAllocation.S4R2 || ' '},${courtAllocation.S4R3 || ' '},${courtAllocation.S4R4 || ' '},${courtAllocation.S4R5 || ' '}\n\n`;

//    output += "Player List\n";
//    output += "Number,Name,PrimaryDivision,SecondaryDivision,Alloted\n";
//    finalPlayersList.forEach(player => {
//        output += `${player.number},${player.name},${player.primaryDivision},${player.secondaryDivision},${player.alloted}\n`;
//    });

    output += "Session 5 Court Allocations\n";
    for (let court = 1; court <= 5; court++) {
        output += `Court ${court},${courtAllocation[`S5C${court}P1`] || 'N/A'},${courtAllocation[`S5C${court}P2`] || 'N/A'},${courtAllocation[`S5C${court}P3`] || 'N/A'},${courtAllocation[`S5C${court}P4`] || 'N/A'}\n`;
    }
    output += `Rested Players,${courtAllocation.S5R1 || ' '},${courtAllocation.S5R2 || ' '},${courtAllocation.S5R3 || ' '},${courtAllocation.S5R4 || ' '},${courtAllocation.S5R5 || ' '}\n\n`;

//    output += "Player List\n";
//    output += "Number,Name,PrimaryDivision,SecondaryDivision,Alloted\n";
//    finalPlayersList.forEach(player => {
//        output += `${player.number},${player.name},${player.primaryDivision},${player.secondaryDivision},${player.alloted}\n`;
//    });

    return output;
}

function runAllocation(csvContent) {
    try {
        processCSV(csvContent);
        session1courtAllocation();
        session2courtAllocation();
        session3courtAllocation();
        session4courtAllocation();
        session5courtAllocation();
        return generateOutput();
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

// Expose the runAllocation function to the global scope
window.runAllocation = runAllocation;
