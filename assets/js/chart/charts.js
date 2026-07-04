class Charts {
    constructor() {
        "undefined" != typeof Chart
            ? ((this._lineChart = null),
              (this._areaChart = null),
              (this._streamingLineChart = null),
              this._initLineChart(),
              this._initAreaChart(),
              this._initStreamingLineChart(),
              this._initEvents())
            : console.log("Chart is undefined!");
    }
    _initEvents() {
        document.documentElement.addEventListener(Globals.colorAttributeChange, (t) => {
            this._lineChart && this._lineChart.destroy(),
                this._initLineChart(),
                this._areaChart && this._areaChart.destroy(),
                this._initAreaChart(),
                this._streamingLineChart && this._streamingLineChart.destroy(),
                this._initStreamingLineChart()
              
                
        });
    }
    _initLineChart() {
        if (document.getElementById("lineChart")) {
            const t = document.getElementById("lineChart").getContext("2d");
            this._lineChart = new Chart(t, {
                type: "line",
                options: {
                    plugins: { crosshair: ChartsExtend.Crosshair(), datalabels: { display: !1 } },
                    responsive: !0,
                    maintainAspectRatio: !1,
                    scales: {
                        yAxes: [{ gridLines: { display: !0, lineWidth: 1, color: Globals.separatorLight, drawBorder: !1 }, ticks: { beginAtZero: !0, stepSize: 5, min: 50, max: 70, padding: 20, fontColor: Globals.alternate } }],
                        xAxes: [{ gridLines: { display: !1 }, ticks: { fontColor: Globals.alternate } }],
                    },
                    legend: { display: !1 },
                    tooltips: ChartsExtend.ChartTooltipForCrosshair(),
                },
                data: {
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [
                        {
                            label: "",
                            data: [60, 54, 68, 60, 63, 60, 65,60, 54, 68, 60, 63, 60, 65,60, 54, 68, 60, 63, 60, 65],
                            borderColor: Globals.primary,
                            pointBackgroundColor: Globals.primary,
                            pointBorderColor: Globals.primary,
                            pointHoverBackgroundColor: Globals.primary,
                            pointHoverBorderColor: Globals.primary,
                            borderWidth: 2,
                            pointRadius: 3,
                            pointBorderWidth: 3,
                            pointHoverRadius: 4,
                            fill: !1,
                        },
                    ],
                },
            });
        }
    }
    _initAreaChart() {
        if (document.getElementById("areaChart")) {
            const t = document.getElementById("areaChart").getContext("2d");
            this._areaChart = new Chart(t, {
                type: "line",
                options: {
                    plugins: { crosshair: ChartsExtend.Crosshair(), datalabels: { display: !1 } },
                    responsive: !0,
                    maintainAspectRatio: !1,
                    scales: {
                        yAxes: [{ gridLines: { display: !0, lineWidth: 1, color: Globals.separatorLight, drawBorder: !1 }, ticks: { beginAtZero: !0, stepSize: 5, min: 50, max: 70, padding: 20, fontColor: Globals.alternate } }],
                        xAxes: [{ gridLines: { display: !1 }, ticks: { fontColor: Globals.alternate } }],
                    },
                    legend: { display: !1 },
                    tooltips: ChartsExtend.ChartTooltipForCrosshair(),
                },
                data: {
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [
                        {
                            label: "",
                            data: [60, 54, 68, 60, 63, 60, 65,60, 54, 68, 60, 63, 60, 65,60, 54, 68, 60, 63, 60, 65],
                            borderColor: Globals.primary,
                            pointBackgroundColor: Globals.foreground,
                            pointBorderColor: Globals.primary,
                            pointHoverBackgroundColor: Globals.primary,
                            pointHoverBorderColor: Globals.foreground,
                            pointRadius: 4,
                            pointBorderWidth: 2,
                            pointHoverRadius: 5,
                            fill: !0,
                            borderWidth: 2,
                            backgroundColor: "rgba(" + Globals.primaryrgb + ",0.1)",
                        },
                    ],
                },
            });
        }
    } 
    _initStreamingLineChart() {
        if (document.getElementById("streamingLineChart")) {
            const t = document.getElementById("streamingLineChart").getContext("2d");
            this._streamingLineChart = new Chart(t, {
                type: "line",
                options: {
                    plugins: { crosshair: ChartsExtend.Crosshair(), datalabels: { display: !1 }, streaming: { frameRate: 30 } },
                    responsive: !0,
                    maintainAspectRatio: !1,
                    scales: {
                        yAxes: [{ gridLines: { display: !1, lineWidth: 1, color: Globals.separatorLight, drawBorder: !1 }, ticks: { beginAtZero: !0, padding: 20, fontColor: Globals.alternate, min: 0, max: 100, stepSize: 25 } }],
                        xAxes: [{ gridLines: { display: !1 }, ticks: { display: !1 }, type: "realtime", realtime: { duration: 2e4, refresh: 1e3, delay: 3e3, onRefresh: this._onRefresh } }],
                    },
                    legend: { display: !1 },
                    tooltips: ChartsExtend.ChartTooltipForCrosshair(),
                },
                data: {
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [
                        {
                            label: "",
                            borderColor: Globals.primary,
                            pointBackgroundColor: Globals.primary,
                            pointBorderColor: Globals.primary,
                            pointHoverBackgroundColor: Globals.primary,
                            pointHoverBorderColor: Globals.primary,
                            borderWidth: 2,
                            pointRadius: 2,
                            pointBorderWidth: 2,
                            pointHoverRadius: 3,
                            fill: !1,
                        },
                    ],
                },
            });
        }
    }
    _onRefresh(t) {
        t.config.data.datasets.forEach(function (t) {
            t.data.push({ x: moment(), y: Math.round(50 * Math.random()) + 25 });
        });
    }
}
