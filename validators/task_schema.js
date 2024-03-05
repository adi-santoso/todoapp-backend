const taskValidate = {
    title:{
        notEmpty: true,
        errorMessage: "Task title cannot be empty"
    }
}

const taskIdValidate = {
    id:{
        isNumeric: true,
        errorMessage: "Id must be integer"
    }
}

module.exports = { taskValidate, taskIdValidate};