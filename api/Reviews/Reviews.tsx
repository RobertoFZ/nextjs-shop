import { Service } from '../Service/Service';
import axios from 'axios';

export type Reviews = {
    id: number;
    rating: number;
    review: string;
    product_variant_id: number;
}

export type Review = {
    id: number;
    rating: number;
    review: string;
    product_variant_id: number;
}

class ReviewsService extends Service<Reviews> {
    protected name = 'review_purchases';
    protected url: string | undefined = process.env.apiUrl;
    
    async list(product_id: number): Promise<Reviews[]> {
        let params: any = { product_id };
        
        try {
            const response = await axios.get<Reviews[]>(`${this.url}/${this.name}/`, this.getHeaders({ params }));
            return response.data as Reviews[];
        }catch (error){
            console.log(error);
            if (error.response) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error(error.message);
            }
        }
    }

    async create(data: Review): Promise<Review> {
        try {
          const response = await axios.post<Review>(`${this.url}/${this.name}/`, data, this.getHeaders());
          return response.data as Review;
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

const service = new ReviewsService()
export default service