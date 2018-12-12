var shapeClickedTime;
var shapeCreatedTime;

var clickCount = 0;
var finalClickCount = 10;
var reactionTimeArray = new Array();

var averageScore = 0;

var quickestTime = 0;

var myHighScore = 0;

document.getElementById("start").onclick = function() {

    resetGame();

    clickCount++;

    document.getElementById("reaction-area").style.display = "block";
    document.getElementById("score-table").style.display = "none";
    document.getElementById("state").innerHTML = "State: " + clickCount + "/" + finalClickCount;
    createShape();

}


document.getElementById("shape").onclick = function() {


    if(clickCount == finalClickCount) {

        document.getElementById("state").innerHTML = "State: " + clickCount + "/" + finalClickCount;

        endGame();

    } else {


        shapeClickedTime = new Date();
        shapeClickedTime.getMilliseconds();

        document.getElementById("shape").style.display = "none";

        // bekle
        // yeni şekil gelsin

        var delayForNewShape = Math.floor((Math.random() * 1000));

        setTimeout(createShape, delayForNewShape);

        var reactionTime = (shapeClickedTime - shapeCreatedTime)/1000;

        if (quickestTime == 0) {

            quickestTime = reactionTime;

        }

        if (reactionTime < quickestTime) {

            quickestTime = reactionTime;

        }

        document.getElementById("quickestTime").innerHTML = "Quickest reaction time: <span style='color: red'>" + quickestTime + " seconds</span>";

        document.getElementById("reactionTime").innerHTML = "Reaction time: <span style='color: red'>" + reactionTime + " seconds</span>"; 

        document.getElementById("state").innerHTML = "State: " + clickCount + "/" + finalClickCount;

        reactionTimeArray.push(reactionTime);


        console.log(reactionTimeArray);

    }



}

function createShape(){

    if(clickCount < finalClickCount) {

        shapeCreatedTime = new Date();
        shapeCreatedTime.getMilliseconds();

        var shapeStyle = document.getElementById("shape").style;

        var areaSize = document.getElementById("reaction-area");

        var randomSize = Math.floor((Math.random() * (100)) + 50);

        var randomPosLeft = Math.floor((Math.random() * (areaSize.offsetWidth - 150)));

        var randomPosTop = Math.floor((Math.random() * (areaSize.offsetHeight - 150)));

        var colors = ["white", "silver", "gray", "black", "red", "maroon", "yellow", "olive", "lime", "green", "aqua", "teal", "blue", "navy", "fuchsia", "purple"];

        var randomColor = Math.floor((Math.random() * (15)));

        var randomShape = Math.floor((Math.random() * (2)));

        // 0 for square, 1 for circle 

        shapeStyle.width = randomSize;
        shapeStyle.height = randomSize;
        shapeStyle.position = "relative";
        shapeStyle.top = randomPosTop;
        shapeStyle.left = randomPosLeft;
        shapeStyle.backgroundColor = colors[randomColor];          
        shapeStyle.display = "block";

        if(randomShape == 0) {

            // square

            shapeStyle.borderRadius = "0%";

        } else {

            // circle

            shapeStyle.borderRadius = "50%";   

        }

        clickCount++;

    } else if(clickCount == finalClickCount) {

        endGame();

    } else {

        console.log("Error");

    }

}

function endGame() {

    document.getElementById("reaction-area").style.display = "none";

    for(var i=0; i<reactionTimeArray.length; i++) {

        averageScore += reactionTimeArray[i];

    }

    averageScore = averageScore/clickCount;
    averageScore = Math.round(averageScore * 1000) / 1000;

    document.getElementById("score-table").innerHTML = "Average Reaction Time : " + averageScore + " seconds<br>Quickest Reaction Time : " + quickestTime + " seconds";

    if(averageScore <= 0.400) {

        document.getElementById("score-table").innerHTML = document.getElementById("score-table").innerHTML + "<br><img id='result-image' class='center' src='images/good.gif'>" + "<br><span id='result-text'>Teach me master!</span>";

    } else if(averageScore > 0.400 && averageScore <= 0.700 ) {

        document.getElementById("score-table").innerHTML = document.getElementById("score-table").innerHTML + "<br><img id='result-image' class='center' src='images/okay.gif'>" + "<br><span id='result-text'>Not bad</span>";

    } else {

        document.getElementById("score-table").innerHTML = document.getElementById("score-table").innerHTML + "<br><img id='result-image' class='center' src='images/bad.gif'>" + "<br><span id='result-text'>Just go away</span>";

    }

    document.getElementById("score-table").style.display = "block";
    
    if(myHighScore == 0) {
        
        myHighScore = averageScore;
        
        document.getElementById("myHighScore").innerHTML = "High Score: " + myHighScore;
        
    }
    
    if(averageScore < myHighScore) {
        
        myHighScore = averageScore;
        
        document.getElementById("myHighScore").innerHTML = "High Score: " + myHighScore;
        
    }

    resetGame();

}  

function resetGame() {

    clickCount = 0;

    averageScore = 0;

    reactionTimeArray = [];

    quickestTime = 0;

    document.getElementById("reactionTime").innerHTML = "Reaction time: ";

    document.getElementById("quickestTime").innerHTML = "Quickest reaction time: ";

    document.getElementById("state").innerHTML = "State: ";


}