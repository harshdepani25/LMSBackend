const { default: mongoose } = require("mongoose");

const MongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
            .then(() => console.log("Mongodb connected sugsecfully"))
            .catch(() => console.log("Error to connect : " + error))    
        } catch (error) {
            console.log(error);
            
    }
}

module.exports= MongoDB;