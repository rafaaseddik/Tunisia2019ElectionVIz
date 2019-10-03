const googleTrends = require('google-trends-api');
const fs = require("fs")
mounths = [
    ["2019-01-01", "2019-01-31"],
    ["2019-02-01", "2019-02-28"],
    ["2019-03-01", "2019-03-31"],
    ["2019-04-01", "2019-04-30"],
    ["2019-05-01", "2019-05-31"],
    ["2019-06-01", "2019-06-30"],
    ["2019-07-01", "2019-07-31"],
    ["2019-08-01", "2019-08-31"],
    /*["2019-09-01", "2019-09-30"],
    ["2019-10-01", "2019-10-31"],
    ["2019-11-01", "2019-11-30"],
    ["2019-12-01", "2019-12-31"]*/
]

    googleTrends.interestByRegion({
        geo:"TN",
        keyword:"/m/0gfd80g",
        startTime:new Date("2019-08-01"),
        endTime:new Date("2019-08-31"),
    }).then(e=>{
    
    
            console.log(JSON.parse(e).default.geoMapData)
        
        
    }).catch(err=>{
        console.error(err)
    })

