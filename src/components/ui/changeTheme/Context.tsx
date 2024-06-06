import { Dispatch, SetStateAction, createContext, useState } from 'react'

export type UserContextProps = {
  setTheme: Dispatch<SetStateAction<string>>
  theme: string,
  blur: boolean,
  setBlur: Dispatch<SetStateAction<boolean>>
}
export const UserContext = createContext<UserContextProps | null>(null)

const Context = (props: any) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'moon')
  const [blur, setBlur] = useState(true);

  const value = {
    setTheme,
    theme,
    blur,
    setBlur
  }

  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
}

export default Context
