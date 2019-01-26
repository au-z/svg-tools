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
})
