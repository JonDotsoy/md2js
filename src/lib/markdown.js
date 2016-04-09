import 'babel-polyfill'



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


export let isBlockquote = function (str, nxtl) {
	let math,
		useNxtl = false

	if (/\>(.+)/.exec(nxtl) !== null) useNxtl = true
	if ((math = /\>(.+)/.exec(str)) !== null) return {literal: math[1].trim(), nxtl: useNxtl}

	return null
}


/**
 * Busca dentro de multiples lineas los elementos que estos forman.
 */
export let linesToElement = function * (lines) {
	if (!Array.isArray(lines)) lines = [lines]

	for (let indexLine = 0; indexLine < lines.length; indexLine++) {
		indexLine = Number(indexLine)
		let line,
			prevLine,
			nextLine

		let generated = () => {
			line = String(lines[indexLine]).trim()
			prevLine = lines[indexLine - 1]; if (prevLine !== undefined) String(prevLine).trim()
			nextLine = lines[indexLine + 1]; if (nextLine !== undefined) String(nextLine).trim()
		}
		let proceed = (n = 1) => {
			indexLine = indexLine + n
			generated()
			return indexLine
		}

		generated()

		let element

		if (element = isHeader(line, nextLine)) {
			yield new Header(element.level, element.literal)
			if (element.nxtl) proceed()
		}
		else
		if (element = isBlockquote(line, nextLine)) {
			let literal = []

			while (true) {
				literal.push(element.literal)
				if (element.nxtl === true) {
					proceed()
					element = isBlockquote(line, nextLine)
				}
				else break
			}

			yield new Blockquote(literal)
		}

		else
		if (line !== '') {
			yield new Inline(line)
		}

	}
}

export let parseInner = function (innerIn) {
	let inner = []

	let lines = linesToElement(innerIn)

	while (true) {
		let {done, value:element} = lines.next()
		if (done) break

		inner.push(element)
	}

	return inner
}

export class Document {
	constructor (linesDoc) {
		this['$type$'] = 'Document'
		this['inner'] = parseInner(linesDoc)
	}
}


export class Header {
	constructor (level, inner) {
		this['$type$'] = 'Header'
		this.level = level
		this.inner = parseInner(inner)
	}
}


export class Link {
	constructor () {
		this['$type$'] = 'Link'
		// this.title = 'abc'
		// this.href = '//abc'
	}

}


export class Blockquote {
	constructor (inner) {
		this['$type$'] = 'Blockquote'
		this.inner = parseInner(inner)
	}
}


export class Inline {
	constructor (inner) {
		this['$type$'] = 'Inline'
		this.inner = inner
	}
}


export let normalize = function (source, { newline = '\n' } = {}) {
	let structure = {}

	structure = new Document(source.split(newline))

	return structure
}
