import { memo } from 'react'

import { path } from '@/app/router/path'
import { Button } from '@/components/ui/button'

import style from './ErrorPage.module.scss'

import Error from '../../assets/img/404.png'
const ErrorPage = memo(() => {
  return (
    <div className={style.box}>
      <div>
        <img alt={''} src={Error} />
        <div className={style.boxFooter}>
          <span className={style.text}>Sorry! Page not found!</span>
          <Button as={'a'} className={style.btn} href={`${path.decks}`}>
            Back to home page
          </Button>
        </div>
      </div>
    </div>
  )
})

export default ErrorPage
