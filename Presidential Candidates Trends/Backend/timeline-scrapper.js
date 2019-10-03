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
    {name:"said",hash:"/g/12pgd7rmg"},
    {name:"karoui", hash:"/g/113qbjbd1"},
    {name:"mourou", hash:"/m/0wzxfxy"},
    {name:"zbidi", hash:"/m/0gfd80g"},
    {name:"chahed", hash:"/g/11b_2rbzjj"}
]
completed =0


Persons.forEach(person => {
    googleTrends.interestOverTime({
        geo:"TN",
        keyword:person.hash,
        startTime:new Date("2019-01-01")
    }).then(e=>{
        //console.log(e)
        result[person.name]={
            data:JSON.parse(e).default.timelineData.map(day=>{
                day.time = day.time*1000;
                day.value = day.value[0]
                day.hasData=undefined;
                day.formattedValue=undefined;
                return day;
            })
        };
        completed++;
        if(completed==5)
            fs.writeFileSync("time.json",JSON.stringify({data:result}))
        
    }).catch(err=>{
        console.error(err)
    })
});
    

