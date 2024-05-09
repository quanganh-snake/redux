import { createAction, createReducer } from "@reduxjs/toolkit";
import { initialPostList } from "constants/blog";
import { Blog } from "types/blog";

interface IBlogState {
    postList: Blog[]
}

const initialState: IBlogState = {
    postList: initialPostList
}

export const addPost = createAction<Blog>('blog/addPost')

export const blogReducer = createReducer(initialState, builder => {
    builder.addCase(addPost, (state, action) => {
        // immerjs -> giúp mutate 1 state an toàn
        // đảm bảo initialState không bị thay đổi
    })
})

export default blogReducer