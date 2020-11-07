var taunt = [
    "Sorry, try again.",
    "It's not even hard.",
    "The answer is RIGHT THERE!.",
    "Try clicking the light bulb.",
    "I give up. You should go have a KitKat.",
    "There are no regrets in life, just lessons."
]

var btnGo = document.getElementById("btnGo");
var touch = 0;

//Makes pressing enter in inpMain press btnGo
inpMain.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    //  event.preventDefault();
     document.getElementById("btnGo").click();
    }
});


function wait(ms)
{
    var start = new Date().getTime();
    var now = start;
    while(now < start + ms) 
    {
      now = new Date().getTime();
    }
}
function runButtonRun()
{
    if(touch < 1)
    {
        btnGo.style.right = "-50vw";
        touch++;
    }
    else if(touch >= 1 && touch < 7 )
    {
        btnGo.style.top = (Math.random()*300)+"px";
        btnGo.style.right = (Math.random()*150)+"px";
        touch++;
    }
    else if(touch >=7)
    {
        btnGo.style.transition = "0.8s";
        wait(300);
        btnGo.style.right = "120vw";
        // btnGo.style.display = "none";
    }
}

function bulbClicked()
{
    alert("yep, the password is bulb");
}

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
var guess = 0;
function CheckInput()
{
    var uInput = document.getElementById("inpMain").value.toLowerCase();
    if (guess < 5)
    {
        if (uInput == "bulb")
        {
            Congratulations();
        }
        else if(uInput == "help")
        {
            alert("No hint for this level.")
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
}

function Finish2()
{
    window.location.href = "level3.html";
}