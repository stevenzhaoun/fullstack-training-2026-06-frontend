import client from "./client"

export const listRoles = async () => {
    const response = await client.get('/roles')
    return response.data
}