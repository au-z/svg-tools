require('src/polyfills.js')
const SvgTools = require('src/SvgTools.js')
const trimSpace = require('./test-utils.js').trimSpace

describe('shifts an SVG', () => {
	it('cubic-bezier horizontal shift', (done) => {
		SvgTools.load('./test/svg/cubic-bezier.svg').then((svg) => {
			svg.shift(10, 0)
			const path = svg.paths[0]
			expect(path.data.length).toBe(2)
			expect(path.data[0]).toMatchObject({op: 'M', coords: [20, 55], name: 'moveto'})
			expect(path.data[1]).toMatchObject({op: 'C', coords: [25, 5, 110, 5, 110, 55], name: 'curveto'})
			expect(trimSpace(svg.toHtmlString())).toBe(trimSpace(`
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 110 60">
					<path fill="none" stroke="#333333" stroke-width="3" d="M20,55 C25,5 110,5 110,55"/>
				</svg>
			`))
			done()
		})
	})
	it('quadratic-bezier vertical shift', (done) => {
		SvgTools.load('./test/svg/quadratic-bezier.svg').then((svg) => {
			svg.shift(0, -10)
			expect(trimSpace(svg.toHtmlString())).toBe(trimSpace(`
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 110 55">
				<path fill="none" stroke="#333333" stroke-width="3" d="M10,40 Q55,-5 100,40"/>
			</svg>
			`))
			done()
		})
	})
	it('elliptical-arc vertical shift', (done) => {
		SvgTools.load('./test/svg/elliptical-arc.svg').then((svg) => {
			svg.shift(0, 10)
			expect(trimSpace(svg.toHtmlString())).toBe(trimSpace(`
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 130 75">
				<path fill="none" stroke="#333333" stroke-width="3" d="M65,20 a50,25 0 1,0 50,25"/>
			</svg>
			`))
			done()
		})
	})
	it('elliptical-arc-abs vertical shift', (done) => {
		SvgTools.load('./test/svg/elliptical-arc-abs.svg').then((svg) => {
			svg.shift(0, 10)
			expect(trimSpace(svg.toHtmlString())).toBe(trimSpace(`
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 130 75">
				<path fill="none" stroke="#333333" stroke-width="3" d="M65,20 A50,35 0 1,0 50,35"/>
			</svg>
			`))
			done()
		})
	})
})
