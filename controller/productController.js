
// const ProductModel=require('../models/productModel');

// exports.getAllProducts=async(req,res)=>{
//     // const myData=await ProductModel.find({category:"laptop"});
//    // dynamically find which you want find like category:laptop req.query
// const {price,categor,title,sorty}=req.query;
// const queryObject={};
// if(price)
// {
   
//     queryObject.price=price;
//     // console.log(queryObject.price);  
// }
// // if(category)
// // {
   
// //     queryObject.category=category;
  
// // }
// if(category)
// {
   
//     queryObject.category={$regex:category,$options:"i"};
  
// }

// let apiData=ProductModel.find(queryObject)

// if(sort)
// {
//     let sortFix=sort.replace(","," ");
//     // queryObject.sort=sortFix;
//     apiData=apiData.sort(sortFix)
// }
// console.log(queryObject);

// //const myData=await apiData.sort(sort);
// const myData=await apiData;
// res.status(200).json({message:'i am get all products',mydata:myData});
//     // const myData=await ProductModel.find(req.query);
//     // res.status(200).json({message:'i am get all products',mydata:myData});

// }

// // exports.getAllProducts = async (req, res) => {
// //     try {
// //         // Fetch all products from the database
// //         const myData = await ProductModel.find({});
        
// //         // Log the fetched data
// //         console.log('Fetched products:', myData);
        
// //         // Send a response with a success message
// //         res.status(200).json({ message: 'Products fetched successfully', data: myData });
// //     } catch (error) {
// //         // If an error occurs, send a response with the error message
// //         console.error('Error fetching products:', error);
// //         res.status(500).json({ message: 'Internal server error' });
// //     }
// // };
// exports.getAllProductTesting=async(req,res)=>{
//     // res.status(200).json({message:'i am get all products testing'});
//     2// const myData=await ProductModel.find({});
//     2// res.status(200).json({message:'i am get all products',mydata:myData});
//     const myData=await ProductModel.find(req.query).sort("-price");
//     res.status(200).json({message:'i am get all products',mydata:myData});


// }




const ProductModel = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
    const { price, category, title, sort,select } = req.query;
    const queryObject = {};

    if (price) {
        queryObject.price = price;
    }

    if (category) {
        queryObject.category = { $regex: category, $options: "i" };
    }

    let apiData = ProductModel.find(queryObject);

    if (sort) {
        let sortFix = sort.replace(",", " ");
        apiData = apiData.sort(sortFix);
    }

    //(select=name,category;
    if(select)
    {
        //this is use for only select
        let selectFix=select.replace(","," ");

        // join the select
        // let selectFix=select.split(",").join(" ");
        apiData=apiData.select(selectFix);
    }

    //pagination
    let page=Number(req.query.page) || 1;
    let limit=Number(req.query.limit) ||  5;
    let skip=(page-1)*limit;
    apiData=apiData.skip(skip).limit(limit)

    try {
        const myData = await apiData;
        res.status(200).json({ message: 'Products fetched successfully', mydata: myData ,nbHits:myData.length});
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllProductTesting = async (req, res) => {
    try {
        const myData = await ProductModel.find(req.query).sort("-price");
        const Data = await ProductModel.find(req.query).select("category price");
        res.status(200).json({ message: 'Products fetched successfully', mydata: myData,Data:Data });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
