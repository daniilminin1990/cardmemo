import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import Typography from '@/components/ui/Typography/Typography'
import * as SliderPrimitive from '@radix-ui/react-slider'
import clsx from 'clsx'

import s from './slider.module.scss'

export type SliderProps = {
  label: string
  max?: number
  min?: number
  onChange?: (value: number[]) => void
  step?: number
  value: number[]
} & ComponentPropsWithoutRef<typeof SliderPrimitive.Root>

export const Slider = forwardRef<ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, label, max, min, onChange, step = 1, value, ...restProps }, ref) => {
    return (
      <div>
        {label && (
          <Typography as={'label'} variant={'body2'}>
            {label}
          </Typography>
        )}
        <div className={s.container}>
          <Typography as={'div'} className={s.sliderValues} variant={'body1'}>
            {value?.[0]}
          </Typography>
          <SliderPrimitive.Root
            className={clsx(s.root, className)}
            max={max}
            min={min}
            onValueChange={onChange}
            ref={ref}
            step={step}
            value={value}
            {...restProps}
          >
            <SliderPrimitive.Track className={s.track}>
              <SliderPrimitive.Range className={s.range} />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb aria-label={'Value min'} className={s.thumb} />
            <SliderPrimitive.Thumb aria-label={'Value max'} className={s.thumb} />
          </SliderPrimitive.Root>
          <Typography as={'div'} className={s.sliderValues} variant={'body1'}>
            {value?.[1]}
          </Typography>
        </div>
      </div>
    )
  }
)
