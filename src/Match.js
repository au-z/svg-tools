/* eslint-disable require-jsdoc */
function Matches(_matches) {
	const matches = _matches

	const arr = () => matches

	const flatten = (transform) => matches.reduce((arr, m) => {
		arr.push(transform(m))
		return arr
	}, [])

	const toDict = (keyIndex, transform) => matches.reduce((obj, a) => {
		obj[a[keyIndex]] = transform(a)
		return obj
	}, {})

	return {
		arr,
		flatten,
		toDict,
	}
}

const all = (regex, str) => {
	let m
	const matches = []
	while(m = regex.exec(str)) {
		matches.push(m)
	}
	return new Matches(matches)
}

module.exports = {
	all,
}
