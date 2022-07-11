require([
    "esri/Map", 
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend"
], function (Map, SceneView, FeatureLayer, Legend) {
    
    const renderer = {
        type: "simple",
        symbol: {
            type: "polygon-3d",
            symbolLayers: [{
                    type: "extrude"
            }]
        },
        visualVariables: [
            {
                type: "size",
                field: "DPOP_CY",
                stops: [
                    {
                        value: 0,
                        size: 0,
                        label: "0"
                    },
                    {
                        value: 1000,
                        size: 1000,
                        label: "1000"
                    }
                ]
            },
            {
                type: "color",
                field: "DPOP_CY",
                stops: [
                    {
                        value: 500,
                        color: '#FFFFFF',
                        label: "<500"
                    },
                    {
                        value: 1000,
                        color: '#d00000',
                        label: "500-1000"
                    },
                    {
                        value: 3000,
                        color: '#6a040f',
                        label: "1000-5000"
                    },
                    {
                        value: 5000,
                        color: "#370617",
                        label: ">5000"
                    }
                ]
            }
        ]
    };

    const povLayer = new FeatureLayer({
        //url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0",
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/EnrichedBuildings_Footprints_NewYork_subset/FeatureServer/0",
        renderer: renderer,
        title: "Daytime Population in Manhattan",
        outFields: ["*"],
        popupTemplate: {
            title: "{lsoa11nm}",
            content: "{NAME} \n Population: {DPOP_CY}",
            fieldInfos: [                
                {
                    fieldName: "DPOP_CY",
                    format: {
                        digitSeperator: true,
                        places: 0
                    }
                },
                {
                    fieldName: "DPOP_CY",
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }
                
            ]
        }
    });

    const map = new Map({
        //basemap: "arcgis-topographic",
        //ground: "world-elevation"
        basemap: "gray-vector",
        layers: [povLayer]
    });

    const view = new SceneView({
        container: "viewDiv",
        map: map,
        camera: {
            position: {
                y: 40.7128,
                x: -74.0060,
                z: 9999 
            },
            tilt: 40
        }
    });

    const legend = new Legend({
        view: view
    });

    view.ui.add(legend, "bottom-right");

});

