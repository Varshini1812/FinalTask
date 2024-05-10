import config from "config";
import { UserRepository } from "../repo-base/user-repository";
import { MySqlUserRepository } from "../repository/user-repository";
import { MongoUserRepository } from "../mongo/repository/user-repository";
import { Container } from "typescript-ioc";


export function RegisterClasses() {
    let isMongo = config.get("useDB") == "mongodb";
    if (isMongo) {
        Container.bind(UserRepository).to(MongoUserRepository);
    } else {
        Container.bind(UserRepository).to(MySqlUserRepository);
    }
}