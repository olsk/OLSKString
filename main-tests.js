/*!
 * OLSKString
 * Copyright(c) 2018 Rosano Coutinho
 * MIT Licensed
 */

var assert = require('assert');

var stringLibrary = require('./main');

describe('OLSKStringWithFormat', function testOLSKStringWithFormat() {

	it('throws error if not string', function() {
		assert.throws(function() {
			stringLibrary.OLSKStringWithFormat(null);
		}, /OLSKErrorInputInvalid/);
	});

	it('returns inputString if param1 without formatIdentifier', function() {
		assert.strictEqual(stringLibrary.OLSKStringWithFormat('alpha', 'bravo'), 'alpha');
	});

	it('returns inputString if param2 without substitutions', function() {
		assert.strictEqual(stringLibrary.OLSKStringWithFormat('alpha %@'), 'alpha %@');
	});

	it('returns formattedString for single formatIdentifier', function() {
		assert.strictEqual(stringLibrary.OLSKStringWithFormat('alpha %@', 'bravo'), 'alpha bravo');
	});

	it('returns formattedString for multiple formatIdentifiers', function() {
		assert.strictEqual(stringLibrary.OLSKStringWithFormat('alpha %@ %@', 'bravo', 'charlie'), 'alpha bravo charlie');
	});

	it('returns formattedString for single ordered formatIdentifier', function() {
		assert.strictEqual(stringLibrary.OLSKStringWithFormat('alpha %$1@', 'bravo'), 'alpha bravo');
	});

	it('returns formattedString for multiple ordered formatIdentifiers', function() {
		assert.strictEqual(stringLibrary.OLSKStringWithFormat('alpha %$2@ %$1@', 'bravo', 'charlie'), 'alpha charlie bravo');
	});

});
