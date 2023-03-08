import { Injectable } from '@angular/core';
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Search from "@arcgis/core/widgets/Search";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Point from '@arcgis/core/geometry/Point';
import Graphic from "@arcgis/core/Graphic";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import Sketch from "@arcgis/core/widgets/Sketch";
import Polyline from "@arcgis/core/geometry/Polyline";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";

@Injectable({
  providedIn: 'root'
})
export class ArcgisMapService {
  constructor() { }
   // Initializing ArcGIS Map
  initializeMap(basemap:any) {
    let map = new Map({
      basemap
    });
    return map;
  }
   // Initializing ArcGIS Map View
  initializeMapView(container:any,map:any,latitude:any,longitude:any,zoom:any){
    let mapview = new MapView({
      container: container,
      map: map,
      center: [longitude, latitude],
      zoom: zoom
    });
    return mapview;
  }
  // Initializing ArcGIS Map Search
  addSearchWidget(map:any) {
    const search = new Search({  //Add Search widget
      view: map
    });
    map.ui.add(search, "top-right");
  }
  // initializing graphic layer
  initializeGraphicLayer() {
    const graphicsLayer = new GraphicsLayer();
    return  graphicsLayer;
  }

  addInfoIcon( longitude:any ,latitude :any, iconurl:any, graphicLayer:any) {
    let symbol = {
      url: iconurl,
      width: "10px",
      height: "10px",
      xoffset: -6,
      yoffset: 8
    };
    const symbolPicture = new PictureMarkerSymbol(symbol);
    const attributes = {
      name: "Info",
      description: "Identity Node"
    };
    // Creating sample static pin on Map
    const point = new Point({ //Create a point
      longitude: longitude,
      latitude: latitude
    });

    let pointGraphic = new Graphic({
      geometry: point,
      symbol: symbolPicture,
      attributes:attributes
    });
    graphicLayer.add(pointGraphic);
    return graphicLayer;
  }

  addSearchIcon( longitude:any ,latitude :any, iconurl:any, graphicLayer:any) {
    let symbol = {
      url: iconurl,
      width: "10px",
      height: "10px",
      xoffset: 6,
      yoffset: -8
    };
    const attributes = {
      name: "search",
      description: "Identity Node"
    };
    const symbolPicture = new PictureMarkerSymbol(symbol);
    // Creating sample static pin on Map
    const point = new Point({ //Create a point
      longitude: longitude,
      latitude: latitude
    });

    let pointGraphic = new Graphic({
      geometry: point,
      symbol: symbolPicture,
      attributes:attributes
    });
    graphicLayer.add(pointGraphic);
    return graphicLayer;
  }
   // adding Static Point based on latitute and longitude
  addStaticPoint( longitude:any ,latitude :any, iconurl:any, graphicLayer:any) {
    let symbol = {
      url: iconurl,
      width: "20px",
      height: "20px",

    };
    const symbolPicture = new PictureMarkerSymbol(symbol);
    // Creating sample static pin on Map
    const point = new Point({ //Create a point
      longitude: longitude,
      latitude: latitude
    });
    
    const attributes = {
      name: "Point",
      description: "Identity Node"
    };
    let pointGraphic = new Graphic({
      geometry: point,
      symbol: symbolPicture,
      //symbol: simpleMarkerSymbol,
      attributes: attributes
    });
    graphicLayer.add(pointGraphic);
    return graphicLayer;
  }

  // adding Multiple Point based on latitute and longitude
  addStaticPointMultiple(longitude: any, latitude: any, iconurl: any, graphicLayer: any) {
    let symbol = {
      url: iconurl,
      width: "20px",
      height: "20px",
      xoffset: 4,
      yoffset: -4

    };
    const symbolPicture = new PictureMarkerSymbol(symbol);
    // Creating sample static pin on Map
    const point = new Point({ //Create a point
      longitude: longitude,
      latitude: latitude
    });
    const attributes = {
      name: "Point",
      description: "Identity Multiple Node"
    }
    let pointGraphic = new Graphic({
      geometry: point,
      symbol: symbolPicture,
      attributes: attributes
    });
    graphicLayer.add(pointGraphic);
    return graphicLayer;
  }
   // adding Multiple Point based on latitute and longitude
   addStaticMultipleInfo(longitude: any, latitude: any, iconurl: any, graphicLayer: any) {
    let symbol = {
      url: iconurl,
      width: "25px",
      height: "28px",

    };
    const symbolPicture = new PictureMarkerSymbol(symbol);
    // Creating sample static pin on Map
    const point = new Point({ //Create a point
      longitude: longitude,
      latitude: latitude
    });
    const attributes = {
      name: "multipleInfo",
      description: "Identity Multiple Node"
    };
    let pointGraphic = new Graphic({
      geometry: point,
      symbol: symbolPicture,
      attributes: attributes
    });
    graphicLayer.add(pointGraphic);
    return graphicLayer;
  }
   // adding Multiple Point based on latitute and longitude
   addStaticMultipleLabel(longitude: any, latitude: any, iconurl: any, graphicLayer: any, nodeLabel:any, nodeWidth?:any) {
    let nodeLabelList = nodeLabel?.split('\n');
    let nodelabeldisplay ='';
    let nodeLength = 0;
    if(nodeLabelList.length>1) {
      nodelabeldisplay = nodeLabelList[0];
    } else {
      nodelabeldisplay = nodeLabel;
    }
    nodeLength = nodelabeldisplay.length;
    let xoffsetValue = nodeLength*2.8+"px"
    let symbol = {
      url: iconurl,
      width: "10px",
      height: "10px",
      xoffset: xoffsetValue,
      yoffset: -16,

    };
    const symbolPicture = new PictureMarkerSymbol(symbol);
    // Creating sample static pin on Map
    const point = new Point({ //Create a point
      longitude: longitude,
      latitude: latitude
    });
    const attributes = {
      name: "multiplelabel",
      description: "Identity Multiple Node Label"
    };
    let pointGraphic = new Graphic({
      geometry: point,
      symbol: symbolPicture,
      attributes: attributes
    });
    graphicLayer.add(pointGraphic);
    return graphicLayer;
  }
    // adding Static Label based on latitute and longitude
  addStaticLabel( longitude:any ,latitude :any, graphicLayer:any, nodeLabel?:any, flag?: boolean) {
     let nodeLabelList = nodeLabel?.split('\n');
     let nodelabeldisplay ='';
     if(nodeLabelList?.length>1 && !flag) {
        nodelabeldisplay = nodeLabelList[0]+"...";
     } else {
      nodelabeldisplay = nodeLabel;
     }
      const point = new Point({ //Create a point
        longitude: longitude,
        latitude: latitude
      });
      const textSymbol = new TextSymbol({
        color: "blue",
        text: nodelabeldisplay,
        haloColor: "white",
        haloSize: 1,
        xoffset: 0,
        yoffset: -18,
        horizontalAlignment: "center",
        font: {  // autocasts as new Font()
          size: 6,
          weight: "bold"
        }
      });
      const attributes = {
        name: "Label",
        description: "Identity Node Label",
        data:nodeLabel,
      }
      let pointGraphic = new Graphic({
        geometry: point,
        symbol: textSymbol,
        attributes: attributes
      });
      graphicLayer.add(pointGraphic);
      return graphicLayer;
  }
  addMultipleLabel( longitude:any ,latitude :any, graphicLayer:any, nodeLabel?:any) {  
     const point = new Point({ //Create a point
       longitude: longitude,
       latitude: latitude
     });
     const textSymbol = new TextSymbol({
       color: "blue",
       text: nodeLabel,
       haloSize: 2,
       xoffset: 0,
       yoffset: 0,
       horizontalAlignment: "center",
       font: {  // autocasts as new Font()
         size: 8,
         weight: "bold"
       }
     });
     const attributes = {
       name: "multiCount",
       description: "Identity Node Label",
       data:nodeLabel,
     }
     let pointGraphic = new Graphic({
       geometry: point,
       symbol: textSymbol,
       attributes: attributes
     });
     graphicLayer.add(pointGraphic);
     return graphicLayer;
 }
  // Creating basemapToggle  on Map
  createBasemapToggle(arggisview:any,nextbasemap:any, placement:any ){
    const basemapToggle = new BasemapToggle({
      view: arggisview,
      nextBasemap: nextbasemap
    });
    arggisview.ui.add(basemapToggle, placement);
  }
  creatingpolylineGraphic(sourceLatLong:any,destinationLatLong:any) {
      // Create a line geometry
      // 2D polyline with to paths with m-values (note that the 2nd path does not have m-values defined)
      let paths = [
        [  // first path
        [sourceLatLong.lng,sourceLatLong.lat],
        [destinationLatLong.lng,destinationLatLong.lat]
        ], [ 
        ]
       ];
      let polyline = new Polyline({
         paths: paths,
         spatialReference: { wkid: 4326 }
      });
      let simpleLineSymbol ={
        type: "simple-line",  // autocasts as new SimpleLineSymbol()
        color: "lightgreen",
        width: "2px",
        style: "solid"
      }
      const polylineGraphic = new Graphic({
          geometry: polyline,
          symbol: simpleLineSymbol
       });
       return polylineGraphic;
  }
  creatingSketchPin(arcgisView:any, graphicsLayer:any, placement :any) {
    const sketch = new Sketch({
      view: arcgisView,
      layer: graphicsLayer,
      snappingOptions: {
        enabled: true,
        featureSources: [{
          layer: graphicsLayer
        }]
      },
      visibleElements: {
        createTools: {
          point: false
        },
        selectionTools: {
          "lasso-selection": false,
          "rectangle-selection": false,
        },
        settingsMenu: false,
        undoRedoMenu: false
      }
    });

    arcgisView.ui.add(sketch, placement);
    return sketch
  }
}