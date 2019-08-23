const { Council } = require('../mongoose-models/council');
const { CouncilArea } = require('../mongoose-models/councilArea');
const express = require('express');
const router = express.Router();
const PolygonLookup = require('polygon-lookup');
const moment = require('moment');

router.get('/:latitude/:longitude/:userTime', async (req, res) => {
    const councilsList = await Council.find();
    const councilName = inWhichCouncil(councilsList, req.params.latitude, req.params.longitude);

    const currentCouncil = await CouncilArea.findOne({
        name: councilName
    });
    if (!currentCouncil) return res.status(404).send("Sorry, we don't have any data for your location. ");
    

    res.send(getCollectionDetails(currentCouncil.toObject(), req.params.latitude, req.params.longitude, req.params.userTime));
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
        return "Not Found";
    }
}

/**
 * Return the waste collection details that the specified coordinate belongs to.
 * @param {*} currentCouncil a list of all polygons in a council.
 * @param {*} latitude a specified location's latitude.
 * @param {*} longitude a specified location's longitude.
 * @param {*} userTime the user's current local time.
 */
function getCollectionDetails(currentCouncil, latitude, longitude, userTime) {
    const currentCouncilFeatures = currentCouncil.features;

    var featureCollection = {
        type: 'FeatureCollection',
        features: []
    };

    currentCouncilFeatures.forEach((value, index, array) => {
        featureCollection.features.push({
            type: "Feature",
            properties: currentCouncilFeatures[index].properties,
            geometry: {
                type: 'MultiPolygon',
                coordinates: currentCouncilFeatures[index].geometry.coordinates
            }
        });
    });

    const lookup = new PolygonLookup(featureCollection);
    try {
        const poly = lookup.search(longitude, latitude);
        const details = poly.properties;
        const info = {
            council: currentCouncil.name,
            rubNext: '',
            recNext: '',
            grnNext: '',
            details: details
        }

        const userMoment = moment(new Date(userTime));
        const rubPeriod = 7 * parseInt(details.rub_weeks.trim());
        if (rubPeriod !== 0) {
            const rubMoment = moment(new Date(details.rub_start));
            const rubDaysDiff = userMoment.diff(rubMoment, 'days');
            const rubRemainder = rubDaysDiff % rubPeriod;
            info.rubNext = rubRemainder
                === 0 ? userTime : userMoment.clone().add(rubPeriod - rubRemainder, 'd').toISOString().substring(0, 10);
        }
        const recPeriod = 7 * parseInt(details.rec_weeks.trim());
        if (recPeriod !== 0) {
            const recMoment = moment(new Date(details.rec_start));
            const recDaysDiff = userMoment.diff(recMoment, 'days');
            const recRemainder = recDaysDiff % recPeriod;
            info.recNext = recRemainder
                === 0 ? userTime : userMoment.clone().add(recPeriod - recRemainder, 'd').toISOString().substring(0, 10);
        }
        const grnPeriod = 7 * parseInt(details.grn_weeks.trim());
        if (grnPeriod !== 0) {
            const grnMoment = moment(new Date(details.grn_start));
            const grnDaysDiff = userMoment.diff(grnMoment, 'days');
            const grnRemainder = grnDaysDiff % grnPeriod;
            info.grnNext = grnRemainder
                === 0 ? userTime : userMoment.clone().add(grnPeriod - grnRemainder, 'd').toISOString().substring(0, 10);
        }
        return info;

    } catch (err) {
        console.error('Error: Not Found\n', err);
        return "No council area found.";
    }
}

module.exports = router;
