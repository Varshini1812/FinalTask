import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Put,
    Response,
    Route,
    SuccessResponse,
    Security,
} from "tsoa";
import { Inject } from 'typescript-ioc';
import { ProductRepository } from "src/repo-base/product-repository";
import { ProductModel,ProductErrorType } from "src/models/product";



@Route("products")
export class ProductController extends Controller {

    @Inject private repo?:  ProductRepository;

    @Security("api_key", ["product"])
    @Get()
    @SuccessResponse(200, "Success")
    public async List(): Promise<Array<ProductModel>> {
        let x: Array<ProductModel> = await this.repo!.list();
        return x;
    }
    @Get("{productId}")
    @SuccessResponse(200, "Success")
    @Response(404, "Not Found")
    public async GetById(@Path(" productId")  productId: string): Promise<ProductModel | ProductErrorType > {
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
        let x: ProductModel | null = await this.repo!.create(product);
        if (x == null) {
            this.setStatus(409);
            return { message: "Already exists" }
        }
        return x as ProductModel;
    }
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
}