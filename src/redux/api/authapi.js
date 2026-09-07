import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './config';
import { setCredentials } from '../slices/authSlice';


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery({
        baseUrl: 'http://localhost:5000/api/auth',
    }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (userData) => ({ url: '/signup', method: 'POST', data: userData }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }){
                try{
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials({ user: data.user, token: data.token }));
                }catch(error){
                    console.log("Signup Error", error.message);
                }
            }
        }),
        login: builder.mutation({
            query: (credentials) => ({ url: '/login', method: 'POST', data: credentials }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }){
                try{
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials({ user: data.user, token: data.token }));
                }catch(error){
                    console.log("Login Error", error.message);
                }
            }
        })
    })
});

export const { 
    useSignupMutation,
    useLoginMutation 
} = authApi;