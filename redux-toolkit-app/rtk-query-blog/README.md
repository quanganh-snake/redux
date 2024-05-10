# Redux Toolkit, with:

## createSlice:

- Kết hợp của createReducer và createAction

- Ưu tiên dùng nhiều trong dự án

- Ưu điểm: không cần tạo action vì action nó sẽ tự động được generate ra theo cơ chế Map object

- Cần export 2 thứ:

  - 1. actions -> dùng cho dispatch

  - 2. reducer -> khai báo vào store

-> Đây là cách code với Redux Toolkit kiểu mới (Cách 2)

```typescript
// Cách khởi tạo 1 Slice - Redux Toolkit
import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// tạo interface (nếu dùng typescript)
interface CounterState {
  value: number
}

// khởi tạo state mặc định
const initialState = { value: 0 } as CounterState

// Tạo slice
const counterSlice = createSlice({
  name: 'counter', // name: là PREFIX cho action type của 1 slice - nó nên là unique - duy nhất
  initialState, // Giá trị khởi tạo cho 1 reducer - hoặc có thể là 1 function khởi tạo
  reducers: {
    // reducers: chứa danh sash các action cần dùng

    /**
     * increment: key name tạo ra 1 generate ra action
     * state: immerjs của initialState được khởi tạo
     * action: chứa type - payload
     * + type: name của action
     * + payload: giá trị nhận được
     */
    increment: (state, action) => {
      state.value += action.payload
    },
    decrement: (state, action) => {
      state.value -= action.payload
    }
  },
  exextraReducers(builder) {
    builder
      .addMatcher(
        (action) => action.type.includes('cancel'),
        (state, action) => {
          console.log(current(state))
        }
      )
      .addDefaultCase((state, action) => {
        console.log(`action type: ${action.type}`, current(state))
      })
  }
})
```

### Khi nào dùng **reducers** - khi nào dùng **exextraReducers**

- dùng **reducers** khi muốn:

  - genarate ra các action

- dùng **exextraReducers** khi muốn:

  - Không muốn genarate action
  - khi dùng với createAsyncThunk

  - addMatcher -> dùng song song với createAsyncThunk -> để matcher với các type 'pending', 'fulfilled', 'rejected' -> thay vì mỗi action lại khai báo 1 state loading
  - addDefaultCase
