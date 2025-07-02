import { DataSource } from "typeorm";
import { Config } from "@/config";
import { Product } from "@/models";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: Config.db.host,
  port: Config.db.port,
  username: Config.db.user,
  password: Config.db.password,
  database: Config.db.database,
  entities: [Product],
  synchronize: false,
});
