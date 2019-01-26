/* eslint-disable require-jsdoc */
/* eslint-disable no-unexpected-this */
const Select = require('../Select.js')
const Path = require('./Path.js')
const _ = require('lodash')

module.exports = function SVG(domString, _meta) {
	const meta = _meta || {}
	const header = (/(.*?)(?=<svg)/gim.exec(domString) || [null, null])[1]
	const attributes = Select.attributesFromTag('svg', domString) || {}
	const paths = Select.allTagsOfType('path', domString).map(Path)
	const symbols = []

	function combine(svg) {
		const W = attributes.width || attributes.viewBox[2]

		if(svg.symbols.length > 0) {
			svg.symbols.forEach((s) => {
				s.attributes.viewBox[0] += attributes.viewBox[2]
			})
		}

		attributes.viewBox = [
			Math.max(svg.attributes.viewBox[0], attributes.viewBox[0]),
			Math.max(svg.attributes.viewBox[1], attributes.viewBox[1]),
			attributes.viewBox[2] + svg.attributes.viewBox[2],
			Math.max(attributes.viewBox[3], svg.attributes.viewBox[3]),
		]
		if(attributes.width) {
			attributes.width = attributes.viewBox[2]
		}
		if(attributes.height) {
			attributes.height = attributes.viewBox[3]
		}
		svg.shift(W, 0)

		svg.symbols.forEach((s) => s.paths = s.paths.map((idx) => idx += paths.length))
		paths.push(...svg.paths)
		symbols.push(...svg.symbols)
	}

	function createSymbol(id) {
		symbols.push({
			attributes: {
				id,
				viewBox: attributes.viewBox,
			},
			paths: paths.map((p, i) => i),
		})
	}

	function scale(factor) {
		attributes.width = parseFloat(attributes.width) * factor
		attributes.height = parseFloat(attributes.height) * factor
		attributes.viewBox = attributes.viewBox.map((v) => v *= factor)

		paths.forEach((p) => p.scale(factor))
	}

	function resize(x, y) {
		if(attributes.width) {
			attributes.width = x || attributes.width
		}
		if(attributes.height) {
			attributes.height = y || attributes.height
		}
		attributes.viewBox[2] = x || attributes.viewBox[2]
		attributes.viewBox[3] = y || attributes.viewBox[3]
	}

	function shift(x, y) {
		paths.forEach((p) => p.shift(x, y))
	}

	function toHtmlString() {
		const stringifiedPaths = paths.map((p) => false)

		const pathsToHtml = () => {
			const symbolHtml = symbols.map((s) => {
				const included = paths.filter((p, i) => {
					const include = s.paths.includes(i)
					if(include) stringifiedPaths[i] = true
					return include
				}).map((p) => p.toHtmlString()).join(`\n\t`)

				return `<symbol {0}>\n\t{1}\n</symbol>`.format(
					Object.keys(s.attributes).map((key) => toHtmlAttribute(key, s.attributes[key])).join(' '),
					included,
				)
			}).join('\n')

			const pathHtml = stringifiedPaths.map((isHtml, i) => {
				if(isHtml) return
				return paths[i].toHtmlString()
			}).join(``)

			return `${symbolHtml}${pathHtml}`
		}

		return `${header}\n<svg {0}>\n{1}\n</svg>`.format(
			Object.keys(attributes).map((key) => toHtmlAttribute(key, attributes[key])).join(' '),
			pathsToHtml(),
		)
	}

	const toHtmlAttribute = (key, value) => {
		const attribute = `${key}="{0}"`
		switch(key.toUpperCase()) {
			case 'VIEWBOX': return attribute.format(value.join(' '))
			default: return attribute.format(value)
		}
	}

	return {
		attributes,
		meta,
		paths,
		symbols,

		combine,
		createSymbol,
		resize,
		scale,
		shift,
		toHtmlString,
	}
}
