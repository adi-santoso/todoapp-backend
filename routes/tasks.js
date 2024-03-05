
const express = require("express")
const {body, checkSchema, validationResult, check} = require('express-validator');
const tasksRouter = express.Router();
const {taskValidate, taskIdValidate} = require('../validators/task_schema')
const taskController = require("../controllers/task_controller");


tasksRouter.get('/tasks', taskController.index)

tasksRouter.post('/tasks/add', checkSchema(taskValidate), taskController.create)

tasksRouter.put('/tasks/:id', checkSchema(taskIdValidate),taskController.update)

tasksRouter.delete('/tasks/:id', checkSchema(taskIdValidate),taskController.delete)

module.exports = tasksRouter
