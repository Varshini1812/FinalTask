import { ProductModel } from "src/models/product";

export abstract class ProductRepository {
    abstract list(): Promise<Array<ProductModel>>;
    abstract getone(productId: string): Promise<ProductModel | null>;
    abstract existsone(productId: string): Promise<boolean>;
    abstract create(product: ProductModel): Promise<ProductModel | null>;
    abstract update(product: ProductModel ): Promise<ProductModel | null>;
}