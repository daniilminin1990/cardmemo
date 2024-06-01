import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'

import { flashCardsAPI } from './flashCardsAPI'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(flashCardsAPI.middleware),
  reducer: {
    // [cardsSlice.name]: cardsSlice.reducer,
    [flashCardsAPI.reducerPath]: flashCardsAPI.reducer,
  },
})

export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
