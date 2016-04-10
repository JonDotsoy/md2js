import {parseInner} from './Inner'


export let isBlockquote = function (str, nxtl) {
	let math,
		useNxtl = false,
		regFind = /\s{0,3}\>(.+)/

	if (regFind.exec(nxtl) !== null) useNxtl = true
	if ((math = regFind.exec(str)) !== null) return {literal: math[1].trim(), nxtl: useNxtl}

	return null
}

export class Blockquote {
	constructor (inner) {
		this['$type$'] = 'Blockquote'
		this.inner = parseInner(inner)
	}
}
