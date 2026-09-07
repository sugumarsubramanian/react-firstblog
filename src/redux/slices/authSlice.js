const { createSlice } = require("@reduxjs/toolkit");

const storedUser = localStorage.getItem('user');
const storedToken =  localStorage.getItem('token');

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: storedUser ? JSON.parse(storedUser) : null,
        token: storedToken || null
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
        },
        logout: (state, action) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;