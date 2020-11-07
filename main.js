function ExpandLeftNav()
{
    document.getElementById("leftNav").style.width = "13vw";
    var navText = document.getElementsByClassName("navText");
    for (i = 0 ; i < navText.length; i++)
    {
        navText[i].style.display = "table-cell";
    }
}

function CloseLeftNav()
{
    document.getElementById("leftNav").style.width = "4.2vw";
}
