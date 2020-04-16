/*!
 * OLSKString
 * Copyright(c) 2018 Rosano Coutinho
 * MIT Licensed
 */

var assert = require('assert');

var stringLibrary = require('./main');

describe('OLSKStringWithFormat', function test_OLSKStringWithFormat() {

	it('throws error if not string', function() {
		assert.throws(function() {
			stringLibrary.OLSKStringWithFormat(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns inputString if param1 without formatIdentifier', function() {
		assert.strictEqual(stringLibrary.OLSKStringWithFormat('alfa', 'bravo'), 'alfa');
	});

	it('returns inputString if param2 without substitutions', function() {
		assert.strictEqual(stringLibrary.OLSKStringWithFormat('alfa %@'), 'alfa %@');
	});

	it('returns formattedString for single formatIdentifier', function() {
		assert.strictEqual(stringLibrary.OLSKStringWithFormat('alfa %@', 'bravo'), 'alfa bravo');
	});

	it('returns formattedString for multiple formatIdentifiers', function() {
		assert.strictEqual(stringLibrary.OLSKStringWithFormat('alfa %@ %@', 'bravo', 'charlie'), 'alfa bravo charlie');
	});

	it('returns formattedString for single ordered formatIdentifier', function() {
		assert.strictEqual(stringLibrary.OLSKStringWithFormat('alfa %$1@', 'bravo'), 'alfa bravo');
	});

	it('returns formattedString for multiple ordered formatIdentifiers', function() {
		assert.strictEqual(stringLibrary.OLSKStringWithFormat('alfa %$2@ %$1@', 'bravo', 'charlie'), 'alfa charlie bravo');
	});

});

describe('OLSKStringReplaceTokens', function test_OLSKStringReplaceTokens() {

	it('throws error if param1 not string', function() {
		assert.throws(function() {
			stringLibrary.OLSKStringReplaceTokens(null, {});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if param2 not object', function() {
		assert.throws(function() {
			stringLibrary.OLSKStringReplaceTokens('', null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns inputString', function() {
		assert.strictEqual(stringLibrary.OLSKStringReplaceTokens('', {}), '');
	});

	it('replaces token single', function() {
		assert.strictEqual(stringLibrary.OLSKStringReplaceTokens('alfa', {
			alfa: 'bravo',
		}), 'bravo');
	});

	it('replaces token multiple', function() {
		assert.strictEqual(stringLibrary.OLSKStringReplaceTokens('alfa alfa', {
			alfa: 'bravo',
		}), 'bravo bravo');
	});

});

describe('OLSKStringPatch', function test_OLSKStringPatch() {

	it('throws error if param1 not string', function() {
		assert.throws(function() {
			stringLibrary.OLSKStringPatch(null, '', '');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if param2 not string', function() {
		assert.throws(function() {
			stringLibrary.OLSKStringPatch('', null, '');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if param3 not string', function() {
		assert.throws(function() {
			stringLibrary.OLSKStringPatch('', '', null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if param2 in param3', function() {
		assert.throws(function() {
			stringLibrary.OLSKStringPatch('alfa', 'alfa', 'alfa bravo');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if param2 and param3 not in param1', function() {
		assert.throws(function() {
			stringLibrary.OLSKStringPatch('alfa', 'bravo', 'charlie');
		}, /OLSKErrorInputNotValid/);
	});

	it.skip('throws error if replaces more than once', function() {
		assert.throws(function() {
			stringLibrary.OLSKStringPatch('alfa', 'alfa', '// alfa');
		}, /OLSKErrorInputNotValid/);
	});

	it('returns string', function() {
		assert.strictEqual(stringLibrary.OLSKStringPatch('alfa', 'alfa', 'bravo'), 'bravo');
	});

	it('replaces single', function() {
		assert.strictEqual(stringLibrary.OLSKStringPatch('alfa bravo', 'bravo', 'charlie'), 'alfa charlie');
	});

	it('replaces multiple', function() {
		assert.strictEqual(stringLibrary.OLSKStringPatch('alfa bravo bravo', 'bravo', 'charlie'), 'alfa charlie charlie');
	});

});
