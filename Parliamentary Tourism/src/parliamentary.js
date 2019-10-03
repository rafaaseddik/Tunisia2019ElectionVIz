var chart;
var networkSeries;

var currentYear = 2015;

var siege = "216";
const COLORS = {
    "Coalition nationale": "#4CAF50",
    "Mouvement Nidaa Tounes": "#F44336",
    "Mouvement Ennahdha": "#3F51B5",
    "Bloc Democrate": "#FF9800",
    "Front Populaire": "#673AB7",
    "Union Patriotique Libre": "#9E9E9E",
    "Bloc Social-Democrate": "#607D8B",
    "Bloc Al Horra du Mouvement Machrouu Tounes": "#E91E63",
    "Afek Tounes et l'appel des tunisiens a l'etranger": "#00BCD4",
    "Allegeance a la Patrie": "#FFEB3B",
    "Bloc National": "#FF2222",
    "Aucun bloc": "#8BC34A"
}
var deputies = {};
const data2015 = Object.keys(ParliamentData.data2015).map(bloc => {
    return {
        name: bloc,
        children: ParliamentData.data2015[bloc].map(deputy => {
            return {name: deputy.siege, value: 1, deputyObject: deputy, color: COLORS[bloc]}
        }),
        childrenLength: ParliamentData.data2015[bloc].length,
        color: COLORS[bloc]
    }
});
init();

const data2016 = Object.keys(ParliamentData.data2016).map(bloc => {
    return {
        name: bloc,
        children: ParliamentData.data2016[bloc].map(deputy => {
            return {name: deputy.siege, value: 1, deputyObject: deputy, color: COLORS[deputies[deputy.siege].original]}
        }),
        childrenLength: ParliamentData.data2016[bloc].length,
        color: COLORS[bloc]
    }
})
const data2017 = Object.keys(ParliamentData.data2017).map(bloc => {
    return {
        name: bloc,
        children: ParliamentData.data2017[bloc].map(deputy => {
            return {name: deputy.siege, value: 1, deputyObject: deputy, color: COLORS[deputies[deputy.siege].original]}
        }),
        childrenLength: ParliamentData.data2017[bloc].length,
        color: COLORS[bloc]
    }
})
const data2018 = Object.keys(ParliamentData.data2018).map(bloc => {
    return {
        name: bloc,
        children: ParliamentData.data2018[bloc].map(deputy => {
            return {name: deputy.siege, value: 1, deputyObject: deputy, color: COLORS[deputies[deputy.siege].original]}
        }),
        childrenLength: ParliamentData.data2018[bloc].length,
        color: COLORS[bloc]
    }
})
const data2019 = Object.keys(ParliamentData.data2019).map(bloc => {
    return {
        name: bloc,
        children: ParliamentData.data2019[bloc].map(deputy => {
            return {name: deputy.siege, value: 1, deputyObject: deputy, color: COLORS[deputies[deputy.siege].original]}
        }),
        childrenLength: ParliamentData.data2019[bloc].length,
        color: COLORS[bloc]
    }
})


function init() {
    data2015.forEach(bloc => {
        bloc.children.forEach(deputy => {
            deputy.deputyObject["original"] = bloc.name;
            deputies[deputy.deputyObject.siege] = deputy.deputyObject;
        })
    })
}

function updateData(year) {
    $("#btn-" + currentYear).removeClass("btn-dark").addClass("btn-outline-dark");
    currentYear = year;
    $("#btn-" + currentYear).removeClass("btn-outline-dark").addClass("btn-dark");
    switch (year) {
        case 2015:
            networkSeries.data = data2015;
            break;
        case 2016:
            networkSeries.data = data2016;
            break;
        case 2017:
            networkSeries.data = data2017;
            break;
        case 2018:
            networkSeries.data = data2018;
            break;
        case 2019:
            networkSeries.data = data2019;
            break;
    }
}

am4core.ready(function () {

// Themes begin
    am4core.useTheme(am4themes_animated);
// Themes end


    chart = am4core.create("graph", am4plugins_forceDirected.ForceDirectedTree);
    chart.legend = new am4charts.Legend();
    chart.zoomable = true;
    networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())


    networkSeries.data = data2015;

//networkSeries.dataFields.linkWith = "linkWith";
    networkSeries.dataFields.name = "name";
    networkSeries.dataFields.id = "name";
    networkSeries.dataFields.value = "value";
    networkSeries.dataFields.children = "children";
    networkSeries.dataFields.color = "color";

    /*networkSeries.nodes.template.adapter.add("fill",(text,target)=>{
        if(target.dataItem.level>0 && target.dataItem.dataContext.deputyObject.siege===siege)
            return "#000000"
        else
            return target.dataItem.dataContext.color;
    }).*/


//networkSeries.nodes.template.tooltipText = "{name} ({childrenLength} deputies)";

    networkSeries.nodes.template.adapter.add("tooltipHTML", function (text, target) {
        if (target.dataItem) {
            switch (target.dataItem.level) {
                case 0:
                    return "{name} ({childrenLength} deputies)";
                case 1:
                    return `<div style="padding:15px">
                    <div class="text-center"><img src="{deputyObject.photo_url}" style="border-radius:50%;width:50px;height:50px" /></div>
                    <div class="text-center"><b>{deputyObject.name}</b></div>
                    <div class="text-center">({deputyObject.age} years old)</div>
                    <div class="text-center">-- {deputyObject.circ} -- </div>
                    <hr />
                    <b>Electoral List : </b> {deputyObject.electoral_list}
                    </div>`
            }
        }
        return text;
    });

    networkSeries.nodes.template.fillOpacity = 1;

    networkSeries.links.template.distance = 1.5;
    networkSeries.nodes.template.label.text = "{name}"
    networkSeries.fontSize = 8;
    networkSeries.maxLevels = 2;
    networkSeries.maxRadius = am4core.percent(6);
    networkSeries.manyBodyStrength = -5;
    networkSeries.nodes.template.label.hideOversized = true;
    networkSeries.nodes.template.label.truncate = true;

    networkSeries.nodes.template.events.on('hit', (e) => {
        let deputy = e.target.dataItem.dataContext.deputyObject;
        /*
        "name": "Sahbi Atig",
            "url": "https://majles.marsad.tn/2014/fr/elus/Sahbi_Atig",
            "age": "60",
            "siege": "57",
            "profession": "Chercheur universitaire",
            "circ": "Ariana",
            "photo_url": "https://majles.marsad.tn/2014/uploads/images/Sahbi_Atig.thumb50.png",
            "electoral_list": "Mouvement Ennahdha",
            "tourism": [{
                "title": "Mouvement Ennahdha",
                "startDate": "2014-12-01T00:00:00.000Z",
                "endDate": "2019-10-06T00:00:00.000Z"
            }]
         */
        Swal.fire({
            title: deputy.name,
            html: `
        <img src="${deputy.photo_url}" style="border-radius:50%;width:100px;height:100px" />
        <table class="deputy-details-popup">
                <tr>
                    <td><b>Chair Number</b></td>
                    <td>${deputy.siege}</td>
                </tr>
                <tr>
                    <td><b>Age</b></td>
                    <td>${deputy.age}</td>
                </tr>
                <tr>
                    <td><b>Profession</b></td>
                    <td>${deputy.profession}</td>
                </tr>
                <tr>
                    <td><b>Circonscription</b></td>
                    <td>${deputy.circ}</td>
                </tr>
                <tr>
                    <td><b>Electoral List</b></td>
                    <td>${deputy.electoral_list}</td>
                </tr>
                <tr>
                    <td><b>Profession</b></td>
                    <td>${deputy.profession}</td>
                </tr>
                <tr>
                    <td><b>Tourism</b></td>
                    <td>
                    <ul>
                    `
                +
                deputy.tourism.map(movement=>{
                    let mvntStartDate = new Date(movement.startDate);
                    let mvntEndDate = new Date(movement.endDate);
                    let formattedStartDate = mvntStartDate.getFullYear() + "/" + (mvntStartDate.getMonth()+1);
                    let formattedEndDate = mvntEndDate.getFullYear() + "/" + (mvntEndDate.getMonth()+1);
                    return `<li>
                                <b>${movement.title}</b><br> ${formattedStartDate} <i class="mdi mdi-arrow-right"></i> ${formattedEndDate}
                            </li>`
                }).join("")
                +
                `
                    </ul></td>
                </tr>
            </table>`
        })

    }, this);

}); 
