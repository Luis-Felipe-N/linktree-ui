"use client"

import { useState } from 'react'
import { api } from '@/lib/api'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, Save, Palette, Layout, Image as ImageIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ThemeFormState {
  title: string
  // background
  bgType: 'color' | 'gradient' | 'image'
  color: string
  gradientStart: string
  gradientEnd: string
  gradientDirection: string
  imageUrl: string
  // button
  button: string
  buttonColor: string
  buttonTextColor: string
}

export function ThemeGenerator() {
  const [form, setForm] = useState<ThemeFormState>({
    title: 'Novo tema',
    bgType: 'color',
    color: '#0f172a',
    gradientStart: '#0ea5e9',
    gradientEnd: '#8b5cf6',
    gradientDirection: 'to right',
    imageUrl: '',
    button: 'rounded',
    buttonColor: '#06b6d4',
    buttonTextColor: '#ffffff',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const previewBackground = () => {
    if (form.bgType === 'color') return form.color
    if (form.bgType === 'gradient') return `linear-gradient(${form.gradientDirection}, ${form.gradientStart}, ${form.gradientEnd})`
    if (form.bgType === 'image') return `url(${form.imageUrl}) center/cover no-repeat`
    return form.color
  }

  async function handleSave() {
    setIsSaving(true)
    setError(null)

    const payload: any = {
      title: form.title,
      created_at: new Date().toISOString(),
      active: true,
      background: {
        type: form.bgType,
        color: form.bgType === 'color' ? form.color : undefined,
        gradientStart: form.bgType === 'gradient' ? form.gradientStart : undefined,
        gradientEnd: form.bgType === 'gradient' ? form.gradientEnd : undefined,
        gradientDirection: form.bgType === 'gradient' ? form.gradientDirection : undefined,
        imageUrl: form.bgType === 'image' ? form.imageUrl : undefined,
      },
      button: {
        style: form.button,
        color: form.buttonColor,
        textColor: form.buttonTextColor,
        created_at: new Date().toISOString(),
        active: true,
      },
    }

    try {
      const res = await api.post('/themes', payload)
      console.log('theme saved', res.data)
    } catch (err: any) {
      console.error(err)
      setError(err?.response?.data?.message || err.message || 'Erro ao salvar tema')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Gerador de Temas</CardTitle>
          <CardDescription>Crie e personalize novos temas para a plataforma</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título do Tema</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-muted/30"
            />
          </div>

          <div className="space-y-4">
            <Label>Tipo de Fundo</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'color', label: 'Cor Sólida', icon: Palette },
                { id: 'gradient', label: 'Gradiente', icon: Layout },
                { id: 'image', label: 'Imagem', icon: ImageIcon },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setForm({ ...form, bgType: type.id as any })}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${form.bgType === type.id
                    ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                >
                  <type.icon className="size-5" />
                  <span className="text-xs font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {form.bgType === 'color' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Label>Cor de Fundo</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="flex-1 font-mono uppercase"
                  />
                </div>
              </motion.div>
            )}

            {form.bgType === 'gradient' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Cor Inicial</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={form.gradientStart}
                        onChange={(e) => setForm({ ...form, gradientStart: e.target.value })}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={form.gradientStart}
                        onChange={(e) => setForm({ ...form, gradientStart: e.target.value })}
                        className="flex-1 font-mono uppercase"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Cor Final</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={form.gradientEnd}
                        onChange={(e) => setForm({ ...form, gradientEnd: e.target.value })}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={form.gradientEnd}
                        onChange={(e) => setForm({ ...form, gradientEnd: e.target.value })}
                        className="flex-1 font-mono uppercase"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Direção (CSS)</Label>
                  <Input
                    value={form.gradientDirection}
                    onChange={(e) => setForm({ ...form, gradientDirection: e.target.value })}
                    placeholder="ex: to right, 45deg"
                  />
                </div>
              </motion.div>
            )}

            {form.bgType === 'image' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Label>URL da Imagem</Label>
                <Input
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://..."
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4 pt-4 border-t">
            <Label className="text-base">Estilo dos Botões</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Cor do Botão</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={form.buttonColor}
                    onChange={(e) => setForm({ ...form, buttonColor: e.target.value })}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={form.buttonColor}
                    onChange={(e) => setForm({ ...form, buttonColor: e.target.value })}
                    className="flex-1 font-mono uppercase"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Cor do Texto</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={form.buttonTextColor}
                    onChange={(e) => setForm({ ...form, buttonTextColor: e.target.value })}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={form.buttonTextColor}
                    onChange={(e) => setForm({ ...form, buttonTextColor: e.target.value })}
                    className="flex-1 font-mono uppercase"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full"
              size="lg"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 size-4" />
                  Salvar Tema
                </>
              )}
            </Button>
            {error && (
              <p className="mt-2 text-sm text-red-500 text-center bg-red-50 p-2 rounded-lg border border-red-100">
                {error}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="sticky top-4 h-fit">
        <Card className="overflow-hidden border-border/50 shadow-lg">
          <div className="aspect-[9/19] w-full relative" style={{ background: previewBackground() }}>
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full space-y-4">
                <div className="flex flex-col items-center gap-4 mb-8">
                  <div className="size-24 rounded-full bg-white/20 backdrop-blur-sm animate-pulse" />
                  <div className="h-4 w-32 bg-white/20 rounded backdrop-blur-sm" />
                  <div className="h-3 w-48 bg-white/20 rounded backdrop-blur-sm" />
                </div>

                {[1, 2, 3].map((i) => (
                  <Button
                    key={i}
                    className="w-full h-12 shadow-lg transition-transform hover:scale-[1.02]"
                    style={{
                      backgroundColor: form.buttonColor,
                      color: form.buttonTextColor,
                      borderRadius: form.button === 'rounded' ? '0.5rem' : '9999px' // Simplified logic
                    }}
                  >
                    Link Exemplo {i}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ThemeGenerator
