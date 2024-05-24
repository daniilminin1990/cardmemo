import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import Typography from '@/common/components/typography/typography'
import * as RadixSlider from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './slider.module.scss'

type SliderProps = {
  label: string
} & ComponentPropsWithoutRef<typeof RadixSlider.Root>

const Slider = forwardRef<ElementRef<typeof RadixSlider.Root>, SliderProps>((props, ref) => {
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
        <RadixSlider.Root className={classNames.root} ref={ref} {...rest}>
          <RadixSlider.Track className={classNames.track}>
            <RadixSlider.Range className={classNames.range} />
          </RadixSlider.Track>
          <RadixSlider.Thumb aria-label={'valueMin'} className={classNames.thumb} />
          <RadixSlider.Thumb aria-label={'valueMax'} className={classNames.thumb} />
        </RadixSlider.Root>
        <Typography as={'div'} className={classNames.valueWrapper} variant={'body1'}>
          {rest?.value?.[1]}
        </Typography>
      </div>
    </>
  )
})

export default Slider
