const tasksModel = require("../models/tasksModel");

module.exports = {
  create: async function (req, res, next) {
    try {
      console.log("POST BODY:", req.body);
      const newTask = new tasksModel(req.body);

      const savedTask = await newTask.save();

      res.status(201).json(savedTask);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  },
  getAll: async function (req, res, next) {
    try {
      const tasks = await tasksModel.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getById: async function (req, res, next) {
    try {
      const task = await tasksModel.find({ _id: req.params.id });
      res.status(200).json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  delete: async function (req, res, next) {
    try {
      const deleted = await tasksModel.deleteOne({ _id: req.params.id });
      res.status(200).json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  update: async function (req, res, next) {
    try {
      const doc = await tasksModel.findOne({ _id: req.params.id });
      const update = { [req.body[0].searchField]: req.body[0].update };
      await doc.updateOne(update);
      res.status(200).json(doc);
    } catch (e) {
      console.log(e);
    }
  },
};
