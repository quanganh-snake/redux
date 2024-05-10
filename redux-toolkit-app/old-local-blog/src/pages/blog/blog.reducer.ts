import { createAction, createReducer, current, PayloadAction } from '@reduxjs/toolkit'
import { initialPostList } from 'constants/blog'
import { Blog } from 'types/blog'
import { RootState } from 'store';


interface IBlogState {
    postList: Blog[],
    editingPost: Blog | null,
    handlePost: 'ADD_POST' | 'EDIT_POST'
}


const initialState: IBlogState = {
    postList: initialPostList,
    editingPost: null,
    handlePost: 'ADD_POST'
}

export const addPost = createAction<Blog>('blog/addPost')
export const removePost = createAction<string>('blog/removePost')
export const startEditingPost = createAction<string>('blog/startEditingPost')
export const cancelEditingPost = createAction('blog/cancelEditingPost')
export const finishEditingPost = createAction<Blog>('blog/finishEditingPost')

// builder callback Redux Toolkit
export const blogReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addPost, (state, action) => {
            // immerjs -> giúp mutate 1 state an toàn
            // đảm bảo initialState không bị thay đổi
            state.handlePost = 'ADD_POST'
            const post = action.payload
            state.postList.push(post)
        })
        .addCase(removePost, (state, action) => {
            const postId = action.payload
            const foundPostIndex = state.postList.findIndex((post) => post.id === postId)
            if (foundPostIndex !== -1) {
                state.postList.splice(foundPostIndex, 1)
            }
        }).addCase(startEditingPost, (state, action) => {
            const postId = action.payload
            const foundPost = state.postList.find((post) => post.id === postId) || null
            state.handlePost = 'EDIT_POST'
            state.editingPost = foundPost
        }).addCase(cancelEditingPost, (state) => {
            state.editingPost = null
        }).addCase(finishEditingPost, (state, action) => {
            const post = action.payload
            const foundPostIndex = state.postList.findIndex((p) => p.id === post.id)
            if (foundPostIndex !== -1) {
                state.postList[foundPostIndex] = post
                state.editingPost = null
                state.handlePost = 'ADD_POST'
            }
        }).addMatcher((actionMatcher) => {
            return actionMatcher.type.includes('cancel')
        }, (state, action) => {
            console.log(current(state));
        }).addDefaultCase((state) => state)
})



export default blogReducer
