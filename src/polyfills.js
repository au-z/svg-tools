/* eslint-disable no-extend-native */
if (!String.prototype.format) {
	String.prototype.format = function(...args) {
		return this.replace(/{(\d+)}/g, (match, number) => (typeof args[number] != 'undefined') ? args[number] : match)
	}
}
