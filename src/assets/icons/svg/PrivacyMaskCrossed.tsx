import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'

const SvgPrivacyMaskCrossedComponent = (
  { className, ...props }: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    className={className}
    data-name={'2'}
    height={'1em'}
    id={'_2'}
    ref={ref}
    viewBox={'0 0 800 619.04'}
    width={'1em'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <title>privacyMaskCrossed</title>
    <path
      d={
        'M573.27,323.59c37.51-2.79,81.87-5,81.87-5,0,44-52,96-104,100-26.48,2-45.7-5.28-58.18-15.05l-81.48,81.11c4.07,2.58,8.36,5.16,12.94,7.7C466,515.38,551.9,551,673.6,487.7c115.34-60,133-226.67,124.57-286-4.61-32.29-4.61-55.37-23.07-41.52C768,165.46,746.73,173,716.34,181Z'
      }
      fill={'currentColor'}
      transform={'translate(0 -30.34)'}
    />
    <path
      d={
        'M362.52,236.27c-22.14-9.69-49.65-17.17-83.87-20.78C157.16,202.7,43.35,174,24.9,160.13S6.44,169.36,1.83,201.65C-6.4,259.21,10,417.62,116.08,481.9l82.18-81.59c-30.55-19.88-53.41-52.56-53.41-81.72,0,0,80,4,116,8a81.27,81.27,0,0,1,9.34,1.6Z'
      }
      fill={'currentColor'}
      transform={'translate(0 -30.34)'}
    />
    <path
      d={
        'M138.4,649.38a40,40,0,0,1-28.28-68.28l539-539.05a40,40,0,0,1,56.57,56.57l-539,539.05A39.92,39.92,0,0,1,138.4,649.38Z'
      }
      fill={'currentColor'}
      transform={'translate(0 -30.34)'}
    />
  </svg>
)

const ForwardRef = forwardRef(SvgPrivacyMaskCrossedComponent)
const Memo = memo(ForwardRef)

export default Memo
