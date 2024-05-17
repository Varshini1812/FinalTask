import { ProductModel } from "../models/product";

export abstract class ProductRepository {
    abstract list(): Promise<Array<ProductModel>>;
    abstract getone(productId: string): Promise<ProductModel | null>;
    abstract existsone(productId: string): Promise<boolean>;
    abstract create(product: ProductModel): Promise<ProductModel | null>;
    abstract update(product: ProductModel ): Promise<ProductModel | null>;
    abstract delete(productId: string): Promise<boolean>;
    abstract getProducts(page: number, pageSize: number): Promise<{ products: ProductModel[]; totalItems: number }>
    abstract getTotalProducts(): Promise<number>;
    // abstract getCategories(): Promise<string[]>
}