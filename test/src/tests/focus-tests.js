describe('Bullets focus and blur', function() {
  beforeEach(function() {
		Bullets.deselect();
	});
  it('only focus should run when the next tag is selected', function() {
    var element = Bullets.elementAtOffset(1);
    var focusSpy = sinon.spy(element, 'focus');
    var blurSpy = sinon.spy(element, 'blur');
    Bullets.selectNext();
    focusSpy.should.have.callCount(1);
    blurSpy.should.have.callCount(0);
    focusSpy.restore();
    blurSpy.restore();
  });


  it('focus and blur should not run when the selection doesn\'t change', function() {
    var element = Bullets.elementAtOffset(1);
    var focusSpy = sinon.spy(element, 'focus');
    var blurSpy = sinon.spy(element, 'blur');
    var stub = sinon.stub(Bullets, 'nothingToSelect');

    Bullets.selectNext();
    Bullets.selectPrevious();
    focusSpy.should.have.callCount(1);
    blurSpy.should.have.callCount(0);
    stub.should.have.callCount(1);

    stub.restore();
    focusSpy.restore();
    blurSpy.restore();
  });
  it('focus and blur should each fire once when the selection changes', function() {
    var elementOne = Bullets.elementAtOffset(1);
    var focusSpyOne = sinon.spy(elementOne, 'focus');
    var blurSpyOne = sinon.spy(elementOne, 'blur');
    Bullets.selectNext();

    var elementTwo = Bullets.elementAtOffset(1);
    var focusSpyTwo = sinon.spy(elementTwo, 'focus');
    var blurSpyTwo = sinon.spy(elementTwo, 'blur');
    Bullets.selectNext();
    focusSpyOne.should.have.callCount(1);
    blurSpyOne.should.have.callCount(1);
    focusSpyTwo.should.have.callCount(1);
    blurSpyTwo.should.have.callCount(0);


    var elementThree = Bullets.elementAtOffset(1);
    var focusSpyThree = sinon.spy(elementThree, 'focus');
    var blurSpyThree = sinon.spy(elementThree, 'blur');
    Bullets.selectNext();
    focusSpyOne.should.have.callCount(1);
    blurSpyOne.should.have.callCount(1);
    focusSpyTwo.should.have.callCount(1);
    blurSpyTwo.should.have.callCount(1);
    focusSpyThree.should.have.callCount(1);
    blurSpyThree.should.have.callCount(0);

    focusSpyOne.restore();
    blurSpyOne.restore();
    focusSpyTwo.restore();
    blurSpyTwo.restore();
    focusSpyThree.restore();
    blurSpyThree.restore();
  });
});
