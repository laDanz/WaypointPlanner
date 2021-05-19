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
            "additional": [
                [52.58418622103453, 13.252730369567873],
                [52.58284333014117, 13.248846530914308],
                [52.57884048894273, 13.2440185546875],
                [52.5766237746851, 13.24382543563843],
                [52.57471991885766, 13.240950107574465],
                [52.57316808480483, 13.23309659957886]
            ]
        },
        {
            "id": "e4",
            "source": "n0",
            "target": "n4",
            "additional": [
                [52.607830003740006, 13.239920139312744],
                [52.60273476545375, 13.238611221313477],
                [52.60253276808935, 13.238761425018312],
                [52.5991833856945, 13.236690759658813],
                [52.59853172511889, 13.23581099510193],
                [52.596420278268944, 13.235725164413454],
                [52.59605532652377, 13.230392932891847],
                [52.59647241398439, 13.227925300598145],
                [52.59625735375833, 13.22508215904236],
                [52.5963225236353, 13.219267129898073]
            ]
        },
        {
            "id": "e5",
            "source": "n4",
            "target": "n3",
            "additional": [
                [52.592672861237155, 13.223161697387697],
                [52.59048291787224, 13.221960067749025],
                [52.585920184335905, 13.22028636932373],
                [52.58240003673654, 13.220071792602539],
                [52.57974018216329, 13.219771385192873],
                [52.57726272146827, 13.220157623291016],
                [52.57551537552513, 13.222904205322266],
                [52.57361147156712, 13.225865364074709]
            ]
        }, {
            "id": "e6",
            "source": "n4",
            "target": "n5",
            "additional": [
                [52.596296455696155, 13.219256401062013],
                [52.60156186453252, 13.210330009460451],
                [52.60565384916619, 13.209686279296875],
                [52.610553302332164, 13.215222358703615],
                [52.61141325617663, 13.217582702636719],
                [52.61274224253604, 13.222603797912598],
                [52.613295974947626, 13.222657442092897],
                [52.61371289825971, 13.22335481643677],
                [52.61444901878977, 13.223901987075807],
                [52.61590168051569, 13.22111248970032],
                [52.622017965034026, 13.22533965110779],
                [52.62169230582232, 13.227807283401491],
                [52.623522479137556, 13.228000402450563],
                [52.6249683270768, 13.226873874664307],
                [52.62511811940303, 13.22631597518921],
                [52.62647273976646, 13.227517604827883]
            ]
        }, {
            "id": "e7",
            "source": "n0",
            "target": "n5",
            "additional": [
                [52.60940667093514, 13.230714797973633],
                [52.610540272598584, 13.231015205383303],
                [52.61181716806234, 13.222496509552004],
                [52.613295974947626, 13.222657442092897],
                [52.61371289825971, 13.22335481643677],
                [52.61444901878977, 13.223901987075807],
                [52.61590168051569, 13.22111248970032],
                [52.622017965034026, 13.22533965110779],
                [52.62169230582232, 13.227807283401491],
                [52.623522479137556, 13.228000402450563],
                [52.6249683270768, 13.226873874664307],
                [52.62511811940303, 13.22631597518921],
                [52.62647273976646, 13.227517604827883]
            ]
        }, {
            "id": "e8",
            "source": "n0",
            "target": "n6",
            "additional": [
                [52.61149143296143, 13.25174331665039],
                [52.611830197415955, 13.252644538879396],
                [52.61112660677165, 13.255219459533693],
                [52.61146537404868, 13.25779438018799],
                [52.61110054764178, 13.263673782348635],
                [52.614983187000604, 13.264832496643068],
                [52.618240169216094, 13.264617919921877],
                [52.62170533223731, 13.26727867126465],
                [52.62292979793696, 13.26805114746094]
            ]
        }, {
            "id": "e9",
            "source": "n5",
            "target": "n6",
            "additional": [
                [52.62811385826731, 13.241658210754396],
                [52.628739030079636, 13.244447708129885],
                [52.62819200523228, 13.248910903930666],
                [52.62866088409151, 13.263416290283205],
                [52.62678533851139, 13.264102935791017]
            ]
        }, {
            "id": "e10",
            "source": "n5",
            "target": "n7"
        }, {
            "id": "e11",
            "source": "n7",
            "target": "n9",
            "additional": [
                [52.63639665997182, 13.219664096832277],
                [52.64182651385156, 13.224191665649416],
                [52.64346705653171, 13.227045536041262]
            ]
        }, {
            "id": "e12",
            "source": "n7",
            "target": "n8",
            "additional": [
                [52.63639665997182, 13.219664096832277],
                [52.64182651385156, 13.224191665649416],
                [52.64346705653171, 13.227045536041262],
                [52.643974831081145, 13.225457668304445],
                [52.648375296904675, 13.227560520172121],
                [52.65480595049276, 13.221251964569092],
                [52.65684950267099, 13.221466541290283],
                [52.65692759831141, 13.223655223846437],
                [52.660207489229755, 13.224513530731203],
                [52.66516590462891, 13.232367038726808],
                [52.66838011485643, 13.237988948822023],
                [52.67215358222824, 13.23354721069336],
                [52.67307738147864, 13.235006332397463],
                [52.66882253823937, 13.238890171051027],
                [52.67376696536968, 13.241722583770754],
                [52.67404019371207, 13.241035938262941],
                [52.67822948099083, 13.24230194091797],
                [52.680402027678376, 13.24182987213135],
                [52.68185900444268, 13.243567943573],
                [52.68172891920755, 13.244490623474123]
            ]
        }, {
            "id": "e13",
            "source": "n9",
            "target": "n10",
            "additional": [
                [52.66084521721903, 13.25955390930176],
                [52.66068903979623, 13.263094425201418],
                [52.66051984695848, 13.26401710510254],
                [52.65552185543846, 13.273651599884035]
            ]
        }, {
            "id": "e14",
            "source": "n6",
            "target": "n10",
            "additional": [
                [52.62678533851139, 13.264124393463137],
                [52.628634835397804, 13.263437747955324],
                [52.636032041318884, 13.262901306152346],
                [52.64144891992044, 13.261442184448244],
                [52.64025101415167, 13.269853591918947],
                [52.64196973828308, 13.279380798339846],
                [52.64400087064272, 13.282985687255861],
                [52.650197845375274, 13.283672332763672],
                [52.65264514811467, 13.281183242797852],
                [52.65514437974629, 13.28152656555176]
            ]
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
        }, {
            "id": "e17",
            "source": "n8",
            "target": "n9",
            "additional": [
                [52.681702902114026, 13.24455499649048],
                [52.681507773418645, 13.245778083801271],
                [52.67705209767, 13.257869482040407],
                [52.6755689398141, 13.25956463813782],
                [52.67555592943465, 13.260219097137453],
                [52.675120079484934, 13.260358572006227],
                [52.67536077327836, 13.261452913284304],
                [52.6691478466926, 13.262214660644533],
                [52.66443714392834, 13.261871337890627]
            ]
        }, {
            "id": "e18",
            "source": "n9",
            "target": "n6",
            "additional": [
                [52.6575133111675, 13.255949020385744],
                [52.65553487178351, 13.258094787597658],
                [52.64147496098585, 13.26152801513672],
                [52.636162262615215, 13.262858390808107],
                [52.628712981432436, 13.263416290283205],
                [52.62683743808515, 13.264102935791017]
            ]
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

function onMouseClick(e) {
    //map.fitBounds(e.target.getBounds());
    console.log("[" + e.latlng.lat + ", " + e.latlng.lng + "]");
}
// initialize map
var map = L.map('map').setView([52.60681, 13.24372], 12);

map.on({
    click: onMouseClick
})

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
info.update = function(laenge, route = [], homeWaypoint = {
    label: "Zu Hause"
}) {
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
            edge.line.setStyle({
                color: 'purple'
            });
        }
    };
}

function onNodeClick(marker) {
    let node = nodes[this.options.title];
    let edgeid = currentWaypoint.edges[node.id];
    let update = false;
    if (node.id == currentWaypoint.id && route.length > 0) {
        edgeid = route.pop();
        let edge = edges[edgeid];
        if (edge.target == currentWaypoint.id) {
            currentWaypoint = nodes[edge.source];
        } else {
            currentWaypoint = nodes[edge.target];
        }
        update = true;
    } else if (node.candidate && !route.includes(edgeid)) {
        route.push(edgeid);
        currentWaypoint = node;
        update = true;
    }
    if (update) {
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