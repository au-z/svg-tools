/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
const fs = require('fs')
const path = require('path')
const SVG = require('./nodes/Svg.js')

const writeFile = (fullPath, data) => new Promise((res, rej) =>
	fs.writeFile(fullPath, data, {encoding: 'utf-8'}, (err) => (err && rej(err)) || res()))

const readFile = (p) => new Promise((res, rej) =>
	fs.readFile(path.resolve(process.cwd(), p), 'utf-8', (err, data) => (err && rej(err)) || res(data)))

module.exports = (function SvgTools() {
	const _fromDir = (dir) => {
		if(!fs.existsSync(dir)) {
			throw new Error('[svg-tools] Directory does not exist')
		}
		const files = fs.readdirSync(dir)
		const svgFiles = files.map((f) => {
			const filePath = path.join(dir, f)
			const stat = fs.lstatSync(filePath)
			if(stat.isDirectory()) {
				return fromDir(filePath)
			} else if(!!/\.svg$/.exec(filePath)) {
				return filePath
			}
		})
		return svgFiles
	}

	/**
	 * Loads and parses an SVG
	 * @param {String} filePath the relative path to the file
	 * @return {SVG} an SVG object
	 */
	async function load(filePath) {
		if(!(/\.svg$/.exec(filePath))) throw new Error(`[SvgTools] Must specify an svg file.`)
		const svgString = await readFile(filePath).catch(console.error)
		return new SVG(svgString, {path: filePath})
	}

	async function loadMulti(...paths) {
		return await Promise.all(paths.map((f) => load(f)))
	}

	async function loadFromDir(dir) {
		return loadMulti(..._fromDir(dir))
	}

	async function spriteSheet(dir) {
		const svgs = await loadFromDir(dir)
		const sprites = svgs.reduce((acc, svg, i) => {
			svg.createSymbol(path.parse(svg.meta.path).name)
			if(i === 0) acc = svg
			else acc.combine(svg)
			return acc
		}, null)
		return sprites
	}

	/**
	 * Saves an SVG to disk
	 * @param {SVG} svg an SVG object
	 * @param {String} filePath the reiatlve path to the new file
	 * @return {SVG} the original svg
	 */
	async function save(svg, filePath) {
		await writeFile(filePath, svg.toHtmlString()).catch(console.error)
		console.log(filePath)
		return svg
	}

	return {
		load,
		loadMulti,
		save,
		spriteSheet,
	}
})()
