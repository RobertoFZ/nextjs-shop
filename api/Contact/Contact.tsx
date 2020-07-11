import { Service } from "../Service/Service";
import axios from 'axios';

export type Contact = {
    name: string;
    email: string;
    phone: number;
    message: string;
}

class ContactService extends Service<Contact>{
    protected name = 'contact';
    protected url: string | undefined = process.env.apiUrl;

    async send(data: any): Promise<Contact>{
        try{
            const response = await axios.post<Contact>(`${this.url}/${this.name}/`, data, this.getHeaders());
            return response.data as Contact;
        }catch(error){
            console.log(error);
            if (error.response) {
              throw new Error(error.response.data.message);
            } else {
              throw new Error(error.message);
            }
        }
    }
}

const service = new ContactService();
export default service;