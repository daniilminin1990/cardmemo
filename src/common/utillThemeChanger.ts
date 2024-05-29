export const changeTheme = (newTheme: any) => {
  const root = document.documentElement

  Object.keys(newTheme).forEach(key => {
    root.style.setProperty(`--${key}`, newTheme[key])
  })
}
