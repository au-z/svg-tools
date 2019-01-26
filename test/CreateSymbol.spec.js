require('src/polyfills.js')
const SvgTools = require('src/SvgTools.js')
const trimSpace = require('./test-utils.js').trimSpace

describe('creates a sprite sheet', () => {
	it('sheet(axis <- axis-x-arrow)', (done) => {
		SvgTools.load('./test/svg/axis/axis.svg').then((svg) => {
			svg.createSymbol('axis')
			expect(trimSpace(svg.toHtmlString())).toBe(trimSpace(`
			<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">
				<symbol id="axis" viewBox="0 0 24 24">
					<path d=\"M2.61,21L1.61,19.27L11,13.85V3H13V13.85L22.39,19.27L21.39,21L12,15.58L2.61,21Z\"/>
				</symbol>
			</svg>
			`))
			done()
		})
	})
})
