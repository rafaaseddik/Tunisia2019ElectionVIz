const fs = require("fs")
var rawData = require('./raw_data');

var allBlocs = new Set();

rawData.forEach(deputy=>{
    deputy.tourism.forEach(movement=>{
        movement.startDate = new Date(movement.startDate)
        movement.endDate = new Date(movement.endDate)
        allBlocs.add(movement.title)
    })
})

var list2015 = {}
var list2016 = {}
var list2017 = {}
var list2018 = {}
var list2019 = {}
const checkDate2015 = new Date("2015-02-28").getTime();
const checkDate2016 = new Date("2016-02-28").getTime();
const checkDate2017 = new Date("2017-02-28").getTime();
const checkDate2018 = new Date("2018-02-28").getTime();
const checkDate2019 = new Date("2019-08-02").getTime();
Array.from(allBlocs).forEach(bloc=>{
    list2015[bloc]=[];
    list2016[bloc]=[];
    list2017[bloc]=[];
    list2018[bloc]=[];
    list2019[bloc]=[];
})
rawData.forEach(deputy=>{
    let mvt2015 = deputy.tourism.find(movement=> movement.startDate.getTime() <= checkDate2015 && movement.endDate.getTime()>=checkDate2015)
    let mvt2016 = deputy.tourism.find(movement=> movement.startDate.getTime() <= checkDate2016 && movement.endDate.getTime()>=checkDate2016)
    let mvt2017 = deputy.tourism.find(movement=> movement.startDate.getTime() <= checkDate2017 && movement.endDate.getTime()>=checkDate2017)
    let mvt2018 = deputy.tourism.find(movement=> movement.startDate.getTime() <= checkDate2018 && movement.endDate.getTime()>=checkDate2018)
    let mvt2019 = deputy.tourism.find(movement=> movement.startDate.getTime() <= checkDate2019 && movement.endDate.getTime()>=checkDate2019)
    if(deputy.siege=="282"){
        console.log(mvt2015)
    }
    if(mvt2015){ list2015[mvt2015.title].push(deputy)}else{console.log("adding ",deputy.name," to Aucun Bloc");list2015["Aucun bloc"].push(deputy)}
    if(mvt2016){ list2016[mvt2016.title].push(deputy)}else{list2016["Aucun bloc"].push(deputy)}
    if(mvt2017){ list2017[mvt2017.title].push(deputy)}else{list2017["Aucun bloc"].push(deputy)}
    if(mvt2018){ list2018[mvt2018.title].push(deputy)}else{list2018["Aucun bloc"].push(deputy)}
    if(mvt2019){ list2019[mvt2019.title].push(deputy)}else{list2019["Aucun bloc"].push(deputy)}
})

var exportedData = {
    data2015:list2015,
    data2016:list2016,
    data2017:list2017,
    data2018:list2018,
    data2019:list2019
}

fs.writeFileSync('./CleanData.json',JSON.stringify(exportedData));