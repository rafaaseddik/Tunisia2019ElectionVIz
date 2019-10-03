const express = require("express");
const bodyParser = require('body-parser')
const googleTrends = require('google-trends-api');

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // for urlencoded formdate
app.use(bodyParser.json());// for json form

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type, x-access-token, access-control-allow-origin, name, password');
    res.set('Content-type', 'application/json');
    if (req.method === "OPTIONS") {
        res.send('ok');
        res.end();
        return;
    }
    next();
});

app.listen(3019, function () {
    console.log("App is listening on port 3019")
})

app.get('/', (req, res) => {
    res.json({
        status: 1,
        message: "Server Running"
    })
});
app.get("/autocomplete", (req, res) => {
    let keyword = req.query.keyword;
    console.log("[AUTOCOMPLETE] getting data for "+keyword);
    googleTrends.autoComplete({ keyword: keyword })
        .then(function (results) {
            console.log("[AUTOCOMPLETE] returning data for "+keyword);
            res.json({
                status: 200,
                data: JSON.parse(results).default.topics
            })
        })
        .catch(function (err) {
            res.json({
                status: 401,
                error: JSON.parse(err)
            })
        })

    
})
app.get("/getTimeline", (req, res) => {
    let keyword = req.query.keyword;
    console.log("[Timeline] getting data for "+keyword);
    googleTrends.interestOverTime({
        geo:"TN",
        keyword:keyword,
        startTime:new Date("2019-01-01"),
        endTime:new Date("2019-09-20")
    }).then(e=>{
        console.log("[Timeline] returning data for "+keyword);
        res.json({
            status:200,
            data:JSON.parse(e).default.timelineData.map(day=>{
                day.time = day.time*1000;
                day.value = day.value[0]
                day.hasData=undefined;
                day.formattedValue=undefined;
                return day;
            })
        });
        
    }).catch(err=>{
        res.json({
            status: 401,
            error: JSON.parse(err)
        })
    })
})