const express = require('express');
const app = express();
const { Contestant } = require('../models');

app.use(express.json());

exports.createContestant = async (req, res) => {
    try {
        const  { fname, lname, sessionId } = req.body;

        Contestant.create({
            fname,
            lname,
            sessionId
        });
        res.status(200).json({ success: true, message: "Contestant created successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success:false, message: error });
    }
}

exports.getAllContestant = async (req, res) => {
    try {
        const allContestants = await Contestant.findAll();
        res.status(200).json({ success: true, message: allContestants });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success:false, message: error });
    }
}

exports.editContestant =  async(req, res) => {
    try {
        const { id } = req.params;
        const { fname, lname } = req.body;

        const contestant = await Contestant.findOne({ where: { id } });

        contestant.fname = fname;
        contestant.lname = lname;
        contestant.sessionId = id;
        await contestant.save();

        res.status(200).json({ success:true, message: `Contestant with id: ${id} as been edited successfully`});
    } catch (error) {
        return res.status(404).json({ success: false, message: error});
    }
};


exports.deleteContestant = async (req, res) => {
    try {
        const { id } = req.params;
        const contestant = await Contestant.findOne({ where: { id } });
        await contestant.destroy();
        res.status(204).json({ success:true, message: 'Contestant deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success:false, message: error });
    }
}

