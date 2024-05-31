type changeThemeProps = {
  [key: string]: string
}
export const changeTheme = (newTheme: changeThemeProps) => {
  const root = document.documentElement

  Object.keys(newTheme).forEach(key => {
    root.style.setProperty(`--${key}`, newTheme[key])
  })
}
