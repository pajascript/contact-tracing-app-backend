const express = require('express');
const Customer = require('../models/CustomerModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const saveCustomer = async (req, res) => {

    try {
        //From input fields
        let {fullname, address, phonenumber, email, age, gender, password, confirmPassword} = req.body;

        if (password !== confirmPassword) return res.status(400).json({message: "Passwords did not match."})

        //Check if email exist
        const existingCustomer = await Customer.findOne({email});
        if (existingCustomer) return res.status(400).json({message: "Email is already in use"})

        //hash password then save user info
        bcrypt.hash(password, 10)
            .then(async (hashedPassword) => {
    
                const customer = new Customer({
                    fullname, address, phonenumber, email, age, gender, password: hashedPassword
                });
                        
                const NewCustomer = await customer.save();

                const token = jwt.sign({email: NewCustomer.email, id: NewCustomer._id}, process.env.TOKEN_SECRET, {expiresIn: "1h"});
    
                res.status(200).json({result: NewCustomer, token});

            })
            .catch(err => {
                res.status(500).json({message: err});
            });

    } catch(err) {
        res.status(500).json({message: err});
    }
}



const loginCustomer = async (req, res) => {

    //Look for user with the email
    const user = await Customer.findOne({email: req.body.email});
    if (!user) return res.status(400).json({message: "User with this email is not found"})


    try {

        const passwordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCorrect) return res.status(400).json({message: "Incorrect Password"});

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.TOKEN_SECRET, {expiresIn: "1h"});

        res.status(200).json({ result: user, token });

    } catch (err) {
        res.status(500).json({ message: "Something went wrong." })
    }

}


module.exports = {saveCustomer, loginCustomer};