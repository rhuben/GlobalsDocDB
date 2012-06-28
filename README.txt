In this folder there are two programs, both alike in dignity, in fair Node.js where we lay our scene.

The programs are attempts to create a document database using globals in Node.js.

Currently, the program can create one "collection" object, and can load some number of "documents" into it (although at this point a document is not well implemented).
It also can clear the documents and has a "textDump" method which displays information about the collection.
The only globals Cache methods it calls are get(), set(), and kill().

In order to allow there to be more than one collection, I did a find/replace for the terms "'myGlobal'" and "this.iden". 'myGlobal' was a holder name that I was using, and this.iden is a value in the collection.
After making this change, I got a strange bug. The error message is "Evented I/O for V8 JavaScript has stopped working." What is truly bizarre is that this bug occurs in the line 
<code> a.addDocument("bas"); </code>
but the program is able to run 
<code> a.addDocument("foo");
a.addDocument("bar"); </code>
(which is directly before it) without any problem, so I am not sure what went wrong.

NOTE: You may have to change the first four lines of code to get the program running, since those lines determine where the program looks for Globals Cache.