/* eslint-disable max-len */
require('src/polyfills.js')
const SvgTools = require('src/SvgTools.js')
const trimSpace = require('./test-utils.js').trimSpace

describe('resizes an SVG', () => {
	it('cubic-bezier resize', (done) => {
		SvgTools.load('./test/svg/cubic-bezier.svg').then((svg) => {
			svg.resize(220, 60)
			expect(svg.attributes.viewBox).toMatchObject([0, 0, 220, 60])
			expect(trimSpace(svg.toHtmlString())).toBe(trimSpace(`
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 220 60">
					<path fill="none" stroke="#333333" stroke-width="3" d="M10,55 C15,5 100,5 100,55"/>
				</svg>
			`))
			done()
		})
	})

	it('cubic-bezier.svg <- quadratic-bezier.svg', (done) => {
		SvgTools.loadMulti('./test/svg/cubic-bezier.svg', './test/svg/quadratic-bezier.svg').then((svgs) => {
			expect(svgs[0].paths.length).toBe(1)
			svgs[0].combine(svgs[1])
			const svg = svgs[0]
			expect(svg.attributes.viewBox).toMatchObject([0, 0, 220, 60])
			expect(svg.paths.length).toBe(2)
			expect(trimSpace(svg.toHtmlString())).toBe(trimSpace(`
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 220 60">
					<path fill="none" stroke="#333333" stroke-width="3" d="M10,55 C15,5 100,5 100,55"/>
					<path fill="none" stroke="#333333" stroke-width="3" d="M120,50 Q165,5 210,50"/>
				</svg>
			`))
			done()
		})
	})

	it('axis <- axis-x-arrow', (done) => {
		SvgTools.loadMulti('./test/svg/axis/axis.svg', './test/svg/axis/axis-x-arrow.svg').then((svgs) => {
			svgs[0].combine(svgs[1])
			expect(svgs[0].attributes.width).toBe(48)
			expect(svgs[0].attributes.height).toBe(24)
			expect(trimSpace(svgs[0].toHtmlString())).toBe(trimSpace(`
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="48" height="24" viewBox="0 0 48 24">
					<path d="M2.61,21L1.61,19.27L11,13.85V3H13V13.85L22.39,19.27L21.39,21L12,15.58L2.61,21Z"/>
					<path d="M25.5,20.5 L27,15.03 L28.46,17.6 L35,13.82 V3 H37 V13.82 L46.39,19.25 L45.39,21 L36,15.56 L29.46,19.33 L31,21.96 L25.5,20.5 Z"/>
				</svg>
			`))
			done()
		})
	})
})
