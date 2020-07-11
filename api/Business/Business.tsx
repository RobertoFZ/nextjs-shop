import { BasicResponse, Service } from "../Service/Service";
import axios from 'axios';

export type Business = {
  id: number;
  name: string;
  description: string;
  active: boolean;
  logo: string;
  users: Array<number>;
}

class BusinessService extends Service<Business> {
  protected name = 'business';
  protected url: string | undefined = process.env.apiUrl;

  async list(): Promise<Business[]> {
    try {
      const response = await axios.get<Business[]>(`${this.url}/${this.name}/`, this.getHeaders({ params: {} }));
      return response.data as Business[];
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
