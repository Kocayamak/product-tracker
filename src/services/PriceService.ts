import "reflect-metadata";

import { AppDataSource } from "@/config/database";
import { Product } from "@/models/Product";
import { Repository } from "typeorm";

export class PriceService {
  private repo: Repository<Product>;

  constructor() {
    this.repo = AppDataSource.getRepository(Product);
  }

  async getProducts(): Promise<Product[]> {
    return this.repo.find();
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.repo.findOneBy({ id });
  }

  async updatePrice(id: number, price: number): Promise<void> {
    await this.repo.update(id, { last_price: price });
  }
}
