import { BasicResponse, Service } from "../Service/Service";
import { Business } from './../Business/Business';
import axios from 'axios';

export type ProductPaginate = {
  count: number;
  next: string;
  previous: string;
  results: Product[];
}

export type Category = {
  id: number;
  name: string;
  description: string;
}

export type Subcategory = {
  id: number;
  name: string;
  description: string;
  category: Category;
}

export type ProductVariant = {
  id: number;
  name: string;
  price: number;
  shipping_price: number;
  sku: string;
  stock: number;
  use_stock: boolean;
}

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  shipping_price: number;
  published: boolean;
  publish_at: number;
  promote: boolean;
  engine_title: string;
  engine_description: string;
  business_id: number;
  business: Business;
  subcategory_id: number;
  collection_id: number;
  images: Array<{ id: number, image: string }>;
  product_variants: Array<ProductVariant>,
  subcategory: Subcategory
}

class BusinessService extends Service<Product> {
  protected name = 'products';
  protected url: string | undefined = process.env.apiUrl;

  async list(page: number = 1, limit: number = 9, order?: string, business?: Array<number>, categories?: Array<number>): Promise<ProductPaginate> {
    try {
      let params: any = {
        page,
        limit,
        offset: (page - 1) * limit
      };
      if (order) {
        params.order = order;
      }
      if (business && business.length > 0) {
        params.business = business.toString();
        if (categories && categories.length > 0) {
          params.category = categories.toString();
        }
      }
      const response = await axios.get<ProductPaginate>(`${this.url}/${this.name}/`, this.getHeaders({ params }));
      return response.data as ProductPaginate;
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }

  async findOne(product_id: number): Promise<Product> {
    try {
      const response = await axios.get<Product>(`${this.url}/${this.name}/${product_id}`, this.getHeaders());
      return response.data as Product;
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }
}

const service = new BusinessService();
export default service;
