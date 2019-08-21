const { CouncilArea } = require('../mongoose-models/councilArea');
const express = require('express');
const router = express.Router();
const PolygonLookup = require('polygon-lookup');

router.get('/', async (req, res) => {
    const query = req.query;
    const councilAreasList = await CouncilArea.find(query);
    if (!councilAreasList) return res.status(404).send('No council areas found.');
    res.send(councilsList);
});

router.get('/:name/:latitude/:longitude', async (req, res) => {
    const currentCouncil = await CouncilArea.findOne({
        name: req.params.name
    });
    if (!currentCouncil) return res.status(404).send('No council areas found.');
    console.log(currentCouncil);
    const currentCouncilFetures = currentCouncil.toObject().features;
    //console.log(currentCouncilFetures);
    res.send(getCollectionDetails(currentCouncilFetures, req.params.latitude, req.params.longitude));
});

/**
 * Return the waste collection details that the specified coordinate belongs to.
 * @param {*} currentCouncilFetures a list of all polygons in a council.
 * @param {*} latitude a specified location's latitude.
 * @param {*} longitude a specified location's longitude.
 */
function getCollectionDetails(currentCouncilFetures, latitude, longitude) {
    var featureCollection = {
        type: 'FeatureCollection',
        features: []
    };

    currentCouncilFetures.forEach((value, index, array) => {
        featureCollection.features.push({
            type: "Feature",
            properties: currentCouncilFetures[index].properties,
            geometry: {
                type: 'MultiPolygon',
                coordinates: currentCouncilFetures[index].geometry.coordinates
            }
        });
    });

    const lookup = new PolygonLookup(featureCollection);
    try {
        const poly = lookup.search(longitude, latitude);
        return poly.properties;
    } catch (err) {
        console.error('Error: Not Found\n', err);
        return "No council area found";
    }
}

module.exports = router;