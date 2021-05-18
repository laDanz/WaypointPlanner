function log(s) {
    document.getElementById("debug").textContent = s;
}

var homeIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var unselectedIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var currentIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var candidateIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

let graph = {
    "nodes": [{
            "id": "n0",
            "label": "zu Hause",
            "p": [52.60715024055473, 13.24389570647589],
            "options": {
                "icon": homeIcon
            }
        },
        {
            "id": "n1",
            "label": "Alter Fritz",
            "p": [52.598020036292006, 13.275033744733333]
        },
        {
            "id": "n2",
            "label": "Reiherwerder",
            "p": [52.585575211205594, 13.253645901761473]
        },
        {
            "id": "n3",
            "label": "Fähre Konradshöhe",
            "p": [52.57320458462619, 13.22502041285229]
        },
        {
            "id": "n4",
            "label": "Badestelle Sandhauser Str",
            "p": [52.59452182279868, 13.221125258922724]
        },
        {
            "id": "n5",
            "label": "Kirschstand",
            "p": [52.62762653026662, 13.226065992768778]
        },
        {
            "id": "n6",
            "label": "Ortseingang Frohnau",
            "p": [52.62602429973217, 13.267603445130307]
        },
        {
            "id": "n7",
            "label": "Kreisel Hennigsdorf",
            "p": [52.63622075215098, 13.21915130716572]
        },
        {
            "id": "n8",
            "label": "Havelbaude",
            "p": [52.68278315646737, 13.245812737843977]
        },
        {
            "id": "n9",
            "label": "Stolpe",
            "p": [52.66068782799154, 13.2592675524601]
        },
        {
            "id": "n10",
            "label": "Landhaus Hubertus",
            "p": [52.65503916600213, 13.283747538747559]
        }, {
            "p": [52.5854557546454, 13.21137100433072],
            "id": "n11",
            "label": "Jagdhaus Spandau"
        }

    ],
    "edges": [{
            "id": "e0",
            "source": "n0",
            "target": "n1",
            "additional": [
                [52.61142156692721, 13.251644355710749],
                [52.60418972118463, 13.270698481397998]
            ]
        },
        {
            "id": "e1",
            "source": "n1",
            "target": "n2",
            "additional": [
                [52.59607986779725, 13.266656697586342],
                [52.591081697087525, 13.256660499950485]
            ]
        },
        {
            "id": "e2",
            "source": "n2",
            "target": "n0",
            "additional": [
                [52.591227752416934, 13.245135949828509],
                [52.599869424163046, 13.251959489231254],
                [52.60102933789351, 13.246916936719348]
            ]
        },
        {
            "id": "e3",
            "source": "n2",
            "target": "n3",
        },
        {
            "id": "e4",
            "source": "n0",
            "target": "n4"
        },
        {
            "id": "e5",
            "source": "n3",
            "target": "n4"
        }, {
            "id": "e6",
            "source": "n4",
            "target": "n5"
        }, {
            "id": "e7",
            "source": "n0",
            "target": "n5"
        }, {
            "id": "e8",
            "source": "n0",
            "target": "n6"
        }, {
            "id": "e9",
            "source": "n5",
            "target": "n6"
        }, {
            "id": "e10",
            "source": "n5",
            "target": "n7"
        }, {
            "id": "e11",
            "source": "n7",
            "target": "n9"
        }, {
            "id": "e12",
            "source": "n7",
            "target": "n8"
        }, {
            "id": "e13",
            "source": "n9",
            "target": "n10"
        }, {
            "id": "e14",
            "source": "n10",
            "target": "n6"
        }, {
            "id": "e15",
            "source": "n7",
            "target": "n11",
            "additional": [
                [52.63695218310809, 13.213899826034321],
                [52.633296511537, 13.214855716502719],
                [52.621932216754615, 13.213085622984506],
                [52.616369080772024, 13.204461634479811],
                [52.60701397642708, 13.200213015257363],
                [52.59744833612811, 13.204289972721888],
                [52.59317309673633, 13.212315141625744]
            ]
        }, {
            "id": "e16",
            "source": "n11",
            "target": "n3",
        }
    ]
};

function calcDistance(p1, p2, additional = []) {
    let result = 0;
    let points = [];
    points = points.concat(additional);
    points.push(p2);
    let o = p1;

    points.forEach(function(n) {
        let dx = 71.5 * (o[1] - n[1]);
        let dy = 111.3 * (o[0] - n[0])
        result += Math.sqrt(dx * dx + dy * dy);
        o = n;
    });
    return result;
}

// initialize map
var map = L.map('map').setView([52.60681, 13.24372], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var info = L.control();
info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
// method that we will use to update the control based on feature properties passed
info.update = function(laenge, route = [], homeWaypoint = {}) {
    let routeList = '';
    let n = homeWaypoint;
    route.forEach(function(eid) {
        let edge = edges[eid];
        if (edge.source == n.id) {
            n = nodes[edge.target];
        } else {
            n = nodes[edge.source];
        }
        routeList += '<li>' + n.label + '</li>';
    });
    this._div.innerHTML = '<h4>Route Details</h4>' +
        '<span>' + (laenge ? laenge.toFixed(2) : 0) + ' km</span>' +
        '<ul>' +
        '<li>' + homeWaypoint.label + '</li>' +
        routeList +
        '</ul>';
};

info.addTo(map);

// traverse over graph, preprocessing
var nodes = {};
graph["nodes"].forEach(function(node) {
    // TODO fail if multiple id
    nodes[node.id] = node;
    if (!node.options) {
        node.options = [];
    }
    node.options.title = node.id;
});
var homeWaypoint = nodes["n0"];
var currentWaypoint = homeWaypoint;
var route = [];
var edges = {};
graph["edges"].forEach(function(e) {
    // TODO fail if multiple id
    edges[e.id] = e;
    if (!e.laenge) {
        e.laenge = calcDistance(nodes[e.source].p, nodes[e.target].p, e.additional);
    }
    if (!nodes[e.source].edges) {
        nodes[e.source].edges = {};
    }
    nodes[e.source].edges[e.target] = e.id;
    if (!nodes[e.target].edges) {
        nodes[e.target].edges = {};
    }
    nodes[e.target].edges[e.source] = e.id;
    if (e.target == homeWaypoint.id) {
        // TODO fail if multiple edge
        nodes[e.source].candidate = true;
    }
    if (e.source == homeWaypoint.id) {
        // TODO fail if multiple edge
        nodes[e.target].candidate = true;
    }
});

function calculateCandidates() {
    for (var key in nodes) {
        var node = nodes[key];
        node.candidate = false;
    }
    for (var key in currentWaypoint.edges) {
        var edge = edges[currentWaypoint.edges[key]];
        if (edge.target == currentWaypoint.id) {
            nodes[edge.source].candidate = true;
        }
        if (edge.source == currentWaypoint.id) {
            nodes[edge.target].candidate = true;
        }
    };
}

function refreshIcons() {
    for (var key in nodes) {
        var node = nodes[key];
        let icon = unselectedIcon;
        if (node.id == currentWaypoint.id) {
            icon = currentIcon;
        } else if (node.candidate) {
            icon = candidateIcon;
        } else if (node.id == homeWaypoint.id) {
            icon = homeIcon;
        }
        node.marker.setIcon(icon);
    };
}

function refreshLines() {
    for (var key in edges) {
        var edge = edges[key];
        if (route.includes(edge.id)) {
            edge.line.setStyle({
                color: 'magenta'
            });
        } else {

        }
    };
}

function onNodeClick(marker) {
    let node = nodes[this.options.title];
    let edgeid = currentWaypoint.edges[node.id];
    if (node.candidate && !route.includes(edgeid)) {
        route.push(edgeid);
        currentWaypoint = node;
        calculateCandidates();
        refreshIcons();
        refreshLines();
        let laenge = 0;
        route.forEach(function(eid) {
            laenge += edges[eid].laenge;
        });
        info.update(laenge, route, homeWaypoint);
    }
}
// adding to map, aka Painting
for (var key in nodes) {
    var node = nodes[key];
    node.marker = L.marker(node.p, node.options).addTo(map)
        .bindPopup(node.label)
        .on('click', onNodeClick);
};
refreshIcons();
for (var key in edges) {
    var edge = edges[key];
    pline = [];
    pline.push(nodes[edge.source].p);
    if (edge.additional) {
        edge.additional.forEach(function(i) {
            pline.push(i);
        });
    }
    pline.push(nodes[edge.target].p);
    edge.line = L.polyline(pline, {
        color: 'purple',
        title: edge.id
    }).addTo(map);
};