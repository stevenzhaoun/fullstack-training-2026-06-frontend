import { Alert, Box, Button, Typography } from "@mui/material";
import { listUsers } from "../../api/users.api";
import type { Role } from "../../types";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import { useDataLoad } from "../../hooks/useDataLoad";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1, valueGetter: (params: Role) => params.name },
]

export default function ListUsers() {
    // const [users, setUsers] = useState<User[]>([])
    // const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const {data: users, isLoading, error} = useDataLoad(listUsers)

    // useEffect(() => {
    //     //call api
    //     //do initial loading pattern
    //     setIsLoading(true)
    //     listUsers().then((data) => {
    //         console.log(data)
    //         setUsers(data)
    //         setIsLoading(false)
    //     })
    // }, []) // dependency array



    return <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4">Users</Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/users/add')}>Add User</Button>
        </Box>
        {error && <Box sx={{ my: 2 }}><Alert severity="error">{error}</Alert></Box>}
        <DataGrid
            loading={isLoading}
            columns={columns}
            rows={users}
            onRowClick={(params) => {
                navigate(`/users/${params.id}`)
            }}
            disableRowSelectionOnClick
        />

    </Box>
}