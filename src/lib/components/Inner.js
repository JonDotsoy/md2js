import {parseInner} from './Inner'


import {linesToElement} from '../linesToElement'

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

