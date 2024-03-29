(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
			(factory((global.OLSKString = global.OLSKString || {})));
}(this, (function(exports) { 'use strict';

	const mod = {

		OLSKStringFormatted (inputData) {
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

			mod._OLSKStringAllMatches(/%\$(\d*)@/g, inputData).forEach(function(e) {
				formattedString = formattedString.replace(e[0], substitutions[e[1] - 1]);
			});

			return formattedString;
		},

		_OLSKStringAllMatches (regex, string) {
			var matches = [];

			var match = regex.exec(string);

			while (match != null) {
				matches.push(match);

				match = regex.exec(string);
			}

			return matches;
		},

		OLSKStringReplaceTokens (param1, param2) {
			if (typeof param1 !== 'string') {
				throw new Error('OLSKErrorInputNotValid');
			}

			if (typeof param2 !== 'object' || param2 === null) {
				throw new Error('OLSKErrorInputNotValid');
			}

			return Object.entries(param2).reduce(function (coll, item) {
				return coll.replace(new RegExp(item.shift(), 'g'), item.pop());
			}, param1);
		},

		OLSKStringPatch (param1, param2, param3) {
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
				console.error(`source includes neither of "${ param2 }" or "${ param3 }"`);
				throw new Error('OLSKErrorInputNotValid');
			}

			if (param3.includes(param2)) {
				throw new Error('OLSKErrorInputNotValid');
			}

			return param1.split(param2).join(param3);
		},

		OLSKStringMatch (param1, param2, param3 = 'includes') {
			if (typeof param1 !== 'string') {
				throw new Error('OLSKErrorInputNotValid');
			}

			if (typeof param2 !== 'string') {
				throw new Error('OLSKErrorInputNotValid');
			}

			if (typeof param3 !== 'undefined') {
				if (typeof param3 !== 'string') {
					throw new Error('OLSKErrorInputNotValid');
				}
			}

			// Searching and sorting text with diacritical marks in JavaScript | Thread Engineering https://thread.engineering/2018-08-29-searching-and-sorting-text-with-diacritical-marks-in-javascript/
			return param2.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')[param3](param1.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
		},

		OLSKStringSnippet (inputData) {
			if (typeof inputData !== 'string') {
				throw new Error('OLSKErrorInputNotValid');
			}

			return inputData.length <= 100 ? inputData : inputData.slice(0, 100).split(' ').slice(0, -1).join(' ').concat('…');
		},

		OLSKStringEncode (inputData) {
			if (typeof inputData !== 'string') {
				throw new Error('OLSKErrorInputNotValid');
			}

			return mod.OLSKStringReplaceTokens(encodeURIComponent(inputData), {
				'\\(': '%28',
				'\\)': '%29',
			});
		},

	};

	Object.assign(exports, mod);

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

})));

if (typeof exports === 'object') {
	exports.OLSKFormatted = exports.OLSKStringFormatted;
}
