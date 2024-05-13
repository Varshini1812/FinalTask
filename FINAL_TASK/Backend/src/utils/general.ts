import config from "config";
import { UserRepository } from "../repo-base/user-repository";
import { MongoUserRepository } from "../mongo/repository/user-repository";
import { ProductRepository } from "../repo-base/product-repository";
import { MongoProductRepository } from "../../src/mongo/repository/product-repository";
import { Container } from "typescript-ioc";


export function RegisterClasses() {
    let isMongo = config.get("useDB") == "mongodb";
    if (isMongo) {
        Container.bind(UserRepository).to(MongoUserRepository);
        Container.bind(ProductRepository).to(MongoProductRepository);
    } else {
        
    }
}