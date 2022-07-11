require([
    "esri/Map", 
    "esri/views/SceneView",
    "esri/layers/SceneLayer",
    "esri/smartMapping/renderers/color",
    "esri/widgets/smartMapping/ColorSlider",
], function (Map, SceneView, SceneLayer, colorRendererCreator, ColorSlider) {
    
    const map = new Map({
        basemap: "gray-vector",
        ground: "world-elevation"
    });

    const view = new SceneView({
        container: "viewDiv",
        map: map,
        camera: {
            heading: 24,
            tilt: 77,
            position: {
                latitude: 40.7128,
                longitude: -74.0060,
                z: 960
            }
        }
    });

    const layer = new SceneLayer({
        portalItem: {
            id: "4ac2a674fdb54bb79471abe8368fd7d4"
        },
        visible: false,
        popupTemplate: {
            title: "{NAME}",
            content: [{
                type: "fields",
                fieldInfos: [
                    {
                        fieldName: "CNSTRCT_YR",
                        label: "Construction year"
                    },
                    {
                        fieldName: "HEIGHTROOF",
                        label: "Height (ft)"
                    },
                    {
                        fieldName: "NUM_FLOORS",
                        label: "Floors"
                    }
                ]
            }],
            fieldInfos: [
                {
                    fieldName: "HEIGHTROOF",
                    format: {
                        digitSeperator: true,
                        places: 2
                    }
                },
                {
                    fieldName: "NUM_FLOORS",
                    format: {
                        digitSeperator: true,
                        places: 0
                    }
                }
            ]
        }
    });
    map.add(layer);

    const colorParams = {
        layer: layer,
        view: view,
        field: "HEIGHTROOF",
        minValue: 100,
        maxView: 700,
        edgesType: "solid"  
    };

    colorRendererCreator.createContinuousRenderer(colorParams).then((response) => {
            layer.renderer = response.renderer;
            if(!layer.visible) {
                layer.visible = true;
            }
    
        const colorSlider = new ColorSlider({
            primaryHandleEnabled: true,
            container: "slider",
            min: response.statistics.min,
            max: response.statistics.max,
            stops: response.visualVariable.stops,
            labelFormatFunction: (value) => {
                return value.toFixed(0);
            }
        });

        colorSlider.viewModel.precision = 0;
        view.ui.add("containerDiv", "bottom-left");

        function changeEventHandler(){
            const renderer = layer.renderer.clone();
            const colorVariable = renderer.visualVariables[0].clone();
            colorVariable.stops = colorSlider.stops;
            renderer.visualVariables = [colorVariable];
            layer.renderer = renderer;
        }

        colorSlider.on(["thumb-change", "thumb-drag", "min-change", "max-change"], changeEventHandler);
    }).catch(console.error);

});

