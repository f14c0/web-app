//Routes---controllers
//File: routes/devices.js

var record          = require('../models/record.js')
var record_model    = new record()
var matrix_helper   = require('../lib/matrix.js')
var matrix          = new matrix_helper()
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
   
    var response= {"value_1":48,
                    "value_2":89,
                    "lat_1":4.754508,
                    "lng_1":-74.045985,
                    "lat_2":4.631302,
                    "lng_2":-74.067721
                  }
    var response2= {"value_1":35,
                    "value_2":20,
                    "lat_1":4.70948439,
                    "lng_1":-74.110529,
                    "lat_2":4.668482,
                    "lng_2":-74.060270
                  }
    var response3= {"value_1":63,
                    "value_2":20,
                    "lat_1":4.571396,
                    "lng_1":-74.139454,
                    "lat_2":4.631302,
                    "lng_2":-74.067721
                  }

    if(req.body.node_1=='PT_NORTE'&&req.body.node_2=='ES_MARLY'&& req.body.init_time==4){
      res.write(JSON.stringify(response))
    }else if(req.body.node_1=='PT_80'&&req.body.node_2=='ES_HEROES'&& req.body.init_time==4){
      res.write(JSON.stringify(response2))
    }else if(req.body.node_1=='PT_TUNAL'&&req.body.node_2=='ES_HEROES'&& req.body.init_time==4){

    }
    
    res.end()
  })
  /*Config*/
  app.get('/config-file',function(req,res){
    res.writeHead(200, {'Content-Type': 'application/json'})
    var config = JSON.parse(fs.readFileSync(path.join(__dirname,'../','config.json'), 'utf8'))
    console.log(config)
    res.end(JSON.stringify(config))
  })
}

