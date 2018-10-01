import Dexie from 'dexie';
import 'dexie-observable';
import 'dexie-syncable';

import SyncClient from 'sync-client/dist/sync-client';

function sync() {
    let backupRevision = document.getElementById("revision").value;
 
     let options = {table: 'test', observer: true, baseRevision: backupRevision, syncedRevision: backupRevision};
 
 console.log ("Connecting to sync server!! ");
 
 //    db.syncable.connect ("websocket", "http://localhost:3000").then(function () {
 syncClient.connect ("http://localhost:3000", options).then(function () {
     console.log ("Connected to sync server!! ");
 
     syncClient.transaction('rw', syncClient.test, function () {
         //    syncClient.test.put({id:1, profile: {name: 'paulo', age:50}}).then(()=>{
                 syncClient.test.put({id:3, profile: {name: 'dinis', age:9}}).then(()=>{
                     console.log ('test updated ');
 
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
 }


//function syncTest() {
    console.log ("Starting Dexie!! ");

    

    const databaseName = 'syncTestDB'; // The name for the indexedDB database
    const versions =    [ {
        version: 2,
        stores: {
            test: 'id,name'
                }
              }];
     
    const syncClient = new SyncClient(databaseName, versions);    

    syncClient.transaction('rw', syncClient.test, function () {
        //    syncClient.test.put({id:1, profile: {name: 'paulo', age:50}}).then(()=>{
                syncClient.test.put({id:1, isReporter: false, profile: {name: 'paulo', age:51}}).then(()=>{
                    console.log ('test updated ');
                });
            });

//    });

/*}



window.onload = function() {
    console.log ("Starting !! ");
    syncTest();
};
*/

