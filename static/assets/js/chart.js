$(function() {
    "use strict";

    var total = [];
    var active = [];
    var recovered = [];
    var labelLine = [];
    var death = [];
    var android = (window.innerWidth < 500) ? 1 : 0;

    var counterline = 0;
    $.getJSON(
        "https://api.rootnet.in/covid19-in/stats/history",
        function(jsondata) {
            jsondata.data.forEach((day, index, array) => {
                labelLine.push(day.day);
                total.push(day.summary.total);
                recovered.push(day.summary.discharged);
                active.push(
                    day.summary.total - (day.summary.discharged + day.summary.deaths)
                );
                death.push(day.summary.deaths);
                counterline++;
                if (counterline == array.length) {
                    callbackline();
                }
            });
        }
    );






    var dataTotal = {
        label: "Total Cases",
        data: total,
        lineTension: 0,
        fill: 1,
        backgroundColor: "#fe612c20",
        borderColor: "#fe612c",
    };

    var dataRecovered = {
        label: "Recovered Cases",
        data: recovered,
        lineTension: 0,
        fill: 1,
        backgroundColor: "#66f10020",
        borderColor: "#66f100",
    };
    var dataActive = {
        label: "Active Cases",
        data: active,
        lineTension: 0,
        fill: true,
        backgroundColor: "#00dbff20",
        borderColor: "#00dbff",
    };
    var dataDeath = {
        label: "Deaths",
        data: death,
        lineTension: 0,
        fill: false,
        borderColor: "#616161",
    };

    var lineData = {
        labels: labelLine,
        datasets: [dataDeath, dataActive, dataRecovered, dataTotal],
    };



    var options = {
        // responsive: true,
        // maintainAspectRatio: 1,

        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    display: !android,
                },
            }, ],
            xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                },
                ticks: {
                    beginAtZero: false,
                    display: 0,
                },
            }, ],
        },
        legend: {
            // display: 1,
            display: !(android),
        },
        elements: {
            point: {
                radius: 0,
            },
        },
    };

    function callbackline() {
        if ($("#lineChart").length) {
            var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
            var lineChart = new Chart(lineChartCanvas, {
                type: "line",
                data: lineData,
                options: options,
            });
        }

    }



    var labelpie = [];
    var datapie = [];
    var counterpie = 0;
    $.getJSON(
        "https://api.rootnet.in/covid19-in/stats/latest",
        function(jsondata) {
            jsondata.data.regional.forEach((loc, index, array) => {
                labelpie.push(loc.loc);
                datapie.push(loc.totalConfirmed);
                // console.log(loc.loc);
                counterpie++;
                if (counterpie == array.length) {
                    callbackpie();
                }
            });
        }
    );

    var pieData = {
        labels: labelpie,
        datasets: [{
            label: "Corona State Wise",
            data: datapie,
            backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(75, 192, 192)",
                "rgb(255, 205, 86)",
                "rgb(201, 203, 207)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
                "#FDAC53",
                "#9BB7D4",
                "#E0B589",
                "#95DEE3",
                "#00A591",
                "#2E4A62",
                "#9A8B4F",
                "#578CA9",
                "#F6D155",
                "#5B55A30",
                "#004B8D",
                "#E47A2E",
                "#F1EA7F",
                "#FF6F61",
                "#00539C",
                "#939597",
                "#F5DF4D",
                "#D5AE41",
                "#A0DAA9",
                "#E9897E",
                "#00A170",
                "#926AA6",
                "#0072B5",
                "#EFE1CE",
                "#F2552C",
                "#D2386C",
                "#363945",
                "#FA7A35",
                "#006B54",
            ],
            hoverOffset: 4,
        }, ],
    };

    function callbackpie() {
        if ($("#pieChart").length) {
            var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
            var pieChart = new Chart(pieChartCanvas, {
                type: "doughnut",
                data: pieData,
                options: {
                    responsive: true,
                    // maintainAspectRatio: true,
                    legend: {
                        position: "bottom",
                        display: !(android)
                    },
                },
            });
        }
    }
});