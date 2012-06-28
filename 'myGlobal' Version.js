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
		this.data.set({
			global: 'myGlobal' [this.documentCount], data: document
		});
		document.collection=this;
	}

	function dumpInfo (a) { //prints a bunch of stuff about the "documents"	
		if (a===1){
			console.log("There are currently "+ this.documentCount +
			" documents in this collection. Their names are:");
			for (var i=1; i<=this.documentCount; i++){
				b=this.data.get('myGlobal' [i]);
				console.log(b);
			}
		}
		if (a===2){
			console.log("There are currently "+ this.documentCount +
			" documents in this collection. Their names are:");
			for (var i=1; i<=this.documentCount; i++){
				b=this.data.get('myGlobal' [i]);
				console.log(b.id);
			}
		}
	}

	function findDocuments () {} //search feature to implement later

	function clearDocuments () { //deletes all documents
		for (var i=1;i<=this.documentCount;i++){
			this.data.kill('myGlobal' [i]);
		}
		this.documentCount=0;
	}
	// /methods
	
	//the main part of the constructor:
	this.iden=name;
	this.documentCount=0;
	this.data= new globals.Cache();
	this.data.open({
		path: pathToGlobalsMGR,
		username: userName,
		password: password,
		namespace: namespace
	}
	);

//these are actually very important, dont change them:
	this.addDocument=addDocument;
	this.dumpInfo=dumpInfo;
	this.findDocuments=findDocuments;
	this.clearDocuments=clearDocuments;

}




//documents are not very well implemented at this point
function document(name, data){
	this.id=name;
	this.collection;
	this.data=data;
}


function testMethod(){ //a method used to test the features of Main
	var a= new collection("dog");
	var b= new document("Fred", 5);
	a.addDocument("foo"); //note that this is not actually a document, just a string
	a.addDocument("bar");
	a.addDocument("bas");
	a.addDocument(b);
	a.dumpInfo(1);
	a.clearDocuments();
	a.dumpInfo(1);
	a.data.close();
}