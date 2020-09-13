var express = require('express');
const checkDiskSpace = require('check-disk-space');
var multer = require('multer')
var _storage = multer.diskStorage({
  destination: function(req, file ,callback){
      callback(null, `upload/${req.body.saveUser}`)
  },
  filename: function(req, file, callback){
      callback(null, req.body.filename)
  }
})

let upload = multer({storage: _storage})
var fs = require('fs');
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
  
router.post('/uploadFile', (req, res) => {
  console.log(req.body);
  res.send(req.body);
  res.end();
})


router.get('/show', function(req, res, next) {
  res.render("test")
});

router.post('/create', upload.single("myFile"), function(req, res, next) {
    res.send("Upload");
    console.log("hello");
    console.log(req.file)
});

router.post('/checkExistFolder', (req, res)=>{
    var foldername = req.body.foldername;
    console.log(foldername);
    var json;

    function mkdir( dirPath ) {
      const isExists = fs.existsSync( dirPath );
      if( !isExists ) {
          fs.mkdirSync( dirPath, { recursive: true } );
          json = JSON.parse(`{"state" : "${1}"}`);
      }else{
        json = JSON.parse(`{"state" : "${0}"}`)
      }
    }
    mkdir('upload/'+foldername+'/');
    
    res.json(json);
})

router.post('/removeFile', (req, res) => {
  console.log(req.body);
  var state;
  fs.access(req.body.FilePath, fs.constants.F_OK, (err) =>{
    if(err){
      state = "no";
    }
    fs.unlink(req.body.FilePath, (err) => {
      if(err){
        state = "no";
      }else{
        state = "ok";
      }
    });
  });
  
  res.send(`{"state" : "${state}"}`);
})
module.exports = router;