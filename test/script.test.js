describe('timerValue', function(){
  it('is defined', function(){
    expect(timerValue).to.not.be.a('undefined')
  });
});

describe('tickTitle()', function(){
  it('is defined', function(){
    expect(tickTitle).to.not.be.a('undefined');
  });
  it('is a function', function(){
    expect(tickTitle).is.a('function');
  });
});
describe('formatTime(seconds)', function() {
  it('is defined', function(){
    expect(formatTime).to.not.be.a('undefined');
  });
  it('is a function', function(){
    expect(formatTime).is.a('function');
  });
  it('should equal 00:00 at 0 seconds', function() {
    expect(formatTime(0)).is.equal("00:00")
  });
  it('should equal 01:00 at 60 seconds', function() {
    expect(formatTime(60)).is.equal("01:00")
  });
  it('should equal 01:01 at 61 seconds', function() {
    expect(formatTime(61)).is.equal("01:01")
  });
  it('should equal 00:00 at <0 seconds', function() {
    expect(formatTime(-100)).is.equal("00:00")
  });

});