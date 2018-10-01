import Dexie from 'dexie';
import 'dexie-observable';
import 'dexie-syncable';

import SyncClient from 'sync-client/dist/sync-client';

function syncTest() {
    console.log ("Starting Dexie!! ");

    const databaseName = 'syncTestDB'; // The name for the indexedDB database
    const versions =    [ {
        version: 2,
        stores: {
            test: 'id,name'
                }
              }];
     
    const syncClient = new SyncClient(databaseName, versions);    

    let options = { table: 'test', pollInterval: 500};

    function printRevision () {
        syncClient._syncNodes.get({type: 'remote'}).then((status)=> {
            console.log('revision: ', status);
        });
    }

    function save(data) {
        return new Promise ((resolve) => {
            syncClient.transaction('rw', syncClient.test, function () {
                //    syncClient.test.put({id:1, profile: {name: 'paulo', age:50}}).then(()=>{
                        syncClient.test.put(data).then(()=>{
                            console.log ('test updated ', data);
                            resolve();
                        });
                    });
    
        })
    }

    console.log ("Connecting to sync server!! ");
    
//    db.syncable.connect ("websocket", "http://localhost:3000").then(function () {
    syncClient.connect ("http://localhost:3000", options).then(function () {
        console.log ("Connected to sync server!! ");

        save({id:1, isReporter: true, profile: {name: 'paulo', age:51}}).then(()=>{
            printRevision();
            save({id:2, profile: {name: 'andre', age:6}}).then(()=>{
                printRevision();
/*                syncClient.disconnect("http://localhost:3000").then(()=>{
                    console.log ('disconnected ');
                });*/
            });
        });
    
    }, function (error) {
        console.error("Connection error: " + error);

    }).catch(err => {
        console.error (`Failed to connect: ${err.stack || err}`);
    });


//    db.syncable.on('statusChanged', function (newStatus, url) {
    syncClient.statusChange( function (newStatus, url) {
            console.log ("Sync Status changed: " + Dexie.Syncable.StatusTexts[newStatus]);
    });
    


//    });

}

window.onload = function() {
    console.log ("Starting !! ");
    syncTest();
};



