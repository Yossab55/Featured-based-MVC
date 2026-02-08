import "./env.js";
import "./source/utils/proto/String.proto.js";
import "./source/databases/mongo/mongo.connection.js";
import { app } from "./source/app.js";
import { serverConfig } from "./source/config/server.config.js";

app.listen(serverConfig.port, () => {
  console.log(`server running on port: ${serverConfig.port}`);
});
