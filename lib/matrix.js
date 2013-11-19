
var _               = require('underscore')
var record          = require('../models/record.js')
var record_helper    = new record()
var matrix = function(){

	this.generateODMatrix = function(parameters, callback){
		result_value={}
		result_value.value_1=0
		result_value.value_2=0
		day= parameters.day
		month= parameters.month
		year = parameters.year
		init_time = parameters.init_time
		end_time = parameters.end_time
		node_1=parameters.node_1
		node_2= parameters.node_2
		//------///
		time_1 = new Date(year,month, day, init_time).getTime()
		time_2 = new Date(year,month, day, end_time).getTime()

		collection_1 = record_helper.createModel(node_1)
		collection_2 = record_helper.createModel(node_2)

		/*Check records in origin node*/
		var record_array_1=[]
		record_helper.findRecordsInRange(collection_1, time_1,time_2,function(err, record){
			if(!err){
				record_array_1 =record
			}else{
				console.log(err)
			}
		})
		/*Check records in destination node*/
		var record_array_2=[]
		record_helper.findRecordsInRange(collection_2, time_1,time_2,function(err, record){
			if(!err){
				record_array_2 =record
				compareRecords(record_array_1,record_array_2)
			}else{
				console.log(err)
			}
		})

		function compareRecords(array1, array2){
			l1=_.size(array1)
			l2=_.size(array2)
			console.log( l1 + " " + l2)
			for ( var k=0 ;k<=l1;k++){
				obj1= array2[k]
				for( var i=0 ;i<=l2;i++){
					obj2=array1[i]
				}
				if(obj1 ){
					//console.log(obj1.mac +"  " + obj2.mac)
				}
			}
		}

		res=result_value
		callback(res)
		console.log(result_value)
	}
}
module.exports = matrix