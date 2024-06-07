import { Dispatch, SetStateAction, createContext, useState } from 'react'

export type UserContextProps = {
  blur: boolean
  setBlur: Dispatch<SetStateAction<boolean>>
  setTheme: Dispatch<SetStateAction<string>>
  theme: string
}
export const UserContext = createContext<UserContextProps | null>(null)

const Context = (props: any) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'moon')
  const [blur, setBlur] = useState(true)

  const value = {
    blur,
    setBlur,
    setTheme,
    theme,
  }

  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
}

export default Context
