/* eslint-disable no-dupe-class-members */
'use strict'
var Collection = require('./Collection.js')
class Db{
	constructor(options){
		this.name=options.name
		this.url=options.url 
	}

	get collection(){
		return this.collection
	}
	collection(name){
		return new Collection({name:name,db:this})
	}
}
module.exports=Db