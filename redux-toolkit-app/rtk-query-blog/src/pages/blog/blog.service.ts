import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Blog } from 'types/blog'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPostList: builder.query<Blog[], void>({
      query: () => '/posts',
      /**
       * providesTags: có thể là array hoặc callback return về array
       * Nếu có bất kỳ 1 invalidatesTag nào match với providesTags này thì sẽ làm cho method getPostList chạy lại.
       * và cập nhật lại danh sách các bài post cũng như các tags phía dưới
       * @param result 
       * @param error 
       * @param arg 
       * @returns 
       */
      providesTags(result) {
        /**
         * Callback này sẽ chạy mỗi khi getPosts chạy
         * Mong muốn là sẽ return về 1 mảng có kiểu
         * ```ts
         * interface Tags: {
         *    type: 'Posts',
         *    id: string
         * }[]
         * ```
         */
        return result ? [...result.map(({ id }) => ({ type: 'Posts' as const, id })), { type: 'Posts' as const, id: 'LIST' }]
          : [{ type: 'Posts' as const, id: 'LIST' }]
      }
    }),
    addPost: builder.mutation<Blog, Omit<Blog, 'id'>>({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post
      }),
      /**
       * invalidatesTags: cung cấp các tag để báo hiệu cho những method nào có providesTags
       * match với nó thì sẽ được gọi lại -> getPostList được gọi lại
       * @param result 
       * @param error 
       * @param body 
       * @returns 
       */
      invalidatesTags: (result, error, body) => [{ type: 'Posts', id: 'LIST' }]
    }),
    getPost: builder.query<Blog, string | undefined>({
      query: (id) => `/posts/${id}`
    }),
    updatePost: builder.mutation<Blog, { id: string; body: Blog }>({
      query: (post) => {
        return ({
          url: `/posts/${post.id}`,
          method: 'PUT',
          body: post.body
        })
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }]
    })
  })
})

export const { useGetPostListQuery, useAddPostMutation, useGetPostQuery, useUpdatePostMutation } = blogApi