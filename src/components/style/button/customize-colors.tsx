'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppearanceContext } from '@/contexts/appearance'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import THEME_PRESETS from '@/lib/theme-presets'

export function CustomizeColorsButton() {
  const { theme, updatebutton, updateBackground } = useAppearanceContext()

  const [backgroundColor, setBackgroundColor] = useState(
    theme?.button?.properties?.backgroundColor?.toString() ?? '#000000'
  )
  const [textColor, setTextColor] = useState(
    theme?.button?.properties?.color?.toString() ?? '#ffffff'
  )

  const handlePresetChange = (preset: typeof THEME_PRESETS[number]) => {
    if (preset.theme.background) {
      updateBackground(preset.theme.background)
    }
    if (preset.theme.button) {
      updatebutton(preset.theme.button)
    }
    setBackgroundColor(preset.theme.button?.properties?.backgroundColor?.toString() ?? '#000000')
    setTextColor(preset.theme.button?.properties?.color?.toString() ?? '#ffffff')
  }

  const handleBackgroundChange = (color: string) => {
    setBackgroundColor(color)
    updatebutton({
      properties: {
        backgroundColor: color,
      },
    })
  }

  const handleTextChange = (color: string) => {
    setTextColor(color)
    updatebutton({
      properties: {
        color,
      },
    })
  }

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Temas Recomendados</CardTitle>
        <CardDescription>Personalize as cores de fundo e texto dos botões</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="presets" className='w-full'>
          <TabsList className='w-full space-x-2 mb-2'>
            <TabsTrigger value="presets" className='bg-slate-100 h-12'>Presets</TabsTrigger>
            <TabsTrigger value="custom" className='bg-slate-100 h-12'>Custom</TabsTrigger>
          </TabsList>
          <TabsContent className='w-full' value="presets">
            <div className="flex flex-wrap gap-3 mt-4">
              {THEME_PRESETS.map((preset) => (
                <button
                  key={preset.key}
                  onClick={() => handlePresetChange(preset)}
                  className="min-w-48 group relative overflow-hidden rounded-lg border-2 border-border hover:border-primary transition-all p-4 text-left px-8"
                >
                  {/* Background Preview */}
                  <div
                    className="absolute inset-0 group-hover:opacity-70 transition-opacity"
                    style={preset.theme.background?.properties || {}}
                  />

                  {/* Content */}
                  <div className="relative z-10" style={{ color: preset.theme.button?.properties?.color }}>
                    <div className="font-semibold text-sm mb-1">{preset.title}</div>

                    {/* Button Preview */}
                    <div className="flex justify-center mt-2">
                      <span
                        className="inline-block px-3 py-1.5 text-xs font-medium rounded"
                        style={{
                          backgroundColor: preset.theme.button?.properties?.backgroundColor,
                          color: preset.theme.button?.properties?.color,
                          border: preset.theme.button?.properties?.border as string,
                          boxShadow: preset.theme.button?.properties?.boxShadow as string,
                          borderRadius: preset.theme.button?.properties?.borderRadius as string,
                        }}
                      >
                        Preview
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </TabsContent>
          <TabsContent className='w-full space-y-2' value="custom">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="bg-color">Cor de Fundo</Label>
              <Input
                id="bg-color"
                type="color"
                value={backgroundColor}
                onChange={(e) => handleBackgroundChange(e.target.value)}
                className="w-20 h-10 cursor-pointer"
              />
            </div>

            {/* Text Color */}
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="text-color">Cor do Texto</Label>
              <Input
                id="text-color"
                type="color"
                value={textColor}
                onChange={(e) => handleTextChange(e.target.value)}
                className="w-20 h-10 cursor-pointer"
              />
            </div>
          </TabsContent>
        </Tabs>

      </CardContent>
    </Card>
  )
}

export default CustomizeColorsButton
