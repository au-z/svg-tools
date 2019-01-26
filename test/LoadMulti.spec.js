require('src/polyfills.js')
const SvgTools = require('src/SvgTools.js')

describe('loads and parses multiple SVG files', () => {
	it('cubic-bezier.svg + quadratic-bezier.svg', (done) => {
		SvgTools.loadMulti('./test/svg/cubic-bezier.svg', './test/svg/quadratic-bezier.svg').then((svgs) => {
			expect(svgs.length).toBe(2)
			expect(svgs[0].paths).not.toBeNull
			expect(svgs[1].paths).not.toBeNull
			done()
		})
	})
})
