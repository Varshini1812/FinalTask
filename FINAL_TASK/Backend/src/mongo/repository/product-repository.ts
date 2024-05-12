import { ProductModel } from "src/models/product";
import { ProductRepository } from "src/repo-base/product-repository";
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
    
        
        if (existing) {
            dbproduct._id = dbproduct.productId
            delete dbproduct.productId;
            
            
    
            await this.mongoModel.findByIdAndUpdate(dbproduct._id, dbproduct);
            
          
    
            return this.getone(dbproduct._id);
        }
        return null;
    }
}
