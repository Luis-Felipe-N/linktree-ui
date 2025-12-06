'use client'

import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Save, Loader2 } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { useAppearanceContext } from '@/contexts/appearance'
import { useActivePage } from '@/contexts/active-page'
import { useUpdatePageTheme } from '@/hooks/use-pages'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface RadiusPreset {
  label: string
  value: string
  description: string
}

interface ButtonStylePreset {
  id: string
  label: string
  description: string
  type?: string | null
  properties: CSSProperties
}

interface ShadowPreset {
  id: string
  label: string
  description: string
  value: string
}

const RADIUS_PRESETS: RadiusPreset[] = [
  { label: 'Reto', value: '0px', description: 'Sem arredondamento' },
  { label: 'Sutil', value: '6px', description: 'Toque discreto' },
  { label: 'Suave', value: '12px', description: 'Mais amigável' },
  { label: 'Orgânico', value: '18px', description: 'Curvas marcantes' },
  { label: 'Pílula', value: '9999px', description: 'Totalmente arredondado' },
]

const BUTTON_STYLE_PRESETS: ButtonStylePreset[] = [
  {
    id: 'solid',
    label: 'Sólido',
    description: 'Botão clássico com destaque de cor.',
    type: 'solid',
    properties: {
      border: 'none',
      backgroundClip: 'border-box',
      boxShadow: '0 18px 30px -18px rgba(15,23,42,0.45)',
    },
  },
  {
    id: 'outline',
    label: 'Outline',
    description: 'Borda definida e interior transparente.',
    type: 'outline',
    properties: {
      backgroundColor: 'transparent',
      border: '2px solid currentColor',
      boxShadow: '0 10px 24px -16px rgba(15,23,42,0.35)',
    },
  },
  {
    id: 'glass',
    label: 'Glassmorphism',
    description: 'Efeito translúcido com blur e borda suave.',
    type: 'glass',
    properties: {
      backgroundColor: 'rgba(255,255,255,0.12)',
      border: '1px solid rgba(255,255,255,0.35)',
      backdropFilter: 'blur(14px)',
      boxShadow: '0 25px 45px -25px rgba(15,23,42,0.55)',
    },
  },
  {
    id: 'soft',
    label: 'Soft Shadow',
    description: 'Botão elevado com sombra difusa.',
    type: 'solid',
    properties: {
      border: 'none',
      boxShadow: '0 24px 60px -30px rgba(15,23,42,0.55)',
    },
  },
]

const SHADOW_PRESETS: ShadowPreset[] = [
  { id: 'none', label: 'Sem sombra', description: 'Flat minimalista', value: 'none' },
  { id: 'soft', label: 'Suave', description: 'Sombra leve para botões sólidos', value: '0 12px 25px -20px rgba(15,23,42,0.65)' },
  { id: 'medium', label: 'Média', description: 'Equilíbrio entre destaque e sutileza', value: '0 12px 35px -14px rgba(15,23,42,0.45)' },
  { id: 'strong', label: 'Intensa', description: 'Alta profundidade e contraste', value: '0 25px 60px -20px rgba(15,23,42,0.65)' },
]

const CustomizeButtonFormSchema = z.object({
  stylePreset: z.string(),
  borderRadius: z.string(),
  borderWidth: z.number().min(0).max(6),
  shadow: z.string(),
})

type CustomizeButtonFormData = z.infer<typeof CustomizeButtonFormSchema>

const getBorderWidth = (border?: string | number | null) => {
  if (typeof border === 'number') return border
  if (!border || border === 'none') return 0
  const match = border.match(/(\d+(?:\.\d+)?)px/)
  return match ? Number(match[1]) : 0
}

const borderStringFromWidth = (width: number, color = "currentColor") => (width <= 0 ? 'none' : `${width}px solid ${color}`)

export function CustomizeButtonPanel() {
  const { theme, updatebutton } = useAppearanceContext()
  const { activePage } = useActivePage()
  const updateTheme = useUpdatePageTheme(activePage?.id || '')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const defaultValues = useMemo<CustomizeButtonFormData>(() => {
    const defaultRadius = theme?.button?.properties?.borderRadius?.toString() ?? '16px'
    const defaultShadow = theme?.button?.properties?.boxShadow?.toString() ?? SHADOW_PRESETS[1].value
    const defaultBorderWidth = getBorderWidth(theme?.button?.properties?.border)

    const presetFromTheme = BUTTON_STYLE_PRESETS.find((preset) => preset.type === theme?.button?.type)

    return {
      stylePreset: presetFromTheme?.id ?? BUTTON_STYLE_PRESETS[0].id,
      borderRadius: defaultRadius,
      borderWidth: defaultBorderWidth,
      shadow: defaultShadow,
    }
  }, [theme])

  const { watch, setValue, reset } = useForm<CustomizeButtonFormData>({
    resolver: zodResolver(CustomizeButtonFormSchema),
    defaultValues,
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const formValues = watch()

  const applyButtonProperties = (properties: CSSProperties, nextType?: string | null) => {
    updatebutton({
      type: nextType ?? theme?.button?.type,
      properties: {
        ...theme?.button?.properties,
        ...properties,
      },
    })
    setHasUnsavedChanges(true)
  }

  const handleStylePresetChange = (preset: ButtonStylePreset) => {
    setValue('stylePreset', preset.id, { shouldDirty: true })
    applyButtonProperties(
      {
        ...preset.properties,
        borderRadius: formValues.borderRadius,
        border: borderStringFromWidth(formValues.borderWidth, theme.button?.properties?.color?.toString()),
        boxShadow: formValues.shadow,
      },
      preset.type
    )
  }

  const handleRadiusChange = (radius: string) => {
    setValue('borderRadius', radius, { shouldDirty: true })
    applyButtonProperties({ borderRadius: radius })
  }

  const handleBorderWidthChange = (width: number) => {
    setValue('borderWidth', width, { shouldDirty: true })
    applyButtonProperties({ border: borderStringFromWidth(width) })
  }

  const handleShadowPresetChange = (preset: ShadowPreset) => {
    setValue('shadow', preset.value, { shouldDirty: true })
    applyButtonProperties({ boxShadow: preset.value })
  }

  const handleSaveTheme = async () => {
    if (!activePage?.id) return
    try {
      await updateTheme.mutateAsync(theme)
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error('Erro ao salvar tema:', error)
    }
  }

  const currentRadiusValue = parseInt(formValues.borderRadius, 10) || 0

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">Botões</CardTitle>
            <CardDescription className="text-sm">Defina estilo, forma e profundidade dos CTAs.</CardDescription>
          </div>
          <Button
            onClick={handleSaveTheme}
            disabled={updateTheme.isPending || !activePage?.id || !hasUnsavedChanges}
            size="sm"
            className={`gap-2 transition-all duration-300 ${hasUnsavedChanges ? 'w-full sm:w-auto' : 'w-full sm:w-auto opacity-80'}`}
            variant={hasUnsavedChanges ? 'default' : 'outline'}
          >
            {updateTheme.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {hasUnsavedChanges ? 'Salvar Alterações' : 'Salvo'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">


        <Tabs defaultValue="presets" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="presets">Presets</TabsTrigger>
            <TabsTrigger value="custom">Personalizar</TabsTrigger>
          </TabsList>

          <TabsContent value="presets">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BUTTON_STYLE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleStylePresetChange(preset)}
                  className={cn(
                    'group rounded-2xl border border-border/60 p-4 text-left transition-all duration-200 hover:border-primary/60 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
                    formValues.stylePreset === preset.id && 'border-primary shadow-lg'
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-sm">{preset.label}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {preset.description}
                      </p>
                    </div>
                    <span className="inline-flex rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                      {preset.type || 'custom'}
                    </span>
                  </div>
                  <div className="mt-4">
                    <Button className="w-full" style={preset.properties}>
                      Preview
                    </Button>
                  </div>
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <section className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Formato</h4>
                <p className="text-sm text-muted-foreground">Controle o raio dos cantos e aplique presets.</p>
              </div>
              <div className="rounded-xl border border-border/60 p-4 space-y-4 bg-muted/5">
                <div className="flex items-center gap-3">
                  <Input
                    type="range"
                    min={0}
                    max={40}
                    step={2}
                    value={currentRadiusValue}
                    onChange={(event) => handleRadiusChange(`${event.target.value}px`)}
                  />
                  <span className="text-xs text-muted-foreground w-12 text-right">{currentRadiusValue}px</span>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {RADIUS_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => handleRadiusChange(preset.value)}
                      className={cn(
                        'rounded-lg border border-border/60 p-3 text-left text-xs transition-colors hover:border-primary/60',
                        formValues.borderRadius === preset.value && 'border-primary bg-primary/5'
                      )}
                    >
                      <strong className="block text-sm">{preset.label}</strong>
                      <span className="text-muted-foreground">{preset.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Detalhes de borda</h4>
                <p className="text-sm text-muted-foreground">Defina a espessura da borda para destacar botões outline.</p>
              </div>
              <div className="rounded-xl border border-border/60 p-4 space-y-4 bg-muted/5">
                <div className="flex items-center gap-3">
                  <Input
                    type="range"
                    min={0}
                    max={6}
                    step={1}
                    value={formValues.borderWidth}
                    onChange={(event) => handleBorderWidthChange(Number(event.target.value))}
                  />
                  <span className="text-xs text-muted-foreground w-12 text-right">{formValues.borderWidth}px</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formValues.borderWidth === 0 ? 'Sem borda aplicada' : 'Borda aplicada em toda a largura do botão.'}
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sombras</h4>
                <p className="text-sm text-muted-foreground">Escolha o nível de profundidade ideal para o CTA.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {SHADOW_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleShadowPresetChange(preset)}
                    className={cn(
                      'rounded-xl border border-border/60 p-4 text-left transition-all duration-200 hover:border-primary/60 hover:shadow-md',
                      formValues.shadow === preset.value && 'border-primary shadow-md'
                    )}
                  >
                    <p className="font-medium text-sm">{preset.label}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{preset.description}</p>
                  </button>
                ))}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default CustomizeButtonPanel