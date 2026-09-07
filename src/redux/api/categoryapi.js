import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './config';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: axiosBaseQuery({
        baseUrl: 'http://localhost:5000/api/categories',
    }),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => ({ url: '/' }),
            providesTags: ['Category']
        }),
        getCategoryById: builder.query({
            query: (id) => ({ url: `/${id}` }),
            providesTags: ['Category']
        }),
        createCategory: builder.mutation({
            query: (category) => ({ url: '/', method: 'POST', data: category}),
            invalidatesTags: ['Category']
        }),
        updateCategory:  builder.mutation({
            query: ({ id, ...category }) => ({ url: `/${id}`, method: 'PUT', data: category }),
            invalidatesTags: ['Category']
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Category']
        })
    }),
});

export const {
    useGetAllCategoriesQuery,
    useGetCategoryByIdQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoryApi;