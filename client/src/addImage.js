/**
 * Module dependencies
 */

var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// img path
var imgPath = '/path/to/some/img.png';

// connect to mongo
mongoose.connect('localhost', 'testing_storeImg');

// example schema
var imgSchema = new Schema({
    img: { data: Buffer, contentType: String }
});

// our model
var Avatar = mongoose.model('Avatar', imgSchema);

mongoose.connection.on('open', function () {
  console.error('mongo is open');

  // empty the collection
  Avatar.remove(function (err) {
    if (err) throw err;

    console.error('removed old docs');

    // store an img in binary in mongo
    var avatar = new Avatar;
    avatar.img.data = fs.readFileSync(imgPath);
    avatar.img.contentType = 'image/png';
    avatar.save(function (err, avatar) {
      if (err) throw err;

      console.error('saved img to mongo');

      // start a demo server
      var server = express.createServer();
      server.get('/', function (req, res, next) {
        Avatar.findById(avatar, function (err, doc) {
          if (err) return next(err);
          res.contentType(doc.img.contentType);
          res.send(doc.img.data);
        });
      });

      server.on('close', function () {
        console.error('dropping db');
        mongoose.connection.db.dropDatabase(function () {
          console.error('closing db connection');
          mongoose.connection.close();
        });
      });

      server.listen(3333, function (err) {
        var address = server.address();
        console.error('server listening on http://%s:%d', address.address, address.port);
        console.error('press CTRL+C to exit');
      });

      process.on('SIGINT', function () {
        server.close();
      });
    });
  });

});
