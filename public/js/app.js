var helpers = {

  validateName: function() {
    var name = $("#name").val();
    if (name == "") {
      $("#name").parent().addClass("has-error");
      $("#name").parent().find(".error-text").text("Please fill the name");
      return false;
    }
    $("#name").parent().removeClass("has-error");
    $("#name").parent().find(".error-text").text("");
    return true;
  },

  validateEmail: function() {
    var email = $("#email").val();
    if (email == "") {
      $("#email").parent().addClass("has-error");
      $("#email").parent().find(".error-text").text("Please fill the email");
      return false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      $("#email").parent().addClass("has-error");
      $("#email").parent().find(".error-text").text("Email format not correct");
      return false;
    }
    $("#email").parent().removeClass("has-error");
    $("#email").parent().find(".error-text").text("");
    return true;
  },

  handleAmountChange: function() {
    var totalAmount = helpers.calculateTotalAmount();
    helpers.updateTotalAmountToUI(totalAmount);
  },

  handleAddItem: function() {
    var htmlStr = '<div class="row invoice_items_row">' +
    '<div class="form-group">' +
    '<div class="col-md-9 col-padding-fix">' +
    '  <input type="text" class="form-control item_description" placeholder="Enter description" >' +
    ' </div>' +
    '<div class="col-md-3 col-padding-fix">' +
    '<input type="number" class="form-control item_amount" onchange="helpers.handleAmountChange()" placeholder="Enter amt" >' +
    '</div>' +
    '  </div>' +
    '  </div>';

    $("#invoice_items").append(htmlStr);
  },

  calculateTotalAmount: function() {
    var items = $("#invoice_items .item_amount");
    var sumTotal = 0;
    $.each(items, function(index, item) {
      var _value = $(item).val();
      if (_value != "") {
        sumTotal += parseInt(_value);
      }
    });
    return sumTotal;
  },
  updateTotalAmountToUI: function(totalAmount) {
    $("#total").text(totalAmount);
  },

  preview: function() {
    $("#myTable tr").remove();
    $('.previewDiv').css('display', 'block');
    $("#nameValue").text(localStorage.name);
    $("#emailValue").text(localStorage.email);

    $("#duedateValue").text(localStorage.date);
    $("#totalValue").text(localStorage.total);

  },
  hidepreview: function() {
    $('.previewDiv').css('display', 'none');
    $("#btn_preview").css('display', 'block');
    $("#hide_preview").css('display', 'none');

  },
  saveInvoice: function() {
    $("#hide_preview").css('display', 'none');
    $("#btn_preview").css('display', 'block');

    if (!helpers.validateName()) {
      return false;
    }
    if (!helpers.validateEmail()) {
      return false;
    }

    var tempData = {}
    invoiceItems = [];
    var tempData = {
      id: (new Date()).getTime(),
      name: $("#name").val(),
      email: $("#email").val(),
      date: $("#duedate").val(),
      invoiceItems: invoiceItems,
      total: $("#total").text()

    };

    items_row_array = $("#invoice_items .invoice_items_row")
    $.each(items_row_array, function(index, item_row) {
      var desc = $($(item_row).find(".item_description")[0]).val();
      var amount = $($(item_row).find(".item_amount")[0]).val();
      if (amount != "")
        invoiceItems.push({desc: desc, amount: amount})
    });

    var m_invoiceData = {};
    if (localStorage.invoiceData) {
      m_invoiceData = JSON.parse(localStorage.invoiceData);
    } else {
      m_invoiceData.data = []
    }
    m_invoiceData.data.push(JSON.stringify(tempData));
    localStorage.invoiceData = JSON.stringify(m_invoiceData);
    console.log(JSON.stringify(localStorage.invoiceData));

    /*var ajaxParams = {
      url: '/invoices',
      type: 'post',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(m_invoiceData),
      success: function(data, textStatus, jQxhr) {
        console.log("Saved invoice data successfully", data);
      },
      error: function(jqXhr, textStatus, errorThrown) {
        console.log("Error saving invoice data");
      }
    };
    $.ajax(ajaxParams);*/

    $("#invoice-form")[0].reset();
    location.reload();
    return false;

  },
  preview: function() {
    $("#hide_preview").css('display', 'block');

    $("#btn_preview").css('display', 'none');

    $("#myTable").empty();
    var htmlStr = '<thead> <tr><th>InvoiceID</th><th>Name</th><th>Email</th> <th>Total</th> </tr></thead>'
    $("#myTable").append(htmlStr);

    $('.previewDiv').css('display', 'block');
    var tableData = [];
    if (localStorage.invoiceData) {
      tableData = JSON.parse(localStorage.invoiceData).data;
    }
    for (var i = 0; i < tableData.length; i++) {
      var temp = JSON.parse(tableData[i]);
      $('#myTable tr:last').after('<tr><td>' + temp.id + '</td><td>' + temp.name + '</td><td>' + temp.email + '</td><td>' + temp.total + '</td></tr>');
    }
  }
};

$("#name").keypress(function(e) {
  var code = e.keyCode;
  if ((code < 65 || code > 90) && (code < 97 || code > 122) && code != 32 && code != 46) {
    alert("Only alphabets are allowed");
    return false;
  }
});
function addDaysToCurrentDate(numDays) {
  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + numDays);
  return currentDate;
}

function formatDate(dateVal) {
  var year = dateVal.getFullYear();
  var month = dateVal.getMonth() + 1;
  var dt = dateVal.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }
  return year + "-" + month + "-" + dt;
}

$("#duedate").val(formatDate(addDaysToCurrentDate(30)));

//type ahead functionality for name

$(function() {

  var availableTags = [];

  if (localStorage.invoiceData) {
    tableData = JSON.parse(localStorage.invoiceData).data;

    for (var i = 0; i < tableData.length; i++) {
      var temp = JSON.parse(tableData[i]);
      if ($.inArray(temp.name, availableTags) < 0) {
        availableTags.push(temp.name);
      }
    }

  }

  $("#name").autocomplete({
    source: function(request, response) {

      var matches = $.map(availableTags, function(acItem) {

        if (acItem.toUpperCase().indexOf(request.term.toUpperCase()) >= 0) {

          return acItem;
        }
      });
      response(matches);
    }
  });

});

var app = {
  start: function() {
    console.log('application starting');

  }
};
