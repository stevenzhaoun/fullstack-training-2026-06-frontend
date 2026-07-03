import { useDispatch } from "react-redux"
import { clearUserData, setUserData as setUserDataAction } from "../slices/userSlice"
import { login as loginApi } from "../api/users.api"
import { useNavigate } from "react-router"
import client from "../api/client"
import { useAppSelector } from "./redux"

export const useUser = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const userData = useAppSelector((state) => {
        return state.userData?.userData
    })

    const login = async (email: string, password: string) => {
        const response = await loginApi(email, password)
        setUserData({
            token: response.token,
            userId: response.user.id,
            roleId: response.user.roleId,
            name: response.user.name,
            email: response.user.email,
        })
        navigate('/')
    }

    const setUserData = (userData: {
        token: string,
        userId: number,
        roleId: number,
        name: string,
        email: string,
    }) => {
        client.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
        localStorage.setItem('userData', JSON.stringify(userData))
        dispatch(setUserDataAction({
            userData
        }))
    }

    const logout = () => {
        client.defaults.headers.common['Authorization'] = undefined
        localStorage.removeItem('userData')
        dispatch(clearUserData())
    }

    return { login, userData, setUserData, logout }
}