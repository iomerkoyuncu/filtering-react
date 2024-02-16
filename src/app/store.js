import { configureStore } from "@reduxjs/toolkit"
import badgeCountReducer from "../features/badgeCount/badgeCountSlice"

export const store = configureStore({
  reducer: {
    badgeCount: badgeCountReducer,
  },
})
