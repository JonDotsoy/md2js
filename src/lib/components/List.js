
import {parseInner} from './Inner'


export let isList = function (str, nxtl) {
	let math,
		useNxtl = false,
		regFind = /^(\s{0,})([*|+|-]|(([0-9]+)\.))\s(.*)$/

	if (math = regFind.exec(str)) {
		let {1:spaces,2:bulleted,4:numbered,5:literal} = math
		if (numbered) numbered = Number(numbered)
		if (regFind.exec(str)) useNxtl = true


		return {spaces,bulleted,numbered,literal, nxtl:useNxtl}
	}

	return null
}


export let List {
	constructor () {
		this['$type$'] = List
	}
}

