import { Injectable, Logger } from "@nestjs/common";
import { getConnectionManager, createConnection } from "typeorm";
import * as dotenv from "dotenv";
import config, { appEntities } from "../config";

@Injectable()
export class DbService {
  async getConnection(tenantName: string = "public") {
    const connectionManager = getConnectionManager();
    const connectionName = `projectzoe_${tenantName}`;

    Logger.log(`Getting Db connection ${connectionName}`);

    if (connectionManager.has(connectionName)) {
      const connection = await connectionManager.get(connectionName);
      return Promise.resolve(
        connection.isConnected ? connection : connection.connect(),
      );
    } else {
      //@TODO If public, use different entities
      await createConnection({
        ...config.database,
        name: connectionName,
        type: "postgres",
        entities: appEntities,
        schema: tenantName,
      });

      const connection = await connectionManager.get(connectionName);
      return Promise.resolve(
        connection.isConnected ? connection : connection.connect(),
      );
    }
  }
}
