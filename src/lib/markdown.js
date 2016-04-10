import 'babel-polyfill'

import {List, isList} from './components/List'
import {Header, isHeader} from './components/Header'
import {Link, isLink} from './components/Link'
import {Document} from './components/Document'
import {Blockquote, isBlockquote} from './components/Blockquote'
import {Block} from './components/Block'
import {parseInner} from './components/Inner'


export let normalize = function (source, { newline = '\n' } = {}) {
	let structure = {}

	structure = new Document(source.split(newline))

	return structure
}
