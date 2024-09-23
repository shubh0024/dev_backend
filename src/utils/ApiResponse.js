// import { response } from "express";

class ApiResponse {
    constructor(statusCode,data,message= "Succcessfully"){
        this.statusCode = statusCode;
                this.data = data;
                this.message = message;
                this.sucess=statusCode< 400;
    }
}

export default ApiResponse;


// server statusCode

// informatiional response(100-199)
// Successful responses(200-299)
// Redirectional responses(300-399)
// client error response(400-499)
// Server erro response(500-599)