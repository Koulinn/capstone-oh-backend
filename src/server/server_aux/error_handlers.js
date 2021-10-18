const notFoundErrorHandler = (err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send({
            success: false,
            msg: err.message
        })
    } else {
        next(err)
    }
}

const badRequestErrorHandler = (err, req, res, next) => {
    if (err.status === 400) {
        res.status(400).send({
            success: false,
            msg: err, 
        })
    } else {
        next(err)
    }
}

 const unauthorizedHandler = (err, req, res, next) => {
    if (err.status === 401) {
        console.log(err)
      res.status(401).send({ status: "error", message: err.message || "You are not logged in!" })
    } else {
      next(err)
    }
  }

 const forbiddenRequest = (err, req, res, next) => {
    if (err.status === 403) {
        res.status(400).send({
            success: false,
            msg: err, 
        })
    } else {
        next(err)
    }
}

const serverErrorHandler = (err, req, res, next) => {
    console.log(err)
   
    res.status(500).send("Server 500 error")
}

const errorHandlers = {
    notFound: notFoundErrorHandler,
    badRequest: badRequestErrorHandler,
    forbidden: forbiddenRequest,
    server: serverErrorHandler,
    unauthorizedHandler: unauthorizedHandler
}

export default errorHandlers