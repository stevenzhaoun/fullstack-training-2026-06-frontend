import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useUser } from "../hooks/useUser";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { login } = useUser()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        try {
            await login(email, password)
        } catch (error) {
            console.log(error.response.data.error)
            setError(error.response.data.error)
        }finally {
            setIsLoading(false)
        }
    }

    return <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h3">Welcome</Typography>
        <Box component="form" sx={{ mt: 2, width: '400px',display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleSubmit}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField type="email" required label="Email" name="email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
            <TextField type="password" required label="Password" name="password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} />
            <Button loading={isLoading} variant="contained" color="primary" type="submit"> Login</Button>
        </Box>
    </Box>
}