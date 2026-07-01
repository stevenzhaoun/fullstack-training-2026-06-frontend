import { useEffect } from "react"
import { useUser } from "../hooks/useUser"
import { useLocation, useNavigate } from "react-router"

export default function RootContainer(props: { children: React.ReactNode }) {
    const { userData, setUserData } = useUser()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if(userData) {
            if(location.pathname === '/login') {
                navigate('/')
            }
        } else {
            const userDataString = localStorage.getItem('userData')
            if(userDataString) {
                const userData = JSON.parse(userDataString)
                setUserData(userData)
            } else {
                if(location.pathname !== '/login') {
                    navigate('/login')
                }
            }
        }
    }, [userData])


    return props.children
}