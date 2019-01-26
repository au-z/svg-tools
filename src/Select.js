const Match = require('./Match.js')

const attributeRegex = (attr = '\\S+') => new RegExp(`(${attr})\\s*=\\s*(?:[']|["])\\s*([\\W\\w]*?)\\s*(?:[']|["])`, 'gim')
const tagRegex = (tag) => new RegExp(`(<${tag}[^>]*>)`, 'gim')

const allTagsOfType = (tagName, str) =>
	Match.all(tagRegex(tagName), str).arr().map((match) => match[1])

const attributesFromTag = (tagName, str) => {
	const tagMatch = tagRegex(tagName).exec(str)
	if(!tagMatch) return null
	const tag = tagMatch[1]
	return Match.all(attributeRegex(), tag).toDict(1, (match) => parseAttributeValue(match[1], match[2]))
}

const parseAttributeValue = (name, value) => {
	switch(name.toUpperCase()) {
		case 'WIDTH':
		case 'HEIGHT': return parseFloat(value)
		case 'VIEWBOX': return value.split(' ').map((v) => parseFloat(v))
		default: return value
	}
}

module.exports = {
	allTagsOfType,
	attributesFromTag,
}
