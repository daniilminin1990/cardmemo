import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { appSlice } from '@/app/model/app.slice'
import { flashCardsAPI } from '@/services/flashCardsAPI'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(flashCardsAPI.middleware),
  reducer: {
    app: appSlice.reducer,
    [flashCardsAPI.reducerPath]: flashCardsAPI.reducer,
  },
})

export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
