import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "pages/blog/blog.reducer";

export const store = configureStore({
    reducer: {
        blog: blogReducer
    },
})

// Lấy RootState và AppDispatch trong store -> tạo type cho Typescript
export type RootState = ReturnType<typeof store.getState>
export type AppState = ReturnType<typeof store.dispatch>
