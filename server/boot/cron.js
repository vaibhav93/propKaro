'use strict';
var schedule = require('node-schedule');
var moment = require('moment');
var backup = require('mongodb-backup');
var fs = require('fs'),
    path = require('path'),

    app = require('../../server/server');

// var dump = require('dumpstr').dump;
module.exports = function(app) {
    var rule = new schedule.RecurrenceRule();
    rule.hour = 14;
    rule.minute = 30;
    var j = schedule.scheduleJob(rule, function() {
        //dump db
        var current = moment().format('DD-MM-YYYY');
        var backupComplete = function() {


            //dump db to S3
            var params = {
                localFile: 'server/dbBackup/' + 'uniquick-' + current + '.tar',
                s3Params: {
                    Bucket: "uniquickdb",
                    Key: 'uniquick-' + current + '.tar'
                }
            };
            var uploader = app.client.uploadFile(params);
            uploader.on('end', function() {
                //console.log("db uploaded to s3");
            });
        }

        backup({
            uri: 'mongodb://localhost:27017/propKaro', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
            root: 'server/dbBackup', // write files into this dir
            tar: 'uniquick-' + current + '.tar', // save backup inot this tar file
            metadata: true,
            callback: backupComplete
        });

    });
}