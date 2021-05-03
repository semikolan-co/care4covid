$(function() {
    "use strict";

    var total = [];
    var active = [];
    var recovered = [];
    var labelLine = [];
    var death = [];
    var android = (window.innerWidth < 500) ? 1 : 0;

    var counterline = 0;
    // $.getJSON(
    //     "https://api.rootnet.in/covid19-in/stats/history",
    //     function(jsondata) {
    //         jsondata.data.forEach((day, index, array) => {
    //             labelLine.push(day.day);
    //             total.push(day.summary.total);
    //             recovered.push(day.summary.discharged);
    //             active.push(
    //                 day.summary.total - (day.summary.discharged + day.summary.deaths)
    //             );
    //             death.push(day.summary.deaths);
    //             counterline++;
    //             if (counterline == array.length) {
    //                 callbackline();
    //             }
    //         });
    //     }
    // );
    $.getJSON("https://api.covid19india.org/data.json", function(jsondata) {
        jsondata.cases_time_series.forEach((day, index, array) => {
            labelLine.push(day.date);
            total.push(day.dailyconfirmed);
            recovered.push(day.dailyrecovered);
            active.push(
                day.dailyconfirmed - (Number(day.dailyrecovered) + Number(day.dailydeceased))
            );
            death.push(day.dailydeceased);
            counterline++;
            if (counterline == array.length) {
                callbackline();
            }
        });
    });






    var dataTotal = {
        label: "Total Cases",
        data: total,
        lineTension: 0,
        fill: 1,
        backgroundColor: "#fe612c60",
        borderColor: "#fe612c",
    };

    var dataRecovered = {
        label: "Recovered Cases",
        data: recovered,
        lineTension: 0,
        fill: 1,
        backgroundColor: "#66f10060",
        borderColor: "#66f100",
    };
    var dataActive = {
        label: "Active Cases",
        data: active,
        lineTension: 0,
        fill: true,
        backgroundColor: "#00dbff60",
        borderColor: "#00dbff",
    };
    var dataDeath = {
        label: "Deaths",
        data: death,
        lineTension: 0,
        fill: false,
        borderColor: "#616161",
    };

    var lineDataTotal = {
        labels: labelLine,
        datasets: [dataTotal],
    };
    var lineDataRecovered = {
        labels: labelLine,
        datasets: [dataRecovered],
    };
    var lineDataActive = {
        labels: labelLine,
        datasets: [dataActive],
    };
    var lineDataDeceased = {
        labels: labelLine,
        datasets: [dataDeath],
    };



    var options = {
        // responsive: true,
        // maintainAspectRatio: 1,
        tooltips: {
            mode: "index",
            intersect: false,
        },
        hover: {
            mode: "nearest",
            intersect: true,
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    display: !android,
                    callback: function(label, index, labels) {
                        if (label > 999999) {
                            return label / 1000000 + "M";
                        } else if (label > 999) {

                            return label / 1000 + "K";
                        }
                        return label;
                    },
                },
                // scaleLabel: {
                //     display: true,
                //     labelString: "1k = 1000",
                // },
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
            display: !android,
        },
        elements: {
            point: {
                radius: 0,
            },
        },
    };

    function callbackline() {
        if ($("#lineChartTotal").length) {
            var lineChartCanvasTotal = $("#lineChartTotal").get(0).getContext("2d");
            var lineChartTotal = new Chart(lineChartCanvasTotal, {
                type: "line",
                data: lineDataTotal,
                options: options,
            });
        }
        if ($("#lineChartRecovered").length) {
            var lineChartCanvasRecovered = $("#lineChartRecovered").get(0).getContext("2d");
            var lineChartRecovered = new Chart(lineChartCanvasRecovered, {
                type: "line",
                data: lineDataRecovered,
                options: options,
            });
        }

        if ($("#lineChartActive").length) {
            var lineChartCanvasActive = $("#lineChartActive").get(0).getContext("2d");
            var lineChartActive = new Chart(lineChartCanvasActive, {
                type: "line",
                data: lineDataActive,
                options: options,
            });
        }

        if ($("#lineChartDeceased").length) {
            var lineChartCanvasDeceased = $("#lineChartDeceased").get(0).getContext("2d");
            var lineChartDeceased = new Chart(lineChartCanvasDeceased, {
                type: "line",
                data: lineDataDeceased,
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