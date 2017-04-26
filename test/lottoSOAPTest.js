var assert = require('assert');
var LottoSOAP = require('../lib/lottoSOAP');

describe('LottoSOAP', function () {
  var object;
  describe("#constructor", function () {
    it('Creating LottoSOAP object', function () {
      assert.notEqual(undefined, object = new LottoSOAP());
    }.bind(this));
  });

  describe('#sendEnvelope', function () {
    var result = {};
    var methodName = 'getLastWyniki';
    var data = {
      "date": "2017-01-01"
    };
    var success = (response) => {
      this.result = response;
    };
    var error = (response) => {
      this.result = 'error'
    };
    object.sendEnvelope(methodName,data,success,error);
    it('Respons is != "error"',()=>{
      assert.notEqual(this.result,'error')
    })
  })


    describe("#a", function () {
      it('Should return 1', function () {
        assert.equal(1, object.a())
      }.bind(this));
    });

    describe("#createClient", () => {
      it('Should create and save to Lotto Services', function () {
        assert.notEqual(undefined, object.createClient());
      })
    });
  });
