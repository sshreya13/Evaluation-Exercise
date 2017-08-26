/*var appState = {
	invoiceItemsIDCounter: 1
};*/
var helpers = {


	
	validateEmail: function () {

	},
	handleAmountChange: function() {
console.log("changed");

	},
	handleAddItem: function() {

  var htmlStr = '<div class="row">' +
      '<div class="form-group">' +
        '<div class="col-md-9 col-padding-fix">' +
        '  <input type="text" class="form-control item_description" placeholder="Enter description" >'+
         ' </div>' +
        '<div class="col-md-3 col-padding-fix">' +
         '<input type="number" class="form-control item_amount" onchange="helpers.handleAmountChange()" placeholder="Enter amount" >'+
          '</div>' +
  '  </div>' +
'  </div>' ;

$("#invoice_items").append(htmlStr);

},

	handleSaveInvoice: function (){

	},
  calculateTotalAmount: function () {

  },

  saveInvoice: function (){

  },
};


var app = {
	start: function() {
		console.log('application starting');


	}
};
