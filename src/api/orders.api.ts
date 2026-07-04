import client from "./client"
import type { Order } from "../types"

export const listOrders = async (): Promise<Order[]> => {
    const response = await client.get<Order[]>('/orders')
    return response.data
}