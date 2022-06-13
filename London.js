require([
    "esri/config", 
    "esri/Map", 
    "esri/views/SceneView"
], function (esriConfig, Map, SceneView) {
    esriConfig.apiKey = "AAPK422ecf1d575d486ca832b6eb17fc0af0-HLWQiUZpg_um1DzPNq91Do0WplqTubnlgi6j31Lq7vpbPwH1HET5NDmw33RXv_v";

    const map = new Map({
        basemap: "arcgis-topographic",
        ground: "world-elevation"
    });

    const view = new SceneView({
        container: "viewDiv",
        map: map,
        camera: {
            position: {
                x: -0.1276,
                y: 51.5072,
                z: 2000
            }
        },
        tilt: 75
    });

});

