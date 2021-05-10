var lineChartTotal;
var lineChartRecovered;
var lineChartActive;
var lineChartDeceased;
$(function() {
    "use strict";

    var cumulativetotal = [];
    var cumulativeactive = [];
    var cumulativerecovered = [];
    var cumulativelabelLine = [];
    var cumulativedeath = [];
    var dailytotal = [];
    var dailyactive = [];
    var dailyrecovered = [];
    var dailylabelLine = [];
    var dailydeath = [];
    var android = window.innerWidth < 500 ? 1 : 0;

    var counterline = 0;
    $.getJSON(
        "https://api.rootnet.in/covid19-in/stats/history",
        function(jsondata) {
            jsondata.data.forEach((day, index, array) => {
                cumulativelabelLine.push(day.day);
                cumulativetotal.push(day.summary.total);
                cumulativerecovered.push(day.summary.discharged);
                cumulativeactive.push(
                    day.summary.total - (day.summary.discharged + day.summary.deaths)
                );
                cumulativedeath.push(day.summary.deaths);
                counterline++;
                if (counterline == array.length) {
                    getDailyData();
                }
            });
        }
    );

    function getDailyData(params) {
        $.getJSON("https://api.covid19india.org/data.json", function(jsondata) {
            jsondata.cases_time_series.forEach((day, index, array) => {
                dailylabelLine.push(day.date);
                dailytotal.push(day.dailyconfirmed);
                dailyrecovered.push(day.dailyrecovered);
                dailyactive.push(
                    day.dailyconfirmed -
                    (Number(day.dailyrecovered) + Number(day.dailydeceased))
                );
                dailydeath.push(day.dailydeceased);
                counterline++;
                if (counterline == array.length) {
                    callbackline();
                }
            });
        });
    }

    var dataTotal = {
        label: "Total Cases",
        data: cumulativetotal,
        lineTension: 0,
        fill: true,
        backgroundColor: "#fe612c50",
        borderColor: "#fe612c",
    };

    var dataRecovered = {
        label: "Recovered Cases",
        data: cumulativerecovered,
        lineTension: 0,
        fill: true,
        backgroundColor: "#66f10050",
        borderColor: "#66f100",
    };
    var dataActive = {
        label: "Active Cases",
        data: cumulativeactive,
        lineTension: 0,
        fill: true,
        backgroundColor: "#00dbff50",
        borderColor: "#00dbff",
    };
    var dataDeath = {
        label: "Deaths",
        data: cumulativedeath,
        lineTension: 0,
        fill: true,
        borderColor: "#616161",
    };

    var lineDataTotal = {
        labels: cumulativelabelLine,
        datasets: [dataTotal],
    };
    var lineDataRecovered = {
        labels: cumulativelabelLine,
        datasets: [dataRecovered],
    };
    var lineDataActive = {
        labels: cumulativelabelLine,
        datasets: [dataActive],
    };
    var lineDataDeceased = {
        labels: cumulativelabelLine,
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
                position: 'right',
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
            display: 0,
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
            lineChartTotal = new Chart(lineChartCanvasTotal, {
                type: "line",
                data: lineDataTotal,
                options: options,
            });
        }
        if ($("#lineChartRecovered").length) {
            var lineChartCanvasRecovered = $("#lineChartRecovered")
                .get(0)
                .getContext("2d");
            lineChartRecovered = new Chart(lineChartCanvasRecovered, {
                type: "line",
                data: lineDataRecovered,
                options: options,
            });
        }

        if ($("#lineChartActive").length) {
            var lineChartCanvasActive = $("#lineChartActive").get(0).getContext("2d");
            lineChartActive = new Chart(lineChartCanvasActive, {
                type: "line",
                data: lineDataActive,
                options: options,
            });
        }

        if ($("#lineChartDeceased").length) {
            var lineChartCanvasDeceased = $("#lineChartDeceased")
                .get(0)
                .getContext("2d");
            lineChartDeceased = new Chart(lineChartCanvasDeceased, {
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
                        display: !android,
                    },
                },
            });
        }
    }

    $("#switch-id").change(function() {
        if ($(this).is(":checked")) {
            lineChartTotal.config.data.datasets[0].data = dailytotal;
            lineChartTotal.config.data.labels = dailylabelLine;
            lineChartTotal.update();
            lineChartRecovered.config.data.datasets[0].data = dailyrecovered;
            lineChartRecovered.config.data.labels = dailylabelLine;
            lineChartRecovered.update();
            lineChartActive.config.data.datasets[0].data = dailyactive;
            lineChartActive.config.data.labels = dailylabelLine;
            lineChartActive.update();
            lineChartDeceased.config.data.datasets[0].data = dailydeath;
            lineChartDeceased.config.data.labels = dailylabelLine;
            lineChartDeceased.update();
        } else {
            lineChartTotal.config.data.datasets[0].data = cumulativetotal;
            lineChartTotal.config.data.labels = cumulativelabelLine;
            lineChartTotal.update();
            lineChartRecovered.config.data.datasets[0].data = cumulativerecovered;
            lineChartRecovered.config.data.labels = cumulativelabelLine;
            lineChartRecovered.update();

            lineChartActive.config.data.datasets[0].data = cumulativeactive;
            lineChartActive.config.data.labels = cumulativelabelLine;
            lineChartActive.update();

            lineChartDeceased.config.data.datasets[0].data = cumulativedeath;
            lineChartDeceased.config.data.labels = cumulativelabelLine;
            lineChartDeceased.update();
        }
    });
});