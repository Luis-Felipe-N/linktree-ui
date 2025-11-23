import { AnimatePresence, motion } from "motion/react"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Copy, Check } from 'lucide-react'
import { useState } from "react"

interface CopyUrlPageProps {
  slug?: string | null
}

export function CopyUrlPage({ slug }: CopyUrlPageProps) {
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)
  const userProfileUrl = slug ? `https://biosite.vercel/${slug}` : ''

  const handleCopy = () => {
    navigator.clipboard.writeText(userProfileUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className=' inline-flex p-2 px-4 rounded-2xl border border-input bg-background/95 backdrop-blur-sm flex-col gap-2 shadow-lg'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        boxShadow: hovered
          ? "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
          : "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
      }}
      whileHover={{ scale: 1.02 }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      <motion.div
        animate={{
          borderColor: hovered ? "rgb(148 163 184)" : "rgb(226 232 240)"
        }}
        transition={{ duration: 0.2 }}
      >
        <Input
          className='h-8 border-none p-0 bg-transparent focus-visible:ring-0'
          id="profile-url"
          type="text"
          value={userProfileUrl}
          readOnly
          onClick={(e) => e.currentTarget.select()}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {hovered && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -10
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut"
            }}
          >
            <Button
              className='font-semibold bg-primary hover:bg-primary/90 rounded-xl px-4 text-primary-foreground w-full transition-all duration-200'
              onClick={handleCopy}
              disabled={copied}
            >
              <motion.div
                className="flex items-center gap-2"
                animate={{ scale: copied ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check size={16} strokeWidth={3} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Copy size={16} strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </motion.div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}