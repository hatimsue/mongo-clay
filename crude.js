/*this archive will be a module  of functions to allow acces to a mongo db and do CRUD Actions*/

/*
	dbUrl : is the database URL
	callback: is a function
	db: is the database
	coll: is the collection to be manipulated
	key: is an object {status:value} to find a doc to be manipulated
	doc: is a doc to be inserted
	projection: is a object {status1:0,status2:0...} to filter docs in the findDocuments method
	match: is an object to match docs {$match:{status:'value'}}
	group. is an object to operate docs matched {$group:{_id:'$status',total:{$operator: '$status'}}}
*/

var MongoClient = require('mongodb').MongoClient
var connection=function(dbUrl,dbName,callback){
	MongoClient.connect(dbUrl,{ useUnifiedTopology: true},(err,client)=>{
		if(err) throw err
		console.log('data base is conected ')
		const db = client.db(dbName)
		callback(db,client)
	})
}
var insertDocument=function(db,coll,doc,callback){
	var collection=db.collection(coll)
	collection.insertOne(doc,function(err,result){
		if(err) throw err
		console.log('the doc was inserted')
		callback(result)
	})
}

var insertMany = function(db,coll,docs,options){
	return new Promise((resolve, reject)=>{
		try{
			let collection=db.collection(coll)
			collection.insertMany(docs,options,(err,r)=>{
				if(err) throw err
				resolve(r)
			})
		}catch(e){
			reject(e)
		}
		
	})
	
}
var findDocuments=function(db, coll,key,projection,options,callback){
	if(key._id){
		key._id=new require('mongodb').ObjectId(key._id)
	}
	var skip = options.skip || 0
	var limit = options.limit || 100
	var collection=db.collection(coll)
	collection.find(key).project(projection).skip(skip).limit(limit).toArray(function(err,docs){
	//collection.find(key,projection).toArray(function(err,docs){
		if(err) throw err
		console.log('findDocuments method has been called')
		console.log(projection)
		callback(docs)
	})
}
var updateDocument=function(db,coll,key,newKey,callback){
	if(key._id){
		key._id=new require('mongodb').ObjectId(key._id)
	}
	var collection=db.collection(coll)
	collection.updateOne(key,{$set:newKey},function(err,result){
		if(err) throw err
		if(result.result.nModified===1){
			console.log('the doc was updated')
		}else if(result.result.nModified===0){
			console.log('the doc was not updated')
		}
		callback(result)
	})
}
var removeDocument=function(db,coll,key,callback){
	if(key._id){
		key._id=new require('mongodb').ObjectId(key._id)
	}
	var collection=db.collection(coll)
	collection.deleteOne(key,function(err,result){
		if(err) throw err
		console.log(result.result.n+ ' docs deleted')
		callback(result)
	})
}
var aggregateDocuments=function(db,coll,rules,callback){
	var collection=db.collection(coll)
	collection.aggregate(rules,function(err, cursor) {
		if(err) throw err
		cursor.toArray(function(err, docs) {
			
			console.log(docs)
			callback(docs)
		})
	})
}
var countDocuments=function(db,coll,key,callback){
	if(key._id){
		key._id=new require('mongodb').ObjectId(key._id)
	}
	var collection=db.collection(coll)
	collection.count(key,function(err,count){
		if(err) throw err
		console.log(count)
		callback(count)
	})
}

module.exports={
	findDocuments,
	removeDocument,
	insertDocument,
	insertMany,
	updateDocument,
	aggregateDocuments,
	countDocuments,
	connection
}