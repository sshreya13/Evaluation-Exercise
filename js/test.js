
function getTotal() {
    const table = document.getElementById("discTable");
    let total = 0;
    for (let i = 1; i < table.rows.length; i++) {

        total = parseInt(total) + parseInt(table.rows[i].cells[1].children[0].value);
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
    y.setAttribute("type", "text");
    y.setAttribute("onchange", "getTotal()");
    const cell2 = row.insertCell(1);
    cell2.appendChild(y);

}
function savedata() {
    validation();
    localStorage.name = document.getElementById("name").value;
    localStorage.email = document.getElementById("email").value;
    localStorage.date =  document.getElementById("date").value;

    const table = document.getElementById("discTable");
    const item =  [];
    const desc = [];
    for (let i = 1; i < table.rows.length; i++) {
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
