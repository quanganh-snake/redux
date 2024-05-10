import { configureStore } from '@reduxjs/toolkit'
import blogReducer from 'pages/blog/blog.slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        blog: blogReducer
    }
})

// Lấy RootState và AppDispatch trong store -> tạo type cho Typescript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Khi dispatch AsyncThunk -> cần kiểu dữ liệu khai báo cho dispatch [dùng với TypeScript]
export const useDispatchThunk = () => useDispatch<AppDispatch>()