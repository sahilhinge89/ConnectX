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

exports.categoryPageDetails = async(res,res) =>{
    try {
        const {categaoryId} = req.body;

        // Get course for the specified category
        const selectedCategory = await Category.findById(categaoryId).populate("courses").exec();
          
        console.log(selectedCategory);

        // Handle the case when the category is not found
        
        if(!selectedCategory){
            console.log("Category not found");
            return res.status(404).json({
                success:false,
                message:"No courses found for the selected category",
            })
        }
        const selectedCourse = selectedCategory.courses;
        
        //Get courses for other categories
        
         	const categoriesExceptSelected = await Category.find({
			_id: { $ne: categoryId },
		}).populate("courses");
		let differentCourses = [];
		for (const category of categoriesExceptSelected) {
			differentCourses.push(...category.courses);
		}
        const allCategories = await Category.find().populate("courses");
		const allCourses = allCategories.flatMap((category) => category.courses);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);

		res.status(200).json({
			selectedCourses: selectedCourses,
			differentCourses: differentCourses,
			mostSellingCourses: mostSellingCourses,
		});
    } catch (error) {
        return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}