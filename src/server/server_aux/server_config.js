const trustOrigins = [
    process.env.FE_DEV_TRUST_URL,
    process.env.FE_PROD_TRUST_URL,
    process.env.FE_PROD_TRUST_URL_2,
  ];
  
const corsConfig = {
    origin: function (origin, callback) {
      if (!origin || trustOrigins.includes(origin)) {
        callback(null, true);
        
      } else {
        callback(new Error("Origin not allowed"));
      }
    }
  };


export default corsConfig