import { BasicResponse, Service } from "../Service/Service";
import axios from 'axios';

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile: {
    facebook_id?: string;
    image_profile?: string;
  },
  token?: string;
}

class UserService extends Service<User> {
  protected name = 'users';
  protected url: string | undefined = process.env.apiUrl;

  async create(user: User): Promise<User> {
    try {
      const response = await axios.post<BasicResponse<User>>(`${this.url}/${this.name}/`, user, this.getHeaders());
      const { data: axiosData } = response;
      return axiosData.data as User;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }

  async profile(user: User): Promise<User> {
    try {
      const response = await axios.get<BasicResponse<User>>(`${this.url}/${this.name}/${user.id}/`, this.getHeaders());
      const { data: axiosData } = response;
      return axiosData.data as User;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }
}

const service = new UserService();
export default service;
