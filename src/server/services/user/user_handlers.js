const create = async (req, res, next) => {
    try {
   
    } catch (error) {
      next(error)
    }
  }
  
  const userHandlers = {
    create:create,
  
  }
  
  export default userHandlers