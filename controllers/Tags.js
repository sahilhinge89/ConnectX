const Tag = require('../models/tags');

// create a tag handler function

exports.createTags = async (req,res) =>{
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
         const tagDetails = await Tag.create({
            name:name,
            description:description
         })
         console.log(tagDetails);
         return res.status(201).json({
            success: true,
           message: "Tag created successfully",
        });
    }catch(error){
        res.status(500).json({
             success:false,
            message: error.message, 
        });
    }
}

// get all tags handler function
exports.getAllTags = async (req,res) =>{
    try {
        const allTags = await Tag.find({},{name:true, description:true});
        return res.status(200).json({
            success: true,
            message: "Tags fetched successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
