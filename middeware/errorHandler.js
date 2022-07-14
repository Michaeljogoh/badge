const  errorHandler = (e)=>{
    return async (req, res, next) =>{
        try {
     await e (req, res , next);
        } catch (error) {
            next(error)
    };

    };
 
    };

module.exports = errorHandler;