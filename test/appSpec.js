const expect = chai.expect

describe('Basic tests for validation', function() {
  it(' Should return true for name value provided', function() {
    $("#app-content-wrapper").html( "<input type='text' id='name' value='swati shreya'/>");
    var value = helpers.validateName();
    expect(value).to.be.true;

  });

  it('should return true for email validation true', function() {
    $("#app-content-wrapper").html("<input type='email' id='email' value='abc@gmail.com'/>");
    var value = helpers.validateEmail();
    expect(value).to.be.true;

  });

  afterEach(function() {
    $("#app-content-wrapper").html("");
  });


});
