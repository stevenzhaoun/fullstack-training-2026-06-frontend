import { Box, CircularProgress, InputLabel, MenuItem, FormControl, Select, TextField, Typography, Button, type SelectChangeEvent } from "@mui/material";
import type { Role } from "../../types";
import { useState } from "react";
import { createUser, getUser, updateUser } from "../../api/users.api";
import { useNavigate, useParams } from "react-router";
import { listRoles } from "../../api/roles.api";
import { useDataLoad } from "../../hooks/useDataLoad";

export default function CreateOrUpdateUser() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const params = useParams()
    const userId = params.id
    const navigate = useNavigate()
    const isAddView = userId === 'add';
    const {data: user, isLoading: isLoadingUser, setData: setUser} = useDataLoad<any>(async () => isAddView ? { name: '', email: '', password: '' } : await getUser(userId!))
    const {data: roles, isLoading: isLoadingRoles} = useDataLoad<Role[]>(listRoles)

    const handleChange = (fieldName: string) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setUser({
                ...user,
                [fieldName]: event.target.value
            })
        }
    }

    const handleRoleChange = (event: SelectChangeEvent<string>) => {
        setUser({
            ...user,    
            role_id: Number(event.target.value) as number
        })
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        if(isAddView) {
            await createUser(user.name, user.email, user.password, Number(user.role_id))
            navigate('/users')
        } else {
            await updateUser(userId!, user.name, user.email, Number(user.role_id))
        }
        setIsSubmitting(false)
    }

    if(isLoadingUser || isLoadingRoles) {
        return <CircularProgress />
    }

    return <Box>
        <Typography variant="h4">{isAddView ? 'Create User' : 'Update User'}</Typography>

        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: 2,
                width: 500
            }}
            onSubmit={handleSubmit}
        >
            <TextField label="Name" name="name" variant="outlined" value={user.name} onChange={handleChange('name')} />
            <TextField label="Email" name="email" variant="outlined" value={user.email} onChange={handleChange('email')} />
            {isAddView && <TextField label="Password" name="password" variant="outlined" value={user.password} onChange={handleChange('password')} />}
            <FormControl>
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                    labelId="role-select-label"
                    id="role-select"
                    value={user.role_id?.toString()}
                    label="Role"
                    onChange={handleRoleChange}
                >
                    {roles!.map((role) => (
                        <MenuItem key={role.id} value={role.id?.toString()}>{role.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button loading={isSubmitting} variant="contained" color="primary" type="submit">{isAddView ? 'Create' : 'Update'}</Button>
        </Box>
    </Box>
}