const express = require('express');
const app = express();

app.use(express.json());

exports.index = async (req, res) => {
    try {
        res.status(200).json({ success: true, message: "You have been authenticated successfully" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ success:false, message: error });
    }
}

