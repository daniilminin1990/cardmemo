import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import Typography from '@/components/ui/Typography/Typography'
import * as Slider from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './Slider.module.scss'

type SliderProps = {
  label: string
} & ComponentPropsWithoutRef<typeof Slider.Root>

const RadixSlider = forwardRef<ElementRef<typeof Slider.Root>, SliderProps>((props, ref) => {
  const { className, label, ...rest } = props
  const classNames = {
    range: clsx(s.range),
    root: clsx(s.root, className),
    sliderContainer: clsx(s.sliderContainer),
    thumb: clsx(s.thumb),
    track: clsx(s.track),
    valueWrapper: clsx(s.valueWrapper),
  }

  return (
    <>
      {label && (
        <Typography as={'label'} variant={'body2'}>
          {label}
        </Typography>
      )}
      <div className={classNames.sliderContainer}>
        <Typography as={'div'} className={classNames.valueWrapper} variant={'body1'}>
          {rest?.value?.[0]}
        </Typography>
        <Slider.Root className={classNames.root} ref={ref} {...rest}>
          <Slider.Track className={classNames.track}>
            <Slider.Range className={classNames.range} />
          </Slider.Track>
          <Slider.Thumb aria-label={'valueMin'} className={classNames.thumb} />
          <Slider.Thumb aria-label={'valueMax'} className={classNames.thumb} />
        </Slider.Root>
        <Typography as={'div'} className={classNames.valueWrapper} variant={'body1'}>
          {rest?.value?.[1]}
        </Typography>
      </div>
    </>
  )
})

export default RadixSlider
