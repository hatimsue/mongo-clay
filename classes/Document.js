/* eslint-disable no-dupe-class-members */
'use strict'
var crude = require('../crude.js')
class Document{
	constructor(options){
		this.collection=options.collection
		this.data=options.data
	}
	get save(){
		return this.save
	}
	get update(){
		return this.update
	}
	get delete(){
		return this.delete
	}
	save(){
		return new Promise((resolve,reject)=>{
			try{
				crude.connection(this.collection.db.url,this.collection.db.name,(db,client)=>{
					crude.insertDocument(db,this.collection.name,this.data,(result)=>{
						client.close()
						resolve(result)
					})
				})
			}catch(e){
				reject(e)
			}
		})		
		
	}
	update(){

	}
	delete(){

	}

}
module.exports=Document