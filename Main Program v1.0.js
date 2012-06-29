var rootOfGlobalsInstall = process.env.GLOBALS_HOME;
var rootOfNodeInstall = process.env.nodeRoot;
var fullPathToCacheDotNode = rootOfNodeInstall + '\\lib\\node\\cache.node' ;
var globals = require(rootOfNodeInstall+'\\cache');

var pathToGlobalsMGR = rootOfGlobalsInstall + '/mgr';
var userName = '_SYSTEM';
var password = 'SYS';
var namespace = 'USER';


testMethod();






function collection(name) {

//Methods:
	function addDocument(document) { //puts a "document" in the collection
		this.documentCount++;
		this.data.set(this.iden, this.documentCount, document);
		document.collection=this;
	}

	function dumpInfo (a) { //prints a bunch of stuff about the "documents"	
		if (this.documentCount===0)
		{ 
			console.log ("There are no documents in the \""+this.iden+
					"\" collection.");
			return;
			}
		if (a===1){
			console.log("There are currently "+ this.documentCount +
			" documents in the collection named \""+ this.iden+ 
			"\". The names of the documents are:");
			for (var i=1; i<=this.documentCount; i++){
				var b=this.data.get(this.iden, i);
				console.log(b);
			}
		}
		if (a===2){
			console.log("There are currently "+ this.documentCount +
					" documents in the collection named \""+ this.iden+
					"\". The names of the documents are:");
			for (var i=1; i<=this.documentCount; i++){
				var b=this.data.get(this.iden, i);
				console.log(b.id);
			}
		}
		if (a===3)
			{
			
			}
	}

	function findDocuments () {} //search feature to implement later

	function clearDocuments () { //deletes all documents
		this.data.kill(this.iden);
		this.documentCount=0;
	}
	// end of methods for collections
	
	//the main part of the collection constructor:
	this.iden=name;
	this.documentCount=0;
	this.data= new globals.Cache();
	this.data.open({
		path: pathToGlobalsMGR,
		username: userName,
		password: password,
		namespace: name
	}
	);

//these are actually very important, dont change them:
	this.addDocument=addDocument;
	this.dumpInfo=dumpInfo;
	this.findDocuments=findDocuments;
	this.clearDocuments=clearDocuments;

}

//end of collection method


//documents are not very well implemented at this point
function document(name){
	this.id=name;
	this.collection;
	this.numberOfData=0;

	
	
	
	function addDatum(key, value)
	{
		this.collection.data.set(this.collection.iden, this.id, key, value);
		this.numberOfData++;
	}
	
	function dumpInfo()
	{
		console.log("This document has "+ this.numberOfData + " pieces of data");
		var node=this.collection.data.order(this.collection.iden, this.id, "");
		while(node!="")
			{
			console.log("\"" + node+ "\"= \"" + this.findValue(node)+"\"");
			node=this.collection.data.order(this.collection.iden, this.id, node);
			}
	}
	                                               
	function findValue(key) 
	{
		return this.collection.data.get(this.collection.iden, this.id, key);
	}
	
	function clearData() 
	{
		this.collection.data.kill(this.collection.iden, this.id);
		this.numberOfData=0;
	}
	
	
	this.addDatum=addDatum;
	this.dumpInfo=dumpInfo;
	this.findValue=findValue;
	this.clearData=clearData;
}


function testMethod(){ //a method used to test the features of Main

	var a= new collection("animals");
	var doc= new document("foods");
	a.addDocument(doc);
	doc.addDatum("chocolate", "delicious");
	doc.addDatum("broccoli", "even more delicious!");
	doc.addDatum("eggplant", "i don't know anymore");
	doc.dumpInfo();
	doc.clearData();
	doc.dumpInfo();
	/*	var b= new document("Fred", 5);
	a.addDocument("foo"); //note that this is not actually a document, just a string
	a.addDocument("bar");
	a.addDocument("bas");  
	a.addDocument(b); */
/*	var c= new document("Sally", 1);
	a.addDocument(c);
	a.addDocument(new document("Joe", 3));
	a.addDocument(new document("Fred", 5));
	a.addDocument(new document("Jess", 7));
	console.log(c.data);
	console.log(c.id);
	console.log(c.collection);  */
//	a.dumpInfo(1);
//	a.clearDocuments();
//	a.dumpInfo(1);
//	a.data.close(); 
}



