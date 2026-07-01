import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface UserDataState {
    userData?: {
        token: string,
        userId: number,
        roleId: number,
        name: string,
        email: string,
    } 
}

const initialState: UserDataState = {
    userData: undefined
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserDataState>) => {
            state.userData = action.payload.userData
        },
        clearUserData: (state) => {
            state.userData = undefined
        }
    }
})

export const { setUserData, clearUserData } = userSlice.actions
export default userSlice.reducer