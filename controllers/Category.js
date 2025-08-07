const Category = require('../models/Category');

// create a category handler function

exports.createCategory = async (req,res) =>{
    try{
        //fetch the name and description from the request body
         const {name, description} = req.body;
         // validation
         if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "Name and description are required"
            });
         }
         // create entry in the database
         const categoryDetails = await Category.create({
            name:name,
            description:description
         })
         console.log(categoryDetails);
         return res.status(201).json({
            success: true,
           message: "Category created successfully",
        });
    }catch(error){
        res.status(500).json({
             success:false,
            message: error.message, 
        });
    }
}

// get all Categories handler function
exports.getAllCategory = async (req,res) =>{
    try {
        const allCategory = await Category.find({},{name:true, description:true});
        return res.status(200).json({
            success: true,
            message: "Category fetched successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
