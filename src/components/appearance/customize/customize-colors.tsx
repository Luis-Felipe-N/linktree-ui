'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { useAppearanceContext } from '@/contexts/appearance'
import { useActivePage } from '@/contexts/active-page'
import { useUpdatePageTheme } from '@/hooks/use-pages'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'
import { Save, Loader2 } from 'lucide-react'
import THEME_PRESETS from '@/lib/theme-presets'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const CustomizeColorsFormSchema = z.object({
  buttonColor: z.string(),
  buttonTextColor: z.string(),
  backgroundColor: z.string(),
  backgroundTextColor: z.string(),
})

type CustomizeColorsSchema = z.infer<typeof CustomizeColorsFormSchema>

// Componente auxiliar para reduzir repetição de código
const ColorPickerItem = ({
  label,
  value,
  onChange
}: {
  label: string,
  value: string,
  onChange: (val: string) => void
}) => (
  <div className="flex items-center justify-between gap-4">
    <div className="space-y-0.5">
      <Label className="text-sm font-medium">{label}</Label>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-xs font-mono text-muted-foreground uppercase">{value}</span>
      <div className="relative overflow-hidden rounded-full border border-border shadow-sm w-10 h-10 transition-transform active:scale-95">
        <Input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] p-0 border-none cursor-pointer opacity-0"
        />
        <div className="w-full h-full pointer-events-none" style={{ backgroundColor: value }} />
      </div>
    </div>
  </div>
)

export function CustomizeColorsButton() {
  const { theme, updatebutton, updateBackground } = useAppearanceContext()
  const { activePage } = useActivePage()
  const updateTheme = useUpdatePageTheme(activePage?.id || '')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const { watch, setValue } = useForm<CustomizeColorsSchema>({
    resolver: zodResolver(CustomizeColorsFormSchema),
    defaultValues: {
      buttonColor: theme?.button?.properties?.backgroundColor?.toString() ?? '#000000',
      buttonTextColor: theme?.button?.properties?.color?.toString() ?? '#ffffff',
      backgroundColor: theme?.background?.properties?.backgroundColor?.toString() ?? '#ffffff',
      backgroundTextColor: theme?.background?.properties?.color?.toString() ?? '#000000',
    },
  })

  // Monitora os valores em tempo real
  const formValues = watch()

  // Atualiza o contexto visual (preview) quando o form muda
  const handleColorChange = (field: keyof CustomizeColorsSchema, value: string) => {
    setValue(field, value) // Atualiza o form state

    const newValues = { ...formValues, [field]: value }

    updateBackground({
      properties: {
        backgroundColor: newValues.backgroundColor,
        color: newValues.backgroundTextColor,
      }
    })
    updatebutton({
      properties: {
        backgroundColor: newValues.buttonColor,
        color: newValues.buttonTextColor,
      }
    })
    setHasUnsavedChanges(true)
  }

  const handlePresetChange = (preset: typeof THEME_PRESETS[number]) => {
    if (preset.theme.background) updateBackground(preset.theme.background)
    if (preset.theme.button) updatebutton(preset.theme.button)

    // Sincroniza o form com o preset escolhido
    setValue('backgroundColor', preset.theme.background?.properties?.backgroundColor?.toString() || '#ffffff')
    setValue('backgroundTextColor', preset.theme.background?.properties?.color?.toString() || '#000000')
    setValue('buttonColor', preset.theme.button?.properties?.backgroundColor?.toString() || '#000000')
    setValue('buttonTextColor', preset.theme.button?.properties?.color?.toString() || '#ffffff')

    setHasUnsavedChanges(true)
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

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">Aparência</CardTitle>
            <CardDescription className="text-sm">Personalize as cores da sua página</CardDescription>
          </div>
          <Button
            onClick={handleSaveTheme}
            disabled={updateTheme.isPending || !activePage?.id || !hasUnsavedChanges}
            size="sm"
            className={`gap-2 transition-all duration-300 ${hasUnsavedChanges ? 'w-full sm:w-auto' : 'w-full sm:w-auto opacity-80'}`}
            variant={hasUnsavedChanges ? "default" : "outline"}
          >
            {updateTheme.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {hasUnsavedChanges ? 'Salvar Alterações' : 'Salvo'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="presets" className='w-full'>
          <TabsList className='w-full grid grid-cols-2 mb-6 bg-muted/50 p-1 rounded-xl'>
            <TabsTrigger value="presets">Presets</TabsTrigger>
            <TabsTrigger value="custom">Personalizar</TabsTrigger>
          </TabsList>

          <TabsContent value="presets">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {THEME_PRESETS.map((preset) => (
                <button
                  key={preset.key}
                  onClick={() => handlePresetChange(preset)}
                  className="group relative overflow-hidden rounded-xl border border-border/50 hover:border-primary/50 hover:shadow-md transition-all duration-200 aspect-[4/3] flex flex-col items-center justify-center"
                >
                  <div className="p-4 gap-2 w-full h-full flex flex-col items-center justify-center" style={preset.theme.background?.properties || {}}>
                    <span className="font-medium text-sm mb-2 drop-shadow-md mix-blend-difference text-white">{preset.title}</span>
                    <div className="w-16 h-6 rounded shadow-sm" style={preset.theme.button?.properties || {}} />
                  </div>
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom" className='space-y-6'>
            {/* Seção Página */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Página</h4>
              <div className="grid gap-4 p-4 border border-border/50 rounded-xl bg-muted/10">
                <ColorPickerItem
                  label="Cor de Fundo"
                  value={formValues.backgroundColor}
                  onChange={(v) => handleColorChange('backgroundColor', v)}
                />
                <div className="h-px bg-border/50" />
                <ColorPickerItem
                  label="Cor do Texto"
                  value={formValues.backgroundTextColor}
                  onChange={(v) => handleColorChange('backgroundTextColor', v)}
                />
              </div>
            </div>

            {/* Seção Botões */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Botões</h4>
              <div className="grid gap-4 p-4 border border-border/50 rounded-xl bg-muted/10">
                <ColorPickerItem
                  label="Cor do Botão"
                  value={formValues.buttonColor}
                  onChange={(v) => handleColorChange('buttonColor', v)}
                />
                <div className="h-px bg-border/50" />
                <ColorPickerItem
                  label="Texto do Botão"
                  value={formValues.buttonTextColor}
                  onChange={(v) => handleColorChange('buttonTextColor', v)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default CustomizeColorsButton