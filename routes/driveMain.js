var express = require('express');
const checkDiskSpace = require('check-disk-space');
var multer = require('multer')
let _storage = multer.diskStorage({
  destination: function(req, file ,callback){
      callback(null, `upload/${req.body.saveUser}/`)
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
    console.log(req.file)
});

router.post('/checkExistFolder', (req, res)=>{
    var foldername = req.body.foldername;
    console.log(foldername);
    var json;
    var state = 1;

    function mkdir( dirPath ) {
      const isExists = fs.existsSync( dirPath );
      if( !isExists ) {
          fs.mkdirSync( dirPath, { recursive: true } );
          state = 1;
      }else{
        state = 0;
      }
    }
    mkdir('upload/'+foldername+'/');
    json = JSON.parse(`{"state" : "${state}"}`)
    res.json(json);
})



/*router.post('/uploads', upload.single('myfile'), (req, res, next)=>{
  console.log("aaaaa");
  const file = req.file
  if(!file){
    const error = new Error('please upload a file');
    error.httpStatusCode = 400;
    console.log("error", 'please upload a file');

    res.send({code:500, msg: 'please upload a file'})
    return next({code:500, msg: error})
  }
  res.send({code : 200, msg : file})
})*/
  /*var testFolder = 'C:/Users/5G/Desktop';
  var fs = require('fs');
   
  fs.readdir(testFolder, function(error, filelist){
    console.log(filelist);
  }) //파일 리스트 확인*/

    

module.exports = router;