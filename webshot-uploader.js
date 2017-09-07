
var Pageres = require('pageres');

var pageres = new Pageres({delay: 2})
    .src('facebook.com', ['1280x720'])
    .dest('temp');

pageres.run(function (err) {
  console.log('done');
});

var http = require("http");
var s3 = require('s3');
var AWS = require('aws-sdk');
var awsS3Client = new AWS.S3();
var client = s3.createClient({
    s3Options: {
        accessKeyId: "AKIAICMYZMZN6PEIP5LQ",
        secretAccessKey: "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",
        signatureVersion: 'v3',
        ACL:'public-read',
        region: "ap-south-1",
    },
});
var params = {
    localFile: "temp/google.com-1280x720.png",

    s3Params: {
        Bucket: "cdn.ratenjoy.com",
        Key: "test/facebook.com-1280x720.png",
    },
};
var uploader = client.uploadFile(params);
uploader.on('error', function(err) {
    console.error("unable to upload:", err.stack);
});
uploader.on('progress', function() {
    console.log("progress", uploader.progressMd5Amount,
        uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function() {
    console.log("done uploading");
});