
import {parseInner} from './Inner'


export let isList = function (str, nxtl = false, tabs = 0) {
	let math,
		useNxtl = false,
		regFind = /^(\s{0,})([*|+|-]|(([0-9]+)\.))\s(.*)$/

	if (math = regFind.exec(str)) {
		let {1:spaces,2:bulleted,4:numbered,5:literal} = math
		if (numbered) numbered = Number(numbered)
		if (nxtl) if (regFind.exec(nxtl)) useNxtl = true		

		return {spaces,bulleted,numbered,literal, nxtl:useNxtl}
	}

	return null
}


export class List {
	constructor () {
		this['$type$'] = List
	}
}

