# mongo-clay
this project will be a module  of functions to allow acces to a mongo db and do CRUD Actions
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

myDocument.name='Jhon';
myDocument.age=17;
myDocument.email='example@example.com'

myDocument.save();
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
myCollection.remove({{email:'example@example.com'},(result)=>{
	console.log(result);
});
//or
clay.remove('collectionName',{{email:'example@example.com'},(result)=>{
	console.log(result);
});

```
