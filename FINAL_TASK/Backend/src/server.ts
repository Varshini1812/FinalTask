import { app } from "./app";
import { color } from "./utils/color-console";
import { finalizeDB } from "./utils/sql-builder";

const port = process.env.PORT || 3000;
const envNode = process.env.NODE_ENV;
console.log(`${color.FgMagenta}Node Environment is ${color.Underscore}${envNode}${color.Reset}`);
let server = app.listen(port, () =>
    console.log(
        `${color.FgYellow}API is listening on port : ${color.Underscore}${port}${color.Reset}`
    )
);
process.on("SIGTERM", () => {
    finalizeDB();
    server.close(() => { })
});