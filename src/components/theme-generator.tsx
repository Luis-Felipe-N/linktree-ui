"use client"

import { useState } from 'react'
import { api } from '@/lib/api'
import type { Theme, Background, Button as ButtonType } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

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
  buttonStyle: string
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
    buttonStyle: 'rounded',
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

    // backend expects a specific shape; cast to `any` to avoid mismatches between frontend helper types
    // and the exact persisted models (IDs are generated server-side).
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
        style: form.buttonStyle,
        color: form.buttonColor,
        textColor: form.buttonTextColor,
        created_at: new Date().toISOString(),
        active: true,
      },
    }

    try {
      // POST to /themes - backend must accept nested background/button or adjust accordingly
      const res = await api.post('/themes', payload)
      // you could show a toast or update local state with res.data
      console.log('theme saved', res.data)
    } catch (err: any) {
      console.error(err)
      setError(err?.response?.data?.message || err.message || 'Erro ao salvar tema')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>

        <div>
          <Label>Fundo</Label>
          <div className="flex gap-2">
            <select className="rounded-md border px-2 py-1" value={form.bgType} onChange={(e) => setForm({ ...form, bgType: e.target.value as any })}>
              <option value="color">Cor</option>
              <option value="gradient">Gradiente</option>
              <option value="image">Imagem</option>
            </select>
          </div>
        </div>
      </div>

      {form.bgType === 'color' && (
        <div>
          <Label>Cor</Label>
          <Input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
        </div>
      )}

      {form.bgType === 'gradient' && (
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <Label>Início</Label>
            <Input type="color" value={form.gradientStart} onChange={(e) => setForm({ ...form, gradientStart: e.target.value })} />
          </div>
          <div>
            <Label>Fim</Label>
            <Input type="color" value={form.gradientEnd} onChange={(e) => setForm({ ...form, gradientEnd: e.target.value })} />
          </div>
          <div>
            <Label>Direção</Label>
            <Input value={form.gradientDirection} onChange={(e) => setForm({ ...form, gradientDirection: e.target.value })} />
          </div>
        </div>
      )}

      {form.bgType === 'image' && (
        <div>
          <Label>URL da imagem</Label>
          <Input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
        </div>
      )}

      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <Label>Botão - cor</Label>
          <Input type="color" value={form.buttonColor} onChange={(e) => setForm({ ...form, buttonColor: e.target.value })} />
        </div>
        <div>
          <Label>Botão - texto</Label>
          <Input type="color" value={form.buttonTextColor} onChange={(e) => setForm({ ...form, buttonTextColor: e.target.value })} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="rounded-md border p-4" style={{ background: previewBackground() }}>
            <div className="flex h-28 items-center justify-center">
              <Button style={{ backgroundColor: form.buttonColor, color: form.buttonTextColor } as any}>Botão de exemplo</Button>
            </div>
          </div>
        </div>

        <div className="w-44">
          <Button onClick={handleSave} disabled={isSaving} className="w-full">
            {isSaving ? 'Salvando...' : 'Salvar tema'}
          </Button>
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default ThemeGenerator
