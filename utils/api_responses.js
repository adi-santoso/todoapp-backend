const response = require('./response_code')
class ApiResponses{
    success(data){
        var finalResponse = response.successfully
        finalResponse.data = data
        return finalResponse
    }

    createSuccess(data){
        var finalResponse = response.createdData
        finalResponse.data = data
        return finalResponse
    }

    updateSuccess(data){
        var finalResponse = response.updatedData
        finalResponse.data = data
        return finalResponse
    }

    error(rc, data, error){
        var finalResponse = rc
        finalResponse.data = data
        if(error!=null){
            finalResponse.errors = error
        }
        return finalResponse
    }
}

module.exports = new ApiResponses()