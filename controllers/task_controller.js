const apiResponse = require("../utils/api_responses");
const response = require("../utils/response_code");
const fs = require("fs");
const {validationResult} = require("express-validator");
const dataPath = './task_data.json' //
const paginationCount = 10


const saveData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}
const getData = () => {
    try{
        const rawData = fs.readFileSync(dataPath, 'utf8')
        return JSON.parse(rawData)
    } catch (e) {
        return null
    }
}

exports.index = (req, res) => {
    try{
        const data = getData()
        if(data==null){
            res.status(400).send(apiResponse.error(response.internalServerError, null));
        } else if(data.tasks.length===0){
            res.status(404).send(apiResponse.error(response.notFound, null));
        } else {
            data.tasks = data.tasks.reverse()
            //paginate
            var dataPaginated;
            var page = req.query['page'];

            //check if page query available
            if(typeof page==='undefined' || page==0){
                page=1;
            }


            //check if data count is more than pagination Count
            if(data.tasks.length>paginationCount){
                var indexStart = page * paginationCount - paginationCount;
                var indexLast = (page * paginationCount);
                dataPaginated = {
                    "tasks" : data.tasks.slice(indexStart===1?0:indexStart,indexLast)
                }
            } else {
                dataPaginated = data.tasks;
            }


            if(dataPaginated.tasks.length===0){
                res.status(404).send(apiResponse.error(response.notFound, null));
            } else {
                res.json(apiResponse.success(dataPaginated))
            }
        }
    } catch (e) {
        console.log(e)
        res.status(500).send(apiResponse.error(response.internalServerError, null));
    }
}

exports.create = (req, res) => {
    try{
        var errors = validationResult(req);
        // if there is error then return Error
        if (!errors.isEmpty()) {
            return res.status(400).send(
                apiResponse.error(response.invalidData,null, errors.array())
            )
        }

        var data = getData()
        var lastData = data.tasks.at(-1);
        var newId = 1;
        if(typeof lastData!=='undefined') {
            newId = lastData.id+1;
        }
        var newData = {
            id : newId,
            title : req.body.title,
            description : req.body.description
        }
        data.tasks.push(newData)
        saveData(data);
        res.json(apiResponse.createSuccess(null))
    } catch (e) {
        console.log(e)
        res.status(500).send(apiResponse.error(response.internalServerError, null));
    }
}

exports.update = (req, res) => {
    try{
        var errors = validationResult(req);
        // if there is error then return Error
        if (!errors.isEmpty()) {
            return res.status(400).send(
                apiResponse.error(response.invalidData,null, errors.array())
            )
        }

        var currentData = getData()
        var dataResult = currentData.tasks.findIndex(data=>data.id === parseInt(req.params['id']))

        if(dataResult===-1){
            res.status(404).send(apiResponse.error(response.notFound, null));
        } else {
            req.body.id = parseInt(req.params['id']);
            currentData.tasks[dataResult] = req.body;
            saveData(currentData);
            res.send(apiResponse.updateSuccess(null))
        }
    } catch (e) {
        console.log(e)
        res.status(500).send(apiResponse.error(response.internalServerError, null));
    }
}

exports.delete = (req, res) => {
    try{
        var errors = validationResult(req);
        // if there is error then return Error
        if (!errors.isEmpty()) {
            return res.status(400).send(
                apiResponse.error(response.invalidData,null, errors.array())
            )
        }
        var currentData = getData()
        var dataResult = currentData.tasks.findIndex(data=>data.id === parseInt(req.params['id']))
        console.log(dataResult)
        if(dataResult===-1){
            res.status(400).send(apiResponse.error(response.notFound, null));
        } else {
            currentData.tasks.splice(dataResult,1);
            saveData(currentData);
            res.json(apiResponse.success(null))
        }
    } catch (e) {
        console.log(e)
        res.status(500).send(apiResponse.error(response.internalServerError, null));
    }
}