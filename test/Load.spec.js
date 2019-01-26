require('src/polyfills.js')
const SvgTools = require('src/SvgTools.js')

describe('loads and parses an SVG', () => {
	it('cubic-bezier.svg', (done) => SvgTools.load('./test/svg/cubic-bezier.svg').then((svg) => {
		expect(svg.attributes.version).toBe('1.1')
		expect(svg.attributes.viewBox).toMatchObject([0, 0, 110, 60])
		expect(svg.paths.length).toBe(1)
		const path = svg.paths[0]
		expect(path.attributes.stroke).toBe('#333333')
		expect(path.attributes['stroke-width']).toBe('3')
		expect(path.data[0]).toMatchObject({op: 'M', coords: [10, 55], name: 'moveto'})
		expect(path.data[1]).toMatchObject({op: 'C', coords: [15, 5, 100, 5, 100, 55], name: 'curveto'})
		done()
	}))

	it('quadratic-bezier.svg', (done) => SvgTools.load('./test/svg/quadratic-bezier.svg').then((svg) => {
		const path = svg.paths[0]
		expect(path.data[0]).toMatchObject({op: 'M', coords: [10, 50], name: 'moveto'})
		expect(path.data[1]).toMatchObject({op: 'Q', coords: [55, 5, 100, 50], name: 'quad bezier curve'})
		done()
	}))

	it('elliptical-arc.svg', (done) => SvgTools.load('./test/svg/elliptical-arc.svg').then((svg) => {
		const path = svg.paths[0]
		expect(path.data[0]).toMatchObject({op: 'M', coords: [65, 10], name: 'moveto'})
		expect(path.data[1]).toMatchObject({op: 'a', coords: [50, 25, 0, 1, 0, 50, 25], name: 'elliptical arc (relative)'})
		done()
	}))

	it('axis.svg', (done) => SvgTools.load('./test/svg/axis/axis.svg').then((svg) => {
		expect(svg.paths[0].data.length).toBe(11)
		done()
	}))
})
