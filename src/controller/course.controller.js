const Coruse = require("../model/coruse.model");

const addCouser = async (req, res) => {
    try {
        console.log(req.body);

        const coruse = await Coruse.create(req.body);

        if (!coruse) {
            return res.status(400).json({ sucess: false, data: null, Message: "Couser not added" })
        }

        return res.status(200).json({ sucess: true, data: coruse, Message: "Couser data Added sucessfully." })
    } catch (error) {
        return res.status(500).json({ sucess: false, data: null, Message: "Internal Server Error :" + error })
    }

}

const getAllCouser = async (req, res) => {
    try {
        const coruse = await Coruse.find();

        if (!coruse) {
            return res.status(400).json({ sucess: false, data: [], Message: "Couser data not updated." })
        }

        return res.status(200).json({ sucess: true, data: coruse, Message: "Couser data updated." })
    } catch (error) {
        return res.status(500).json({ sucess: false, data: null, Message: "Internal Server Error :" + error })
    }


}

const getCouser = async (req, res) => {
    try {
        const coruse = await Coruse.findById(req.params.id);

        if (!coruse) {
            return res.status(400).json({ sucess: false, data: [], Message: "Couser data not fetched." })
        }

        return res.status(200).json({ sucess: true, data: coruse, Message: "Couser data fetched." })
        
    } catch (error) {
         return res.status(500).json({ sucess: false, data: null, Message: "Internal Server Error :" + error })
    }

}

const updateCouser = async (req, res) => {
    try {
        const coruse = await Coruse.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true, runValidators:true}
        )

         if (!coruse) {
            return res.status(400).json({ sucess: false, data: [], Message: "Couser data not updated." })
        }

        return res.status(200).json({ sucess: true, data: coruse, Message: "Couser data updated." })
    } catch (error) {
        return res.status(500).json({ sucess: false, data: null, Message: "Internal Server Error :" + error })
    }
}

const deletCouser = async (req, res) => {
    try {
        const coruse = await Coruse.findByIdAndDelete(req.params.id);

        if (!coruse) {
            return res.status(400).json({ sucess: false, data: [], Message: "Couser data not deleted." })
        }

        return res.status(200).json({ sucess: true, data: coruse, Message: "Couser data deleted." })
    } catch (error) {
        return res.status(500).json({ sucess: false, data: null, Message: "Internal Server Error :" + error })
    }
}

module.exports = {
    addCouser,
    getAllCouser,
    getCouser,
    updateCouser,
    deletCouser
}