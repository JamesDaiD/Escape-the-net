var word1 = "";
var blanksA = new Array(20);
var res;
var wrongCount = 0;
var rightCount = 0;
var TOTAL_CHANCES = 8;
var gameover = false;
function StartGame(){
    var wrongCount = 0;
    var wordList = 
        ["HOPE",
        "SEE"]
    gameover = false;
    createalpha();
    document.getElementById("resetBtn").disabled = false;
    document.getElementById("startBtn").disabled = true;
    var rando = Math.floor(Math.random() * wordList.length);
    word1 = wordList[rando];
    res = word1.split('');
    
    for (i=0; i < word1.length; i++) //loop to generate arrays of _
    {
        blanksA[i] = "_";
    }
    document.getElementById("Feedback").innerHTML = "You will have " + TOTAL_CHANCES + " chances.";
    printField();
}

function printField()
{ 
    document.getElementById("Blanks").innerHTML = ""; //clean playing field before printing more
    for (j=0; j < word1.length; j++)
    {
        var character = document.createTextNode (blanksA[j] + " "); //prints out the _ (or correct character)
        document.getElementById("Blanks").appendChild(character);
    }
}


function CheckAnswer(event)
{
    if (gameover == false)
    {
        if (event.target.style.backgroundColor != "lightgray")
        {
            var charValue = event.target.innerHTML; //get character inside td
            event.target.style.backgroundColor = "lightgray";
            var charExist = false;
            for (i = 0; i < res.length; i++)
            {
                if( charValue == res[i])
                {
                    blanksA[i] = res[i]; // if guessed character match character in answer, reveal it
                    charExist = true;
                    rightCount++;
                }
            }
            if (rightCount == res.length) //winning 
            {
                document.getElementById("Feedback").innerHTML = "You Win!!!";
                document.getElementById("stickImg").src = "hangman/happyhap.gif";
                gameover = true;
                clearInterval(begin);
            }
            if (charExist == false) //Wrong guess
            {
                wrongCount++;
                document.getElementById("Feedback").innerHTML = "You have made " + wrongCount + " mistakes."
                + "<br>You have " + (TOTAL_CHANCES - wrongCount) + " chances left";
                AnimateStick();
            }
            if (wrongCount == TOTAL_CHANCES) //losing
            {
                document.getElementById("Feedback").innerHTML = "Out of tries! Game over.";
                gameover = true;
            }
            
            printField(); //update playing field
        }
        else
        {
            alert("Character already guessed! Please select another character.")
        }
    }
    else 
    {
        alert("Please start a new game");
    }

}

function ResetGame()

{
    wrongCount = 0;
    rightCount = 0;
    document.getElementById("resetBtn").disabled = true;
    document.getElementById("startBtn").disabled = false;
    document.getElementById("myRow").innerHTML= "";
    gameover = false;
    document.getElementById("Feedback").innerHTML = "";
    document.getElementById("Blanks").innerHTML = "";
    document.getElementById("stickImg").src ="hangman/hang.jpg";
    clearInterval(begin);
}

function createalpha()
{
    l = 64; //Use ASCII code from 64+1 to create alphabet
    for (i=1;i<27;i++)
    {
        var row = document.getElementById("myRow");
        var chr = String.fromCharCode(l+i);
        var x = row.insertCell(-1);
        x.className = "charButtons"; //set class for all created Cells (to use with onclick Events later)
        x.innerHTML = chr;
    }
    SetupClickEvents();   
}

function SetupClickEvents() 
{
    var charsBtn = document.getElementsByClassName("charButtons"); //get all add to cart buttons
    for (var i = 0; i < charsBtn.length; i++) 
    {
        charsBtn[i].addEventListener('click', CheckAnswer); //make buttons respond to onClick events
    }
}


var imageArray = new Array(8);

var counterImgA = 0;
var begin;
var imagesLoaded = 0;

for (i = 0; i < imageArray.length; i++) //loop to set img array
{
    imageArray[i] = new Image(); //implement image
    imageArray[i].src = "hangman/hang" + i + ".JPG"; //give image to elements of image array
}

function AnimateStick()
{
    if (begin)
    {
        clearInterval(begin);
    }

    begin = setInterval("runAnimation()", 250); // run stickAnimation() every 50 seconds
}

function runAnimation() {
    if (counterImgA == wrongCount)
    {
        counterImgA = 0; //loop animation
    }
    else
    {
        document.getElementById("stickImg").src = imageArray[counterImgA].src; //chage pictures img[0] = first img in HTML file  
        counterImgA++;
    }
}