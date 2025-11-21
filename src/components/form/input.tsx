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
      'transition flex h-14 w-full rounded-xl border border-input bg-background px-4 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      hasError && 'border-2 border-red-600',
      className,
    )
    const { children, ...rest } = props;

    return (
      <div className="w-full">
        {showPrefix ? (
          <div className={baseInputClasses}>
            <div className="flex w-ful items-center gap-1 h-full">
              {props.children}
              <input
                type={type}
                className="w-full h-full bg-transparent outline-0"
                ref={ref}
                {...rest}
              />
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
