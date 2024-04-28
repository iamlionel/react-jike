import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken } from "@/utils/token"

const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || ''
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
        }
    }
})

const { setToken } = userStore.actions

const fetchToken = (loginForm) => {
    return async (dispatch) => {
        const res = await request.post('/authorizations', loginForm)
        dispatch(setToken(res.data.token))
    }
}

const userReducer = userStore.reducer

export { setToken, fetchToken }

export default userReducer