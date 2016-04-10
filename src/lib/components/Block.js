import {parseInner} from './Inner'

export class Block {
	constructor (inner) {
		this['$type$'] = 'Block'
		this.inner = inner
	}
}
