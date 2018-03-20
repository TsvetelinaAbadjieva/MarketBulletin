// var initObj = {
//     dbName: 'dbName'
// }
// var IndexedDB = (function (window, initObj) {
//
//     var tableCollection = [];
//     var indexCollection = [];
//     var dbType = 'IndexedDB';
//     var request = null;//window.indexedDB.open(obj.dbName, 1)
//     var db = null;//request.result
//
//     var getInstance = function () {
//
//         this.tableCollection = [];
//         this.indexCollection = [];
//         this.dbType = 'IndexedDB';
//         if (!this.checkExistingDatabase(obj.dbName)) {
//             var request = window.indexedDB.open(obj.dbName, 1);
//             request.onerror = function (event) {
//                 console.log('Database storage can not be created');
//             }
//             request.onsuccess = function (event) {
//                 this.request = request;
//                 this.db = this.request.result;
//                 console.log('Successfully created data storage');
//             }
//         }
//         return this;
//     };
//
//     var checkExistingDatabase = function (dbName) {
//         var indexeddbReq = window.indexedDB.webkitGetDatabaseNames();
//         indexeddbReq.onsuccess = function (evt) {
//             if (evt.target.result.contains(dbName)) {
//                 return true;
//             }
//             else {
//                 return false;
//             }
//         }
//     }
//     var checkExistingStore = function (tableName) {
//         var tableExists = this.tableCollection.filter(function (item) {
//             return (item == tableName)
//         });
//         if (tableExists.length > 0)
//             return true;
//         return false;
//     };
//
//     // Create the schema
//     var initLocalDBTable = function (tableName, indexName, indexedFieldsArray) {
//
//         this.request.onupgradeneeded = function (tableName, indexName, indexedFieldsArray) {
//
//             var db = this.request.result;//this.db;
//             if (!this.checkExistingStore(tableName)) {
//
//                 var store = db.createObjectStore(tableName, { keyPath: "id" });
//                 var index = store.createIndex(indexName, indexedFieldsArray);
//                 this.tableCollection.push(store);
//                 this.indexCollection.push(index);
//             }
//         };
//         return this;
//     }
//     var addData = function (tableName, indexName, data) {
//         this.request.onsuccess = function (tableName, indexName) {
//             // Start a new transaction
//             var db = this.db;
//             var tx = db.transaction(tableName, "readwrite");
//             var store = tx.objectStore(tableName);
//             var index = store.index(indexName);
//
//             // Add some data
//             for (var i = 0; i < data.length; i++) {
//                 store.put(data[i]);
//             }
//             // store.put({ id: 12345, name: { first: "John", last: "Doe" }, age: 42 });
//             // store.put({ id: 67890, name: { first: "Bob", last: "Smith" }, age: 35 });
//
//             // Query the data
//             // var getJohn = store.get(12345);
//             // var getBob = index.get(["Smith", "Bob"]);
//
//             // getJohn.onsuccess = function () {
//             //     console.log(getJohn.result.name.first);  // => "John"
//             // };
//
//             // getBob.onsuccess = function () {
//             //     console.log(getBob.result.name.first);   // => "Bob"
//             // };
//
//             // Close the db when the transaction is done
//             tx.oncomplete = function () {
//                 db.close();
//             };
//         }
//     };
//
//     var removeData = function (tableName) {
//
//         var transaction = this.db.transaction([tableName]);
//         var objectStore = transaction.objectStore(tableName);
//         var request = objecstore.clear();
//         request.onsuccess = function (event) {
//             console.log("Removed data from ", tableName);
//         };
//     };
//
//     var getAllData = function (tableName) {
//
//         var data = [];
//         var objectStore = this.db.transaction([tableName]).objectStore(tableName);
//         objectStore.openCursor().onsuccess = function (event) {
//             var cursor = event.target.result;
//
//             if (cursor) {
//                 var key = cursor.key;
//                 var value = cursor.value
//                 var item = { key: value }
//                 data.push(item);
//                 // alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Age: " + cursor.value.age + ", Email: " + cursor.value.email);
//                 cursor.continue();
//             }
//             else {
//                 alert("No more entries!");
//             }
//             return data;
//         };
//     }
//     //dataArrays = [{tableName:'table1', data:[data1]}, {tableName:'table2', data:[data2]}]
//     var refreshData = function (dataArrays) {
//
//         if (dataArrays.length > 0) {
//             for (var i = 0; i < dataArrays.length; i++) {
//                 if (this.tableCollection.indexOf(dataArrays[i].tableName)) {
//
//                     var tableName = dataArrays[i].tableName;
//                     var data = dataArrays[i].data;
//                     this.removeData(tableName);
//                     this.addData(tableName);
//                 }
//             }
//         }
//     }
//
//     var find = function (tableName, id) {
//
//         var item = null;
//         if (this.tableCollection.indexOf(dataArrays[i].tableName)) {
//
//             var tx = this.db.transaction(tableName, "readwrite");
//             var store = tx.objectStore(tableName);
//             var request = store.get(id);
//
//             request.onerror = function (event) {
//                 alert("Unable to retrieve data from database!");
//             };
//
//             request.onsuccess = function (event) {
//                 // Do something with the request.result!
//                 if (request.result) {
//                     item = request.result;
//                     return item;
//                 }
//                 else {
//                     console.log("Item couldn't be found in your database!");
//                 }
//             }
//             tx.oncomplete = function () {
//                 this.db.close();
//             };
//         }
//         return item;
//     }
//
//     return {
//         initLocalDBTable: initLocalDBTable,
//         refreshData: refreshData,
//         find: find
//
//     }
// }(window, initObj))
//
// var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
//
// // Open (or create) the database
// var open = indexedDB.open("MyDatabase", 1);
// var tableCollection = [];
// var indexCollection = [];
// var dbType = 'IndexedDB';
// //tableCollection = ['tableName1','tableName2']
// //indexCollection = [{table:'tableName1', index:'indexName']
// //CreateDatabase
//
// open.onsuccess = function (tableName, indexName) {
//     // Start a new transaction
//     var db = open.result;
//     var tx = db.transaction(tableName, "readwrite");
//     var store = tx.objectStore(tableName);
//     var index = store.index(indexName);
//
//     // Add some data
//     store.put({ id: 12345, name: { first: "John", last: "Doe" }, age: 42 });
//     store.put({ id: 67890, name: { first: "Bob", last: "Smith" }, age: 35 });
//
//     // Query the data
//     var getJohn = store.get(12345);
//     var getBob = index.get(["Smith", "Bob"]);
//
//     getJohn.onsuccess = function () {
//         console.log(getJohn.result.name.first);  // => "John"
//     };
//
//     getBob.onsuccess = function () {
//         console.log(getBob.result.name.first);   // => "Bob"
//     };
//
//     // Close the db when the transaction is done
//     tx.oncomplete = function () {
//         db.close();
//     };
// }
//=================================

// window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
//
// //prefixes of window.IDB objects
// window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
// window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
//
// if (!window.indexedDB) {
//     window.alert("Your browser doesn't support a stable version of IndexedDB.")
// }
//
// const employeeData = [
//     { id: "00-01", name: "gopal", age: 35, email: "gopal@tutorialspoint.com" },
//     { id: "00-02", name: "prasad", age: 32, email: "prasad@tutorialspoint.com" }
// ];
// var db;
// var request = window.indexedDB.open("newDatabase", 1);
//
// request.onerror = function (event) {
//     console.log("error: ");
// };
//
// request.onsuccess = function (event) {
//     db = request.result;
//     console.log("success: " + db);
// };
//
// request.onupgradeneeded = function (event) {
//     var db = event.target.result;
//     var objectStore = db.createObjectStore("employee", { keyPath: "id" });
//
//     for (var i in employeeData) {
//         objectStore.add(employeeData[i]);
//     }
// }
//
// function read() {
//     var transaction = db.transaction(["employee"]);
//     var objectStore = transaction.objectStore("employee");
//     var request = objectStore.get("00-03");
//
//     request.onerror = function (event) {
//         alert("Unable to retrieve daa from database!");
//     };
//
//     request.onsuccess = function (event) {
//         // Do something with the request.result!
//         if (request.result) {
//             alert("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
//         }
//
//         else {
//             alert("Kenny couldn't be found in your database!");
//         }
//     };
// }
//
// function readAll() {
//     var objectStore = db.transaction("employee").objectStore("employee");
//
//     objectStore.openCursor().onsuccess = function (event) {
//         var cursor = event.target.result;
//
//         if (cursor) {
//             alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Age: " + cursor.value.age + ", Email: " + cursor.value.email);
//             cursor.continue();
//         }
//
//         else {
//             alert("No more entries!");
//         }
//     };
// }
//
// function add() {
//     var request = db.transaction(["employee"], "readwrite")
//         .objectStore("employee")
//         .add({ id: "00-03", name: "Kenny", age: 19, email: "kenny@planet.org" });
//
//     request.onsuccess = function (event) {
//         alert("Kenny has been added to your database.");
//     };
//
//     request.onerror = function (event) {
//         alert("Unable to add data\r\nKenny is aready exist in your database! ");
//     }
// }
//
// function remove() {
//     var request = db.transaction(["employee"], "readwrite")
//         .objectStore("employee")
//         .delete("00-03");
//
//     request.onsuccess = function (event) {
//         alert("Kenny's entry has been removed from your database.");
//     };
// }
