
var helpers = {

  validateEmail: function() {

    //to do
  },
  handleAmountChange: function() {
  var totalAmount = helpers.calculateTotalAmount();
    helpers.updateTotalAmountToUI(totalAmount);

  console.log("changed");

  },
  handleAddItem: function() {

    var htmlStr = '<div class="row">' +
    '<div class="form-group">' +
    '<div class="col-md-9 col-padding-fix">' +
    '  <input type="text" class="form-control item_description" placeholder="Enter description" >' +
    ' </div>' +
    '<div class="col-md-3 col-padding-fix">' +
    '<input type="number" class="form-control item_amount" onchange="helpers.handleAmountChange()" placeholder="Enter amount" >' +
    '</div>' +
    '  </div>' +
    '  </div>';

    $("#invoice_items").append(htmlStr);

  },


  calculateTotalAmount: function() {
    var items = $("#invoice_items .item_amount");
    var sumTotal = 0;
    $.each(items, function (index, item) {
      var _value = $(item).val();
      if (_value != "") {
        sumTotal += parseInt(_value);
      }
    });
    return sumTotal;
  },
  updateTotalAmountToUI: function (totalAmount) {
		$("#total").text(totalAmount);
	},

  saveInvoice: function() {

localStorage.name = $("#name").val();
localStorage.email = $("#email").val();
localStorage.date =  $("#duedate").val();
/*
invoiceItems = [];
		items_row_array = $("#invoice_items .invoice_items_row")
		$.each(items_row_array, function(index, item_row) {
			invoiceItems.push({
				desc: $($(item_row).find(".item_desc")[0]).val(),
				amount: $($(item_row).find(".item_age")[0]).val()
			})
		}); 
*/

localStorage.total =  $("#total").text();
console.log(localStorage.name);
console.log(localStorage.email );
console.log(localStorage.date );
console.log(localStorage.total );
  },
};

var app = {
  start: function() {
    console.log('application starting');

  }
};
