import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showPrefix: boolean
  errors?: FieldError
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, showPrefix = false, errors, ...props }, ref) => {
    const hasError = !!errors

    const baseInputClasses = cn(
      'transition px-4 h-14 w-full bg-zinc-100 text-zinc-200 rounded-xl focus-within:outline outline-offset-2 outline-2 outline-zinc-100',
      hasError && 'border-2 border-red-600',
      className,
    )
    const { children, ...rest } = props;

    return (
      <div>
        {showPrefix ? (
          <div className={baseInputClasses}>
            <div className="flex items-center gap-1 h-full">
              {props.children}
              <div>
                <input
                  type={type}
                  className="w-full h-full bg-transparent outline-0"
                  ref={ref}
                  {...rest}
                />
              </div>
            </div>
          </div>
        ) : (
          <input
            type={type}
            className={baseInputClasses}
            ref={ref}
            {...props}
          />
        )}

        {hasError && (
          <p className="text-start mt-2 text-sm text-red-400">
            {errors.message}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
