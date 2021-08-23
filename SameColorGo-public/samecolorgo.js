var board = [];
var boardsize = 19;
var recent = [];
var kocheck = [];
var whoseTurn = 1;
var whiteScore = 6.5;
var blackScore = 0;
var gameOver = false;
var showcolors = false;
var passesInARow = 0;
var gameMode = "play"
var territory = [];
var deadStones = [];
var boardSetting = 19;
var handicap = 0;
// 1 is black, -1 is white
for(var b = 0; b < boardsize; b++){
    board.push([]);
    kocheck.push([]);
    for(var c = 0; c < boardsize; c++){
        board[b].push(0);
        kocheck[b].push(0);
    }
}
function setup() {
    var myCanvas = createCanvas(620, 620);
    myCanvas.parent('myContainer');
}
function draw() {
    clear();
    
    strokeWeight(1);
    stroke("black");
    fill("black");
    textSize(20);
    textAlign(CENTER);
    
    var outerBound = (boardsize*30)+25;
    line(55, 55, outerBound, 55);
    line(55, 85, outerBound, 85);
    line(55, 115, outerBound, 115);
    line(55, 145, outerBound, 145);
    line(55, 175, outerBound, 175);
    line(55, 205, outerBound, 205);
    line(55, 235, outerBound, 235);
    line(55, 265, outerBound, 265);
    line(55, 295, outerBound, 295);
    
    line(55, 55, 55, outerBound);
    line(85, 55, 85, outerBound);
    line(115, 55, 115, outerBound);
    line(145, 55, 145, outerBound);
    line(175, 55, 175, outerBound);
    line(205, 55, 205, outerBound);
    line(235, 55, 235, outerBound);
    line(265, 55, 265, outerBound);
    line(295, 55, 295, outerBound);
    
    if(boardsize >= 13){
        line(55, 325, outerBound, 325);
        line(55, 355, outerBound, 355);
        line(55, 385, outerBound, 385);
        line(55, 415, outerBound, 415);
        
        line(325, 55, 325, outerBound);
        line(355, 55, 355, outerBound);
        line(385, 55, 385, outerBound);
        line(415, 55, 415, outerBound);
        
        text("K", 320, 10, 15, 30);
        text("L", 350, 10, 15, 30);
        text("M", 380, 10, 15, 30);
        text("N", 410, 10, 15, 30);
        
        text("10", 10, 315, 15, 30);
        text("11", 10, 345, 15, 30);
        text("12", 10, 375, 15, 30);
        text("13", 10, 405, 15, 30);
    }
    if(boardsize == 19){
        line(55, 505, outerBound, 505);
        line(55, 535, outerBound, 535);
        line(55, 565, outerBound, 565);
        line(55, 595, outerBound, 595);
        line(55, 445, outerBound, 445);
        line(55, 475, outerBound, 475);

        line(505, 55, 505, outerBound);
        line(535, 55, 535, outerBound);
        line(565, 55, 565, outerBound);
        line(595, 55, 595, outerBound);
        line(445, 55, 445, outerBound);
        line(475, 55, 475, outerBound);
        
        text("O", 440, 10, 15, 30);
        text("P", 470, 10, 15, 30);
        text("Q", 500, 10, 15, 30);
        text("R", 530, 10, 15, 30);
        text("S", 560, 10, 15, 30);
        text("T", 590, 10, 15, 30);
        
        text("14", 10, 435, 15, 30);
        text("15", 10, 465, 15, 30);
        text("16", 10, 495, 15, 30);
        text("17", 10, 525, 15, 30);
        text("18", 10, 555, 15, 30);
        text("19", 10, 585, 15, 30);
    }
    
    text("A", 50, 10, 15, 30);
    text("B", 80, 10, 15, 30);
    text("C", 110, 10, 15, 30);
    text("D", 140, 10, 15, 30);
    text("E", 170, 10, 15, 30);
    text("F", 200, 10, 15, 30);
    text("G", 230, 10, 15, 30);
    text("H", 260, 10, 15, 30);
    text("J", 290, 10, 15, 30);
    
    text("1", 10, 45, 15, 30);
    text("2", 10, 75, 15, 30);
    text("3", 10, 105, 15, 30);
    text("4", 10, 135, 15, 30);
    text("5", 10, 165, 15, 30);
    text("6", 10, 195, 15, 30);
    text("7", 10, 225, 15, 30);
    text("8", 10, 255, 15, 30);
    text("9", 10, 285, 15, 30);
    
    for(var y = 0; y < boardsize; y++){
        for(var x = 0; x < boardsize; x++){
            if(board[y][x] != 0){
                noStroke();
                if(showcolors || gameOver){
                    fill((127-(127*board[y][x])));
                } else{
                    fill("black");
                }
                ellipse((x*30+55), (y*30+55), 30, 30);
            }
        }
    }
    
    if(recent.length > 0 && !gameOver){
        strokeWeight(3);
        noFill();
        if(showcolors){
            stroke(127+(127*board[recent[1]][recent[0]]));
        } else{
            stroke("white");
        }
        ellipse((recent[0]*30+55), (recent[1]*30+55), 15, 15)
    } else{
        for(var dStone = 0; dStone < deadStones.length; dStone++){
            fill(127-(127*deadStones[dStone][2]));
            noStroke();
            ellipse((deadStones[dStone][0]*30+55), (deadStones[dStone][1]*30+55), 30, 30);
            
            if(gameMode == "mark dead"){
                stroke(127+(127*deadStones[dStone][2]));
                strokeWeight(5);
                line((deadStones[dStone][0]*30+50), (deadStones[dStone][1]*30+50), (deadStones[dStone][0]*30+60), (deadStones[dStone][1]*30+60));
                line((deadStones[dStone][0]*30+50), (deadStones[dStone][1]*30+60), (deadStones[dStone][0]*30+60), (deadStones[dStone][1]*30+50));
            } else if(gameMode == "final scoring" || gameMode == "white pen" || gameMode == "black pen"){
                fill(127+(127*deadStones[dStone][2]));
                noStroke();
                ellipse((deadStones[dStone][0]*30+55), (deadStones[dStone][1]*30+55), 10, 10);
            }
        }
        if(gameMode == "final scoring" || gameMode == "white pen" || gameMode == "black pen"){
            for(var tratra = 0; tratra < territory.length; tratra++){
                fill(127-(127*territory[tratra][2]));
                noStroke();
                ellipse((territory[tratra][0]*30+55), (territory[tratra][1]*30+55), 10, 10);
            }
        }
    }
    
    if(!gameOver){
        var xposition = Math.round(((mouseX-55)/30));
        var yposition = Math.round(((mouseY-55)/30));
        if(xposition >= boardsize || yposition >= boardsize || xposition < 0 || yposition < 0){
            return;
        }
        if(board[yposition][xposition]==0){
            if(showcolors){
                var currColor = (127-(127*whoseTurn)).toString();
                fill('rgba(' + currColor + ", " + currColor + ", " + currColor + ", 0.5)");
            } else{
                fill('rgba(0, 0, 0, 0.5)');
            }
            noStroke();
            ellipse((xposition*30+55), (yposition*30+55), 30, 30);
        }
    }
}
function mouseReleased(){
    //console.log("--------------");
    var xpos = Math.round(((mouseX-55)/30));
    var ypos = Math.round(((mouseY-55)/30));
    if(xpos < 0 || ypos < 0 || xpos >= boardsize || ypos >= boardsize){
        return;
    }
    if(board[ypos][xpos] == 0 && !gameOver){
        var tempboard = JSON.parse(JSON.stringify(board));
        var temprecent = [recent[0], recent[1]];
        var tempscores = [blackScore, whiteScore];
        board[ypos][xpos] = whoseTurn;
        var notselfkill = checkLoop(xpos, ypos);
        for(var x = 0; x < boardsize; x++){
            for(var y = 0; y < boardsize; y++){
                if(board[y][x] != 0){
                    board[y][x] = Math.sign(board[y][x]);
                }
            }
        }
        var validMove = true;
        if(notselfkill){
            recent = [xpos, ypos];
            whoseTurn*=-1;
            var itCaptures = checkCapturing(xpos, ypos);
        } else{
            var itCaptures = checkCapturing(xpos, ypos);
            if(itCaptures){
                recent = [xpos, ypos];
                whoseTurn*=-1;
            } else{
                board[ypos][xpos] = 0;
                validMove = false;
            }
        }
        var itsako = true;
        for(var x2 = 0; x2 < boardsize; x2++){
            for(var y2 = 0; y2 < boardsize; y2++){
                if(board[y2][x2] != kocheck[y2][x2]){
                    itsako = false;
                    kocheck = JSON.parse(JSON.stringify(tempboard));
                }
            }
        }
        if(itsako && validMove){
            validMove = false;
            board = JSON.parse(JSON.stringify(tempboard));
            recent = [temprecent[0], temprecent[1]];
            blackScore = tempscores[0];
            whiteScore = tempscores[1];
            whoseTurn*=-1;
        }
        if(validMove){
            var toMoveBox = document.getElementById("toMoveBox");
            if(whoseTurn == -1){
                toMoveBox.style.color = "black";
                toMoveBox.style.backgroundColor = "white"
                toMoveBox.innerHTML = "'White' to move"
            } else{
                toMoveBox.style.color = "white";
                toMoveBox.style.backgroundColor = "black"
                toMoveBox.innerHTML = "'Black' to move"
            }
            document.getElementById("blackScore").innerHTML = "+".concat(blackScore.toString());
            document.getElementById("whiteScore").innerHTML = "+".concat(whiteScore.toString());
            passesInARow = 0;
        }
    } else if(gameMode == "mark dead"){
        if(board[ypos][xpos] != 0){
            markDead(xpos, ypos, true);
        } else{
            for(var deadRock = 0; deadRock < deadStones.length; deadRock++){
                if(deadStones[deadRock][0] == xpos && deadStones[deadRock][1] == ypos){
                    markDead(xpos, ypos, false);
                }
            }
        }
        document.getElementById("blackScore").innerHTML = "+".concat(blackScore.toString());
        document.getElementById("whiteScore").innerHTML = "+".concat(whiteScore.toString());
    } else if(gameMode == "black pen" || gameMode == "white pen"){
        var colorNumb = 1;
        if(gameMode == "white pen"){
            colorNumb = -1;
        }
        var killAStone = false;
        if(board[ypos][xpos] == colorNumb){
            return;
        } else if(board[ypos][xpos] == -1*colorNumb){
            board[ypos][xpos] = 0;
            deadStones.push([xpos, ypos, -1*colorNumb]);
            killAStone = true;
            if(gameMode == "black pen"){
                blackScore++;
            } else{
                whiteScore++;
            }
        }
        for(var flipDead = 0; flipDead < deadStones.length; flipDead++){
            if(deadStones[flipDead][0] == xpos && deadStones[flipDead][1] == ypos && !killAStone){
                board[deadStones[flipDead][1]][deadStones[flipDead][0]] = deadStones[flipDead][2];
                if(deadStones[flipDead][2] == 1){
                    whiteScore -= 1;
                } else{
                    blackScore -= 1;
                }
                deadStones.splice(flipDead, 1);
            }
        }
        var turnOn = true;
        for(var swap = 0; swap < territory.length; swap++){
            if(territory[swap][0] == xpos && territory[swap][1] == ypos){
                if(territory[swap][2] == colorNumb){
                    turnOn = false;
                    if(gameMode == "black pen"){
                        blackScore -= 1;
                    } else{
                        whiteScore -= 1;
                    }
                } else{
                    if(gameMode == "black pen"){
                        whiteScore -= 1;
                    } else{
                        blackScore -= 1;
                    }
                }
                territory.splice(swap, 1)
            }
        }
        if(turnOn){
            if(gameMode == "black pen"){
                blackScore++;
            } else{
                whiteScore++;
            }
            territory.push([xpos, ypos, colorNumb]);
        }
        document.getElementById("blackScore").innerHTML = blackScore.toString();
        document.getElementById("whiteScore").innerHTML = whiteScore.toString();
        var toMoveBox = document.getElementById("toMoveBox");
        if(blackScore > whiteScore){
            toMoveBox.style.color = "white";
            toMoveBox.style.backgroundColor = "black";
            toMoveBox.innerHTML = "Black Wins!"
        } else{
            toMoveBox.style.color = "black";
            toMoveBox.style.backgroundColor = "white";
            toMoveBox.innerHTML = "White Wins!";
        }
    }
}
function checkCapturing(x, y){
    var itCaptures = false;
    try {
        if(board[y][x-1] == board[y][x]*-1){
            var alive1 = checkLoop(x-1, y);
            for(var y2 = 0; y2 < boardsize; y2++){
                for(var x2 = 0; x2 < boardsize; x2++){
                    if(Math.abs(board[y2][x2]) > 1){
                        if(!alive1){
                            itCaptures = true;
                            board[y2][x2] = 0;
                            if(board[y][x] > 0){
                                blackScore++;
                            } else{
                                whiteScore++;
                            }
                        } else if(board[y2][x2] != 0){
                            board[y2][x2] = board[y2][x2]/Math.abs(board[y2][x2]);
                        }
                    }
                }
            }
        }
    } catch(err){}
    try {
        if(board[y-1][x] == board[y][x]*-1){
            var alive2 = checkLoop(x, y-1);
            for(var y2 = 0; y2 < boardsize; y2++){
                for(var x2 = 0; x2 < boardsize; x2++){
                    if(Math.abs(board[y2][x2]) > 1){
                        if(!alive2){
                            itCaptures = true;
                            board[y2][x2] = 0;
                            if(board[y][x] > 0){
                                blackScore++;
                            } else{
                                whiteScore++;
                            }
                        } else if(board[y2][x2] != 0){
                            board[y2][x2] = board[y2][x2]/Math.abs(board[y2][x2]);
                        }
                    }
                }
            }
        }
    } catch(err){}
    try {
        if(board[y][x+1] == board[y][x]*-1){
            var alive3 = checkLoop(x+1, y);
            for(var y2 = 0; y2 < boardsize; y2++){
                for(var x2 = 0; x2 < boardsize; x2++){
                    if(Math.abs(board[y2][x2]) > 1){
                        if(!alive3){
                            itCaptures = true;
                            board[y2][x2] = 0;
                            if(board[y][x] > 0){
                                blackScore++;
                            } else{
                                whiteScore++;
                            }
                        } else if(board[y2][x2] != 0){
                            board[y2][x2] = board[y2][x2]/Math.abs(board[y2][x2]);
                        }
                    }
                }
            }
        }
    } catch(err){}
    try {
        if(board[y+1][x] == board[y][x]*-1){
            var alive4 = checkLoop(x, y+1);
            for(var y2 = 0; y2 < boardsize; y2++){
                for(var x2 = 0; x2 < boardsize; x2++){
                    if(Math.abs(board[y2][x2]) > 1){
                        if(!alive4){
                            itCaptures = true;
                            board[y2][x2] = 0;
                            if(board[y][x] > 0){
                                blackScore++;
                            } else{
                                whiteScore++;
                            }
                        } else if(board[y2][x2] != 0){
                            board[y2][x2] = board[y2][x2]/Math.abs(board[y2][x2]);
                        }
                    }
                }
            }
        }
    } catch(err){}
    return itCaptures;
}
function checkLoop(x, y){
    var safe = false;
    var connections = []
    try {
        if(board[y][x-1] == Math.sign(board[y][x])){
            connections.push([x-1, y]);
        } else if(board[y][x-1] == 0 || board[y][x-1] == Math.sign(board[y][x])*2 || board[y][x-1] == Math.sign(board[y][x])*4){
            safe = true;
        }
    } catch(err){}
    try {
        if(board[y-1][x] == Math.sign(board[y][x])){
            connections.push([x, y-1]);
        } else if(board[y-1][x] == 0 || board[y-1][x] == Math.sign(board[y][x])*2 || board[y-1][x] == Math.sign(board[y][x])*4){
            safe = true;
        }
    } catch(err){}
    try {
        if(board[y][x+1] == Math.sign(board[y][x])){
            connections.push([x+1, y]);
        } else if(board[y][x+1] == 0 || board[y][x+1] == Math.sign(board[y][x])*2 || board[y][x+1] == Math.sign(board[y][x])*4){
            safe = true;
        }
    } catch(err){}
    try {
        if(board[y+1][x] == Math.sign(board[y][x])){
            connections.push([x, y+1]);
        } else if(board[y+1][x] == 0 || board[y+1][x] == Math.sign(board[y][x])*2 || board[y+1][x] == Math.sign(board[y][x])*4){
            safe = true;
        }
    } catch(err){}
    
    if(!safe && connections.length==0){
        board[y][x] = Math.sign(board[y][x])*3;
        return false;
    } else if(safe){
        board[y][x] = Math.sign(board[y][x])*2;
        return true;
    } else{
        board[y][x] = Math.sign(board[y][x])*3;
        var tempsafe = false;
        for(var freind = 0; freind < connections.length; freind++){
            tempsafe = checkLoop(connections[freind][0], connections[freind][1]);
            if(tempsafe){
                safe = true;
                board[y][x] = Math.sign(board[y][x])*2;
            }
        }
        if(safe){
            return true;
        } else{
            return false;
        }
    }
}
function Pass(who){
    if(who == whoseTurn && !gameOver){
        passesInARow++;
        whoseTurn*=-1;
        var toMoveBox = document.getElementById("toMoveBox");
        if(whoseTurn == -1){
            toMoveBox.style.color = "black";
            toMoveBox.style.backgroundColor = "white";
            toMoveBox.innerHTML = "'White' to move";
        } else{
            toMoveBox.style.color = "white";
            toMoveBox.style.backgroundColor = "black";
            toMoveBox.innerHTML = "'Black' to move";
        }
        if(passesInARow == 2){
            gameOver = true;
            toMoveBox.innerHTML = "Game Over! Mark Dead Stones";
            var hiddenButtons = document.getElementsByClassName("prButton");
            for(var h = 0; h < hiddenButtons.length; h++){
                hiddenButtons[h].style.visibility = "hidden";
            }
            var showButtons = document.getElementsByClassName("scoreButton");
            for(var b = 0; b < showButtons.length; b++){
                showButtons[b].style.visibility = "visible";
            }
            document.getElementById("colorButton").innerHTML = "Reset Scoring";
            gameMode = "mark dead";
        }
    }
}
function Resign(player){
    if(!gameOver){
        var makingSure = confirm("Is " + player + " sure they want to resign?");
        if(makingSure){
            gameOver = true;
            gameMode = "resignation";
            var toMoveBox = document.getElementById("toMoveBox");
            if(player == 'white'){
                toMoveBox.style.color = "white";
                toMoveBox.style.backgroundColor = "black";
                toMoveBox.innerHTML = "Black Wins!"

            } else{
                toMoveBox.style.color = "black";
                toMoveBox.style.backgroundColor = "white";
                toMoveBox.innerHTML = "White Wins!";
            }
        }
    }
}
function Restart(){
    location.reload();
}
function hideAndSeek(){
    if(!gameOver){
        if(showcolors){
            showcolors = false;
            document.getElementById("colorButton").innerHTML = "Show Colors";
        } else{
            showcolors = true;
            document.getElementById("colorButton").innerHTML = "Hide Colors";
        }
    } else if(gameMode != "resignation"){
        for(var dStone = 0; dStone < deadStones.length; dStone++){
            board[deadStones[dStone][1]][deadStones[dStone][0]] = deadStones[dStone][2];
            if(deadStones[dStone][2] == 1){
                whiteScore -= 1;
            } else{
                blackScore -= 1;
            }
        }
        for(var tratratra = 0; tratratra < territory.length; tratratra++){
            if(territory[tratratra][2] == 1){
                blackScore -= 1;
            } else{
                whiteScore -= 1;
            }
        }
        deadStones = [];
        territory = [];
        document.getElementById("blackScore").innerHTML = "+".concat(blackScore.toString());
        document.getElementById("whiteScore").innerHTML = "+".concat(whiteScore.toString());
        document.getElementById("blackEndButton").innerHTML = "Accept Dead Stones";
        document.getElementById("whiteEndButton").innerHTML = "Accept Dead Stones";
        gameMode = "mark dead";
        document.getElementById("toMoveBox").innerHTML = "Mark Dead Stones"
        whosReady = ""
    }
}
function markDead(x, y, kill){
    var neighbors = [];
    if(kill && board[y][x] != 0){
        try{
            if(board[y][x-1] == board[y][x]){
                neighbors.push([x-1, y]);
            } 
        } catch(err){}
        try{
            if(board[y-1][x] == board[y][x]){
                neighbors.push([x, y-1]);
            } 
        } catch(err){}
        try{
            if(board[y][x+1] == board[y][x]){
                neighbors.push([x+1, y]);
            } 
        } catch(err){}
        try{
            if(board[y+1][x] == board[y][x]){
                neighbors.push([x, y+1]);
            }
        } catch(err){}
        deadStones.push([x, y, board[y][x]]);
        if(board[y][x] == 1){
            whiteScore++;
        } else{
            blackScore++;
        }
        board[y][x] = 0;
        for(var voisin = 0; voisin < neighbors.length; voisin++){
            markDead(neighbors[voisin][0], neighbors[voisin][1], true);
        }
    } else if(!kill && board[y][x] == 0){
        var aliveIndex = undefined;
        for(var dRock = 0; dRock <deadStones.length; dRock++){
            if(deadStones[dRock][0] == x && deadStones[dRock][1] == y){
                aliveIndex = dRock;
            } else if(deadStones[dRock][0] == x-1 && deadStones[dRock][1] == y){
                neighbors.push(deadStones[dRock]);
            } else if(deadStones[dRock][0] == x && deadStones[dRock][1] == y-1){
                neighbors.push(deadStones[dRock]);
            } else if(deadStones[dRock][0] == x+1 && deadStones[dRock][1] == y){
                neighbors.push(deadStones[dRock]);
            } else if(deadStones[dRock][0] == x && deadStones[dRock][1] == y+1){
                neighbors.push(deadStones[dRock]);
            }
        }
        if(aliveIndex != undefined){
            var colorNumber = deadStones[aliveIndex][2];
            if(colorNumber == 1){
                whiteScore -= 1;
            } else{
                blackScore -= 1;
            }
            board[deadStones[aliveIndex][1]][deadStones[aliveIndex][0]] = deadStones[aliveIndex][2];
            deadStones.splice(aliveIndex, 1);
            for(var vecino = 0; vecino < neighbors.length; vecino++){
                if(neighbors[vecino][2] == colorNumber){
                    markDead(neighbors[vecino][0], neighbors[vecino][1], false);
                }
            }
        }
    }
}
var whosReady = ""
function endFunction(color){
    var pen = color.concat(" pen")
    if(gameMode == "mark dead"){
        if(whosReady == ""){
            whosReady = color;
            var buttonID = color.concat("EndButton");
            document.getElementById(buttonID).innerHTML = "Accept Dead Stones <img class='checkMark' src='png-transparent-check-mark-computer-icons-blue-check-mark-angle-text-logo-thumbnail-removebg-preview.png' height='12px'>";
        } else if(whosReady == color){
            whosReady = "";
            var buttonID = color.concat("EndButton");
            document.getElementById(buttonID).innerHTML = "Accept Dead Stones";
        } else{
            gameMode = "final scoring";
            document.getElementById("whiteEndButton").innerHTML = "Change Default Marking";
            document.getElementById("blackEndButton").innerHTML = "Change Default Marking";
            for(var color2 = 1; color2 >= -1; color2 -= 2){
                for(var y = 0; y < boardsize; y++){
                    for(var x = 0; x < boardsize; x++){
                        if(board[y][x] == 0){
                            board[y][x] = color2;
                        } else{
                            board[y][x] *= 4;
                        }
                    }
                }
                for(var y2 = 0; y2 < boardsize; y2++){
                    for(var x2 = 0; x2 < boardsize; x2++){
                        if(Math.abs(board[y2][x2]) == 1){
                            var loopResult = checkLoop(x2, y2);
                            for(var y3 = 0; y3 < boardsize; y3++){
                                for(var x3 = 0; x3 < boardsize; x3++){
                                    if(Math.abs(board[y3][x3]) == 3){
                                        if(!loopResult){
                                            territory.push([x3, y3, (color2*-1)]);
                                            if(color2 == 1){
                                                whiteScore++;
                                            } else{
                                                blackScore++;
                                            }
                                        }
                                        board[y3][x3] = Math.sign(board[y3][x3])*2;
                                    }
                                }
                            }
                        } else{
                            continue;
                        }
                    }
                }
                for(var y4 = 0; y4 < boardsize; y4++){
                    for(var x4 = 0; x4 < boardsize; x4++){
                        if(Math.abs(board[y4][x4]) != 4){
                            board[y4][x4] = 0;
                        } else{
                            board[y4][x4] = Math.sign(board[y4][x4]);
                        }
                    }
                }
            }
            for(var deadBoy = 0; deadBoy < deadStones.length; deadBoy++){
                var alreadyInside = false;
                for(var terrBoy = 0; terrBoy < territory.length; terrBoy++){
                    if(deadStones[deadBoy][0] == territory[terrBoy][0] && deadStones[deadBoy][1] == territory[terrBoy][1]){
                        if(deadStones[deadBoy][2] != territory[terrBoy][2]){
                            alreadyInside = true;
                        } else{
                            if(territory[terrBoy][2] == 1){
                                blackScore -= 1;
                            } else{
                                whiteScore -= 1;
                            }
                            territory.splice(terrBoy, 1);
                        }
                    } 
                }
                if(!alreadyInside){
                    territory.push([deadStones[deadBoy][0], deadStones[deadBoy][1], deadStones[deadBoy][2]*-1]);
                    if(deadStones[deadBoy][2] == 1){
                        whiteScore++;
                    } else{
                        blackScore++;
                    }
                }
            }
            document.getElementById("blackScore").innerHTML = blackScore.toString();
            document.getElementById("whiteScore").innerHTML = whiteScore.toString();
            var toMoveBox = document.getElementById("toMoveBox");
            if(blackScore > whiteScore){
                toMoveBox.style.color = "white";
                toMoveBox.style.backgroundColor = "black";
                toMoveBox.innerHTML = "Black Wins!"
            } else{
                toMoveBox.style.color = "black";
                toMoveBox.style.backgroundColor = "white";
                toMoveBox.innerHTML = "White Wins!";
            }
        }
    } else if(gameMode == pen){
        gameMode = "final scoring"
        var buttonID = color.concat("EndButton");
        document.getElementById(buttonID).innerHTML = "Change Default Marking"
    } else{
        gameMode = pen;
        if(color == "black"){
            document.getElementById("blackEndButton").innerHTML = "Change Default Marking <img class='checkMark' src='pngtree-pen-icon-isolated-design-png-image_5045590-removebg-preview.png' height='14px'>"
            document.getElementById("whiteEndButton").innerHTML = "Change Default Marking"
        } else{
            document.getElementById("whiteEndButton").innerHTML = "Change Default Marking <img class='checkMark' src='pngtree-pen-icon-isolated-design-png-image_5045590-removebg-preview.png' height='14px'>"
            document.getElementById("blackEndButton").innerHTML = "Change Default Marking"
        }
    } 
}
function showSettings(){
    if(recent.length == 0){
        document.getElementById("settingsBox").style.visibility = "visible";
    } else{
        var newGame = confirm("Settings can only be changed before the game begins. Would you like to start a new game?");
        if(newGame){
            location.reload();
        }
    }
}
function cancelSettings(){
    document.getElementById("settingsBox").style.visibility = "hidden";
    if(boardsize == 9){
        boardSetting = 9;
        document.getElementById("9Box").style.color = "black";
        document.getElementById("13Box").style.color = "lightgrey";
        document.getElementById("19Box").style.color = "lightgrey";
    } else if(boardsize == 13){
        boardSetting = 13;
        document.getElementById("9Box").style.color = "lightgrey";
        document.getElementById("13Box").style.color = "black";
        document.getElementById("19Box").style.color = "lightgrey";
    } else if(boardsize == 19){
        boardSetting = 19;
        document.getElementById("9Box").style.color = "lightgrey";
        document.getElementById("13Box").style.color = "lightgrey";
        document.getElementById("19Box").style.color = "black";
    }
    document.getElementById("komiInput").value = whiteScore;
    document.getElementById("handyInput").value = handicap;
    boardSetting = boardsize;
}
function apply(){
    boardsize = boardSetting;
    board = [];
    for(var b = 0; b < boardsize; b++){
        board.push([]);
        kocheck.push([]);
        for(var c = 0; c < boardsize; c++){
            board[b].push(0);
            kocheck[b].push(0);
        }
    }
    var holder = document.getElementById("myContainer");
    if(boardsize == 19){
        holder.style.left = "8px";
        holder.style.top = "8px";
    } else if(boardsize == 13){
        holder.style.left = "98px";
        holder.style.top = "98px";
    } else{
        holder.style.left = "158px";
        holder.style.top = "158px";
    }
    whiteScore = document.getElementById("komiInput").value;
    handicap = document.getElementById("handyInput").value;
    var d = 4;
    if(boardsize == 9){
        d = 3;
    }
    var handicapOrder = [[boardsize-d, d-1], [d-1, boardsize-d], [boardsize-d, boardsize-d], [d-1, d-1], [Math.floor(boardsize/2), Math.floor(boardsize/2)], [d-1, Math.floor(boardsize/2)], [boardsize-d, Math.floor(boardsize/2)], [Math.floor(boardsize/2), d-1], [Math.floor(boardsize/2), boardsize-d]]
    if(handicap == 1){
        whiteScore = 0.5;
        whiteScore = document.getElementById("komiInput").value = 0
        handicap = 0;
    }
    for(var hand = 0; hand < 9; hand++){
        if(hand < handicap){
            board[handicapOrder[hand][1]][[handicapOrder[hand][0]]] = 1;
        } else{
            board[handicapOrder[hand][1]][[handicapOrder[hand][0]]] = 0;
        }
    }
    whoseTurn = -1
    var toMoveBox = document.getElementById("toMoveBox");
    toMoveBox.style.color = "black";
    toMoveBox.style.backgroundColor = "white";
    toMoveBox.innerHTML = "'White' to move";
    document.getElementById("whiteScore").innerHTML = "+".concat(whiteScore.toString());
    document.getElementById("settingsBox").style.visibility = "hidden";
}
function changeBoard(size){
    if(size == 9){
        boardSetting = 9;
        document.getElementById("9Box").style.color = "black";
        document.getElementById("13Box").style.color = "lightgrey";
        document.getElementById("19Box").style.color = "lightgrey";
    } else if(size == 13){
        boardSetting = 13;
        document.getElementById("9Box").style.color = "lightgrey";
        document.getElementById("13Box").style.color = "black";
        document.getElementById("19Box").style.color = "lightgrey";
    } else if(size == 19){
        boardSetting = 19;
        document.getElementById("9Box").style.color = "lightgrey";
        document.getElementById("13Box").style.color = "lightgrey";
        document.getElementById("19Box").style.color = "black";
    }
}