import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { blogApi } from 'pages/blog/blog.service'
import blogReducer from 'pages/blog/blog.slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        blog: blogReducer,
        [blogApi.reducerPath]: blogApi.reducer
    },
    // Với RTK Query cần thêm middleware để enable các tính năng như caching, invalidation, polling
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware)
})

// Optional, nhưng bắt buộc dùng nếu cần mở tính năng refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch)

// Lấy RootState và AppDispatch trong store -> tạo type cho Typescript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Khi dispatch AsyncThunk -> cần kiểu dữ liệu khai báo cho dispatch [dùng với TypeScript]
export const useDispatchThunk = () => useDispatch<AppDispatch>()