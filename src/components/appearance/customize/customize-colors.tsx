'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { useAppearanceContext } from '@/contexts/appearance'
import { useActivePage } from '@/contexts/active-page'
import { useUpdatePageTheme } from '@/hooks/use-pages'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Save, Loader2 } from 'lucide-react'
import THEME_PRESETS from '@/lib/theme-presets'

export function CustomizeColorsButton() {
  const { theme, updatebutton, updateBackground } = useAppearanceContext()
  const { activePage } = useActivePage()
  const updateTheme = useUpdatePageTheme(activePage?.id || '')

  const [backgroundColor, setBackgroundColor] = useState(
    theme?.button?.properties?.backgroundColor?.toString() ?? '#000000'
  )
  const [textColor, setTextColor] = useState(
    theme?.button?.properties?.color?.toString() ?? '#ffffff'
  )
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const handleSaveTheme = async () => {
    if (!activePage?.id) {
      alert('Nenhuma página ativa')
      return
    }

    try {
      await updateTheme.mutateAsync(theme)
      setHasUnsavedChanges(false)
      alert('Tema salvo com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar tema:', error)
      alert('Erro ao salvar tema. Tente novamente.')
    }
  }

  const handlePresetChange = (preset: typeof THEME_PRESETS[number]) => {
    if (preset.theme.background) {
      updateBackground(preset.theme.background)
    }
    if (preset.theme.button) {
      updatebutton(preset.theme.button)
    }
    setBackgroundColor(preset.theme.button?.properties?.backgroundColor?.toString() ?? '#000000')
    setTextColor(preset.theme.button?.properties?.color?.toString() ?? '#ffffff')
    setHasUnsavedChanges(true)
  }

  const handleBackgroundChange = (color: string) => {
    setBackgroundColor(color)
    updatebutton({
      properties: {
        backgroundColor: color,
      },
    })
    setHasUnsavedChanges(true)
  }

  const handleTextChange = (color: string) => {
    setTextColor(color)
    updatebutton({
      properties: {
        color,
      },
    })
    setHasUnsavedChanges(true)
  }

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">Temas Recomendados</CardTitle>
            <CardDescription className="text-sm">Personalize as cores de fundo e texto dos botões</CardDescription>
          </div>
          <Button
            onClick={handleSaveTheme}
            disabled={updateTheme.isPending || !activePage?.id || !hasUnsavedChanges}
            size="sm"
            className={`gap-2 transition-all duration-300 ${hasUnsavedChanges ? 'w-full sm:w-auto' : 'w-full sm:w-auto opacity-80'}`}
            variant={hasUnsavedChanges ? "default" : "outline"}
          >
            {updateTheme.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="size-4" />
                {hasUnsavedChanges ? 'Salvar Alterações' : 'Salvo'}
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="presets" className='w-full'>
          <TabsList className='w-full grid grid-cols-2 mb-6 bg-muted/50 p-1 rounded-xl'>
            <TabsTrigger value="presets" className='rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all'>Presets</TabsTrigger>
            <TabsTrigger value="custom" className='rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all'>Custom</TabsTrigger>
          </TabsList>
          <TabsContent className='w-full mt-0' value="presets">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {THEME_PRESETS.map((preset) => (
                <button
                  key={preset.key}
                  onClick={() => handlePresetChange(preset)}
                  className="group relative overflow-hidden rounded-xl border border-border/50 hover:border-primary/50 hover:shadow-md transition-all duration-200 aspect-[4/3] flex flex-col items-center justify-center text-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  {/* Background Preview */}
                  <div
                    className="p-4 gap-2 w-full h-full bg-black/10 group-hover:bg-black/0 transition-colors duration-300"
                    style={preset.theme.background?.properties || {}}
                  >

                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <div className="font-medium text-sm drop-shadow-md">{preset.title}</div>
                      <div
                        className="w-full max-w-[80%] h-8 rounded flex items-center justify-center text-[10px] shadow-sm"
                        style={preset.theme.button?.properties || {}}
                      >
                        Botão
                      </div>
                    </div>
                  </div>

                </button>
              ))}
            </div>
          </TabsContent>
          <TabsContent className='w-full space-y-4' value="custom">
            <div className="grid gap-4 p-4 border border-border/50 rounded-xl bg-muted/10">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <Label htmlFor="bg-color" className="text-sm font-medium">Cor de Fundo</Label>
                  <p className="text-xs text-muted-foreground">Cor principal do botão</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground uppercase">{backgroundColor}</span>
                  <div className="relative overflow-hidden rounded-full border border-border shadow-sm w-10 h-10 transition-transform active:scale-95">
                    <Input
                      id="bg-color"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => handleBackgroundChange(e.target.value)}
                      className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] p-0 border-none cursor-pointer opacity-0"
                    />
                    <div
                      className="w-full h-full pointer-events-none"
                      style={{ backgroundColor }}
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-border/50" />

              {/* Text Color */}
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <Label htmlFor="text-color" className="text-sm font-medium">Cor do Texto</Label>
                  <p className="text-xs text-muted-foreground">Cor do texto do botão</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground uppercase">{textColor}</span>
                  <div className="relative overflow-hidden rounded-full border border-border shadow-sm w-10 h-10 transition-transform active:scale-95">
                    <Input
                      id="text-color"
                      type="color"
                      value={textColor}
                      onChange={(e) => handleTextChange(e.target.value)}
                      className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] p-0 border-none cursor-pointer opacity-0"
                    />
                    <div
                      className="w-full h-full pointer-events-none"
                      style={{ backgroundColor: textColor }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

      </CardContent>
    </Card>
  )
}

export default CustomizeColorsButton
