import Dexie from 'dexie';
import 'dexie-observable';
import 'dexie-syncable';

import SyncClient from 'sync-client/dist/sync-client';

function syncTest() {
    console.log ("Starting Dexie!! ");

    const databaseName = 'syncTestDB3'; // The name for the indexedDB database
    const versions =    [ {
        version: 2,
        stores: {
            test1: 'id'
                }
              }];
    let options = { table: 'test1'};
     
    const syncClient = new SyncClient(databaseName, versions);    

    console.log ("Connecting to sync server!! ");
    
//    db.syncable.connect ("websocket", "http://localhost:3000").then(function () {
    syncClient.connect ("http://localhost:3000", options).then(function () {


    }, function (error) {
        console.error("Connection error: " + error);

    }).catch(err => {
        console.error (`Failed to connect: ${err.stack || err}`);
    });


//    db.syncable.on('statusChanged', function (newStatus, url) {
    syncClient.statusChange( function (newStatus, url) {
            console.log ("Sync Status changed: " + Dexie.Syncable.StatusTexts[newStatus]);
    });
    
    console.log ("Connected to sync server!! ");
    syncClient.transaction('rw', syncClient.test1, function () {
        syncClient.test1.put({id:1, profile: {name: 'andre', age:6}}).then(() => {
          console.log ('test1 updated ');

        });
//    });
    });

}

window.onload = function() {
    console.log ("Starting !! ");
    syncTest();
};



