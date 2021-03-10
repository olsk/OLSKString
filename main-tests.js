const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('OLSKStringFormatted', function test_OLSKStringFormatted() {

	it('throws error if not string', function() {
		throws(function() {
			mod.OLSKStringFormatted(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns inputString if param1 without formatIdentifier', function() {
		deepEqual(mod.OLSKStringFormatted('alfa', 'bravo'), 'alfa');
	});

	it('returns inputString if param2 without substitutions', function() {
		deepEqual(mod.OLSKStringFormatted('alfa %@'), 'alfa %@');
	});

	it('returns formattedString for single formatIdentifier', function() {
		deepEqual(mod.OLSKStringFormatted('alfa %@', 'bravo'), 'alfa bravo');
	});

	it('returns formattedString for multiple formatIdentifiers', function() {
		deepEqual(mod.OLSKStringFormatted('alfa %@ %@', 'bravo', 'charlie'), 'alfa bravo charlie');
	});

	it('returns formattedString for single ordered formatIdentifier', function() {
		deepEqual(mod.OLSKStringFormatted('alfa %$1@', 'bravo'), 'alfa bravo');
	});

	it('returns formattedString for multiple ordered formatIdentifiers', function() {
		deepEqual(mod.OLSKStringFormatted('alfa %$2@ %$1@', 'bravo', 'charlie'), 'alfa charlie bravo');
	});

});

describe('OLSKStringReplaceTokens', function test_OLSKStringReplaceTokens() {

	it('throws error if param1 not string', function() {
		throws(function() {
			mod.OLSKStringReplaceTokens(null, {});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if param2 not object', function() {
		throws(function() {
			mod.OLSKStringReplaceTokens('', null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns inputString', function() {
		deepEqual(mod.OLSKStringReplaceTokens('', {}), '');
	});

	it('replaces token single', function() {
		deepEqual(mod.OLSKStringReplaceTokens('alfa', {
			alfa: 'bravo',
		}), 'bravo');
	});

	it('replaces token multiple', function() {
		deepEqual(mod.OLSKStringReplaceTokens('alfa alfa', {
			alfa: 'bravo',
		}), 'bravo bravo');
	});

});

describe('OLSKStringPatch', function test_OLSKStringPatch() {

	it('throws error if param1 not string', function() {
		throws(function() {
			mod.OLSKStringPatch(null, '', '');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if param2 not string', function() {
		throws(function() {
			mod.OLSKStringPatch('', null, '');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if param3 not string', function() {
		throws(function() {
			mod.OLSKStringPatch('', '', null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if param2 in param3', function() {
		throws(function() {
			mod.OLSKStringPatch('alfa', 'alfa', 'alfa bravo');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if param2 and param3 not in param1', function() {
		throws(function() {
			mod.OLSKStringPatch('alfa', 'bravo', 'charlie');
		}, /OLSKErrorInputNotValid/);
	});

	it.skip('throws error if replaces more than once', function() {
		throws(function() {
			mod.OLSKStringPatch('alfa', 'alfa', '// alfa');
		}, /OLSKErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mod.OLSKStringPatch('alfa', 'alfa', 'bravo'), 'bravo');
	});

	it('replaces single', function() {
		deepEqual(mod.OLSKStringPatch('alfa bravo', 'bravo', 'charlie'), 'alfa charlie');
	});

	it('replaces multiple', function() {
		deepEqual(mod.OLSKStringPatch('alfa bravo bravo', 'bravo', 'charlie'), 'alfa charlie charlie');
	});

});

describe('OLSKStringMatch', function test_OLSKStringMatch() {

	it('throws error if param1 not string', function() {
		throws(function() {
			mod.OLSKStringMatch(null, Math.random().toString());
		}, /OLSKErrorInputNotValid/);
	});

	it('throws error if param2 not string', function() {
		throws(function() {
			mod.OLSKStringMatch(Math.random().toString(), null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns false if no match', function () {
		deepEqual(mod.OLSKStringMatch(Math.random().toString(), Math.random().toString()), false);
	});

	it('matches exact', function () {
		const item = Math.random().toString();
		deepEqual(mod.OLSKStringMatch(item, item), true);
	});

	it('matches partial', function () {
		const item = Math.random().toString();
		deepEqual(mod.OLSKStringMatch(item.slice(0, 5), item), true);
	});

	it('matches case insensitive', function () {
		deepEqual(mod.OLSKStringMatch('alf', 'ALF'), true);
	});

	it('matches diacritic insensitive', function () {
		deepEqual(mod.OLSKStringMatch('alf', 'álfa'), true);
	});

});

describe('OLSKStringSnippet', function test_OLSKStringSnippet() {

	it('throws error if not string', function() {
		throws(function() {
			mod.OLSKStringSnippet(null);
		}, /KVCErrorInputNotValid/);
	});

	it('returns subset if large', function() {
		const item = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
		deepEqual(mod.OLSKStringSnippet(item), item.slice(0, 100).split(' ').slice(0, -1).join(' ') + '…');
	});

	it('returns all if small', function() {
		deepEqual(mod.OLSKStringSnippet('alfa bravo'), 'alfa bravo');
	});

});
