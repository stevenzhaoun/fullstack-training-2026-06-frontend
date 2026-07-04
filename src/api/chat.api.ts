import client from "./client"

export type ChatMessage = {
    role: 'user' | 'assistant'
    content: string
}

export const sendChatMessage = async (messages: ChatMessage[]): Promise<string> => {
    const response = await client.post('/chat', { messages })
    return response.data.text
}
