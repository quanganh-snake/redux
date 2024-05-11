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
  postId: string,
  editingPost: Blog | null,
  loading: boolean,
  currentRequestId: string | undefined
}


const initialState: IBlogState = {
  postList: [],
  postId: '',
  editingPost: null,
  loading: false,
  currentRequestId: undefined
}
// useSlice
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {

    startEditingPost: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const foundPost = state.postList.find((post) => post.id === postId) || null
      state.editingPost = foundPost
      state.postId = postId
    },
    cancelEditingPost: (state) => {
      state.editingPost = null
    },
  },
})

export const { cancelEditingPost, startEditingPost
} = blogSlice.actions

const blogReducer = blogSlice.reducer
export default blogReducer