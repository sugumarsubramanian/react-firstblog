import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { postApi } from '../redux/api/postapi';
import { categoryApi } from '../redux/api/categoryapi';
import { authApi } from '../redux/api/authapi';
import authReducer from '../redux/slices/authSlice';

export const store = configureStore({
    reducer: {
        [postApi.reducerPath]: postApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postApi.middleware, categoryApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);
