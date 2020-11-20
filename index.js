/* eslint-disable no-dupe-class-members */
'use strict'
var crude = require('./crude.js')

class Clay{
	constructor(){

	}
	get set(){
		return this.set
	}
	get collection(){
		return this.Collection
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
	set(dbUrl,dbName){
		this.dbUrl=dbUrl
		this.dbName=dbName
	}
	collection(modelName){
		if(this.dbUrl&&this.dbName){
			let self=this
			return class{
				constructor(data){
					this.collection=modelName
					this.data=(data && typeof data == 'object')?data:{}
				}
				get save(){
					return this.save
				}
				setData(data){
					for(var a in data){
						this.data[a]= data[a]
					}
				}
				getData(){
					return this.data
				}
				save(callback){
					
					crude.connection(self.dbUrl,self.dbName,(db,client)=>{
						crude.insertDocument(db,modelName,this.data,(result)=>{
							if(callback){
								callback(result)
							}
							client.close()
						})
					})
				}
				static find(key,projection,callback){
					crude.connection(self.dbUrl,self.dbName,(db,client)=>{
						crude.findDocuments(db,modelName,key,projection,(docs)=>{
							if(callback){
								callback(docs)
							}
							client.close()
						})
					})
				}
				static update(key,newKey,callback){
					crude.connection(self.dbUrl,self.dbName,(db,client)=>{
						crude.updateDocument(db,modelName,key,newKey,(result)=>{
							if(callback){
								callback(result)
							}
							client.close()
						})
					})
				}
				static remove(key,callback){
					crude.connection(self.dbUrl,self.dbName,(db,client)=>{
						crude.removeDocument(db,modelName,key,(result)=>{
							if(callback){
								callback(result)
							}
							client.close()
						})
					})
				}
				static aggregate(rules,callback){
					crude.connection(self.dbUrl,self.dbName,(db,client)=>{
						crude.aggregateDocuments(db,modelName,rules,(docs)=>{
							if(callback){
								callback(docs)
							}
							client.close()
						})
					})
				}
				static count(key,callback){
					crude.connection(self.dbUrl,self.dbName,(db,client)=>{
						crude.countDocuments(db,modelName,key,(count)=>{
							if(callback){
								callback(count)
							}
							console.log(count+'no se que pasa')
							client.close()
						})
					})
				}
			}
		}else{
			return false
		}
	}
	saveMany(collectionName,docs,callback){
		if(this.dbUrl&&this.dbName){
			crude.connection(this.dbUrl,this.dbName,(db,client)=>{
				crude.insertDocuments(db,collectionName,docs,(docs)=>{
					if(callback){
						callback(docs)
					}
					client.close()
				})
			})
		}
	}
	find(collectionName,key,projection,callback){
		if(this.dbUrl&&this.dbName){
			crude.connection(this.dbUrl,this.dbName,(db,client)=>{
				crude.findDocuments(db,collectionName,key,projection,(docs)=>{
					if(callback){
						callback(docs)
					}
					client.close()
				})
			})
		}
	}
	update(collectionName,key,newKey,callback){
		if(this.dbUrl&&this.dbName){
			crude.connection(this.dbUrl,this.dbName,(db,client)=>{
				crude.updateDocument(db,collectionName,key,newKey,(result)=>{
					if(callback){
						callback(result)
					}
					client.close()
				})
			})
		}

	}
	remove(collectionName,key,callback){
		if(this.dbUrl&&this.dbName){
			crude.connection(this.dbUrl,this.dbName,(db,client)=>{
				crude.removeDocument(db,collectionName,key,(result)=>{
					if(callback){
						callback(result)
					}
					client.close()
				})
			})
		}
	}
	aggregate(collectionName,rules,callback){
		if(this.dbUrl&&this.dbName){
			crude.connection(this.dbUrl,this.dbName,(db,client)=>{
				crude.aggregateDocuments(db,collectionName,rules,(docs)=>{
					if(callback){
						callback(docs)
					}
					client.close()
				})
			})
		}
	}
	count(collectionName,key,callback){
		if(this.dbUrl&&this.dbName){
			crude.connection(this.dbUrl,this.dbName,(db,client)=>{
				crude.countDocuments(db,collectionName,key,(count)=>{
					if(callback){
						callback(count)
					}
					client.close()
				})
			})
		}
	}
}
module.exports=new Clay()