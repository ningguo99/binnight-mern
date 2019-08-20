const mongoose = require('mongoose');
const GeoJSON = require('mongoose-geojson-schema');
const PolygonLookup = require('polygon-lookup');

mongoose.connect('mongodb://localhost/geodata', { useNewUrlParser: true })
    .then(async () => {
        console.log('Connected to MongoDB...');
        const councilsList = await getCouncils();

 
        inWhichCouncil(councilsList, -37.710356, 145.267766);
    })
    .catch(err => console.error('Fail to connect to MongoDB...', err));

const councilSchema = new mongoose.Schema({
    anyany: mongoose.Schema.Types.GeoJSON,
    point: mongoose.Schema.Types.Point,
    multipoint: mongoose.Schema.Types.MultiPoint,
    linestring: mongoose.Schema.Types.LineString,
    multilinestring: mongoose.Schema.Types.MultiLineString,
    polygon: mongoose.Schema.Types.Polygon,
    multipolygon: mongoose.Schema.Types.MultiPolygon,
    geometry: mongoose.Schema.Types.Geometry,
    geometrycollection: mongoose.Schema.Types.GeometryCollection,
    feature: mongoose.Schema.Types.Feature,
    featurecollection: mongoose.Schema.Types.FeatureCollection
});

const Council = mongoose.model('Council', councilSchema);

async function getCouncils() {
    const councils = await Council.find();
    return councils;
}

/**
 * Return the council name that the specified coordinate belongs to.
 * @param {*} councilsList a list of councils in GeoJson format.
 * @param {*} longitude a specified location's longitude.
 * @param {*} latitude a specified location's latitude.
 */
function inWhichCouncil(councilsList, latitude, longitude) {
    var featureCollection = {
        type: 'FeatureCollection',
        features: []
    };

    councilsList.forEach((value, index, array)=>{
        featureCollection.features.push({
            type: "Feature",
            properties: {
                councilName: councilsList[index].toObject().properties.lga_short1
            },
            geometry: {
                type: 'MultiPolygon',
                coordinates: councilsList[index].geometry.coordinates
            }
        });
    });

    const lookup = new PolygonLookup(featureCollection);
    try {
        const poly = lookup.search(longitude, latitude);
        console.log(poly.properties.councilName);
    } catch (err) {
        console.error('Error: Not Found\n', err);
    }
}


// (async () => {
//     const ee = await getCouncils();

//     // console.log(inside([145.175069,-37.774156], rnm));
//     inWhichCouncil(ee, -37.710356, 145.267766);
//     //=> {foo: true}
// })();

