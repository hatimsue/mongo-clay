# mongo-clay
This project is a  module  of functions to allow acces to a mongo db and make CRUD Actions
## Install

npm install mongodb 

npm install mongo-clay

## How to use
```javascript
var clay=require('mongo-clay');
//set DB 
clay.set('mongodb://localhost:27017/','dbName');
//set collection
var myCollection=clay.Collection('collectionName');
```
	
### Insert Document
```javascript
var myDocument=new myCollection();

myDocument.setData({name:'Jhon'});
myDocument.setData({age:17});
myDocument.setData({email:'example@example.com'});

myDocument.save((result)=>{
	console.log(result)
});

//or

let data = {
	name:'Jhon',
	age:17,
	email:'example@example.com'
}
var myDocument=new myCollection(data);
myDocument.save((result)=>{
	console.log(result)
})
```

### Find Documents
```javascript

myCollection.find({age:17},{},(docs)=>{
	console.log(docs);
});
//or
clay.find('collectionName',{age:17},{},(docs)=>{
	console.log(docs);
});
```

### Projections 
```javascript
let projection = {name:1};
myCollection.find({age:17},projection,(docs)=>{
	console.log(docs);
});
//or
clay.find('collectionName',{age:17},projection,(docs)=>{
	console.log(docs);
});
```

### Aggregation
```javascript
let rules=[
	{ '$match': {
		'age': { '$gte': 20, '$lte': 30 }
	}},
	{ '$group': {
		'_id': '$email'
	}}];
myCollection.aggregate(rules,(docs)=>{
	console.log(docs);
});
//or
clay.aggregate('collectionName',rules,(docs)=>{
	console.log(docs);
});
```

### Update Documents

```javascript
//update first document with email example@example.com
myCollection.update({email:'example@example.com'},{age:18},(result)=>{
	console.log(result);
});
//or
clay.update('collectionName',{email:'example@example.com'},{age:18},(result)=>{
	console.log(result);
});
```

### Remove Documents
```javascript	
myCollection.remove({email:'example@example.com'},(result)=>{
	console.log(result);
});
//or
clay.remove('collectionName',{email:'example@example.com'},(result)=>{
	console.log(result);
});

```
