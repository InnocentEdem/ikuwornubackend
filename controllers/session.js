const express = require('express');
const app = express();
const { QuizSession } = require('../models');

app.use(express.json());

exports.createSession = async (req, res) => {
    try {
        const  { sessionId, quizmasterId } = req.body;
        await QuizSession.create({
            sessionId,
            quizmasterId
        });
        res.status(200).json({ success: true, message: "Quiz Session created successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success:false, message: error });
    }
}

exports.getAllSession = async (req, res) => {
    try {
        const allSessions = await QuizSession.findAll();
        res.status(200).json({ success: true, message: allSessions });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success:false, message: error });
    }
}

exports.editSession =  async(req, res) => {
    try {
        const { id } = req.params;
        const { sessionId, quizmasterId } = req.body;

        const quizsession = await QuizSession.findOne({ where: { id } });

        quizsession.sessionId = sessionId;
        quizsession.quizmasterId = quizmasterId;
        await quizsession.save();

        res.status(200).json({ success:true, message: 'Session edited successfully'});
    } catch (error) {
        return res.status(404).json({ success: false, message: error});
    }
};


exports.deleteSession = async (req, res) => {
    try {
        const { id } = req.params;
        const quizsession = await QuizSession.findOne({ where: { id } });
        await quizsession.destroy();
        res.status(204).json({ success:true, message: 'Question deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success:false, message: error });
    }
}

