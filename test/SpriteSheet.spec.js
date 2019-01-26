/* eslint-disable max-len */
require('src/polyfills.js')
const SvgTools = require('src/SvgTools.js')
const trimSpace = require('./test-utils.js').trimSpace

describe('creates a sprite sheet', () => {
	it('sheet(axis <- axis-x-arrow)', (done) => {
		SvgTools.spriteSheet('./test/svg/axis').then((sheet) => {
			expect(trimSpace(sheet.toHtmlString())).toBe(trimSpace(`
			<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="120" height="24" viewBox="96 0 120 24">
				<symbol id="axis-arrow" viewBox="0 0 24 24">
					<path d="M12,2L16,6H13V13.85L19.53,17.61L21,15.03L22.5,20.5L17,21.96L18.53,19.35L12,15.58L5.47,19.35L7,21.96L1.5,20.5L3,15.03L4.47,17.61L11,13.85V6H8L12,2Z"/>
				</symbol>
				<symbol id="axis-x-arrow" viewBox="24 0 24 24">
					<path d="M25.5,20.5 L27,15.03 L28.46,17.6 L35,13.82 V3 H37 V13.82 L46.39,19.25 L45.39,21 L36,15.56 L29.46,19.33 L31,21.96 L25.5,20.5 Z"/>
				</symbol>
				<symbol id="axis-y-arrow" viewBox="48 0 24 24">
					<path d="M70.5,20.5 L65,21.96 L66.53,19.35 L60,15.58 L50.61,21 L49.61,19.27 L59,13.85 V3 H61 V13.85 L67.53,17.61 L69,15.03 L70.5,20.5 Z"/>
				</symbol>
				<symbol id="axis-z-arrow" viewBox="72 0 24 24">
					<path d="M84,2 L88,6 H85 V13.82 L94.39,19.25 L93.39,21 L84,15.56 L74.61,21 L73.61,19.25 L83,13.82 V6 H80 L84,2 Z"/>
				</symbol>
				<symbol id="axis" viewBox="96 0 24 24">
					<path d="M98.61,21 L97.61,19.27 L107,13.85 V3 H109 V13.85 L118.39,19.27 L117.39,21 L108,15.58 L98.61,21 Z"/>
				</symbol>
			</svg>
			`))
			done()
		})
	})
})
