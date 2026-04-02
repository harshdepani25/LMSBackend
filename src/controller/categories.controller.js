const Categories = require("../model/categories.model");
const fs = require("fs");
const { uploadcloudinary, deletecloudinary } = require("../servicer/cloudinary");
const Joi = require("joi");

const categorySchema = Joi.object({
    name: Joi.string().required(),
    desciption: Joi.string().required(),
    // category_img: Joi.image().required()
})


const addcategories = async (req, res) => {
    // #swagger.tags = ['category']
     /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
    // #swagger.consumes = ['multipart/form-data'] 
    /*
     #swagger.parameters['name'] = {
           in: 'formData',
            type: 'string',
            required: 'true',
            description: 'Category name'   
        } 
        

        #swagger.parameters['desciption'] = {
           in: 'formData',
            type: 'string',
            required: 'true',
            description: 'Category desciption'   
        } 
        
        #swagger.parameters['category_img'] = {
           in: 'formData',
            type: 'file',
            required: 'true',
            description: 'Category imgage'   
        }  
        
    */    

    try {
        const  { error, value } = categorySchema.validate(req.body);

        if(error){
            return res.status(400).json({ sucess: false, data: null, Message: error})
        }

        console.log(req.body, req.user, req.file);

        const cloudinaryObj = await uploadcloudinary(req.file.path, 'Categroy')

        const category = await Categories.create(
            {
                ...req.body,
                category_img: { public_id: cloudinaryObj.public_id, url: cloudinaryObj.url }
            });

        // const category = await Categories.create(req.body);

        if (!category) {
            return res.status(400).json({ sucess: false, data: null, Message: "Categroy not added" })
        }

        return res.status(200).json({ sucess: true, data: category, Message: "Categroy data Added sucessfully." })
    } catch (error) {
        return res.status(500).json({ sucess: false, data: null, Message: "Internal Server Error :" + error })
    }
}

const getAllCategories = async (req, res) => {
    // #swagger.tags = ['category']
    try {
        const category = await Categories.find();
        console.log("All cat:", category);

        if (!category) {
            return res.status(400).json({ sucess: false, data: [], Message: "All Categroy data found." })
        }

        return res.status(200).json({ sucess: true, data: category, Message: "All Categroy data." })
    } catch (error) {
        return res.status(500).json({ sucess: false, data: null, Message: "Internal Server Error :" + error })
    }
}

const getcategories = async (req, res) => {
    // #swagger.tags = ['category']
    try {
        const category = await Categories.findById(req.params.id);

        if (!category) {
            return res.status(400).json({ sucess: false, data: [], Message: "Categroy data not fetched." })
        }

        return res.status(200).json({ sucess: true, data: category, Message: "Categroy data fetched." })

    } catch (error) {
        return res.status(500).json({ sucess: false, data: null, Message: "Internal Server Error :" + error })
    }

}

//fs.unlink
const updatecategories = async (req, res) => {
    // #swagger.tags = ['category']
     /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
    // #swagger.consumes = ['multipart/form-data'] 
    /*
     #swagger.parameters['name'] = {
           in: 'formData',
            type: 'string',
            description: 'Category name'   
        } 
    
        #swagger.parameters['desciption'] = {
           in: 'formData',
            type: 'string',
            description: 'Category desciption'   
        } 
        
        #swagger.parameters['category_img'] = {
           in: 'formData',
            type: 'file',
            description: 'Category imgage'   
        }  
        
    */

    try {
        const categoryData = await Categories.findById(req.params.id);

        console.log("cat Dart:", categoryData);

        let uData = { ...req.body, category_img: { public_id: categoryData.category_img?.public_id, url: categoryData?.category_img.url } }


        if (req.file) {
            // fs.unlink(categoryData.category_img, (error) => {
            //     console.log(error);
            // })

            await deletecloudinary(categoryData?.category_img?.public_id);

            const cloudinaryObj = await uploadcloudinary(req.file.path, 'Categroy')

            uData.category_img = { public_id: cloudinaryObj.public_id, url: cloudinaryObj.url }
        }

        console.log(uData);

        const category = await Categories.findByIdAndUpdate(
            req.params.id,
            uData,
            { new: true, runValidators: true }
        )

        if (!category) {
            return res.status(400).json({ sucess: false, data: [], Message: "Categroy data not updated." })
        }

        return res.status(200).json({ sucess: true, data: category, Message: "Categroy data updated." })
    } catch (error) {
        return res.status(500).json({ sucess: false, data: null, Message: "Internal Server Error :" + error.message })
    }
}

//fs.unlink
const deletcategories = async (req, res) => {
    // #swagger.tags = ['category']
     /* #swagger.security = [{
            "apiKeyAuth": []
    }] */
    try {
        const category = await Categories.findByIdAndDelete(req.params.id);
        console.log(category);

        // fs.unlink(category.category_img, (error) => {
        //     console.log(error);

        // })

        await deletecloudinary(category?.category_img?.public_id);

        if (!category) {
            return res.status(400).json({ sucess: false, data: [], Message: "Categroy data not deleted." })
        }

        return res.status(200).json({ sucess: true, data: category, Message: "Categroy data deleted." })
    } catch (error) {
        return res.status(500).json({ sucess: false, data: null, Message: "Internal Server Error :" + error })
    }
}

module.exports = {
    addcategories,
    getAllCategories,
    getcategories,
    updatecategories,
    deletcategories
}