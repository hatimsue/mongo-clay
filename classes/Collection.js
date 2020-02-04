/* eslint-disable no-dupe-class-members */
'use strict'
var crude = require('../crude.js')
var Document = require('./Document.js')




class Collection{
	constructor(options){
		this.name = options.name
		this.db = options.db
	}

	get find(){
		return this.find
	}
	get update(){
		return this.update
	}
	get remove(){
		return this.remove
	}
	get aggregate(){
		return this.aggregate
	}
	get count(){
		return this.count
	}
	get document(){
		return this.document
	}


	find(key,projection,options){
		return new Promise((resolve,reject)=>{
			try{
				crude.connection(this.db.url,this.db.name,(db,client)=>{
					crude.findDocuments(db,this.name,key,projection,(options || {}),(docs)=>{
						client.close()
						resolve(docs)
					})
				})
			}catch(e){
				reject(e)
			}
			
		})
		
	}
	update(key,newKey){
		return new Promise((resolve,reject)=>{
			try{
				crude.connection(this.db.url,this.db.name,(db,client)=>{
					crude.updateDocument(db,this.name,key,newKey,(result)=>{
						client.close()
						resolve(result)
					})
				})
			}catch(e){
				reject(e)
			}
		})	
	}
	remove(key){
		return new Promise((resolve,reject)=>{
			try{
				crude.connection(this.db.url,this.db.name,(db,client)=>{
					crude.removeDocument(db,this.name,key,(result)=>{
						client.close()
						resolve(result)
					})
				})
			}catch(e){
				reject(e)
			}
		})
		
	}
	aggregate(rules){
		return new Promise((resolve,reject)=>{
			try{
				crude.connection(this.db.url,this.db.name,(db,client)=>{
					crude.aggregateDocuments(db,this.name,rules,(docs)=>{
						client.close()
						resolve(docs)
					})
				})
			}catch(e){
				reject(e)
			}
		})
		
	}
	count(key){
		return new Promise((resolve,reject)=>{
			try{
				crude.connection(this.db.url,this.db.name,(db,client)=>{
					crude.countDocuments(db,this.name,key,(count)=>{
						client.close()
						resolve(count)
					})
				})
			}catch(e){
				reject(e)
			}
		})
		
	}
	document(data){
		return new Document({data:data,collection:this})
	}

}

module.exports=Collection