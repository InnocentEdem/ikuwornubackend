const express = require('express');
const app = express();
const { Question } = require('../models');

app.use(express.json());

exports.createQuestion = async (req, res) => {
    try {
        const  { question, answer, quizmasterId } = req.body;

        Question.create({
            question,
            answer,
            quizmasterId
        });
        res.status(200).json({ success: true, message: "Question created successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success:false, message: error });
    }
}

exports.getAllQuestion = async (req, res) => {
    try {
        const allQuestions = await Question.findAll();
        res.status(200).json({ success: true, message: allQuestions });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success:false, message: error });
    }
}

exports.editQuestion =  async(req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;

        const quizmaster = await Question.findOne({ where: { id } });

        quizmaster.question = question;
        quizmaster.answer = answer;
        quizmaster.quizmasterId = id;
        await quizmaster.save();

        res.status(200).json({ success:true, message: 'Question edited successfully'});
    } catch (error) {
        return res.status(404).json({ success: false, message: error});
    }
};


exports.deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findOne({ where: { id } });
        await question.destroy();
        res.status(204).json({ success:true, message: 'Question deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success:false, message: error });
    }
}

