$(function() {
    setInterval(function() {
        console.log("tick");
        $.ajax({url: "/seer/readings/cpu/0", success: function(data) {
                makeChart($("#cpu"), makeCPUDataset(data), 100); }});
        $.ajax({url: "/seer/readings/mem/0", success: function(data) {
                makeChart($("#mem"), makeMemDataset(data), 16000); }});
    }, 2000);
});

function makeChart(ctx, datasets, yScale) {
    var chart = {
            type: 'line',
            data: {
                labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
                datasets: datasets
            },
            options: {
                animation: false,
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            min: 0,
                            max: yScale
                        }
                   }],
                    xAxes: [{
                        display: false,
                   }]
                }
             }
        };

    new Chart(ctx, chart);
}

function makeCPUDataset(data) {
    var datasets = [
            {
                label: "user",
                borderColor: "rgba(0, 220, 0, 1)",
                backgroundColor: "rgba(0, 220, 0, 0.2)",
                data: []
            },
            {
                label: "system",
                borderColor: "rgba(0, 0, 220, 1)",
                backgroundColor: "rgba(0, 0, 220, 0.2)",
                data: []
            }
        ];
    
    for (var i = 0; i < data.length; i++) {
        datasets[0].data.push(data[i].metrics.user);
        datasets[1].data.push(data[i].metrics.system);
    }

    return datasets;
}

function makeMemDataset(data) {
    var datasets = [
            {
                label: "swap",
                borderColor: "rgba(0, 220, 0, 1)",
                backgroundColor: "rgba(0, 220, 0, 0.2)",
                data: []
            },
            {
                label: "free",
                borderColor: "rgba(0, 0, 220, 1)",
                backgroundColor: "rgba(0, 0, 220, 0.2)",
                data: []
            }
        ];
    
    for (var i = 0; i < data.length; i++) {
        datasets[0].data.push(data[i].metrics.swap / 1000);
        datasets[1].data.push(data[i].metrics.free / 1000);
    }

    return datasets;
}


var seedData = [{"id":4597,"machineId":0,"timestamp":1462994479970,"metricSystem":0,"metricUser":15,"metricIdle":85,"metrics":{"user":15,"system":0,"idle":85}},{"id":4596,"machineId":0,"timestamp":1462994478968,"metricSystem":1,"metricUser":15,"metricIdle":85,"metrics":{"user":15,"system":1,"idle":85}},{"id":4595,"machineId":0,"timestamp":1462994477965,"metricSystem":1,"metricUser":15,"metricIdle":85,"metrics":{"user":15,"system":1,"idle":85}},{"id":4594,"machineId":0,"timestamp":1462994476962,"metricSystem":1,"metricUser":15,"metricIdle":85,"metrics":{"user":15,"system":1,"idle":85}},{"id":4593,"machineId":0,"timestamp":1462994475960,"metricSystem":1,"metricUser":15,"metricIdle":84,"metrics":{"user":15,"system":1,"idle":84}},{"id":4592,"machineId":0,"timestamp":1462994474957,"metricSystem":1,"metricUser":15,"metricIdle":85,"metrics":{"user":15,"system":1,"idle":85}},{"id":4591,"machineId":0,"timestamp":1462994473955,"metricSystem":1,"metricUser":15,"metricIdle":85,"metrics":{"user":15,"system":1,"idle":85}},{"id":4590,"machineId":0,"timestamp":1462994472952,"metricSystem":1,"metricUser":15,"metricIdle":85,"metrics":{"user":15,"system":1,"idle":85}},{"id":4589,"machineId":0,"timestamp":1462994471950,"metricSystem":1,"metricUser":15,"metricIdle":84,"metrics":{"user":15,"system":1,"idle":84}},{"id":4588,"machineId":0,"timestamp":1462994470947,"metricSystem":0,"metricUser":15,"metricIdle":85,"metrics":{"user":15,"system":0,"idle":85}},{"id":4587,"machineId":0,"timestamp":1462994469945,"metricSystem":1,"metricUser":15,"metricIdle":84,"metrics":{"user":15,"system":1,"idle":84}},{"id":4586,"machineId":0,"timestamp":1462994468942,"metricSystem":1,"metricUser":15,"metricIdle":85,"metrics":{"user":15,"system":1,"idle":85}},{"id":4585,"machineId":0,"timestamp":1462994467940,"metricSystem":0,"metricUser":15,"metricIdle":85,"metrics":{"user":15,"system":0,"idle":85}},{"id":4584,"machineId":0,"timestamp":1462994466937,"metricSystem":1,"metricUser":15,"metricIdle":84,"metrics":{"user":15,"system":1,"idle":84}},{"id":4583,"machineId":0,"timestamp":1462994465935,"metricSystem":1,"metricUser":15,"metricIdle":84,"metrics":{"user":15,"system":1,"idle":84}},{"id":4582,"machineId":0,"timestamp":1462994464932,"metricSystem":1,"metricUser":15,"metricIdle":85,"metrics":{"user":15,"system":1,"idle":85}},{"id":4581,"machineId":0,"timestamp":1462994463930,"metricSystem":1,"metricUser":15,"metricIdle":85,"metrics":{"user":15,"system":1,"idle":85}},{"id":4580,"machineId":0,"timestamp":1462994462927,"metricSystem":1,"metricUser":15,"metricIdle":85,"metrics":{"user":15,"system":1,"idle":85}},{"id":4579,"machineId":0,"timestamp":1462994461925,"metricSystem":1,"metricUser":15,"metricIdle":85,"metrics":{"user":15,"system":1,"idle":85}},{"id":4578,"machineId":0,"timestamp":1462994460922,"metricSystem":1,"metricUser":15,"metricIdle":84,"metrics":{"user":15,"system":1,"idle":84}}];
