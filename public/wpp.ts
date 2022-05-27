import { Control, DomUtil, Icon, LatLng, map, Draggable, Marker, marker, MarkerOptions, popup, Polyline, polyline, tileLayer } from "leaflet";

function log(s) {
    document.getElementById("debug").textContent = s;
}

/// classes

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
    marker: Marker;
}
class WppEdge {
    constructor(id: string, source:WppNode,target:WppNode,additional?:LatLng[]) {
        this.id = id;
        this.source=source;
        this.target=target;
        this.additional=additional;
        this.lines=[];
    }

    laenge():number{
        return calcDistance(this.source.latLng, this.target.latLng, this.additional);
    }

    id: string;
    source: WppNode;
    target: WppNode;
    additional: LatLng[];
    lines: Polyline[];
}

/// icons

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
var newIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

/// functions

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

function trim(latLng:LatLng):LatLng{
    return new LatLng(Number.parseFloat(latLng.lat.toFixed(5)), Number.parseFloat(latLng.lng.toFixed(5)));
}

function genRandomNodeId():string{
    while(true){
        var id:string = crypto.randomUUID().split("-")[0];
        var found:boolean =false;
        for (let node of nodes.values()) {
            if (node.id == id){
                found=true;
                break;
            }
        }
        if(!found){
            return id;
        }
    }
}

function removeTempNode(tempNode:WppNode) {
    console.log("entering removeTempNode");
    // FIXME stupid indicator if popup was just closed, or closed after node save
    if(tempNode.markerOptions.icon != null && tempNode != homeWaypoint){
        tempNode.marker.remove();
    }
}

function saveTempNode(tempNode:WppNode, name: string) {
    console.log("entering saveTempNode");
    nodes.set(tempNode.id, tempNode);
    tempNode.label=name;
    tempNode.markerOptions.icon=null;
    if (homeWaypoint == null){
        homeWaypoint = tempNode;
        currentWaypoint = homeWaypoint;
        tempNode.markerOptions.icon = homeIcon;
    }
    tempNode.marker.closePopup();
    tempNode.marker.bindPopup(tempNode.label);
    tempNode.marker.on('click', onNodeClick);
    tempNode.marker.getElement().setAttribute('title', tempNode.id);
    refreshIcons();
    saveCurrentNodes();
}

interface NewNodeFormElements extends HTMLCollection {
    newname: HTMLInputElement;
}

function onMapClick(e) {
    if(e.originalEvent.target.id != "map"){
        // filter out clicks through transparent info containers
        return;
    }
    let latlng:LatLng = trim(e.latlng);
    console.log("click on map:[" + latlng.lat + ", " + latlng.lng + "]");
    nodeInfo.update(null);
    if(dragMarker != null){
        dragMarker.remove();
        dragMarker = null;
        return;
    }
    // place new node icon, open dialoge to create new node
    var newNode : WppNode = new WppNode(genRandomNodeId(), "Wegpunkt", latlng, {icon: newIcon});
    var newPopup = popup()
    .setContent(
        '<form role="form" id="newNodeForm">'+
        '<b>Neuer Knoten</b><br><br>'+
        'Name: <input id="newNodeNameInput" name="newname" value="Knotenpunkt"><br>'+
        '<button type="submit">save</button>'+
        '</form>'
        )
    .on('remove', function() {
        removeTempNode(newNode);
    });
    newNode.marker = marker(newNode.latLng, newNode.markerOptions)
        .addTo(mymap)
        .bindPopup(newPopup)
        .openPopup();
    
    var form : HTMLFormElement= document.getElementById('newNodeForm') as HTMLFormElement;
    var elements: NewNodeFormElements = form.elements as NewNodeFormElements;
    form.onsubmit=function(e){
        e.preventDefault();
        saveTempNode(newNode, elements.newname.value);
    };
    elements.newname.focus();
}

function onNodeClick(marker) {
    let latlng:LatLng = trim(marker.latlng);
    console.log("click on node:[" + latlng.lat + ", " + latlng.lng + "]");
    let node : WppNode = nodes.get(this.getElement().getAttribute('title'));
    let edgeid : string = currentWaypoint.edges.get(node.id)?.id;
    let update : boolean = false;
    if (addRouteStartNodeId != null){
        onAddRouteFinished(node.id);
        return;
    }
    if(dragMarker != null){
        dragMarker.remove();
        dragMarker = null;
    }
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
    nodeInfo.update(node);
}

function onAddRoute(startNodeId : string){
    addRouteStartNodeId = startNodeId;
    document.getElementById('addRouteButton').textContent='select target node!';
}

function onAddRouteFinished(endNodeId : string){
    //add route from addRouteStartNodeId -> endNodeId
    let startNode : WppNode = nodes.get(addRouteStartNodeId);
    let endNode : WppNode = nodes.get(endNodeId);
    let newEdge : WppEdge = new WppEdge(
        genRandomNodeId(),
        startNode,
        endNode,
        []
    );
    edges.set(newEdge.id, newEdge);
    addLinesToEdge(newEdge);
    startNode.edges.set(endNode.id, newEdge);
    endNode.edges.set(startNode.id, newEdge);
    addRouteStartNodeId = null;
    document.getElementById('addRouteButton').textContent='add route';
    calculateCandidates();
}

function onEdgeClick(_edge) {
    let latlng:LatLng = trim(_edge.latlng);
    console.log("click on edge:[" + latlng.lat + ", " + latlng.lng + "]");
    nodeInfo.update(null);
    if(dragMarker != null){
        dragMarker.remove();
        dragMarker = null;
    }
    let edge : WppEdge = edges.get(this.getElement().getAttribute('title'));
    let idx : number = getNewIndex(edge.source.latLng, edge.additional, edge.target.latLng, this);
    edge.additional.splice(idx, 0, latlng);
    dragMarker = marker(latlng, {draggable: true}).addTo(mymap);//, node.markerOptions
    dragMarker.on('drag', function(event){
        var position = trim(dragMarker.getLatLng());
        latlng.lat=position.lat;
        latlng.lng=position.lng;
        addLinesToEdge(edge);
    });
}

function getNewIndex(start : LatLng, addit : LatLng[], end: LatLng, line: Polyline) : number {
    let one : LatLng = line.getLatLngs()[0] as LatLng;
    let two : LatLng = line.getLatLngs()[1] as LatLng;
    let idx : number = null;

    if (one == start || two == start){
        idx = 0;
    }
    if (one == end || two == end){
        idx = addit.length;
    }
    addit.forEach((ll,idx_)=>{
        if(idx == null && (one == ll || two == ll)){
            idx = idx_+1;
        }
    });

    return idx;
}

function saveCurrentNodes(){
    // homeWaypoint
    localStorage.setItem('homeWaypoint', JSON.stringify(homeWaypoint, replacer));
    // all other nodes
    let nodeArr : string[] = [];
    for (let node of nodes.values()) {
        if(node == homeWaypoint){
            continue;
        }
        nodeArr.push(JSON.stringify(node, replacer));
    }
    localStorage.setItem('nodes', JSON.stringify(nodeArr));
}

function loadNodes(){
    let hw = localStorage.getItem('homeWaypoint');
    if (hw != null && hw != ''){
        homeWaypoint = JSON.parse(hw, reviver);
        homeWaypoint.markerOptions.icon = homeIcon;
        currentWaypoint = homeWaypoint;
        nodes.set(homeWaypoint.id, homeWaypoint);
        initializeNodeMarker(homeWaypoint);
        mymap.setView(homeWaypoint.latLng, 12);
    }
    let nodeStr = localStorage.getItem('nodes');
    if (nodeStr != null && nodeStr != '') {
        let nodeArr :string[] = JSON.parse(nodeStr);
        for (let n of nodeArr){
            let node=JSON.parse(n, reviver);
            node.markerOptions.icon = unselectedIcon;
            nodes.set(node.id, node);
            initializeNodeMarker(node);
        }
    }
    // for all nodes: revive edges source and target
    for (let node of nodes.values()) {
        for (let edge of node.edges.values()){
            if (typeof edge.source === 'string'){
                edge.source=nodes.get(edge.source);
            }
            if (typeof edge.target === 'string'){
                edge.target=nodes.get(edge.target);
            }
            let e : WppEdge;
            if (edges.get(edge.id) == null){
                e = new WppEdge(edge.id, edge.source, edge.target, edge.additional);
                edges.set(edge.id, e);
                addLinesToEdge(e);
            } else {
                e = edges.get(edge.id);
            }
            // dirty
            edge.laenge=e.laenge;
            edge.lines=e.lines;
            // dirty end
        }
    }

    refreshIcons();
}

function replacer(key, value) {
    //console.log("replacer: key["+key+"]");
    if (value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()), // or with spread: value: [...value]
      };
    } if(key == 'marker'){
        return null;
    } if(key == 'lines'){
        return null;
    } if(key == 'source'){
        return value.id;
    } if(key == 'target'){
        return value.id;
    } else {
      return value;
    }
  }

  function reviver(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }

/// variables
var nodes : Map<string, WppNode> = new Map<string, WppNode>();
var edges : Map<string, WppEdge> = new Map<string, WppEdge>();
var homeWaypoint : WppNode = null;
var currentWaypoint : WppNode = null;
var route : string[] = [];
var addRouteStartNodeId : string = null;
var dragMarker : Marker = null;


/// initialize map
var mymap = map('map').setView(new LatLng(51.52242, 10.2832), 7);

mymap.on({
    click: onMapClick
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

const NodeInfoControlClass = Control.extend({
    // method that we will use to update the control based on feature properties passed
    update : function(node:WppNode) {
        if(node == null){
            this._div.innerHTML = '';
            return ;
        }
        this._div.innerHTML = '<h4>'+node.label+'</h4>' +
            '<button id="addRouteButton" onclick="onAddRoute(\''+node.id+'\')">add route</button>';
    }
});
var nodeInfo = new NodeInfoControlClass();
nodeInfo.onAdd = function(map) {
    this._div = DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

nodeInfo.addTo(mymap);

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
            edge.lines.forEach(l=>l.setStyle({
                color: 'magenta'
            }));
            edge.lines.forEach(l=>l.bringToFront());
        } else {
            edge.lines.forEach(l=>l.setStyle({
                color: 'purple'
            }));
        }
    };
}

// adding to map, aka Painting
for (let node of nodes.values()) {
    initializeNodeMarker(node);
};
refreshIcons();
for (let edge of edges.values()) {
    addLinesToEdge(edge);
};

function addLinesToEdge(edge : WppEdge){
    if(edge.lines != null) {
        while(edge.lines.length>0){
            let line : Polyline = edge.lines.pop();
            line.remove();
        }
    } else {
        edge.lines = [];
    }
    let pline : LatLng[] = [];
    pline.push(edge.source.latLng);
    if (edge.additional) {
        edge.additional.forEach(function(i) {
            pline.push(i);
        });
    }
    pline.push(edge.target.latLng);
    while(pline.length>1){
        let line : Polyline = polyline(pline.slice(0, 2), {
            color: 'purple'
        }).addTo(mymap)
        .on('click', onEdgeClick);
        line.getElement().setAttribute('title', edge.id);
        edge.lines.push(line);
        pline.shift();
    }
}

function initializeNodeMarker(node: WppNode) {
    var newPopup = popup()
        .setContent(node.label);
    node.marker = marker(node.latLng, node.markerOptions).addTo(mymap)
        .bindPopup(newPopup)
        .on('click', onNodeClick);
    node.marker.getElement().setAttribute('title', node.id);
}

loadNodes();
