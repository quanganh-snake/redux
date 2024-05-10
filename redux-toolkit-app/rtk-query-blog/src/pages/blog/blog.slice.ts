import { AsyncThunk, createAsyncThunk, createSlice, current, PayloadAction, nanoid } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { Blog } from 'types/blog'
import http from 'utils/http'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface IBlogState {
    postList: Blog[],
    editingPost: Blog | null,
    loading: boolean,
    currentRequestId: string | undefined
}


const initialState: IBlogState = {
    postList: [],
    editingPost: null,
    loading: false,
    currentRequestId: undefined
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
    const res = await http.post<Blog>('/posts', { ...post, id: nanoid() }, {
        signal: thunkAPI.signal
    })
    return res.data
})

export const editPost = createAsyncThunk('blog/editPost', async ({ postId, post }: { postId: string, post: Blog }, thunkAPI) => {

    try {
        const res = await http.put<Blog>(`/posts/${postId}`, post, {
            signal: thunkAPI.signal
        })
        return res.data
    } catch (error: AxiosError | any) {
        if (error.name === 'AxiosError' && error.code === 'ERR_BAD_REQUEST') {
            return thunkAPI.rejectWithValue(error.response.data)
        }
        throw error
    }
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
                    state.currentRequestId = action.meta.requestId
                })
            .addMatcher<RejectedAction | FulfilledAction>(
                (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
                (state, action) => {
                    if (state.loading && state.currentRequestId === action.meta.requestId) {
                        state.loading = false
                        state.currentRequestId = undefined
                    }
                })
            // .addMatcher<FulfilledAction>(
            //     (action) => action.type.endsWith('/fulfilled'),
            //     (state, action) => {
            //         if (state.loading && state.currentRequestId === action.meta.requestId) {
            //             state.loading = false
            //             state.currentRequestId = undefined
            //         }
            //     })
            .addDefaultCase((state, action) => {
                // console.warn(`action type: ${action.type}`, current(state));
            })
    }
})

export const { cancelEditingPost, startEditingPost
} = blogSlice.actions

const blogReducer = blogSlice.reducer
export default blogReducer