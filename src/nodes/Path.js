/* eslint-disable require-jsdoc */
const Select = require('../Select.js')
const Match = require('../Match.js')
const _ = require('lodash')

module.exports = function Path(domString) {
	const PATH_DATA_REGEX = /([M|L|H|V|C|S|Q|T|A|Z])(?:([\d\s,.]*))?/gim
	let attributes = Select.attributesFromTag('path', domString) || {}
	let data = attributes.d ? _parseData(attributes.d) : {}

	function scale(factor) {
		if(!attributes.d) return
		data = data.map((command) => ({
			...command,
			coords: [
				command.coords[0] * factor,
				command.coords[1] * factor,
			],
		}))

		_saveDataAttribute()
	}

	function shift(x, y) {
		const shiftArc = (x, y, startX, startY, skewDeg, largeArcFlag, sweepFlag, endX, endY) =>
			[startX + x, startY + y, skewDeg, largeArcFlag, sweepFlag, endX + x, endY + y]

		const shiftCommand = (command, x, y) => {
			// relative coords get a pass
			if(command.op == command.op.toLowerCase()) {
				return command
			}

			switch(command.op) {
				case 'Z': {
					break
				}
				case 'H': {
					command.coords[0] += x
					break
				}
				case 'V': {
					command.coords[0] += y
					break
				}
				case 'A': {
					command.coords = shiftArc(x, y, ...command.coords)
					break
				}
				case 'L':
				case 'C':
				case 'M':
				default: {
					command.coords = command.coords.map((val, i) => val += (i % 2 === 0) ? x : y)
					break
				}
			}
			return command
		}

		data = data.map((command) => shiftCommand(command, x, y))
		_saveDataAttribute()
	}

	function toHtmlString() {
		return `<path ${Object.keys(attributes).map((key) => `${key}="${attributes[key]}"`).join(' ')}/>`
	}

	function _saveDataAttribute() {
		attributes.d = data.map((d) => encodeOperation(d)).join(' ')
	}

	function encodeOperation(o) {
		let encoded = `${o.op}`
		if(o.op.toUpperCase() === 'Z') return encoded

		if(o.op.toUpperCase() === 'A') {
			encoded += `{0},{1} {2} {3},{4} {5},{6}`.format(...o.coords)
		} else {
			encoded += `${_.chunk(o.coords, 2).map((pair) => pair.join(',')).join(' ')}`
		}
		return encoded
	}

	function _parseData(d) {
		const result = Match.all(PATH_DATA_REGEX, d).flatten((match) => ({
			op: match[1],
			coords: match[2] ? match[2].trim().replace(/\s{1,}/g, ',').replace(/,+/g, ',').split(',').map((n) => parseFloat(n)) : null,
			name: _parseOperation(match[1]),
		}))
		return result
	}

	function _parseOperation(op) {
		switch(op) {
			case 'm': return 'moveto (relative)'
			case 'M': return 'moveto'
			case 'l': return 'lineto (relative)'
			case 'L': return 'lineto'
			case 'h': return 'horizontal lineto (relative)'
			case 'H': return 'horizontal lineto'
			case 'v': return 'vertical lineto (relative)'
			case 'V': return 'vertical lineto'
			case 'c': return 'curveto (relative)'
			case 'C': return 'curveto'
			case 's': return 'smooth curveto (relative)'
			case 'S': return 'smooth curveto'
			case 'q': return 'quad bezier curve (relative)'
			case 'Q': return 'quad bezier curve'
			case 't': return 'smooth quad bezier curveto (relative)'
			case 'T': return 'smooth quad bezier curveto'
			case 'a': return 'elliptical arc (relative)'
			case 'A': return 'elliptical arc'
			case 'z': return 'closepath (relative)'
			case 'Z': return 'closepath'
		}
	}

	return {
		attributes,
		data,
		scale,
		shift,
		toHtmlString,
	}
}
