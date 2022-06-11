import { Server } from "./server";

const envPort = Number(process.env.PORT);
const port = !isNaN(envPort) ? envPort : 80;
new Server().listen(port);
