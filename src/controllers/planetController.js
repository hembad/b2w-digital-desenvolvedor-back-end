import mongoose from 'mongoose';
import { PlanetSchema } from '../models/planetModel';
var Request = require("request");

const Planet = mongoose.model('Planet', PlanetSchema);

function getPlanetByName(planetName, Planet) {
    Request({
        uri: "https://swapi.co/api/planets",
        method: "GET"
    }, function (error, response, body) {
        var objectValue = JSON.parse(body);
        for (var i = 0; i < objectValue['results'].length; i++) {
            if (objectValue['results'][i]['name'] == planetName) {
                //Alderaan
                console.log('---function getPlanetByName(planetName)---');
                console.log('-------------------------------------------');
                console.log('name = ' + objectValue['results'][i]['name']);
                console.log('climate = ' + objectValue['results'][i]['climate']);
                console.log('terrain = ' + objectValue['results'][i]['terrain']);
                console.log('Appearance in ' + objectValue['results'][i]['films'].length + ' films.');
                Planet.name = objectValue['results'][i]['name'];
                Planet.climate = objectValue['results'][i]['climate'];
                Planet.terrain = objectValue['results'][i]['terrain'];
                Planet.Film = (objectValue['results'][i]['films'].length);
                console.log('-------------------------------------------');
            }
        }
        return Planet;
    });
}

export const addNewPlanet = (req, res) => {
    let newPlanet = new Planet(req.body);

    newPlanet.save((err, planet) => {
        if (err) {
            res.send(err);
            return false;
        }
        res.json(planet);
    });
};

export const getPlanets = (req, res) => {
    Planet.find({}, (err, planet) => {
        if (err) {
            res.send(err);
            return false;
        }
        res.json(planet);
    });
};

export const getPlanetWithID = (req, res) => {
    Planet.findById(req.params.planetId, (err, planet) => {
        if (err) {
            res.send(err);
            return false;
        }
        if (planet == null) {
             res.send("No Planet to be shown!");
            return false;
        }

        Request({
            uri: "https://swapi.co/api/planets",
            method: "GET"
        }, function (error, response, body) {
            var objectValue = JSON.parse(body);
        for (var i = 0; i < objectValue['results'].length; i++) {
                if (objectValue['results'][i]['name'] == planet.Name) {
                    //Alderaan
                    console.log('---function getPlanetByName(planetName)---');
                    console.log('-------------------------------------------');
                    console.log('name = ' + objectValue['results'][i]['name']);
                    console.log('climate = ' + objectValue['results'][i]['climate']);
                    console.log('terrain = ' + objectValue['results'][i]['terrain']);
                    console.log('Appearance in ' + objectValue['results'][i]['films'].length + ' films.');
                    // planet._doc.Name = objectValue['results'][i]['name'];
                    // planet._doc.Climate = objectValue['results'][i]['climate'];
                    // planet._doc.Terrain = objectValue['results'][i]['terrain'];
                    // planet._doc.Film = (objectValue['results'][i]['films'].length);
                    console.log('-------------------------------------------');
                }
            }
        });
        res.json(planet);
    });
}

export const updatePlanet = (req, res) => {
    Planet.findOneAndUpdate({ _id: req.params.planetId }, req.body, { new: true }, (err, planet) => {
        if (err) {
            res.send(err);
            return false;
        }
        res.json({planet, message: 'Successfully updated' });
    })
}

export const deletePlanet = (req, res) => {
    Planet.remove({ _id: req.params.planetId }, (err, planet) => {
        if (err) {
            res.send(err);
            return false;
        }
        res.json({ message: 'Successfully deleted planet' });
    })
}



