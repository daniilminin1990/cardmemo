import { Dispatch, SetStateAction, createContext, useState } from 'react'

type UserContextProps = {
  setTheme: Dispatch<SetStateAction<string>>
  theme: string
}
export const UserContext = createContext<UserContextProps | null>(null)
const Context = (props: any) => {
  const [theme, setTheme] = useState('moon')
  const value = {
    setTheme,
    theme,
  }

  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
}

export default Context
