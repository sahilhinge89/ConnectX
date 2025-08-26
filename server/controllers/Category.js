const Category = require('../models/Category');

// create a category handler function
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) { // Description is often optional, but you can add it back if needed
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }
        const categoryDetails = await Category.create({
            name: name,
            description: description
        });
        console.log(categoryDetails);
        return res.status(201).json({
            success: true,
            message: "Category created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating category",
            error: error.message,
        });
    }
};

// get all Categories handler function
// FIX: Renamed to match the name used in your routes (showAllCategories)
exports.showAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({}, { name: true, description: true });
        
        // FIX: The fetched data is now correctly sent in the response.
        return res.status(200).json({
            success: true,
            message: "All Categories fetched successfully",
            data: allCategories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching categories",
            error: error.message
        });
    }
};

// categoryPageDetails handler function
exports.categoryPageDetails = async (req, res) => {
    try {
        // FIX: Corrected typo from `categaoryId` to `categoryId`
        const { categoryId } = req.body;

        // Get course for the specified category
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: "ratingAndReviews",
            })
            .exec();

        if (!selectedCategory) {
            console.log("Category not found");
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        
        // Handle case where there are no courses
        if (selectedCategory.courses.length === 0) {
            console.log("No courses found for this category.");
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            });
        }

        // Get courses for other categories
        // FIX: Used the correct `categoryId` variable
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        }).populate({
            path: "courses",
            match: { status: "Published" },
        });

        let differentCourses = categoriesExceptSelected.flatMap(category => category.courses);

        // Get top-selling courses across all categories
        const allCategories = await Category.find().populate({
            path: "courses",
            match: { status: "Published" },
            populate: {
                path: "instructor",
            },
        });
        const allCourses = allCategories.flatMap((category) => category.courses);
        const mostSellingCourses = allCourses
            .sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length)
            .slice(0, 10);

        return res.status(200).json({
            success: true,
            data: {
                selectedCourses: selectedCategory.courses,
                differentCourses: differentCourses,
                mostSellingCourses: mostSellingCourses,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};