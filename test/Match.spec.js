const Match = require('src/Match.js')

const attributeRegex = (attr = '\\S+') => new RegExp(`(${attr})=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?`, 'gim')

describe('Match', () => {
	it('matches all - basic test', () => {
		const regex = /(\d)/gim
		const str = '[1, 3, 4, 6]'
		const matches = JSON.stringify(Match.all(regex, str).arr())
		const expected = JSON.stringify([['1', '1'], ['3', '3'], ['4', '4'], ['6', '6']])
		expect(matches).toBe(expected)
	})

	it('matches a number of query string parameters', () => {
		const regex = /(\S+)=["']?((?:.(?!["']?s+(?:S+)=|[>"']))+.)["']?/gim
		const str = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24 24">'
		const matches = Match.all(regex, str).arr()
		expect(matches.length).toBe(4)
	})

	it('test', () => {
		const str = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24 24">'
		console.log(str.replace(attributeRegex('version'), 'POOP'))
	})
})
