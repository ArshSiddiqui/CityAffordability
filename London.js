require([
    "esri/Map", 
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend"
], function (Map, SceneView, FeatureLayer, Legend) {
    
    const defExp = [
        "LADnm = 'City of London'",
        "LADnm = 'Westminster'",
        "LADnm = 'Kensington and Chelsea'",
        "LADnm = 'Hammersmith and Fulham'",
        "LADnm = 'Wandsworth'",
        "LADnm = 'Lambeth'",
        "LADnm = 'Southwark'",
        "LADnm = 'Tower Hamlets'", 
        "LADnm = 'Hackney '",
        "LADnm = 'Islington '",
        "LADnm = 'Camden'",
        "LADnm = 'Brent'",
        "LADnm = 'Ealing'",
        "LADnm = 'Hounslow'",
        "LADnm = 'Richmond upon Thames'",
        "LADnm = 'Kingston upon Thames'",
        "LADnm = 'Merton'",
        "LADnm = 'Sutton'",
        "LADnm = 'Croydon'",
        "LADnm = 'Bromley'",
        "LADnm = 'Lewisham'",
        "LADnm = 'Greenwich'",
        "LADnm = 'Bexley'",
        "LADnm = 'Havering'",
        "LADnm = 'Barking and Dagenham'",
        "LADnm = 'Redbridge'",
        "LADnm = 'Newham'",
        "LADnm = 'Waltham Forest'",
        "LADnm = 'Haringey '",
        "LADnm = 'Barnet'",
        "LADnm = 'Hillingdon'",
        "LADnm = 'Harrow'",
        "LADnm = 'Enfield'"
    ];

    console.log(defExp);

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
                field: "IMDScore",
                stops: [
                    {
                        value: 20,
                        size: 200,
                        label: "20"
                    },
                    {
                        value: 35,
                        size: 5000,
                        label: "35"
                    }
                ]
            },
            {
                type: "color",
                field: "TotPop",
                legendOptions: {
                    title: "Estimated Total Population"
                },
                stops: [
                    {
                        value: 1000,
                        color: '#DAF7A6',
                        label: "<1000"
                    },
                    {
                        value: 1500,
                        color: '#FF5733',
                        label: "1000-1500"
                    },
                    {
                        value: 2000,
                        color: '#900C3F',
                        label: "1500-2000"
                    },
                    {
                        value: 2500,
                        color: "#581845",
                        label: ">2000"
                    }
                ]
            }
        ]
    };

    const povLayer = new FeatureLayer({
        //url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0",
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Indices_of_Multiple_Deprivation_(IMD)_2019_UK/FeatureServer/0",
        renderer: renderer,
        title: "Multiple Deprivation in London",
        outFields: ["*"],
        popupTemplate: {
            title: "{lsoa11nm}",
            content: "IMD Score: {IMDScore}.\n Population: {TotPop}",
            fieldInfos: [
                {
                    fieldName: "IMDScore",
                    format: {
                        digitSeperator: true,
                        places: 0
                    }
                },
                {
                    fieldName: "TotPop",
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }
            ]
        },
        definitionExpression: defExp.join(" OR ") 
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
                x: -0.1276,
                y: 50.8,
                z: 90000
            },
            tilt: 40
        }
    });

    const legend = new Legend({
        view: view
    });

    view.ui.add(legend, "bottom-right");

});

