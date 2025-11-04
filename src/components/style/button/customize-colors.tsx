'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useAppearanceContext } from '@/contexts/appearance'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

interface ColorOption {
  label: string
  color: string
}

export function CustomizeColorsButton() {
  const { theme, updateButtonStyle } = useAppearanceContext()

  const [backgroundColor, setBackgroundColor] = useState(
    theme?.buttonStyle?.backgroundStyle?.properties?.backgroundColor?.toString() ?? '#000000'
  )
  const [textColor, setTextColor] = useState(
    theme?.buttonStyle?.textStyle?.properties?.color?.toString() ?? '#ffffff'
  )

  const backgroundPresets: ColorOption[] = [
    { label: 'Preto', color: '#000000' },
    { label: 'Branco', color: '#ffffff' },
    { label: 'Azul', color: '#3b82f6' },
    { label: 'Verde', color: '#10b981' },
    { label: 'Vermelho', color: '#ef4444' },
    { label: 'Roxo', color: '#8b5cf6' },
  ]

  const textPresets: ColorOption[] = [
    { label: 'Branco', color: '#ffffff' },
    { label: 'Preto', color: '#000000' },
    { label: 'Cinza', color: '#6b7280' },
  ]

  const handleBackgroundChange = (color: string) => {
    setBackgroundColor(color)
    updateButtonStyle({
      backgroundStyle: {
        properties: { backgroundColor: color },
      },
      textStyle: {
        properties: { color: theme.buttonStyle?.textStyle?.properties?.color ?? '#ffffff' },
      },
    })
  }

  const handleTextChange = (color: string) => {
    setTextColor(color)
    updateButtonStyle({
      textStyle: {
        properties: { color: color },
      },
      backgroundStyle: {
        properties: { backgroundColor: theme.buttonStyle?.backgroundStyle?.properties?.backgroundColor ?? '#000000' },
      },
    })
  }

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Cores do Botão</CardTitle>
        <CardDescription>Personalize as cores de fundo e texto dos botões</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Background Color */}
        <div className="space-y-3">
          <Label htmlFor="bg-color">Cor de Fundo</Label>
          <div className="flex items-center gap-3">
            <Input
              id="bg-color"
              type="color"
              value={backgroundColor}
              onChange={(e) => handleBackgroundChange(e.target.value)}
              className="w-20 h-10 cursor-pointer"
            />
            <Input
              type="text"
              value={backgroundColor}
              onChange={(e) => handleBackgroundChange(e.target.value)}
              className="flex-1 font-mono text-sm"
              placeholder="#000000"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {backgroundPresets.map((preset) => (
              <button
                key={preset.color}
                onClick={() => handleBackgroundChange(preset.color)}
                className={cn(
                  'w-10 h-10 rounded-md border-2 transition-all hover:scale-110',
                  backgroundColor === preset.color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
                )}
                style={{ backgroundColor: preset.color }}
                title={preset.label}
              />
            ))}
          </div>
        </div>

        {/* Text Color */}
        <div className="space-y-3">
          <Label htmlFor="text-color">Cor do Texto</Label>
          <div className="flex items-center gap-3">
            <Input
              id="text-color"
              type="color"
              value={textColor}
              onChange={(e) => handleTextChange(e.target.value)}
              className="w-20 h-10 cursor-pointer"
            />
            <Input
              type="text"
              value={textColor}
              onChange={(e) => handleTextChange(e.target.value)}
              className="flex-1 font-mono text-sm"
              placeholder="#ffffff"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {textPresets.map((preset) => (
              <button
                key={preset.color}
                onClick={() => handleTextChange(preset.color)}
                className={cn(
                  'w-10 h-10 rounded-md border-2 transition-all hover:scale-110',
                  textColor === preset.color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
                )}
                style={{ backgroundColor: preset.color }}
                title={preset.label}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CustomizeColorsButton 