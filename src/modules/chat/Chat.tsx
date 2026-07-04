import { useState, useRef, useEffect } from 'react'
import {
    Box,
    TextField,
    IconButton,
    Typography,
    Paper,
    CircularProgress,
    Avatar,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import PersonIcon from '@mui/icons-material/Person'
import { sendChatMessage, type ChatMessage } from '../../api/chat.api'

export default function Chat() {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isLoading])

    const handleSend = async () => {
        const text = input.trim()
        if (!text || isLoading) return

        const userMessage: ChatMessage = { role: 'user', content: text }
        const updatedMessages = [...messages, userMessage]
        setMessages(updatedMessages)
        setInput('')
        setIsLoading(true)

        try {
            const reply = await sendChatMessage(updatedMessages)
            setMessages([...updatedMessages, { role: 'assistant', content: reply }])
        } catch {
            setMessages([...updatedMessages, {
                role: 'assistant',
                content: 'Sorry, something went wrong. Please try again.',
            }])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
            <Typography variant="h5" sx={{fontWeight: 600, mb: 2}}>
                AI Data Assistant
            </Typography>

            {/* Message list */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mb: 2,
                    pr: 1,
                }}
            >
                {messages.length === 0 && (
                    <Box sx={{ textAlign: 'center', mt: 8, color: 'text.secondary' }}>
                        <SmartToyIcon sx={{ fontSize: 56, mb: 1, opacity: 0.4 }} />
                        <Typography variant="body1">
                            Ask me anything about users, orders, or products.
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.7 }}>
                            e.g. "How many orders were placed this month?" or "List all users with their roles."
                        </Typography>
                    </Box>
                )}

                {messages.map((msg, idx) => {
                    const isUser = msg.role === 'user'
                    return (
                        <Box
                            key={idx}
                            sx={{
                                display: 'flex',
                                flexDirection: isUser ? 'row-reverse' : 'row',
                                alignItems: 'flex-start',
                                gap: 1.5,
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: isUser ? 'primary.main' : 'secondary.main',
                                    width: 34,
                                    height: 34,
                                    flexShrink: 0,
                                }}
                            >
                                {isUser ? <PersonIcon fontSize="small" /> : <SmartToyIcon fontSize="small" />}
                            </Avatar>
                            <Paper
                                elevation={0}
                                sx={{
                                    px: 2,
                                    py: 1.5,
                                    maxWidth: '75%',
                                    bgcolor: isUser ? 'primary.main' : 'grey.100',
                                    color: isUser ? 'primary.contrastText' : 'text.primary',
                                    borderRadius: 2,
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                }}
                            >
                                <Typography variant="body2">{msg.content}</Typography>
                            </Paper>
                        </Box>
                    )
                })}

                {isLoading && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ bgcolor: 'secondary.main', width: 34, height: 34 }}>
                            <SmartToyIcon fontSize="small" />
                        </Avatar>
                        <Paper elevation={0} sx={{ px: 2, py: 1.5, bgcolor: 'grey.100', borderRadius: 2 }}>
                            <CircularProgress size={16} />
                        </Paper>
                    </Box>
                )}

                <div ref={bottomRef} />
            </Box>

            {/* Input row */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    placeholder="Ask about your business data..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    size="small"
                />
                <IconButton
                    color="primary"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    sx={{ mb: 0.5 }}
                >
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    )
}
