const dbName = 'localTracking';
const size = 5 * 1024 * 1024;
const version = 1.0;
const dbCaption = 'System tarcking links';
var db = openDatabase(dbName, version, dbCaption, size);


function initLocalDBTable(tableName) {

    var paramsString = setParams(tableName).forCreate;
    console.log(paramsString)
    // params.forEach(function (element, idx, array) {
    //         if (idx !== array.length - 1) {
    //                 paramsString += element.key + ' ' + element.value + ' ,';
    //         } else {
    //                 paramsString += element.key + ' ' + element.value;
    //         }
    // });

    var sql = 'create table if not exists ' + tableName + ' ' + paramsString;
    db.transaction(function (tx) {
        tx.executeSql(sql);
    });
};

function dropTable(tableName) {
    db.transaction(function (tx) {
        var sql = 'drop table ' + tableName;
        tx.executeSql(sql);
    });
}

function setParams(tableName) {
    var params = {
        forCreate: '',
        forInsert: ''
    };
    switch (tableName) {

        case 'bulletins': params = {
            forCreate: '(id integer, title text, description text ,start_date datetime, expiration_date datetime,send_date datetime, type text,visits integer, client_id integer, send_copies integer, active integer)',
        };
            break;

        case 'tracklinks': params = {
            forCreate: '(linkId integer, target_link text, track_link text, description text, bulletin_id integer, visits integer, name text, clientId integer,title text)',
        };
            break;
    }
    return params;
};

function insertDataLocally(tableName, data) {

    var paramValues = [];
    var questionMarks = '';

    var paramKeys = '';

    var sql = 'INSERT INTO ' + tableName + ' values(' + questionMarks + ')';

    db.transaction(function (tx) {

        paramValues = [];
        for (var i = 0; i < data.length; i++) {

            //paramValues = Object.values(data[i]);
          //  paramValues = Object.values(data[i]).map(function (item) { return "'" + item + "'" }).join();
            paramValues = Object.values(data[i]).join();
            paramKeys = Object.keys(data[i]).join();
            questionMarks = '';
            for (var j = 0; j < Object.values(data[i]).length - 1; j++) {
                questionMarks += '?,';
            }
            questionMarks += '?';

            //sql = 'insert into ' + tableName + ' (' + paramKeys + ') values (' + questionMarks + ')';
            sql = 'insert into ' + tableName + ' ( ' + paramKeys + ') values ( ' + paramValues + ')';
            tx.executeSql(sql);
        }
    });
};


function getAllLocalData(tableName, func) {

    var resultArr = [];
    var sql = 'SELECT * FROM ' + tableName;
    db.transaction(function (tx) {
        tx.executeSql(sql, [], function (tx, results) {
            for (var i = 0; i < results.rows.length; i++) {
                resultArr.push(results.rows.item(i));
            }
            func(resultArr);
        })
    });
}

function refreshData(tableName, data) {
    dropTable(tableName);
    initLocalDBTable(tableName);
    insertDataLocally(tableName, data);
}
