import path from 'path'
import fs from 'fs'
import {normalize} from './markdown'

let str = normalize( fs.readFileSync( path.normalize( process.cwd() + '/README.md' ), 'utf8' ) )

console.log( JSON.stringify(str, null, 4) )
