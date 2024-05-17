import { connectDB, db } from "../connection";

export function initProductSchema() {
    connectDB();

    if (db.models.product) {
        return db.models.product;
    }

    const productSchema = new db.Schema<any>(
        {
            productId: String,
            productName: String,
            productImage: String,
            productCategory: String,
            productBrand: String,
            productPrice: Number,
            productRatings: Number,
            
        }
    );

    const productModel = db.models.product || db.model<any>("product", productSchema);
    return productModel;
}
