export type mapStateToProps = {
  initialized: boolean
}
export type mapDispatchToProps = {
  initializeApp: () => void
}

export type Props = {
  theme: 'light' | 'dark'
  toggleTheme: (theme: string) => void
}

export type storeProps = mapStateToProps & mapDispatchToProps