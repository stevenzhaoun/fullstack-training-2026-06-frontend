import client from "./client"

export const listUsers = async () => {
    const response = await client.get('/users')
    return response.data
}

export const getUser = async (id: string) => {
    const response = await client.get(`/users/${id}`)
    return response.data
}

export const updateUser = async (id: string, name: string, email: string, roleId: number) => {
    const response = await client.put(`/users/${id}`, {
        name,
        email,
        roleId
    })
    return response.data
}

export const createUser = async (name: string, email: string, password: string, roleId: number) => {
    const response = await client.post('/users', {
        name,
        email,
        password,
        roleId
    })
    return response.data
}

export const login = async (email: string, password: string) => {
    const response = await client.post('/login', {
        email,
        password
    })
    return response.data
}
