/*!
 * OLSKString
 * Copyright(c) 2018 Rosano Coutinho
 * MIT Licensed
 */

(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
			(factory((global.OLSKString = global.OLSKString || {})));
}(this, (function(exports) {
	'use strict';

	//_ OLSKStringWithFormat

	exports.OLSKStringWithFormat = function(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		var substitutions = Object.values(arguments).slice(1);

		if (!substitutions.length) {
			return inputData;
		}

		var formattedString = inputData;

		(inputData.match(/%@/g) || []).forEach(function(e, i) {
			formattedString = formattedString.replace(e, substitutions[i]);
		});

		exports._OLSKStringAllMatchesWithRegexAndString(/%\$(\d*)@/g, inputData).forEach(function(e) {
			formattedString = formattedString.replace(e[0], substitutions[e[1] - 1]);
		});

		return formattedString;
	};

	//_ _OLSKStringAllMatchesWithRegexAndString

	exports._OLSKStringAllMatchesWithRegexAndString = function(regex, string) {
		var matches = [];

		var match = regex.exec(string);

		while (match != null) {
			matches.push(match);

			match = regex.exec(string);
		}

		return matches;
	};

	//_ OLSKStringReplaceTokens

	exports.OLSKStringReplaceTokens = function(param1, param2) {
		if (typeof param1 !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param2 !== 'object' || param2 === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		return Object.entries(param2).reduce(function (coll, item) {
			return coll.replace(new RegExp(item.shift(), 'g'), item.pop());
		}, param1);
	};

	//_ OLSKStringPatch

	exports.OLSKStringPatch = function(param1, param2, param3) {
		if (typeof param1 !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param3 !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!param1.includes(param2) && !param1.includes(param3)) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (param3.includes(param2)) {
			throw new Error('OLSKErrorInputNotValid');
		}

		return param1.split(param2).join(param3);
	};

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

})));
