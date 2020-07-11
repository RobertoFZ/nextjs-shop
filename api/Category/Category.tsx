import { Service } from "../Service/Service";
import axios from 'axios';

export type Category = {
  id: number;
  name: string;
  description: string;
  image?: string;
  business_id: number;
}

class CategoryService extends Service<Category> {
  protected name = 'categories';
  protected url: string | undefined = process.env.apiUrl;

  async list(business_id: number): Promise<Category[]> {
    try {
      let params: any = {};
      const response = await axios.get<Category[]>(`${this.url}/business/${business_id}/${this.name}/`, this.getHeaders({ params }));
      return response.data as Category[];
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

const service = new CategoryService();
export default service;
