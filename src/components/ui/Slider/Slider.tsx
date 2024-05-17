import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import Typography from '@/components/ui/Typography/Typography'
import * as Slider from '@radix-ui/react-slider'

import './Slider.scss'

type SliderProps = {
  label: string
} & ComponentPropsWithoutRef<typeof Slider.Root>

const RadixSlider = forwardRef<ElementRef<typeof Slider.Root>, SliderProps>((props, ref) => {
  const { className, label, ...rest } = props

  return (
    <>
      {label && (
        <Typography as={'label'} variant={'body2'}>
          {label}
        </Typography>
      )}
      <div className={'sliderContainer'}>
        <Typography as={'div'} className={'valueWrapper'} variant={'body1'}>
          {rest?.value?.[0]}
        </Typography>
        <Slider.Root className={`root ${className}`} ref={ref} {...rest}>
          <Slider.Track className={'track'}>
            <Slider.Range className={'range'} />
          </Slider.Track>
          <Slider.Thumb aria-label={'Value min'} className={'thumb'} />
          <Slider.Thumb aria-label={'Value max'} className={'thumb'} />
        </Slider.Root>
        <Typography as={'div'} className={'valueWrapper'} variant={'body1'}>
          {rest?.value?.[1]}
        </Typography>
      </div>
    </>
  )
})

export default RadixSlider
