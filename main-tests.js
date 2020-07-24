const { throws, deepEqual } = require('assert');

const mainModule = require('./main.js');

describe('OLSKStringWithFormat', function test_OLSKStringWithFormat() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.OLSKStringWithFormat(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns inputString if param1 without formatIdentifier', function() {
		deepEqual(mainModule.OLSKStringWithFormat('alfa', 'bravo'), 'alfa');
	});

	it('returns inputString if param2 without substitutions', function() {
		deepEqual(mainModule.OLSKStringWithFormat('alfa %@'), 'alfa %@');
	});

	it('returns formattedString for single formatIdentifier', function() {
		deepEqual(mainModule.OLSKStringWithFormat('alfa %@', 'bravo'), 'alfa bravo');
	});

	it('returns formattedString for multiple formatIdentifiers', function() {
		deepEqual(mainModule.OLSKStringWithFormat('alfa %@ %@', 'bravo', 'charlie'), 'alfa bravo charlie');
	});

	it('returns formattedString for single ordered formatIdentifier', function() {
		deepEqual(mainModule.OLSKStringWithFormat('alfa %$1@', 'bravo'), 'alfa bravo');
	});

	it('returns formattedString for multiple ordered formatIdentifiers', function() {
		deepEqual(mainModule.OLSKStringWithFormat('alfa %$2@ %$1@', 'bravo', 'charlie'), 'alfa charlie bravo');
	});

});

describe('OLSKStringReplaceTokens', function test_OLSKStringReplaceTokens() {

	it('throws error if param1 not string', function() {
		throws(function() {
			mainModule.OLSKStringReplaceTokens(null, {});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if param2 not object', function() {
		throws(function() {
			mainModule.OLSKStringReplaceTokens('', null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns inputString', function() {
		deepEqual(mainModule.OLSKStringReplaceTokens('', {}), '');
	});

	it('replaces token single', function() {
		deepEqual(mainModule.OLSKStringReplaceTokens('alfa', {
			alfa: 'bravo',
		}), 'bravo');
	});

	it('replaces token multiple', function() {
		deepEqual(mainModule.OLSKStringReplaceTokens('alfa alfa', {
			alfa: 'bravo',
		}), 'bravo bravo');
	});

});

describe('OLSKStringPatch', function test_OLSKStringPatch() {

	it('throws error if param1 not string', function() {
		throws(function() {
			mainModule.OLSKStringPatch(null, '', '');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if param2 not string', function() {
		throws(function() {
			mainModule.OLSKStringPatch('', null, '');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if param3 not string', function() {
		throws(function() {
			mainModule.OLSKStringPatch('', '', null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if param2 in param3', function() {
		throws(function() {
			mainModule.OLSKStringPatch('alfa', 'alfa', 'alfa bravo');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if param2 and param3 not in param1', function() {
		throws(function() {
			mainModule.OLSKStringPatch('alfa', 'bravo', 'charlie');
		}, /OLSKErrorInputNotValid/);
	});

	it.skip('throws error if replaces more than once', function() {
		throws(function() {
			mainModule.OLSKStringPatch('alfa', 'alfa', '// alfa');
		}, /OLSKErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.OLSKStringPatch('alfa', 'alfa', 'bravo'), 'bravo');
	});

	it('replaces single', function() {
		deepEqual(mainModule.OLSKStringPatch('alfa bravo', 'bravo', 'charlie'), 'alfa charlie');
	});

	it('replaces multiple', function() {
		deepEqual(mainModule.OLSKStringPatch('alfa bravo bravo', 'bravo', 'charlie'), 'alfa charlie charlie');
	});

});
