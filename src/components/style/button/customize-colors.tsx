import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppearanceContext } from '@/contexts/appearance'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ColorOption {
  label: string
  properties: React.CSSProperties
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
    {
      label: 'Preto',
      properties: {
        backgroundColor: '#000000',
        color: '#ffffff',
      }
    },
    { label: 'Branco', properties: { backgroundColor: '#ffffff', color: '#000000' } },
    { label: 'Azul', properties: { backgroundColor: '#3b82f6', color: '#ffffff' } },
    { label: 'Verde', properties: { backgroundColor: '#10b981', color: '#ffffff' } },
    { label: 'Vermelho', properties: { backgroundColor: '#ef4444', color: '#ffffff' } },
    { label: 'Roxo', properties: { backgroundColor: '#8b5cf6', color: '#ffffff' } },
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
      <CardContent>
        <Tabs defaultValue="presets" className='w-full'>
          <TabsList>
            <TabsTrigger value="presets">Presets</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
          <TabsContent className='w-full' value="presets">
            <div className="grid grid-cols-3 gap-4 mt-4">
              {backgroundPresets.map((option) => (
                <button
                  key={option.label}
                  className={cn('w-full h-10 rounded-md border-2')}
                  style={option.properties}
                  onClick={() => {
                    handleBackgroundChange(option.properties.backgroundColor as string)
                    handleTextChange(option.properties.color as string)
                  }}
                >
                  <small>{option.label}</small>
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