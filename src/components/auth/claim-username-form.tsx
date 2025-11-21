'use client'

import { useRouter } from 'next/navigation'
import { Loader2, Check, X, ArrowRight } from 'lucide-react'

import { Button } from '../ui/button'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'
import { useState, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Input } from '../form/input'

interface ClaimUsernameFormProps {
  redirectTo: string
}

export function ClaimUsernameForm({ redirectTo }: ClaimUsernameFormProps) {
  const [usernameIsValid, setUsernameIsValid] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [username, setUsername] = useState('')
  const router = useRouter()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleSearch = useCallback(async (term: string) => {
    setUsername(term)

    if (!term.trim()) {
      setUsernameIsValid(null)
      setIsChecking(false)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      return
    }

    setIsChecking(true)
    setUsernameIsValid(null)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        const response = await api.get(`/users/search?username=${term}`)
        setUsernameIsValid(!response.data.existing)
      } catch (error) {
        console.error('Error checking username:', error)
        setUsernameIsValid(null)
      } finally {
        setIsChecking(false)
      }
    }, 700)
  }, [])

  const handleClaimUsername = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!username.trim() || usernameIsValid === false) {
      return
    }

    router.push(`${redirectTo}?username=${username}`)
  }

  const inputBorderClass = usernameIsValid === null
    ? ''
    : usernameIsValid
      ? ' border-2 border-green-500/50 focus-within:border-green-500 focus-within:ring-green-500/20'
      : ' border-2 border-red-500/50 focus-within:border-red-500 focus-within:ring-red-500/20'

  const isFormValid = username.trim() && usernameIsValid === true

  return (
    <form onSubmit={handleClaimUsername} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto">
      <div className="relative flex-1 group">
        <Input
          showPrefix
          name="username"
          placeholder="seu-usuario"
          className={cn(
            'h-14 ',
            inputBorderClass
          )}
          autoComplete="username"
          value={username}
          onChange={(e) => handleSearch(e.target.value)}
        >
          <span className="text-muted-foreground font-medium">linktree.com/</span>
        </Input>

        {/* Status Indicator */}
        <div className="absolute right-4 top-0 h-full flex items-center justify-center w-5">
          <AnimatePresence mode="wait">
            {isChecking ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Loader2 className="animate-spin text-muted-foreground" size={18} />
              </motion.div>
            ) : usernameIsValid === true ? (
              <motion.div
                key="valid"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Check className="text-green-500" size={18} />
              </motion.div>
            ) : usernameIsValid === false ? (
              <motion.div
                key="invalid"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <X className="text-red-500" size={18} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <Button
        className={cn(
          "h-14 px-8 text-base font-semibold transition-all duration-300 shadow-sm",
          isFormValid
            ? "bg-primary hover:bg-primary/90 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            : "opacity-80"
        )}
        type="submit"
        disabled={!isFormValid || isChecking}
        size="lg"
      >
        <span className="mr-2">Reservar</span>
        <ArrowRight className={cn("size-4 transition-transform duration-300", isFormValid && "group-hover:translate-x-1")} />
      </Button>
    </form>
  )
}
