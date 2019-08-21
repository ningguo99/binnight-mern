const { Council } = require('../mongoose-models/council');
const express = require('express');
const router = express.Router();
const PolygonLookup = require('polygon-lookup');

router.get('/', async (req, res) => {
  const query = req.query;
  const councilsList = await Council.find(query);
  if (!councilsList) return res.status(404).send('No councils found.');
  res.send(councilsList);
});

router.get('/in-which-council/:latitude/:longitude', async (req, res) => {
  const councilsList = await Council.find();
  res.send(inWhichCouncil(councilsList, req.params.latitude, req.params.longitude));
});

/**
 * Return the council name that the specified coordinate belongs to.
 * @param {*} councilsList a list of councils in GeoJson format.
 * @param {*} latitude a specified location's latitude.
 * @param {*} longitude a specified location's longitude.
 */
function inWhichCouncil(councilsList, latitude, longitude) {
  var featureCollection = {
    type: 'FeatureCollection',
    features: []
  };

  councilsList.forEach((value, index, array) => {
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
    return poly.properties.councilName;
  } catch (err) {
    console.error('Error: Not Found\n', err);
    return "No council found";
  }
}

module.exports = router;

