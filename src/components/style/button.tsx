import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

interface ButtonStyle {
  type: string
  className: string
}

export function CustomizeButton() {
  const buttonStyles: ButtonStyle[] = [
    {
      type: 'solid',
      className: 'bordered-none h-10',
    },
    {
      type: 'glass',
      className: 'border border-white/30 bg-white/10 backdrop-blur h-10',
    },
    {
      type: 'outline',
      className: 'border border-gray-300 h-10',
    },
  ]

  const handleStyleChange = (style: ButtonStyle) => {
    console.log(`Button style changed to: ${style.type} with class ${style.className}`)
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
              {buttonStyles.map((style) => (
                <Button
                  key={style.type}
                  onClick={() => handleStyleChange(style)}
                  className={cn(
                    'flex items-center justify-center w-20 bg-gray-200 text-sm font-medium text-gray-700',
                    style.className
                  )}
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