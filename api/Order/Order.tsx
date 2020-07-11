import { Service } from "../Service/Service";
import axios from 'axios';
import { DeliveryData } from "../../pages/payment/components/DeliveryForm/DeliveryForm";

export type Order = {
  data: {
    id: number;
    customer: any;
    business: any;
    order_id: string;
    shipping_track_id?: string;
    status: number;
    shippping_cost: number;
    amount: number;
    openpay_id: string;
    openpay_order_id: string;
    authorization: string;
    openpay_status_text: string;
    error_message: string;
    method: 'openpay' | 'paypal' | 'cash'
  },
  openpay: any;
}

export type OrderRequest = {
  products: Array<{
    product_variant_id: number;
    quantity: number;
  }>,
  token_id?: string;
  device_id?: string;
  customer: DeliveryData;
  method?: 'openpay' | 'paypal';
  paypal_order_id?: string;
}

export type OrderResponse = {
  data: Order[],
  openpay_3d_secure_url: string;
  method: 'openpay' | 'paypal';
  paypal_order?: string;
}

class OrderService extends Service<Order> {
  protected name = 'orders';
  protected url: string | undefined = process.env.apiUrl;

  async make(data: OrderRequest, method: 'openpay' | 'paypal' = 'openpay'): Promise<OrderResponse> {
    try {
      let params: any = {};
      data.method = method;
      const response = await axios.post<OrderResponse>(`${this.url}/${this.name}/`, data, this.getHeaders({ params }));
      return response.data as OrderResponse;
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }

  async get(order_id: string): Promise<Order> {
    try {
      let params: any = {};
      const response = await axios.get<Order>(`${this.url}/${this.name}/${order_id}/`, this.getHeaders({ params }));
      return response.data as Order;
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }

  async sendMail(order_id: string): Promise<void> {
    const actionName = 'email'
    try {
      let params: any = {};
      let data: any = { order_id };
      await axios.post(`${this.url}/${this.name}/${actionName}/`, data, this.getHeaders({ params }));
    } catch (error) {
      console.error(error);
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }

  async trackOrder(order_id: string): Promise<Order> {
    const actionName = 'track';
    try {
      let params: any = { order_id };
      const response = await axios.get<Order>(`${this.url}/${this.name}/${actionName}/`, this.getHeaders({ params }));
      return response.data as Order;
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

const service = new OrderService();
export default service;
