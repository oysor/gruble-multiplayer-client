import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RoomState, AppDispatch } from './roomStore'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RoomState> = useSelector
