
function getTotal() {

    const table = document.getElementById("discTable");
    var total = 0;

    for (var i = 1; i < table.rows.length; i++) {
        var num=parseInt(table.rows[i].cells[1].children[0].value);
        if(typeof num =="number")
        total = parseInt(total) + num;
    }
    document.getElementById("total").innerHTML = total;
}

function addNewField() {
    const table = document.getElementById("discTable");
    const count = table.rows.length;
    const row = table.insertRow(count);

    const x = document.createElement("INPUT");
    x.setAttribute("type", "text");

    const cell1 = row.insertCell(0);
    cell1.appendChild(x);
    const y = document.createElement("INPUT");
    y.setAttribute("type", "number");
    y.setAttribute("onchange", "getTotal()");
    const cell2 = row.insertCell(1);
    cell2.appendChild(y);

}
function savedata() {

    localStorage.name = document.getElementById("name").value;
    localStorage.email = document.getElementById("email").value;
    localStorage.date =  document.getElementById("date").value;

    const table = document.getElementById("discTable");
    const item =  [];
    const desc = [];
    for (var i = 1; i < table.rows.length; i++) {
        item.push(parseInt(table.rows[i].cells[1].children[0].value));
        desc.push(table.rows[i].cells[0].children[0].value);
    }
    localStorage.amount = JSON.stringify(item);
    localStorage.description = JSON.stringify(desc);
    localStorage.total =  document.getElementById("total").innerHTML;

    console.log(localStorage.name);
    console.log(localStorage.email);
    console.log(localStorage.date);
    console.log(localStorage.description);
    console.log(localStorage.amount);
    console.log(localStorage.total);
}
function validation(){

  var name = document.getElementById("name").value;
  if (name == "") {
        alert("Please fill the name");
        return false;
    }


  function validateEmail(){ 
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(!document.getElementById("email").value.match(mailformat))
{alert("You have entered an invalid email address!");
return;
}




savedata();



}
