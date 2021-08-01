export default {
  initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'} as const),
  toggleTheme: (theme: boolean) => ({type: 'TOGGLE_THEME', theme} as const)
}