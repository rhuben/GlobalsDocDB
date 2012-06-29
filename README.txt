This program is a document-database built on globals Cache in Node.js.

In the current build, "collections" are primarily a global. The sub-nodes of a collection are "documents." Sub-nodes of a document are data.
Currently it is advised that data only be primitive data types.

Some methods include:
testMethod(), which shows many of the features of this program

addDocument(), which adds a document to a collection
clearDocuments(), which deletes all documents from a collection
dumpInfo(), which outputs a lot of information about a collection

addDatum(), which changes a data value in a document
findValue(), which returns the data value for a certain key
and clearData(), which clears all data from a document


Note: The program may not run if the path to your globals directory is not properly set. If you encounter this bug, you may have to change the first four lines of code so that the variable "globals" is set properly.