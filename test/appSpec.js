const expect = chai.expect

describe('Basic tests for validation', function() {
  it(' Should return true for name value provided', function() {
    $("#app-content-wrapper").html( "<input type='text' id='name' value='swati shreya'/>");
    var value = helpers.validateName();
    expect(value).to.be.true;

  });
  it(' Should return false for name value not provided', function() {
    $("#app-content-wrapper").html( "<input type='text' id='name' value=''/>");
    var value = helpers.validateName();
    expect(value).to.be.false;

  });

  it('should return true for email validation true', function() {
    $("#app-content-wrapper").html("<input type='email' id='email' value='abc@gmail.com'/>");
    var value = helpers.validateEmail();
    expect(value).to.be.true;

  });
  it('should return false for email value not provided ', function() {
    $("#app-content-wrapper").html("<input type='email' id='email' value=''/>");
    var value = helpers.validateEmail();
    expect(value).to.be.false;
});

it('should return false for email value being incorrect ', function() {
  $("#app-content-wrapper").html("<input type='email' id='email' value='invalid email'/>");
  var value = helpers.validateEmail();
  expect(value).to.be.false;
});



  afterEach(function() {
    $("#app-content-wrapper").html("");
  });


});
