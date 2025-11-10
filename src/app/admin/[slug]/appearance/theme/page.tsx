import CustomizeColorsButton from '@/components/appearance/customize/customize-colors'
import { CustomizeButton } from '@/components/style/button'

export default function AppearanceTheme() {

  return (
    <aside className="relative z-10 p-4 lg:w-1/2 inset-0 border-l">
      <div className="mt-8 space-y-4 px-4">
        <h1 className="font-semibold">
          Personalize a Aparência da Sua Página
        </h1>

        <CustomizeColorsButton />

      </div>
    </aside>
  )
}