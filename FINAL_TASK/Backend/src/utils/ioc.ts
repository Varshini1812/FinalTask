import { IocContainer } from "@tsoa/runtime";
import { Container } from "typescript-ioc";

// Assign a container to `iocContainer`
class AContainer implements IocContainer {
    get<T>(controller: { prototype: T; } & Function): T {
        return Container.get<T>(controller) as T;
    }
}
const iocContainer = new AContainer();

export { iocContainer }