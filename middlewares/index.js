import { ObjectId } from "mongodb";

const validateDbId = (req, res, next) => {
    if(!ObjectId.isValid(req.params.id))
        res.status(400).json({error: 'given id is not valid'});
    else
        next();
}

const returnNotFound = (req, res) => {
    res.status(404).json({error: `no record with given _id:${req.params.id}`})
}

const returnInvalid = (req, res) => {
    res.status(404).json({error: `Invalid id or password`})
}

const errorHandler = (error, req, res, next) => {
    if(error.message === "البريد الالكتروني أو كلمة المرور خاطئة")
        res.status(204).json({error: error.message})
    else
        res.status(500).json({error:error.message});
}

export {validateDbId, returnNotFound, returnInvalid, errorHandler};