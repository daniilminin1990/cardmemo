import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'

const SvgPrivacyMaskComponent = (
  { className, ...props }: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    className={className}
    data-name={'2'}
    height={'1em'}
    id={'_2'}
    ref={ref}
    viewBox={'0 0 800 367.33'}
    width={'1em'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <title>privacyMask</title>
    <path
      d={
        'M798.17,201.65c-4.61-32.29-4.61-55.37-23.07-41.52S642.83,202.7,521.35,215.49c-57,6-95.39,22.76-121.35,42.6-26-19.84-64.34-36.59-121.35-42.6C157.16,202.7,43.35,174,24.9,160.13S6.44,169.36,1.83,201.65C-6.66,261,11.05,427.73,126.4,487.7,248.1,551,334,515.38,375.54,492.32A259.38,259.38,0,0,0,400,476.86a256.82,256.82,0,0,0,24.46,15.46C466,515.38,551.9,551,673.6,487.7,788.94,427.73,806.65,261,798.17,201.65ZM248.81,418.56c-52-4-104-56-104-100,0,0,80,4,116,8s64,32,64,48S300.8,422.54,248.81,418.56Zm302.37,0c-52,4-76-28-76-44s28-44,64-48,115.95-8,115.95-8C655.14,362.56,603.17,414.55,551.18,418.56Z'
      }
      transform={'translate(0 -156.03)'}
    />
  </svg>
)

const ForwardRef = forwardRef(SvgPrivacyMaskComponent)
const Memo = memo(ForwardRef)

export default Memo
