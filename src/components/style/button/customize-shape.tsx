import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useAppearanceContext } from '@/contexts/appearance'
import { Button } from '@/components/ui/button'

interface ShapeOption {
  type: string
  properties: React.CSSProperties
}


export function CustomizeShapeButton() {
  const { updatebutton } = useAppearanceContext()

  const shapeButtons: ShapeOption[] = [
    {
      type: 'solid',
      properties: {
        border: 'none',
      },
    },
    {
      type: 'glass',
      properties: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(10px)',
      },
    },
    {
      type: 'outline',
      properties: {
        border: '2px solid currentColor',
      },
    },
  ]

  const handleStyleChange = (style: ShapeOption) => {
    updatebutton({
      type: style.type,
      properties: style.properties,
    })
  }

  return (
    <Card className='shadow-none'>
      <CardHeader>
        <CardTitle>Estilo do Botão</CardTitle>
        <CardDescription>
          Personalize o estilo dos botões
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="mb-2 font-medium">Style</h3>
            <div className='flex gap-4'>
              {shapeButtons.map((style) => (
                <Button
                  key={style.type}
                  onClick={() => handleStyleChange(style)}
                  className={cn(
                    'flex items-center justify-center w-20 bg-slate-200 text-sm font-medium text-gray-700',
                  )}
                  style={style.properties}
                >
                  {style.type.charAt(0).toUpperCase() + style.type.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

      </CardContent>
    </Card >)
}