class ResponseCode{
    static successfully = {'rc' : '0200', 'message' : 'Successfully', 'data' : null}
    static createdData = {'rc' : '0201', 'message' : 'Created successfully', 'data' : null}
    static updatedData = {'rc' : '0200', 'message' : 'Update successfully', 'data' : null}
    static deletedData = {'rc' : '0201', 'message' : 'Deleted successfully', 'data' : null}
    static invalidData = {'rc' : '0400', 'message' : 'The given data was invalid', 'data' : null}
    static notFound = {'rc' : '0404', 'message' : 'Record not found', 'data' : null}
    static internalServerError = {'rc' : '0500', 'message' : 'Internal Server Error', 'data' : null}
}

module.exports = ResponseCode;