
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './config';

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: axiosBaseQuery({
        baseUrl: 'http://localhost:5000/api/posts',
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: () => ({ url: '/'}),
            providesTags: ['Post']
        }),
        getPostById: builder.query({
            query: (id) => ({ url: `/${id}` }),
            providesTags: ['Post']
        }),
        createPost: builder.mutation({
            query: (post) => ({ url: '/', method: 'POST', data: post }),
            invalidatesTags: ['Post']
        }),
        updatePost: builder.mutation({
            query: ({ id, ...post }) => ({ url: `/${id}`, method: 'PUT', data: post }),
            invalidatesTags: ['Post']
        }),
        deletePost: builder.mutation({
            query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Post']
        }),
        getPostsByCategory: builder.query({
            query: (categoryId) => ({ url: `/category/${categoryId}` }),
            providesTags: ['Post']
        }),
        getMyPosts: builder.query({
            query: () => ({ url: '/mine' }),
            providesTags: ['Post']
        }),
    })
});

export const {
    useGetAllPostsQuery,
    useGetPostByIdQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useGetPostsByCategoryQuery,
    useGetMyPostsQuery
} = postApi;