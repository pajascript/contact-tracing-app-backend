const express = require("express");
const Customer = require("../models/CustomerModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


const saveAdmin = async (req, res) => {
    try {
        //From input fields
        let {fullname, address, phonenumber, email, age, gender, password, confirmPassword, role} = req.body;

        if (password !== confirmPassword) return res.status(400).json({message: "Passwords did not match."})

        //Check if email exist
        const existingAdmin = await Customer.findOne({email});
        if (existingAdmin) return res.status(400).json({message: "Email is already in use"})

        //hash password then save user info
        bcrypt.hash(password, 10)
            .then(async (hashedPassword) => {
    
                const admin = new Customer({
                    fullname, address, phonenumber, email, age, gender, password: hashedPassword, role
                });
                        
                const NewAdmin = await admin.save();

                const token = jwt.sign({email: NewAdmin.email, id: NewAdmin._id}, process.env.TOKEN_SECRET, {expiresIn: "1h"});
    
                res.status(200).json({result: NewAdmin, token});

            })
            .catch(err => {
                res.status(500).json({message: err});
                console.log(err)
            });

    } catch(err) {
        res.status(500).json({message: err});
        console.log(err)
    }
}

module.exports = { saveAdmin };