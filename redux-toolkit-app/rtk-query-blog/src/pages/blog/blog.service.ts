import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Blog } from 'types/blog'

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: (builder) => ({
        getPostList: builder.query<Blog[], void>({
            query: () => '/posts'
        })
    })
})

export const { useGetPostListQuery } = blogApi