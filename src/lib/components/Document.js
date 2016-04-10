import {parseInner} from './Inner'


export class Document {
	constructor (linesDoc) {
		this['$type$'] = 'Document'
		this['inner'] = parseInner(linesDoc)
	}
}

