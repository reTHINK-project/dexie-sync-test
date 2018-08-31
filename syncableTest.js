import {Dexie} from 'dexie.js';
import 'dexie-observable';
import 'dexie-syncable';

import SyncClient from 'sync-client';

function syncTest() {
    console.log ("Starting Dexie!! ");

    const databaseName = 'testDB'; // The name for the indexedDB database
    const versions =    [ {
        version: 1,
        stores: {
            friends: "$$oid,name,shoeSize",
            pets: "$$oid,name,'kind'"
            }
      }
  ];
     
    const syncClient = new SyncClient(databaseName, versions);    
        
/*    var db = new Dexie("MySyncedDB");
    db.version(1).stores({
        friends: "$$oid,name,shoeSize",
        pets: "$$oid,name,'kind'"
    });
    console.log ("Connecting to sync server!! ");*/
    
//    db.syncable.connect ("http", "http://localhost:3000").then(function () {
    syncClient.connect ("websocket", "http://localhost:3000").then(function () {


    }, function (error) {
        console.error("Connection error: " + error);

    }).catch(err => {
        console.error (`Failed to connect: ${err.stack || err}`);
    });


//    db.syncable.on('statusChanged', function (newStatus, url) {
    syncClient.on('statusChanged', function (newStatus, url) {
            console.log ("Sync Status changed: " + Dexie.Syncable.StatusTexts[newStatus]);
    });
    
    console.log ("Connected to sync server!! ");
    syncClient.transaction('rw', syncClient.friends, function (friends) {
        friends.add({name: "Arne", shoeSize: 47});
        friends.where('shoeSize').above(40).each(function (friend) {
            console.log("Friend with shoeSize over 40: " + friend.name);
        });
    });

}

window.onload = function() {
    console.log ("Starting !! ");
    syncTest();
};



