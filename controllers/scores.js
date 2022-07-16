const express = require("express");
const Score = require("../models/Score");
const response = require("express");

const getScore = async (req, res) => {
  const scores = await Score.find().populate("user", "name");
  res.json({
    ok: true,
    scores,
  });
};

const createScore = async (req, res) => {
  const score = new Score(req.body);
  try {
    score.user = req.uid;
    const eventSave = await score.save();
    res.json({
      ok: true,
      event: eventSave,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const updateScore = async (req, res = response) => {
  const scoreID = req.params.id;
  const uid = req.uid;
  try {
    const score = await Score.findById(scoreID);
    if (!score) {
      res.status(404).json({
        ok: false,
        msg: "There is no score with this ID",
      });
    }
    const newScore = {
      ...req.body,
      user: uid,
    };
    const updatedScore = await Score.findByIdAndUpdate(scoreID, newScore,{new:true});

    res.status(201).json({
      ok: true,
      evento: updatedScore,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};


module.exports = {
  getScore,
  createScore,
  updateScore,
};
