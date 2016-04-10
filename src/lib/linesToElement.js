import {List, isList} from './components/List'
import {Header, isHeader} from './components/Header'
import {Link, isLink} from './components/Link'
import {Blockquote, isBlockquote} from './components/Blockquote'
import {Block} from './components/Block'
import {parseInner} from './components/Inner'

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
			line = String(lines[indexLine])
			prevLine = lines[indexLine - 1]; if (prevLine !== undefined) String(prevLine)
			nextLine = lines[indexLine + 1]; if (nextLine !== undefined) String(nextLine)
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
		if (element = isList(line, nextLine)) {
			let list
			if (element.nxtl === true) {
				
			}
			yield element
		}

		else
		if (line !== '') {
			yield new Block(line)
		}

	}
}

