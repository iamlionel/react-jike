import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, clearToken, getToken } from "@/utils/token"
import { getProfileAPI, loginAPI } from "@/apis/user";

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            clearToken()
        }
    }
})

const { setToken, setUserInfo, clearUserInfo } = userStore.actions

const fetchToken = (loginForm) => {
    return async (dispatch) => {
        const res = await loginAPI(loginForm)
        dispatch(setToken(res.data.token))
    }
}

const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await getProfileAPI()
        dispatch(setUserInfo(res.data))
    }
}

const userReducer = userStore.reducer

export { setToken, fetchToken, fetchUserInfo, clearUserInfo }

export default userReducer