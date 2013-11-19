//Routes---controllers
//File: routes/devices.js

var record          = require('../models/record.js')
var record_model    = new record()
var fs              = require('fs');
var path            = require("path")

exports.init =function (app) {

  app.get('/', function (req, res){
    res.sendfile('./index.html');
  })

  app.get('/sensors', function (req, res){
    res.sendfile('./sensor.html');
  })

  /*API*/
  app.get('/API/records', function (req, res){
    record_model.getAllRecords(function(err,records){
      if(!err){
        res.send(records)
        console.log(records)
      }
    })
  })
  app.post('/API/matrix', function(req,res){
    console.log('matrix requested')
    res.writeHead(200,{'Content-Type':'application/json'})
    var response= {"value_1":150,
                    "value_2":20,
                    "lat_1":-74.12569,
                    "lng_1":40.98546,
                    "lat_2":-74.12069,
                    "lng_2":40.98046
                  }
    res.write(JSON.stringify(response))
    res.end()
    console.log(req.body)
  })
  /*Config*/
  app.get('/config-file',function(req,res){
    res.writeHead(200, {'Content-Type': 'application/json'})
    var config = JSON.parse(fs.readFileSync(path.join(__dirname,'../','config.json'), 'utf8'))
    console.log(config)
    res.end(JSON.stringify(config))
  })
}

