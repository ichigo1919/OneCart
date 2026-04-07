import uploadOnCloudinary from "../config/cloudinary.js"
import Product from "../model/productModel.js"
import r from "../config/redis.js"


export const addProduct = async (req,res) => {
    try {
        let {name,description,price,category,subCategory,sizes,bestseller} = req.body

        let image1 = await uploadOnCloudinary(req.files.image1[0].path)
        let image2 = await uploadOnCloudinary(req.files.image2[0].path)
        let image3 = await uploadOnCloudinary(req.files.image3[0].path)
        let image4 = await uploadOnCloudinary(req.files.image4[0].path)
        
        let productData = {
            name,
            description,
            price :Number(price),
            category,
            subCategory,
            sizes :JSON.parse(sizes),
            bestseller :bestseller === "true",
            date :Date.now(),
            image1,
            image2,
            image3,
            image4
        }

        const product = await Product.create(productData)

        await r.del("products")   

        return res.status(201).json(product)

    } catch (error) {
        return res.status(500).json({message:`AddProduct error ${error}`})
    }
}




export const removeProduct = async (req,res) => {
    try {
        let {id} = req.params;

        const product = await Product.findByIdAndDelete(id)

        await r.del("products")
        await r.del(`product:${id}`)

        return res.status(200).json(product)

    } catch (error) {
        return res.status(500).json({message:`RemoveProduct error ${error}`})
    }
}

export const getProducts = async (req, res) => {
  try {
    const k = "products";

    const c = await r.get(k);

   if (c) {
  console.log("CACHE HIT");
  return res.json(JSON.parse(c));
}
 else {console.log("CACHE MISS");}


    const p = await Product.find();

    const TTL = 60;  

    await r.setEx(k, TTL, JSON.stringify(p));

    res.json(p);

  } catch (e) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const k = `product:${id}`;

    const c = await r.get(k);

     if (c) {
  console.log("CACHE HIT");
  return res.json(JSON.parse(c));
}
 else {console.log("CACHE MISS");}

    const p = await Product.findById(id);

    if (!p) return res.status(404).json({ error: "Not found" });

    await r.setEx(k, 60, JSON.stringify(p));

    res.json(p);

  } catch (e) {
    res.status(500).json({ error: "Server Error" });
  }
};
