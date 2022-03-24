import { Control, DomUtil, Icon, LatLng, map, marker, MarkerOptions, Polyline, polyline, tileLayer } from "leaflet";

function log(s) {
    document.getElementById("debug").textContent = s;
}

class WppNodeOptions {
    title: string;
}
class WppNode {
    constructor(id: string, label:string,latLng:LatLng,markerOptions?:MarkerOptions) {
        this.id = id;
        this.label=label;
        this.latLng=latLng;
        this.markerOptions=markerOptions;
        this.candidate=false;
        this.edges=new Map<string, WppEdge>();
        this.additionalOptions=new WppNodeOptions();
    }

    id: string;
    label: string;
    latLng: LatLng;
    markerOptions: MarkerOptions;
    additionalOptions:WppNodeOptions;
    candidate: boolean;
    edges: Map<string, WppEdge>;
    marker;
}
class WppEdge {
    constructor(id: string, source:WppNode,target:WppNode,additional?:LatLng[]) {
        this.id = id;
        this.source=source;
        this.target=target;
        this.additional=additional;
    }

    laenge():number{
        return calcDistance(this.source.latLng, this.target.latLng, this.additional);
    }

    id: string;
    source: WppNode;
    target: WppNode;
    additional: LatLng[];
    line: Polyline;
}

var homeIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var unselectedIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var currentIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var candidateIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

let n0 = new WppNode(
    "n0",
    "zu Hause",
    new LatLng(52.60715024055473, 13.24389570647589),
    {icon: homeIcon}
);
let n1 = new WppNode(
    "n1",
    "Alter Fritz",
    new LatLng(52.598020036292006, 13.275033744733333)
);
let n2 = new WppNode(
    "n2",
    "Reiherwerder",
    new LatLng(52.585575211205594, 13.253645901761473)
);
let n3 = new WppNode(
    "n3",
    "Fähre Konradshöhe",
    new LatLng(52.57320458462619, 13.22502041285229)
);
let n4 = new WppNode(
    "n4",
    "Badestelle Sandhauser Str",
    new LatLng(52.59452182279868, 13.221125258922724)
);
let n5 = new WppNode(
    "n5",
    "Kirschstand",
    new LatLng(52.62762653026662, 13.226065992768778)
);
let n6 = new WppNode(
    "n6",
    "Ortseingang Frohnau",
    new LatLng(52.62602429973217, 13.267603445130307)
);
let n7 = new WppNode(
    "n7",
    "Kreisel Hennigsdorf",
    new LatLng(52.63622075215098, 13.21915130716572)
);
let n8 = new WppNode(
    "n8",
    "Havelbaude",
    new LatLng(52.68278315646737, 13.245812737843977)
);
let n9 = new WppNode(
    "n9",
    "Stolpe",
    new LatLng(52.66068782799154, 13.2592675524601)
);
let n10 = new WppNode(
    "n10",
    "Landhaus Hubertus",
    new LatLng(52.65503916600213, 13.283747538747559)
);
let n11 = new WppNode(
    "n11",
    "Jagdhaus Spandau",
    new LatLng(52.5854557546454, 13.21137100433072) 
);

let graph = {
    "nodes": [n0, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11],
    "edges": [
        new WppEdge(
            "e0",
            n0,
            n1,
            [
                new LatLng(52.61142156692721, 13.251644355710749),
                new LatLng(52.60418972118463, 13.270698481397998)
            ]
        ),
        new WppEdge(
            "e1",
            n1,
            n2,
            [
                new LatLng(52.59607986779725, 13.266656697586342),
                new LatLng(52.591081697087525, 13.256660499950485)
            ]
        ),
        new WppEdge(
            "e2",
            n2,
            n0,
            [
                new LatLng(52.591227752416934, 13.245135949828509),
                new LatLng(52.599869424163046, 13.251959489231254),
                new LatLng(52.60102933789351, 13.246916936719348)
            ]
        ),
        new WppEdge(
            "e3",
            n2,
            n3,
            [
                new LatLng(52.58418622103453, 13.252730369567873),
                new LatLng(52.58284333014117, 13.248846530914308),
                new LatLng(52.57884048894273, 13.2440185546875),
                new LatLng(52.5766237746851, 13.24382543563843),
                new LatLng(52.57471991885766, 13.240950107574465),
                new LatLng(52.57316808480483, 13.23309659957886)
            ]
        ),
        new WppEdge(
            "e4",
            n0,
            n4,
            [
                new LatLng(52.607830003740006, 13.239920139312744),
                new LatLng(52.60273476545375, 13.238611221313477),
                new LatLng(52.60253276808935, 13.238761425018312),
                new LatLng(52.5991833856945, 13.236690759658813),
                new LatLng(52.59853172511889, 13.23581099510193),
                new LatLng(52.596420278268944, 13.235725164413454),
                new LatLng(52.59605532652377, 13.230392932891847),
                new LatLng(52.59647241398439, 13.227925300598145),
                new LatLng(52.59625735375833, 13.22508215904236),
                new LatLng(52.5963225236353, 13.219267129898073)
            ]
        ),
        new WppEdge(
            "e5",
            n4,
            n3,
            [
                new LatLng(52.592672861237155, 13.223161697387697),
                new LatLng(52.59048291787224, 13.221960067749025),
                new LatLng(52.585920184335905, 13.22028636932373),
                new LatLng(52.58240003673654, 13.220071792602539),
                new LatLng(52.57974018216329, 13.219771385192873),
                new LatLng(52.57726272146827, 13.220157623291016),
                new LatLng(52.57551537552513, 13.222904205322266),
                new LatLng(52.57361147156712, 13.225865364074709)
            ]
        ),
        new WppEdge(
            "e6",
            n4,
            n5,
            [
                new LatLng(52.596296455696155, 13.219256401062013),
                new LatLng(52.60156186453252, 13.210330009460451),
                new LatLng(52.60565384916619, 13.209686279296875),
                new LatLng(52.610553302332164, 13.215222358703615),
                new LatLng(52.61141325617663, 13.217582702636719),
                new LatLng(52.61274224253604, 13.222603797912598),
                new LatLng(52.613295974947626, 13.222657442092897),
                new LatLng(52.61371289825971, 13.22335481643677),
                new LatLng(52.61444901878977, 13.223901987075807),
                new LatLng(52.61590168051569, 13.22111248970032),
                new LatLng(52.622017965034026, 13.22533965110779),
                new LatLng(52.62169230582232, 13.227807283401491),
                new LatLng(52.623522479137556, 13.228000402450563),
                new LatLng(52.6249683270768, 13.226873874664307),
                new LatLng(52.62511811940303, 13.22631597518921),
                new LatLng(52.62647273976646, 13.227517604827883)
            ]
        ),
        new WppEdge(
            "e7",
            n0,
            n5,
            [
                new LatLng(52.60940667093514, 13.230714797973633),
                new LatLng(52.610540272598584, 13.231015205383303),
                new LatLng(52.61181716806234, 13.222496509552004),
                new LatLng(52.613295974947626, 13.222657442092897),
                new LatLng(52.61371289825971, 13.22335481643677),
                new LatLng(52.61444901878977, 13.223901987075807),
                new LatLng(52.61590168051569, 13.22111248970032),
                new LatLng(52.622017965034026, 13.22533965110779),
                new LatLng(52.62169230582232, 13.227807283401491),
                new LatLng(52.623522479137556, 13.228000402450563),
                new LatLng(52.6249683270768, 13.226873874664307),
                new LatLng(52.62511811940303, 13.22631597518921),
                new LatLng(52.62647273976646, 13.227517604827883)
            ]
        ),
        new WppEdge(
            "e8",
            n0,
            n6,
            [
                new LatLng(52.61149143296143, 13.25174331665039),
                new LatLng(52.611830197415955, 13.252644538879396),
                new LatLng(52.61112660677165, 13.255219459533693),
                new LatLng(52.61146537404868, 13.25779438018799),
                new LatLng(52.61110054764178, 13.263673782348635),
                new LatLng(52.614983187000604, 13.264832496643068),
                new LatLng(52.618240169216094, 13.264617919921877),
                new LatLng(52.62170533223731, 13.26727867126465),
                new LatLng(52.62292979793696, 13.26805114746094)
            ]
        ),
        new WppEdge(
            "e9",
            n5,
            n6,
            [
                new LatLng(52.62811385826731, 13.241658210754396),
                new LatLng(52.628739030079636, 13.244447708129885),
                new LatLng(52.62819200523228, 13.248910903930666),
                new LatLng(52.62866088409151, 13.263416290283205),
                new LatLng(52.62678533851139, 13.264102935791017)
            ]
        ),
        new WppEdge(
            "e10",
            n5,
            n7
        ),
        new WppEdge(
            "e11",
            n7,
            n9,
            [
                new LatLng(52.63639665997182, 13.219664096832277),
                new LatLng(52.64182651385156, 13.224191665649416),
                new LatLng(52.64346705653171, 13.227045536041262)
            ]
        ),
        new WppEdge(
            "e12",
            n7,
            n8,
            [
                new LatLng(52.63639665997182, 13.219664096832277),
                new LatLng(52.64182651385156, 13.224191665649416),
                new LatLng(52.64346705653171, 13.227045536041262),
                new LatLng(52.643974831081145, 13.225457668304445),
                new LatLng(52.648375296904675, 13.227560520172121),
                new LatLng(52.65480595049276, 13.221251964569092),
                new LatLng(52.65684950267099, 13.221466541290283),
                new LatLng(52.65692759831141, 13.223655223846437),
                new LatLng(52.660207489229755, 13.224513530731203),
                new LatLng(52.66516590462891, 13.232367038726808),
                new LatLng(52.66838011485643, 13.237988948822023),
                new LatLng(52.67215358222824, 13.23354721069336),
                new LatLng(52.67307738147864, 13.235006332397463),
                new LatLng(52.66882253823937, 13.238890171051027),
                new LatLng(52.67376696536968, 13.241722583770754),
                new LatLng(52.67404019371207, 13.241035938262941),
                new LatLng(52.67822948099083, 13.24230194091797),
                new LatLng(52.680402027678376, 13.24182987213135),
                new LatLng(52.68185900444268, 13.243567943573),
                new LatLng(52.68172891920755, 13.244490623474123)
            ]
        ),
        new WppEdge(
            "e13",
            n9,
            n10,
            [
                new LatLng(52.66084521721903, 13.25955390930176),
                new LatLng(52.66068903979623, 13.263094425201418),
                new LatLng(52.66051984695848, 13.26401710510254),
                new LatLng(52.65552185543846, 13.273651599884035)
            ]
        ),
        new WppEdge(
            "e14",
            n6,
            n10,
            [
                new LatLng(52.62678533851139, 13.264124393463137),
                new LatLng(52.628634835397804, 13.263437747955324),
                new LatLng(52.636032041318884, 13.262901306152346),
                new LatLng(52.64144891992044, 13.261442184448244),
                new LatLng(52.64025101415167, 13.269853591918947),
                new LatLng(52.64196973828308, 13.279380798339846),
                new LatLng(52.64400087064272, 13.282985687255861),
                new LatLng(52.650197845375274, 13.283672332763672),
                new LatLng(52.65264514811467, 13.281183242797852),
                new LatLng(52.65514437974629, 13.28152656555176)
            ]
        ),
        new WppEdge(
            "e15",
            n7,
            n11,
            [
                new LatLng(52.63695218310809, 13.213899826034321),
                new LatLng(52.633296511537, 13.214855716502719),
                new LatLng(52.621932216754615, 13.213085622984506),
                new LatLng(52.616369080772024, 13.204461634479811),
                new LatLng(52.60701397642708, 13.200213015257363),
                new LatLng(52.59744833612811, 13.204289972721888),
                new LatLng(52.59317309673633, 13.212315141625744)
            ]
        ),
        new WppEdge(
            "e16",
            n11,
            n3,
        ),
        new WppEdge(
            "e17",
            n8,
            n9,
            [
                new LatLng(52.681702902114026, 13.24455499649048),
                new LatLng(52.681507773418645, 13.245778083801271),
                new LatLng(52.67705209767, 13.257869482040407),
                new LatLng(52.6755689398141, 13.25956463813782),
                new LatLng(52.67555592943465, 13.260219097137453),
                new LatLng(52.675120079484934, 13.260358572006227),
                new LatLng(52.67536077327836, 13.261452913284304),
                new LatLng(52.6691478466926, 13.262214660644533),
                new LatLng(52.66443714392834, 13.261871337890627)
            ]
        ),
        new WppEdge(
            "e18",
            n9,
            n6,
            [
                new LatLng(52.6575133111675, 13.255949020385744),
                new LatLng(52.65553487178351, 13.258094787597658),
                new LatLng(52.64147496098585, 13.26152801513672),
                new LatLng(52.636162262615215, 13.262858390808107),
                new LatLng(52.628712981432436, 13.263416290283205),
                new LatLng(52.62683743808515, 13.264102935791017)
            ]
        )
    ]
};

function calcDistance(p1:LatLng, p2:LatLng, additional : LatLng[] = []) {
    let result : number = 0;
    let points : LatLng[] = [];
    points = points.concat(additional);
    points.push(p2);
    let o : LatLng = p1;

    points.forEach(function(n:LatLng) {
        let dx = 71.5 * (o.lng - n.lng);
        let dy = 111.3 * (o.lat - n.lat)
        result += Math.sqrt(dx * dx + dy * dy);
        o = n;
    });
    return result;
}

function onMouseClick(e) {
    //map.fitBounds(e.target.getBounds());
    console.log("click on map:[" + e.latlng.lat + ", " + e.latlng.lng + "]");
}
// initialize map
var mymap = map('map').setView(new LatLng(52.60681, 13.24372), 12); // base on home node

mymap.on({
    click: onMouseClick
})

tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

const InfoControllClass = Control.extend({
    // method that we will use to update the control based on feature properties passed
    update : function(laenge:number, route = [], homeWaypoint : WppNode = new WppNode(null,"Zu Hause", null)) {
        let routeList = '';
        let n : WppNode = homeWaypoint;
        route.forEach(function(eid) {
            let edge : WppEdge = edges.get(eid);
            if (edge.source.id == n.id) {
                n = nodes.get(edge.target.id);
            } else {
                n = nodes.get(edge.source.id);
            }
            routeList += '<li>' + n.label + '</li>';
        });
        this._div.innerHTML = '<h4>Route Details</h4>' +
            '<span>' + (laenge ? laenge.toFixed(2) : 0) + ' km</span>' +
            '<ul>' +
            '<li>' + homeWaypoint.label + '</li>' +
            routeList +
            '</ul>';
    }
});
var info = new InfoControllClass();
info.onAdd = function(map) {
    this._div = DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

info.addTo(mymap);

// traverse over graph, preprocessing
var nodes : Map<string, WppNode> = new Map<string, WppNode>();
graph["nodes"].forEach(function(node : WppNode) {
    // TODO fail if multiple id
    nodes.set(node.id, node);
    node.additionalOptions.title = node.id;
});
var homeWaypoint : WppNode = nodes.get("n0");
var currentWaypoint : WppNode  = homeWaypoint;
var route : string[] = [];
var edges : Map<string, WppEdge> = new Map<string, WppEdge>();
graph["edges"].forEach(function(e:WppEdge) {
    // TODO fail if multiple id
    edges.set(e.id, e);
    e.source.edges.set(e.target.id, e);
    e.target.edges.set(e.source.id, e);
    if (e.target.id == homeWaypoint.id) {
        // TODO fail if multiple edge
        e.source.candidate = true;
    }
    if (e.source.id == homeWaypoint.id) {
        // TODO fail if multiple edge
        e.target.candidate = true;
    }
});

function calculateCandidates() {
    for (let node of nodes.values()) {
        node.candidate = false;
    }
    for (let edge of currentWaypoint.edges.values()) {
        if (edge.target.id == currentWaypoint.id) {
            nodes.get(edge.source.id).candidate = true;
        }
        if (edge.source.id == currentWaypoint.id) {
            nodes.get(edge.target.id).candidate = true;
        }
    };
}

function refreshIcons() {
    for (let node of nodes.values()) {
        let icon : Icon = unselectedIcon;
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
    for (let edge of edges.values()) {
        if (route.includes(edge.id)) {
            edge.line.setStyle({
                color: 'magenta'
            });
            edge.line.bringToFront();
        } else {
            edge.line.setStyle({
                color: 'purple'
            });
        }
    };
}

function onNodeClick(marker) {
    console.log("click on node:[" + marker.latlng.lat + ", " + marker.latlng.lng + "]");
    let node : WppNode = nodes.get(this.getElement().getAttribute('title'));
    let edgeid : string = currentWaypoint.edges.get(node.id).id;
    let update : boolean = false;
    if (node.id == currentWaypoint.id && route.length > 0) {
        // reclick current waypoint -> remove it from route
        edgeid = route.pop();
        let edge : WppEdge = edges.get(edgeid);
        if (edge.target.id == currentWaypoint.id) {
            currentWaypoint = nodes.get(edge.source.id);
        } else {
            currentWaypoint = nodes.get(edge.target.id);
        }
        update = true;
    } else if (node.candidate && !route.includes(edgeid)) {
        // it's a candidate and not yet included -> add to route
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
            laenge += edges.get(eid).laenge();
        });
        info.update(laenge, route, homeWaypoint);
    }
}

function onEdgeClick(edge) {
    console.log("click on edge:[" + edge.latlng.lat + ", " + edge.latlng.lng + "]");
}
// adding to map, aka Painting
for (let node of nodes.values()) {
    node.marker = marker(node.latLng, node.markerOptions).addTo(mymap)
        .bindPopup(node.label)
        .on('click', onNodeClick);
    node.marker.getElement().setAttribute('title', node.id);
};
refreshIcons();
for (let edge of edges.values()) {
    let pline : LatLng[] = [];
    pline.push(edge.source.latLng);
    if (edge.additional) {
        edge.additional.forEach(function(i) {
            pline.push(i);
        });
    }
    pline.push(edge.target.latLng);
    edge.line = polyline(pline, {
            color: 'purple'
        }).addTo(mymap)
        .on('click', onEdgeClick);
    edge.line.getElement().setAttribute('title', edge.id);
};