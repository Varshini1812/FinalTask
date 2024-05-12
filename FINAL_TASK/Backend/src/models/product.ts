export interface ProductModel {
    productId?: string | null;
    productName: string;
    productImage: string;
    productCategory: string;
    productBrand: string;
    productPrice: number;
    productRatings: number;
}
export interface ProductErrorType {
    message: string;               
}