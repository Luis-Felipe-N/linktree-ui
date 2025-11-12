'use client'

import { useRouter } from 'next/navigation'
import { Loader2, Check, X } from 'lucide-react'
import { Input } from '../form/input'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'
import { useState, useRef, useCallback } from 'react'

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

    // Iniciar loading
    setIsChecking(true)
    setUsernameIsValid(null)

    // Limpar timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Debounce de 700ms
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
      ? 'border-green-300 focus-within:outline-green-500'
      : 'border-red-500 focus-within:outline-red-500'

  const isFormValid = username.trim() && usernameIsValid === true

  return (
    <form onSubmit={handleClaimUsername} className="flex gap-2">
      <Input
        name="username"
        placeholder="nomedapagina"
        className={cn('flex-1 text-slate-700', inputBorderClass)}
        showPrefix={true}
        autoComplete="username"
        value={username}
        onChange={(e) => handleSearch(e.target.value)}
      >
        {/* Ícone de validação */}
        <div className="flex items-center justify-center w-5">
          {isChecking ? (
            <Loader2 className="animate-spin text-zinc-500" size={16} />
          ) : usernameIsValid === true ? (
            <Check className="text-green-500" size={16} />
          ) : usernameIsValid === false ? (
            <X className="text-red-500" size={16} />
          ) : null}
        </div>

        {/* Prefixo do domínio */}
        <span className="whitespace-nowrap text-zinc-500">mylinks.com/</span>
      </Input>

      <button
        className="flex items-center text-white justify-center gap-2 px-16 h-14 rounded-xl font-bold bg-slate-500 hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={!isFormValid || isChecking}
      >
        Reservar
      </button>
    </form>
  )
}
