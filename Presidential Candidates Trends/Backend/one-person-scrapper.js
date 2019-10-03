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
result = {data:[]}
Persons = [
    {name:"kais said",hash:"/g/12pgd7rmg"},
    {name:"Nabil Karoui", hash:"/g/113qbjbd1"},
    {name:"abdelfattah Mourou", hash:"/m/0wzxfxy"},
    {name:"Abdelkarim Zbidi", hash:"/m/0gfd80g"},
    {name:"Youssef Chahed", hash:"/g/11b_2rbzjj"}
]
completed =0
mounths.forEach(m=>{
    console.log(m)
    googleTrends.interestByRegion({
        geo:"TN",
        keyword:"/g/11b_2rbzjj",
        startTime:new Date(m[0]),
        endTime:new Date(m[1]),
    }).then(e=>{
        //console.log(e[0])
        result.data.push({
            mounth:m,
            data:JSON.parse(e).default.geoMapData
        });
        completed++;
        if (completed ==8){
            fs.writeFileSync("youssefChahed.json",JSON.stringify(result))
        }
    }).catch(err=>{
        console.error(err)
    })
})
