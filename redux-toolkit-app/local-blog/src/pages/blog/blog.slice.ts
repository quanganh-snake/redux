import { AsyncThunk, createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { Blog } from 'types/blog'
import http from 'utils/http'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface IBlogState {
    postList: Blog[],
    editingPost: Blog | null,
    handlePost: 'ADD_POST' | 'EDIT_POST',
    loading: boolean
}


const initialState: IBlogState = {
    postList: [],
    editingPost: null,
    handlePost: 'ADD_POST',
    loading: false
}

// fetch api data với AsyncThunk - Redux Toolkit
// -> Nên dùng ở extraReducers
// -> dùng ở reducers -> sẽ genarate ra action -> chỉ tùy khi cần ms dùng
export const getPostList = createAsyncThunk('blog/getPostList', async (_, thunkAPI) => {
    const res = await http.get<Blog[]>('/posts', {
        signal: thunkAPI.signal
    })
    return res.data
})

export const addPost = createAsyncThunk('blog/addPost', async (post: Omit<Blog, 'id'>, thunkAPI) => {
    const res = await http.post<Blog>('/posts', post, {
        signal: thunkAPI.signal
    })
    return res.data
})

export const editPost = createAsyncThunk('blog/editPost', async ({ postId, post }: { postId: string, post: Blog }, thunkAPI) => {
    const res = await http.put<Blog>(`/posts/${postId}`, post, {
        signal: thunkAPI.signal
    })
    return res.data
})
export const deletePost = createAsyncThunk('blog/deletePost', async (postId: string, thunkAPI) => {
    const res = await http.delete<Blog>(`/posts/${postId}`, {
        signal: thunkAPI.signal
    })
    return res.data
})

// useSlice
const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {

        startEditingPost: (state, action: PayloadAction<string>) => {
            const postId = action.payload
            const foundPost = state.postList.find((post) => post.id === postId) || null
            state.handlePost = 'EDIT_POST'
            state.editingPost = foundPost
        },
        cancelEditingPost: (state) => {
            state.editingPost = null
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getPostList.fulfilled, (state, action) => {
                state.postList = action.payload
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.postList.push(action.payload)
            })
            .addCase(editPost.fulfilled, (state, action) => {
                const postId = action.payload.id
                const foundPostIndex = state.postList.findIndex((post) => post.id === postId)
                if (foundPostIndex !== -1) {
                    state.postList[foundPostIndex] = action.payload
                }
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const postId = action.meta.arg // action.meta.arg -> lấy ra các tham số truyền vào từ action
                // const postId = action.payload.id
                const foundPostIndex = state.postList.findIndex((post) => post.id === postId)
                if (foundPostIndex !== -1) {
                    state.postList.splice(foundPostIndex, 1)
                }
            })
            .addMatcher<PendingAction>(
                (action) => action.type.endsWith('/pending'),
                (state, action) => {
                    state.loading = true
                })
            .addMatcher<RejectedAction>(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.loading = false
                })
            .addMatcher<RejectedAction>(
                (action) => action.type.endsWith('/fulfilled'),
                (state, action) => {
                    state.loading = true
                })
            .addDefaultCase((state, action) => {
                // console.warn(`action type: ${action.type}`, current(state));
            })
    }
})

export const { cancelEditingPost, startEditingPost
} = blogSlice.actions

const blogReducer = blogSlice.reducer
export default blogReducer