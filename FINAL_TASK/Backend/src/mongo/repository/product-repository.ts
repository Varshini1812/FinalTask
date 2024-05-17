
import { ProductModel } from "../../models/product";
import { ProductRepository } from "../../repo-base/product-repository";
import { initProductSchema } from "../models/product";
import mongoose from "mongoose";

export class MongoProductRepository extends ProductRepository {
    private mongoModel = initProductSchema();
    async list(): Promise<Array<ProductModel>> {
        const rows = await this.mongoModel.find()
            .select({ productId: "$_id", productName: 1, productImage: 1, productCategory: 1, productBrand: 1, productPrice: 1, productRatings: 1, _id: 0 })
            .lean().exec();
        return rows as ProductModel[];
    }
    async getone(productId: string): Promise<ProductModel | null> {
        const row = await this.mongoModel.findById(productId)
            .select({ productId: "$_id", productName: 1, productImage: 1, productCategory: 1, productBrand: 1, productPrice: 1, productRatings: 1, _id: 0 })
            .lean().exec();
        return row || null;
    }
    async existsone(productId: string): Promise<boolean> {
        const row = await this.mongoModel.exists({ _id: productId });
        return !!row;
    }
    async create(product: ProductModel): Promise<ProductModel | null> {
        let dbproduct = product as any;
        dbproduct._id = (new mongoose.Types.ObjectId()).toString();
        let existing = await this.existsone(dbproduct._id || "");
        if (!existing) {
            delete dbproduct.productId;
            await this.mongoModel.create(dbproduct);
            return this.getone(dbproduct._id);
        }
        return null;
    }
   
    async update(product: ProductModel): Promise<ProductModel | null> {
        let dbproduct = product as any;
        let existing = await this.getone(product.productId || "");
    
        console.log("Existing product:", existing); 
    
        if (existing) {
            console.log("Product found for update. productId:", existing.productId);
    
            dbproduct._id = dbproduct.productId;
            delete dbproduct.productId;
    
            console.log("Updating product:", dbproduct); 
    
            await this.mongoModel.findByIdAndUpdate(dbproduct._id, dbproduct);
    
            console.log("Product updated successfully."); 
    
            return this.getone(dbproduct._id);
        } else {
            console.log("Product not found for update."); 
        }
        return null;
    }

    async delete(productId: string): Promise<boolean> {
        const result = await this.mongoModel.findByIdAndDelete(productId);
        return !!result;
    }

  
   
    
    async getProducts(page: number, pageSize: number): Promise<{ products: ProductModel[]; totalItems: number }> {
        try {
            const skip = (page - 1) * pageSize;
            const products: ProductModel[] = await this.mongoModel
                .find()
                .skip(skip)
                .limit(pageSize)
                .exec();
    
            // Fetch total count of products (for pagination)
            const totalItems: number = await this.mongoModel.countDocuments();
    
            return { products, totalItems };
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error; 
        }
    }
    // async getCategories(): Promise<string[]> {
    //     const categories = await this.mongoModel.distinct('category').exec();
    //     return categories;
    //   }
    
    
      async getTotalProducts(): Promise<number> {
        try {
            const totalProducts = await this.mongoModel.count();
            return totalProducts;
          
        } catch (error) {
          console.error('Error fetching total products:', error);
          throw error;
        }
      }
   
    // async getAllCategories(): Promise<string[]> {
    //     console.log("getAllCategories method called...");
    //     try {
    //         console.log("Aggregating distinct product categories...");
    //         const categoriesAggregate = await this.mongoModel.aggregate([
    //             {
    //                 $group: {
    //                     _id: "$productCategory", // Use productCategory field for grouping
    //                 }
    //             },
    //             {
    //                 $match: {
    //                     _id: { $ne: null } // Filter out null categories
    //                 }
    //             },
    //             {
    //                 $project: {
    //                     _id: 0, // Exclude _id field from results
    //                     productCategory: "$_id"
    //                 }
    //             }
    //         ]);
    
    //         const uniqueCategories = categoriesAggregate.map(category => category.productCategory);
    
    //         console.log("Categories retrieved:", uniqueCategories);
    
    //         return uniqueCategories;
    //     } catch (error) {
    //         console.error("Error fetching categories from the database:", error);
    //         throw new Error('Error fetching categories from the database');
    //     }
    // }
    
    
    
    
    
    
    
    

   
    
 
}
