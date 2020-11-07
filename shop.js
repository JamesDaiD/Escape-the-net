var addButtons = document.getElementsByClassName("addCartBtn"); //get all add to cart buttons
    for (var i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener('click', addToCart); //make buttons respond to onClick events
    }
var cart = document.getElementById("cart");
function addToCart(event) {
    var itemAtHand = event.target.parentElement.parentElement.parentElement; //target table which holds item
    
    var itemName = itemAtHand.rows[1].cells[0].innerHTML; //get item name
    var itemPrice = itemAtHand.rows[1].cells[1].innerHTML; //get item price
    var itemImage = itemAtHand.rows[0].cells[0].innerHTML;
    
    var price = itemPrice.split("$"); //split string to get price

    cart.style.display = "";

    for (i = 0; i < cart.rows.length; i++) //looks through all table rows
    {
        if (cart.rows[i].cells[0].innerHTML == itemName) //looks for matching item in table to increase quantity (comparing cart item to menu item)
        {
            cart.rows[i].cells[2].innerHTML = parseInt(cart.rows[i].cells[2].innerHTML) + 1; //increase item quantity
            cart.rows[i].cells[3].innerHTML = "$" + price[1] * parseInt(cart.rows[i].cells[2].innerHTML); //total = Price * Quantity
            OpenCart();
            return; //stop looping table once found
        }
        if (i == cart.rows.length - 1) //reached end of table without finding any match => add new row for item
        {
            var newRow = cart.insertRow(cart.length);
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            var cell4 = newRow.insertCell(3);
            var cell5 = newRow.insertCell(4);
            var cell6 = newRow.insertCell(5);

            cell1.innerHTML = itemName; //get item name
            cell2.innerHTML = itemPrice; //get price
            cell3.innerHTML = 1; // 1st item
            cell4.innerHTML = "$" + price[1] * 1; //total = Price * Quantity
            cell5.innerHTML = itemImage; //get image
            cell6.innerHTML = '<input type="button" class="removeItem" value="Remove Item" ></input>';
            SetupButtons(); //setup Remove Item buttons
            OpenCart();
        }
    }
}

function SetupButtons() {
    //find all Remove item buttons
    var removeButtons = document.getElementsByClassName("removeItem");
    for (var i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', RemoveItem); //make buttons respond to onClick events
    }
}
function RemoveItem(event) {
    var workingRow = event.target.parentElement.parentElement; //targets <tr> with clicked remove button in it
    var q = workingRow.cells[2].innerHTML; //gets quantity from cart table
    
    if (q > 1) {
        workingRow.cells[2].innerHTML = q - 1; //decrease item quantity
        var price = workingRow.cells[1].innerHTML.split("$"); //split string from Price collumn to get price
        workingRow.cells[3].innerHTML = "$" + parseInt(workingRow.cells[2].innerHTML * price[1]); //update total item price
    }
    else if (q = 1) {
        workingRow.cells[2].innerHTML = q - 1; //decrease quantity by 1
        event.target.parentElement.parentElement.remove(); //removes whole row
    }
    DisplayTotal();
}

var totalPrice = 0;
var totalQuantity = 0;
function DisplayTotal() {
    var price = 0;
    totalPrice = 0;
    totalQuantity = 0;

    for (i = 1; i < cart.rows.length; i++) {
        price = cart.rows[i].cells[3].innerHTML.split("$"); //split string to get price
        totalPrice = parseInt(totalPrice) + parseInt(price[1]); //add to total
    }

    if (totalPrice == 0) {
        total.innerHTML = "Basket is empty.</br>Buy something!";
        cart.style.display = "none"; //hide table when cart is empty
    }
    else {
        total.innerHTML = "Your total bill is $" + totalPrice;
        
        // for (i = 1; i < cart.rows.length; i++) {
        //     totalQuantity = parseInt(totalQuantity) + parseInt(cart.rows[i].cells[2].innerHTML); //add to total
        // }
        // openCart.value = totalQuantity + " Items" ; //display quantity on open cart button
    }
}


function OpenCart() {
    document.getElementById("modal").style.height="50vh";
    DisplayTotal();
    
}
function closeNav() {
    document.getElementById("modal").style.height = "0%";
}