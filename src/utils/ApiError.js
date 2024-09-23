class ApiError extends Error {
    constructor(
       
        statusCode = 400,
        message="Something went wrong ",
        errors=[],
        stack=""
    ){
        super(Messaage)
        this.statusCode =statusCode
        this.data=  null
        this.Messaage=message
        this.success=false;
        this.errors=errors


if(stack){
    this.stack=stack
}else{
    Error.captureStackTrace(this,this.constructor)
}
    }
}

export {ApiError}