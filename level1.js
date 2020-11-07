var taunt = [
    "Sorry, try again.",
    "You're welcome to be wrong again.",
    "The key to success is many failures.",
    "In the end… We only regret the chances we didn’t take.",
    "Maybe you should have a break, have a KitKat!",
    "There are no regrets in life, just lessons."
]
var wrongTable = document.getElementById("wrongTable");

var hint = 0; //amount of hint used
var guess = 0; //amount of guesses used

//Makes pressing enter in inpMain press btnGo
inpMain.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    //  event.preventDefault();
     document.getElementById("btnGo").click();
    }
});
function Validate()
{
    if (document.getElementById("inpMain").value == "")
    {
        alert("Please enter a guess");
    }
    else
    {
        CheckInput();
    }
}

function CheckInput()
{
    var uInput = document.getElementById("inpMain").value.toLowerCase();
    if (guess < 5)
    {
        if (uInput == "hello")
        {
            Congratulations();
        }
        else if(uInput == "help")
        {
            hint++;
            DisplayHints(hint);
        }
        else
        {
            //Add taunt
            var wrong = document.createElement("p");
            var node = document.createTextNode(taunt[guess]);
            wrong.appendChild(node);
            document.getElementById("instruction").appendChild(wrong);

            guess++;
            console.log(guess);

            var newRow = wrongTable.insertRow(wrongTable.length);
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            cell1.innerHTML = guess;
            cell2.innerHTML = uInput;
        }
    }
    else if (guess >= 5)
    {
        //TODO: make more of an impact
        alert("Game Over!");
    }
    document.getElementById("inpMain").value = "";
}
function Congratulations()
{
    document.getElementById("congrats").style.display = "block";
    document.getElementById("instruction").style.display = "none";
    document.getElementById("hint0").style.display = "none";
    document.getElementById("hint1").style.display = "none";
    document.getElementById("hint2").style.display = "none";
    document.getElementById("hint3").style.display = "none";
}
function DisplayHints(hint)
{
    document.getElementById("hint0").style.display = "none";
    if (hint==1)
    {
        document.getElementById("hint1").style.display = "block";
        document.getElementById("hint2").style.display = "none";
        document.getElementById("hint3").style.display = "none";
    }
    else if (hint==2)
    {
        document.getElementById("hint1").style.display = "none";
        document.getElementById("hint2").style.display = "block";
        document.getElementById("hint3").style.display = "none";
    }
    else if (hint==3)
    {
        document.getElementById("hint1").style.display = "none";
        document.getElementById("hint2").style.display = "none";
        document.getElementById("hint3").style.display = "block";
    }
    else if(hint>3)
    {
        alert("out of hints");
    }
}

function Finish()
{
    window.location.href = "level2.html";
}