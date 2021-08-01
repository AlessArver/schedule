import { AppActions } from '../actions'
import { InferActionsTypes, ThunkType } from '../index'
import { getAuthUser } from './auth'

const initialState = {
  initialized: false,
  theme: 'light' as 'light' | 'dark'
}
type State = typeof initialState
type Actions = InferActionsTypes<typeof AppActions>
type T = ThunkType<Actions>

const app = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case 'INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true
      }
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      }
    default:
      return state
  }
}
export default app

export const initializeApp = () => async (dispatch: any) => {
  dispatch(getAuthUser())
    .then(() => dispatch(AppActions.initializedSuccess()))
}

export const toggleTheme = (theme: boolean) => (dispatch: any) => {
  dispatch(AppActions.toggleTheme(theme))
}

export const fetchItems = () => async (dispatch: any) => {
  
};
