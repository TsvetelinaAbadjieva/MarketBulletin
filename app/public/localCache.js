var LocalCache = function(dbName, dbSize, dvVersion, dbType, window){

  const dbName = dbName;
  const dbSize = dbSize;
  const dbVersion =1;
  const dbType  = dbType;
  const db;
  const window = window;



  this.init = function(){

    this.dbName = dbName;
    this.dbSize = dbSize;
    this.dbVersion =1;
    this.dbType  = dbType;
    this.db = null;
    this.window = window;

    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
    if (window.indexedDB || window.IDBTransaction){
      this.type = 'indexedDB';
      return this.db = new IndexedDB(this);
    }
  }
}
LocalCache.prototype.initLocalDBTable = function(tableName){
  var localCache = new LocalCache();
  var db = localCache.init();
  db.initLocalDBTable();
}

var IndexedDB = function(obj){
  this = obj;
  this.db = window.indexedDB.open(obj.dbName, obj.dbVersion, function(upgradeDb){
    if(!upgradeDb.objectStoreNames.contains('store')){
      upgradeDb.createObjectStore('store');
      //ex upgradeDb.createObjectStore('name', {keyPath:'email',autoincrement: true }).createIndex('indexName', 'indexColumn', {unique:true})
    }
  });//optional callback
  return this;
}
IndexedDB.prototype.initLocalDBTable = function()
