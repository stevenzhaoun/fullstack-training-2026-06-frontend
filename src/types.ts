export type User = {
    id?: number
    name: string
    email: string
    role_id?: number
    password?: string
}

export type Role = {
    id?: number
    name: string
}

export type Order = {
    id: number;
    email: string;
    name: string;
    createdAt: string;
    totalPrice: number;
    products: {
        id: number;
    }[];
}