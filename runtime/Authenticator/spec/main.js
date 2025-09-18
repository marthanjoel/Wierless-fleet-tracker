const path = require("path");
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const TwilioRuntimeHelper = require("TwilioRuntimeHelper");
const jwt =  require("jwt-simple");

// hard coded values required:
//  TOKEN_TTL = 3600
//  twilio: 928462
const contextFile = path.resolve(__dirname, "../../context-test.yaml");
const descriptorFile = path.resolve(__dirname, "../descriptor.yaml");

describe('Authenticator main test cases', function () {
    it('return valid jwt token on correct pincode', function (done) {
        TwilioRuntimeHelper.runTestDataJSON(contextFile, descriptorFile, {username: "twilio", pincode: "928462"}, function (err, result) {
            expect(result.success).to.true;
            expect(result.username).to.equal("twilio");
            let sync_token = jwt.decode(result.sync_token, null, true /* noVerify */);
            expect(sync_token.grants.data_sync).to.not.equal.null;
            expect(sync_token.exp - sync_token.iat).to.equal(3600); 
            done();
        })
    });

    it('fail on incorrect pincode', function (done) {
        TwilioRuntimeHelper.runTestDataJSON(contextFile, descriptorFile, {username: "twilio", pincode: "666666"}, function (err, result) {
            expect(result.success).to.false;
            done();
        });
    });

    it('fail on missing username', function (done) {
        TwilioRuntimeHelper.runTestDataJSON(contextFile, descriptorFile, {pincode: "666666"}, function (err, result) {
            expect(result.success).to.false;
            done();
        });
    });

    it('fail on missing pincode', function (done) {
        TwilioRuntimeHelper.runTestDataJSON(contextFile, descriptorFile, {username: "twilio"}, function (err, result) {
            expect(result.success).to.false;
            done();
        });
    });
});
