describe("Frame", function() {

  beforeEach(function(){
    standardFrame = new Frame([4,5]);
    spareFrame = new Frame([5,5]);
    strikeFrame = new Frame([10]);
    gutterFrame = new Frame([]);
  });

  it("totals the score from the two bowls in a single frame.", function() {

    expect(standardFrame.frameScore).toEqual(9);
    expect(spareFrame.frameScore).toEqual(10);
    expect(strikeFrame.frameScore).toEqual(10);
    expect(gutterFrame.frameScore).toEqual(0);
  });

  it("throws an error if more than 10 pins are knocked down in a standard frame.", function() {

    expect( function(){ new Frame([9,9]); } ).toThrowError('Cannot knock down more than 10 pins in a single frame');
  });

  it("throws an error if there is more than two bowls in a standard frame", function() {

    expect( function(){ new Frame([1,1,3]); } ).toThrowError('Cannot have more than two bowls in a standard frame');
  });

  describe("Caclulating Score for Spares", function(){

    it("should return 14 when followed by standard frame", function() {
      spareFrame.calculateScore(standardFrame);
      expect(spareFrame.frameScore).toEqual(14);
    });

    it("should return 15 (10 + first bowl of 2nd frame) when followed by another spare", function() {
      spareFrame.calculateScore(spareFrame);
      expect(spareFrame.frameScore).toEqual(15);
    });

    it("should return 20 when followed by a strike", function(){
      spareFrame.calculateScore(strikeFrame);
      expect(spareFrame.frameScore).toEqual(20);
    });

    it("should return 10 when followed by a gutter frame", function(){
      spareFrame.calculateScore(gutterFrame);

      expect(spareFrame.frameScore).toEqual(10);
    });
  });


  describe("Caclulating Score for strikes", function(){

    it("should return 19 (sum of two bowls in 2nd frame) when followed by standard frame", function() {
      strikeFrame.calculateScore(standardFrame);
      expect(strikeFrame.bonus).toEqual(9);
      expect(strikeFrame.totalScore).toEqual(19);
    });

    it("should return 20 when followed by spare", function() {
      strikeFrame.calculateScore(spareFrame);
      expect(strikeFrame.bonus).toEqual(10);
      expect(strikeFrame.totalScore).toEqual(20);
    });

    it("should return 30 when followed by two strikes", function(){
      strikeFrame.calculateScore(strikeFrame, strikeFrame);
      expect(strikeFrame.bonus).toEqual(20);
      expect(strikeFrame.totalScore).toEqual(30);
    });

    it("should return 10 when followed by a gutter frame", function(){
      strikeFrame.calculateScore(gutterFrame);
      expect(strikeFrame.bonus).toEqual(0);
      expect(strikeFrame.totalScore).toEqual(10);
    });
  });

});
