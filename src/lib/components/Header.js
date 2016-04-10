import {parseInner} from './Inner'


export let isHeader = function (str, nxtl = null) {
	let math
	str = str.trim()
	if (nxtl !== null) nxtl = nxtl.trim()

	// Title with close
	math = /^(\#+)(.+?)(\#{0,})$/.exec(str)
	if (!(math === null) && math[1].length <= 6) return {literal: math[2].trim(), level: math[1].length}

	// Title simple level 1
	math = /^\=+$/.exec(nxtl)
	if (!(math === null)) return {literal: str.trim(), level: 1, nxtl:true}

	// Title simple level 2
	math = /^\-+$/.exec(nxtl)
	if (!(math === null)) return {literal: str.trim(), level: 2, nxtl:true}

	// Title Simple
	// math = /^(\#+)(.+)$/.exec(str)
	// if (!(math === null) && math[1].length <= 6) return {literal: math[2].trim(), level: math[1].length}

	return null
}


export class Header {
	constructor (level, inner) {
		this['$type$'] = 'Header'
		this.level = level
		this.inner = parseInner(inner)
	}
}

