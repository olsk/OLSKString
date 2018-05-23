/*!
 * OLSKString
 * Copyright(c) 2018 Rosano Coutinho
 * MIT Licensed
 */

//_ OLSKStringWithFormat

exports.OLSKStringWithFormat = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('OLSKErrorInputInvalid');
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
