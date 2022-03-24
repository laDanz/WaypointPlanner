"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var e_1, _a, e_2, _b;
exports.__esModule = true;
var leaflet_1 = require("leaflet");
function log(s) {
    document.getElementById("debug").textContent = s;
}
var WppNodeOptions = /** @class */ (function () {
    function WppNodeOptions() {
    }
    return WppNodeOptions;
}());
var WppNode = /** @class */ (function () {
    function WppNode(id, label, latLng, markerOptions) {
        this.id = id;
        this.label = label;
        this.latLng = latLng;
        this.markerOptions = markerOptions;
        this.candidate = false;
        this.edges = new Map();
        this.additionalOptions = new WppNodeOptions();
    }
    return WppNode;
}());
var WppEdge = /** @class */ (function () {
    function WppEdge(id, source, target, additional) {
        this.id = id;
        this.source = source;
        this.target = target;
        this.additional = additional;
    }
    WppEdge.prototype.laenge = function () {
        return calcDistance(this.source.latLng, this.target.latLng, this.additional);
    };
    return WppEdge;
}());
var homeIcon = new leaflet_1.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var unselectedIcon = new leaflet_1.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var currentIcon = new leaflet_1.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var candidateIcon = new leaflet_1.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var n0 = new WppNode("n0", "zu Hause", new leaflet_1.LatLng(52.60715, 13.24389), { icon: homeIcon });
var n1 = new WppNode("n1", "Alter Fritz", new leaflet_1.LatLng(52.59802, 13.27503));
var n2 = new WppNode("n2", "Reiherwerder", new leaflet_1.LatLng(52.58557, 13.25364));
var n3 = new WppNode("n3", "Fähre Konradshöhe", new leaflet_1.LatLng(52.57320, 13.22502));
var n4 = new WppNode("n4", "Badestelle Sandhauser Str", new leaflet_1.LatLng(52.59452, 13.22112));
var n5 = new WppNode("n5", "Kirschstand", new leaflet_1.LatLng(52.62762, 13.22606));
var n6 = new WppNode("n6", "Ortseingang Frohnau", new leaflet_1.LatLng(52.62602, 13.26760));
var n7 = new WppNode("n7", "Kreisel Hennigsdorf", new leaflet_1.LatLng(52.63622, 13.21915));
var n8 = new WppNode("n8", "Havelbaude", new leaflet_1.LatLng(52.68278, 13.24581));
var n9 = new WppNode("n9", "Stolpe", new leaflet_1.LatLng(52.66068, 13.25926));
var n10 = new WppNode("n10", "Landhaus Hubertus", new leaflet_1.LatLng(52.65503, 13.28374));
var n11 = new WppNode("n11", "Jagdhaus Spandau", new leaflet_1.LatLng(52.58545, 13.21137));
var graph = {
    "nodes": [n0, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11],
    "edges": [
        new WppEdge("e0", n0, n1, [
            new leaflet_1.LatLng(52.61142, 13.25164),
            new leaflet_1.LatLng(52.60418, 13.27069)
        ]),
        new WppEdge("e1", n1, n2, [
            new leaflet_1.LatLng(52.59607, 13.26665),
            new leaflet_1.LatLng(52.59108, 13.25666)
        ]),
        new WppEdge("e2", n2, n0, [
            new leaflet_1.LatLng(52.59122, 13.24513),
            new leaflet_1.LatLng(52.59986, 13.25195),
            new leaflet_1.LatLng(52.60102, 13.24691)
        ]),
        new WppEdge("e3", n2, n3, [
            new leaflet_1.LatLng(52.58418, 13.25273),
            new leaflet_1.LatLng(52.58284, 13.24884),
            new leaflet_1.LatLng(52.57884, 13.24401),
            new leaflet_1.LatLng(52.57662, 13.24382),
            new leaflet_1.LatLng(52.57471, 13.24095),
            new leaflet_1.LatLng(52.57316, 13.23309)
        ]),
        new WppEdge("e4", n0, n4, [
            new leaflet_1.LatLng(52.60783, 13.23992),
            new leaflet_1.LatLng(52.60273, 13.23861),
            new leaflet_1.LatLng(52.60253, 13.23876),
            new leaflet_1.LatLng(52.59918, 13.23669),
            new leaflet_1.LatLng(52.59853, 13.23581),
            new leaflet_1.LatLng(52.59642, 13.23572),
            new leaflet_1.LatLng(52.59605, 13.23039),
            new leaflet_1.LatLng(52.59647, 13.22792),
            new leaflet_1.LatLng(52.59625, 13.22508),
            new leaflet_1.LatLng(52.59632, 13.21926)
        ]),
        new WppEdge("e5", n4, n3, [
            new leaflet_1.LatLng(52.59267, 13.22316),
            new leaflet_1.LatLng(52.59048, 13.22196),
            new leaflet_1.LatLng(52.58592, 13.22028),
            new leaflet_1.LatLng(52.58240, 13.22007),
            new leaflet_1.LatLng(52.57974, 13.21977),
            new leaflet_1.LatLng(52.57726, 13.22015),
            new leaflet_1.LatLng(52.57551, 13.22290),
            new leaflet_1.LatLng(52.57361, 13.22586)
        ]),
        new WppEdge("e6", n4, n5, [
            new leaflet_1.LatLng(52.59629, 13.21925),
            new leaflet_1.LatLng(52.60156, 13.21033),
            new leaflet_1.LatLng(52.60565, 13.20968),
            new leaflet_1.LatLng(52.61055, 13.21522),
            new leaflet_1.LatLng(52.61141, 13.21758),
            new leaflet_1.LatLng(52.61274, 13.22260),
            new leaflet_1.LatLng(52.61329, 13.22265),
            new leaflet_1.LatLng(52.61371, 13.22335),
            new leaflet_1.LatLng(52.61444, 13.22390),
            new leaflet_1.LatLng(52.61590, 13.22111),
            new leaflet_1.LatLng(52.62201, 13.22533),
            new leaflet_1.LatLng(52.62169, 13.22780),
            new leaflet_1.LatLng(52.62352, 13.22800),
            new leaflet_1.LatLng(52.62496, 13.22687),
            new leaflet_1.LatLng(52.62511, 13.22631),
            new leaflet_1.LatLng(52.62647, 13.22751)
        ]),
        new WppEdge("e7", n0, n5, [
            new leaflet_1.LatLng(52.60940, 13.23071),
            new leaflet_1.LatLng(52.61054, 13.23101),
            new leaflet_1.LatLng(52.61181, 13.22249),
            new leaflet_1.LatLng(52.61329, 13.22265),
            new leaflet_1.LatLng(52.61371, 13.22335),
            new leaflet_1.LatLng(52.61444, 13.22390),
            new leaflet_1.LatLng(52.61590, 13.22111),
            new leaflet_1.LatLng(52.62201, 13.22533),
            new leaflet_1.LatLng(52.62169, 13.22780),
            new leaflet_1.LatLng(52.62352, 13.22800),
            new leaflet_1.LatLng(52.62496, 13.22687),
            new leaflet_1.LatLng(52.62511, 13.22631),
            new leaflet_1.LatLng(52.62647, 13.22751)
        ]),
        new WppEdge("e8", n0, n6, [
            new leaflet_1.LatLng(52.61149, 13.25174),
            new leaflet_1.LatLng(52.61183, 13.25264),
            new leaflet_1.LatLng(52.61112, 13.25521),
            new leaflet_1.LatLng(52.61146, 13.25779),
            new leaflet_1.LatLng(52.61110, 13.26367),
            new leaflet_1.LatLng(52.61498, 13.26483),
            new leaflet_1.LatLng(52.61824, 13.26461),
            new leaflet_1.LatLng(52.62170, 13.26727),
            new leaflet_1.LatLng(52.62292, 13.26805)
        ]),
        new WppEdge("e9", n5, n6, [
            new leaflet_1.LatLng(52.62811, 13.24165),
            new leaflet_1.LatLng(52.62873, 13.24444),
            new leaflet_1.LatLng(52.62819, 13.24891),
            new leaflet_1.LatLng(52.62866, 13.26341),
            new leaflet_1.LatLng(52.62678, 13.26410)
        ]),
        new WppEdge("e10", n5, n7),
        new WppEdge("e11", n7, n9, [
            new leaflet_1.LatLng(52.63639, 13.21966),
            new leaflet_1.LatLng(52.64182, 13.22419),
            new leaflet_1.LatLng(52.64346, 13.22704)
        ]),
        new WppEdge("e12", n7, n8, [
            new leaflet_1.LatLng(52.63639, 13.21966),
            new leaflet_1.LatLng(52.64182, 13.22419),
            new leaflet_1.LatLng(52.64346, 13.22704),
            new leaflet_1.LatLng(52.64397, 13.22545),
            new leaflet_1.LatLng(52.64837, 13.22756),
            new leaflet_1.LatLng(52.65480, 13.22125),
            new leaflet_1.LatLng(52.65684, 13.22146),
            new leaflet_1.LatLng(52.65692, 13.22365),
            new leaflet_1.LatLng(52.66020, 13.22451),
            new leaflet_1.LatLng(52.66516, 13.23236),
            new leaflet_1.LatLng(52.66838, 13.23798),
            new leaflet_1.LatLng(52.67215, 13.23354),
            new leaflet_1.LatLng(52.67307, 13.23500),
            new leaflet_1.LatLng(52.66882, 13.23889),
            new leaflet_1.LatLng(52.67376, 13.24172),
            new leaflet_1.LatLng(52.67404, 13.24103),
            new leaflet_1.LatLng(52.67822, 13.24230),
            new leaflet_1.LatLng(52.68040, 13.24182),
            new leaflet_1.LatLng(52.68185, 13.24356),
            new leaflet_1.LatLng(52.68172, 13.24449)
        ]),
        new WppEdge("e13", n9, n10, [
            new leaflet_1.LatLng(52.66084, 13.25955),
            new leaflet_1.LatLng(52.66068, 13.26309),
            new leaflet_1.LatLng(52.66051, 13.26401),
            new leaflet_1.LatLng(52.65552, 13.27365)
        ]),
        new WppEdge("e14", n6, n10, [
            new leaflet_1.LatLng(52.62678, 13.26412),
            new leaflet_1.LatLng(52.62863, 13.26343),
            new leaflet_1.LatLng(52.63603, 13.26290),
            new leaflet_1.LatLng(52.64144, 13.26144),
            new leaflet_1.LatLng(52.64025, 13.26985),
            new leaflet_1.LatLng(52.64196, 13.27938),
            new leaflet_1.LatLng(52.64400, 13.28298),
            new leaflet_1.LatLng(52.65019, 13.28367),
            new leaflet_1.LatLng(52.65264, 13.28118),
            new leaflet_1.LatLng(52.65514, 13.28152)
        ]),
        new WppEdge("e15", n7, n11, [
            new leaflet_1.LatLng(52.63695, 13.21389),
            new leaflet_1.LatLng(52.63329, 13.21485),
            new leaflet_1.LatLng(52.62193, 13.21308),
            new leaflet_1.LatLng(52.61636, 13.20446),
            new leaflet_1.LatLng(52.60701, 13.20021),
            new leaflet_1.LatLng(52.59744, 13.20428),
            new leaflet_1.LatLng(52.59317, 13.21231)
        ]),
        new WppEdge("e16", n11, n3),
        new WppEdge("e17", n8, n9, [
            new leaflet_1.LatLng(52.68170, 13.24455),
            new leaflet_1.LatLng(52.68150, 13.24577),
            new leaflet_1.LatLng(52.67705, 13.25786),
            new leaflet_1.LatLng(52.67556, 13.25956),
            new leaflet_1.LatLng(52.67555, 13.26021),
            new leaflet_1.LatLng(52.67512, 13.26035),
            new leaflet_1.LatLng(52.67536, 13.26145),
            new leaflet_1.LatLng(52.66914, 13.26221),
            new leaflet_1.LatLng(52.66443, 13.26187)
        ]),
        new WppEdge("e18", n9, n6, [
            new leaflet_1.LatLng(52.65751, 13.25594),
            new leaflet_1.LatLng(52.65553, 13.25809),
            new leaflet_1.LatLng(52.64147, 13.26152),
            new leaflet_1.LatLng(52.63616, 13.26285),
            new leaflet_1.LatLng(52.62871, 13.26341),
            new leaflet_1.LatLng(52.62683, 13.26410)
        ])
    ]
};
function calcDistance(p1, p2, additional) {
    if (additional === void 0) { additional = []; }
    var result = 0;
    var points = [];
    points = points.concat(additional);
    points.push(p2);
    var o = p1;
    points.forEach(function (n) {
        var dx = 71.5 * (o.lng - n.lng);
        var dy = 111.3 * (o.lat - n.lat);
        result += Math.sqrt(dx * dx + dy * dy);
        o = n;
    });
    return result;
}
function onMouseClick(e) {
    //map.fitBounds(e.target.getBounds());
    var latlng = trim(e.latlng);
    console.log("click on map:[" + latlng.lat + ", " + latlng.lng + "]");
}
// initialize map
var mymap = (0, leaflet_1.map)('map').setView(new leaflet_1.LatLng(52.60681, 13.24372), 12); // base on home node
mymap.on({
    click: onMouseClick
});
(0, leaflet_1.tileLayer)('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);
var InfoControllClass = leaflet_1.Control.extend({
    // method that we will use to update the control based on feature properties passed
    update: function (laenge, route, homeWaypoint) {
        if (route === void 0) { route = []; }
        if (homeWaypoint === void 0) { homeWaypoint = new WppNode(null, "Zu Hause", null); }
        var routeList = '';
        var n = homeWaypoint;
        route.forEach(function (eid) {
            var edge = edges.get(eid);
            if (edge.source.id == n.id) {
                n = nodes.get(edge.target.id);
            }
            else {
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
info.onAdd = function (map) {
    this._div = leaflet_1.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
info.addTo(mymap);
// traverse over graph, preprocessing
var nodes = new Map();
graph["nodes"].forEach(function (node) {
    // TODO fail if multiple id
    nodes.set(node.id, node);
    node.additionalOptions.title = node.id;
});
var homeWaypoint = nodes.get("n0");
var currentWaypoint = homeWaypoint;
var route = [];
var edges = new Map();
graph["edges"].forEach(function (e) {
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
    var e_3, _a, e_4, _b;
    try {
        for (var _c = __values(nodes.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
            var node = _d.value;
            node.candidate = false;
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
        }
        finally { if (e_3) throw e_3.error; }
    }
    try {
        for (var _e = __values(currentWaypoint.edges.values()), _f = _e.next(); !_f.done; _f = _e.next()) {
            var edge = _f.value;
            if (edge.target.id == currentWaypoint.id) {
                nodes.get(edge.source.id).candidate = true;
            }
            if (edge.source.id == currentWaypoint.id) {
                nodes.get(edge.target.id).candidate = true;
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
        }
        finally { if (e_4) throw e_4.error; }
    }
    ;
}
function refreshIcons() {
    var e_5, _a;
    try {
        for (var _b = __values(nodes.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var node = _c.value;
            var icon = unselectedIcon;
            if (node.id == currentWaypoint.id) {
                icon = currentIcon;
            }
            else if (node.candidate) {
                icon = candidateIcon;
            }
            else if (node.id == homeWaypoint.id) {
                icon = homeIcon;
            }
            node.marker.setIcon(icon);
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_5) throw e_5.error; }
    }
    ;
}
function refreshLines() {
    var e_6, _a;
    try {
        for (var _b = __values(edges.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var edge = _c.value;
            if (route.includes(edge.id)) {
                edge.line.setStyle({
                    color: 'magenta'
                });
                edge.line.bringToFront();
            }
            else {
                edge.line.setStyle({
                    color: 'purple'
                });
            }
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_6) throw e_6.error; }
    }
    ;
}
function onNodeClick(marker) {
    var _a;
    var latlng = trim(marker.latlng);
    console.log("click on node:[" + latlng.lat + ", " + latlng.lng + "]");
    var node = nodes.get(this.getElement().getAttribute('title'));
    var edgeid = (_a = currentWaypoint.edges.get(node.id)) === null || _a === void 0 ? void 0 : _a.id;
    var update = false;
    if (node.id == currentWaypoint.id && route.length > 0) {
        // reclick current waypoint -> remove it from route
        edgeid = route.pop();
        var edge = edges.get(edgeid);
        if (edge.target.id == currentWaypoint.id) {
            currentWaypoint = nodes.get(edge.source.id);
        }
        else {
            currentWaypoint = nodes.get(edge.target.id);
        }
        update = true;
    }
    else if (node.candidate && !route.includes(edgeid)) {
        // it's a candidate and not yet included -> add to route
        route.push(edgeid);
        currentWaypoint = node;
        update = true;
    }
    if (update) {
        calculateCandidates();
        refreshIcons();
        refreshLines();
        var laenge_1 = 0;
        route.forEach(function (eid) {
            laenge_1 += edges.get(eid).laenge();
        });
        info.update(laenge_1, route, homeWaypoint);
    }
}
function trim(latLng) {
    return new leaflet_1.LatLng(Number.parseFloat(latLng.lat.toFixed(5)), Number.parseFloat(latLng.lng.toFixed(5)));
}
function onEdgeClick(edge) {
    var latlng = trim(edge.latlng);
    console.log("click on edge:[" + latlng.lat + ", " + latlng.lng + "]");
}
try {
    // adding to map, aka Painting
    for (var _c = __values(nodes.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
        var node = _d.value;
        node.marker = (0, leaflet_1.marker)(node.latLng, node.markerOptions).addTo(mymap)
            .bindPopup(node.label)
            .on('click', onNodeClick);
        node.marker.getElement().setAttribute('title', node.id);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
    }
    finally { if (e_1) throw e_1.error; }
}
;
refreshIcons();
var _loop_1 = function (edge) {
    var pline = [];
    pline.push(edge.source.latLng);
    if (edge.additional) {
        edge.additional.forEach(function (i) {
            pline.push(i);
        });
    }
    pline.push(edge.target.latLng);
    edge.line = (0, leaflet_1.polyline)(pline, {
        color: 'purple'
    }).addTo(mymap)
        .on('click', onEdgeClick);
    edge.line.getElement().setAttribute('title', edge.id);
};
try {
    for (var _e = __values(edges.values()), _f = _e.next(); !_f.done; _f = _e.next()) {
        var edge = _f.value;
        _loop_1(edge);
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try {
        if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
    }
    finally { if (e_2) throw e_2.error; }
}
;
