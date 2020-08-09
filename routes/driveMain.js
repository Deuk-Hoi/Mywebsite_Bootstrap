var express = require('express');
const checkDiskSpace = require('check-disk-space');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('driveMain', { title: 'Welcome to Deuk Drive!' });
});

//---------------------------------------------------------------------- Android

router.get('/get_freedisk', (req, res) => {

    checkDiskSpace('C:/Users').then((diskSpace) => {
      console.log(diskSpace);
      res.json(diskSpace);
    })
  })
  /*var testFolder = 'C:/Users/5G/Desktop';
  var fs = require('fs');
   
  fs.readdir(testFolder, function(error, filelist){
    console.log(filelist);
  }) //파일 리스트 확인*/

module.exports = router;