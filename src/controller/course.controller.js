const fs = require('fs');
const Coruse = require("../model/coruse.model");
const { uploadcloudinary, deletecloudinary } = require('../servicer/cloudinary');

const addCouser = async (req, res) => {
    // #swagger.tags = ['course']
    try {
        console.log(req.body);

        const cloudinaryObj = await uploadcloudinary(req.file.path, 'Course')

        const coruse = await Coruse.create({ ...req.body, course_img: { public_id: cloudinaryObj.public_id, url: cloudinaryObj.url } });

        if (!coruse) {
            return res.status(400).json({ sucess: false, data: null, Message: "Couser not added" })
        }

        return res.status(200).json({ sucess: true, data: coruse, Message: "Couser data Added sucessfully." })
    } catch (error) {
        return res.status(500).json({ sucess: false, data: null, Message: "Internal Server Error :" + error })
    }

}

const getAllCouser = async (req, res) => {
    // #swagger.tags = ['course']
    try {
        const coruse = await Coruse.find();

        if (!coruse) {
            return res.status(400).json({ sucess: false, data: [], Message: "Couser data not feached." })
        }

        return res.status(200).json({ sucess: true, data: coruse, Message: "Couser data feached." })
    } catch (error) {
        return res.status(500).json({ sucess: false, data: null, Message: "Internal Server Error :" + error })
    }


}

const getCouser = async (req, res) => {
    // #swagger.tags = ['course']
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
    // #swagger.tags = ['course']
    try {
        const courseData = await Coruse.findById(req.params.id);

        console.log("All course", courseData);
        
        let uData = { ...req.body, course_img: { public_id: courseData.course_img.public_id, url: courseData.course_img.url } }

        if (req.file) {
            // fs.unlink(courseData.course_img, (error) => {
            //     console.log(error);
            // })

            // uData.course_img = req.file.path

            await deletecloudinary(courseData?.course_img?.public_id);

            const cloudinaryObj = await uploadcloudinary(req.file.path, 'Course')

            uData.course_img = { public_id: cloudinaryObj.public_id, url: cloudinaryObj.url }
        }

        console.log("uData", uData);

        const coruse = await Coruse.findByIdAndUpdate(
            req.params.id,
            uData,
            { new: true, runValidators: true }
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
    // #swagger.tags = ['course']
    try {
        const coruse = await Coruse.findByIdAndDelete(req.params.id);

        // fs.unlink(coruse.course_img, (error) => {
        //     console.log(error);

        // })

        await deletecloudinary(coruse?.course_img?.public_id);

        if (!coruse) {
            return res.status(400).json({ sucess: false, data: [], Message: "Couser data not deleted." })
        }

        return res.status(200).json({ sucess: true, data: coruse, Message: "Couser data deleted." })
    } catch (error) {
        return res.status(500).json({ sucess: false, data: null, Message: "Internal Server Error :" + error })
    }
}

const updateCouserStauts = async (req, res) => {
    // #swagger.tags = ['course']
    try {

        let uData = { ...req.body }

        const courseData = await Coruse.findById(req.params.id);

        console.log(uData);

        const coruse = await Coruse.findByIdAndUpdate(
            req.params.id,
            uData,
            { new: true, runValidators: true }
        )


        if (!coruse) {
            return res.status(400).json({ sucess: false, data: [], Message: "Couser stauts not updated." })
        }

        return res.status(200).json({ sucess: true, data: coruse, Message: "Couser stauts updated." })
    } catch (error) {
        return res.status(500).json({ sucess: false, data: null, Message: "Internal Server Error :" + error })
    }
}

module.exports = {
    addCouser,
    getAllCouser,
    getCouser,
    updateCouser,
    deletCouser,
    updateCouserStauts
}