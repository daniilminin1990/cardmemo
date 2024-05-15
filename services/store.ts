import { configureStore } from '@reduxjs/toolkit'

import { flashCardsAPI } from './flashCardsAPI'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(flashCardsAPI.middleware),
  reducer: {
    [flashCardsAPI.reducerPath]: flashCardsAPI.reducer,
  },
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
