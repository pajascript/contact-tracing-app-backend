const express = require('express');
const visitsModel = require('../models/VisitsModel');

const viewVisits = async (req, res) => {
    try {

        await visitsModel.find()
                .then(visit => res.json(visit))
                .catch(err => res.status(400).json("Error: " + err))

    } catch (err) {
        res.status(500).json({message: "Internal Server Error!"})
    }
};

const logVisit = async (req, res) => {
    try {

        const { fullname, address, phonenumber, email, age, gender, temperature, dateOfVisit, timeOfVisit } = req.body;

        const visit = new visitsModel({
            fullname, address, phonenumber, email, age, gender, temperature, dateOfVisit, timeOfVisit
        });

        const newVisit = await visit.save();

        if (!newVisit) res.status(400).json({ message: "Unexpected Error!" });
        
        res.status(200).json({ result: newVisit });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error!" })
    }
}

module.exports = { viewVisits, logVisit };