
import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Put,
    Delete,
    Response,
    Route,
    SuccessResponse,
    Security,
    Query,
    // UploadedFile

} from "tsoa";
import { Inject } from 'typescript-ioc';
import { ProductRepository } from "../repo-base/product-repository";
import { ProductModel,ProductErrorType } from "../models/product";



@Route("products")
export class ProductController extends Controller {

    @Inject private repo?:  ProductRepository;

    @Security("api_key", ["user"])
    @Get()
    @SuccessResponse(200, "Success")
    // public async List(): Promise<Array<ProductModel>> {
    //     let x: Array<ProductModel> = await this.repo!.list();
    //     return x;
    // }
   
  
    async getProducts(
        @Query('page') page: number ,
        @Query('pageSize') pageSize: number, 
      ): Promise<{ products: ProductModel[]; totalItems: number }> {
        return this.repo!.getProducts(page, pageSize);
      }
    
    @Get("{productId}")
    @SuccessResponse(200, "Success")
    @Response(404, "Not Found")
    public async GetById(@Path("productId")  productId: string): Promise<ProductModel | ProductErrorType > {
        let x: ProductModel | null = await this.repo!.getone( productId);
        if (x == null) {
            this.setStatus(404);
            return { message: "Not Found" }
        }
        return x as ProductModel;
    }

    @Post()
    @SuccessResponse(201, "Created")
    @Response(409, "Already exists")
    public async Create(@Body() product: ProductModel): Promise<ProductModel | ProductErrorType> {
        console.log(product)
        let x: ProductModel | null = await this.repo!.create(product);
        if (x == null) {
            this.setStatus(409);
            return { message: "Already exists" }
        }
        return x as ProductModel;
    }
   
        // @Post()
        // @SuccessResponse(201, "Created")
        // @Response(409, "Already exists")
        // public async Create(@Body() product: ProductModel, @UploadedFile() file: Express.Multer.File[]): Promise<ProductModel | ProductErrorType> {
        //     try {
        //         // Check if product with same name already exists
        //         // const existingProduct = await this.repo!.findOne({ productName: product.productName });
        //         // if (existingProduct) {
        //         //     this.setStatus(409);
        //         //     return { message: "Product already exists" };
        //         // }
    
        //         // Handle image uploads
        //         // const uploadDir = path.resolve(__dirname, '..', '..', 'src', 'uploads');
        //         // let imagePaths = '';
    
        //         // await fs.mkdir(uploadDir, { recursive: true });
    
        //         // for (const file of files) {
        //         //     const filename = crypto.randomBytes(16).toString('hex') + path.extname(file.originalname);
        //         //     const filepath = path.join(uploadDir, filename);
    
        //         //     await fs.writeFile(filepath, file.buffer);
                   
        //         //     imagePaths = filename;

        //         // }
    
        //         // Add image paths to the product data
        //         product.productImage = imagePaths;
    
        //         // Create the product in the database
        //         const newProduct = await this.repo!.create(product);

        //     if (!newProduct) {
        //         throw new Error('Product creation failed');
        //     }

        //     return newProduct;
        //     } catch (error) {
        //         console.error('Error creating product:', error);
        //         throw new Error('Product creation failed');
        //     }
        // }
    


    
    
    @Put("{productId}")
    @SuccessResponse(201, "Created")
    @Response(404, "Not found")
    @Response(409, "Conflict")
    public async Update(@Path("productId") productId: string, @Body() product: ProductModel): Promise<ProductModel | ProductErrorType> {
        product.productId = product.productId || productId;
       
        if (product.productId != productId) {
            this.setStatus(409);
            return { message: "product Id in confilict" }
        }
        let x: ProductModel | null = await this.repo!.update(product);
        if (x == null) {
            this.setStatus(404);
            return { message: "Not found" }
        }
        return x as ProductModel;
    }

    @Delete("{productId}")
    @SuccessResponse(204, "No Content")
    @Response(404, "Not Found")
    public async deleteProduct(@Path("productId") productId: string): Promise<void> {
        const deletedProduct = await this.repo!.delete(productId);
        if (!deletedProduct) {
            this.setStatus(404);
            throw new Error(`Product with ID ${productId} not found`);
        }
    }

    // @Get("categories")
    // @Response(200, "Success")
    // @Response(404, "Not Found")
    // public async getCategories(): Promise<string[]> {
    //     try {
    //         const categories = await this.repo!.getCategories();
    //         return categories;
    //     } catch (error) {
    //         this.setStatus(500);
    //         return [];
    //     }
    // }
    

    
}