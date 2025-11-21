'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAppearanceContext } from '@/contexts/appearance'

interface RadiusPreset {
  label: string
  value: string
  description: string
}

const RADIUS_PRESETS: RadiusPreset[] = [
  { label: 'Nenhum', value: '0px', description: 'Sem arredondamento' },
  { label: 'Pequeno', value: '4px', description: 'Cantos levemente arredondados' },
  { label: 'Médio', value: '8px', description: 'Arredondamento moderado' },
  { label: 'Grande', value: '12px', description: 'Bem arredondado' },
  { label: 'Extra Grande', value: '16px', description: 'Muito arredondado' },
  { label: 'Completo', value: '9999px', description: 'Totalmente arredondado (pílula)' },
]

export default function CustomizeRadiusButton() {
  const { theme, updatebutton } = useAppearanceContext()
  const [borderRadius, setBorderRadius] = useState(
    theme.button?.properties?.borderRadius?.toString() || '8px'
  )

  const handleRadiusChange = (value: string) => {
    setBorderRadius(value)
    updatebutton({
      properties: {
        borderRadius: value,
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Border Radius</CardTitle>
        <CardDescription>
          Personalize o arredondamento dos cantos do botão
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Custom Input */}
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <Input
              type="range"
              min="0"
              max="20"
              step={5}
              value={parseInt(String(borderRadius).replace(/[^0-9]/g, '')) || 0}
              onChange={(e) => handleRadiusChange(`${e.target.value}px`)}
              className="flex-1"
            />
          </div>
        </div>

        {/* Presets */}
        <div className="space-y-2">
          <Label>Presets</Label>
          <div className="grid grid-cols-2 gap-2">
            {RADIUS_PRESETS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => handleRadiusChange(preset.value)}
                className={`
                  p-3 rounded-md border-2 transition-all text-left
                  hover:border-primary/50
                  ${borderRadius === preset.value ? 'border-primary ring-2 ring-primary/20' : 'border-border'}
                `}
              >
                <div className="font-medium text-sm">{preset.label}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {preset.description}
                </div>
                <div className="text-xs text-muted-foreground/70 mt-1">
                  {preset.value}
                </div>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
