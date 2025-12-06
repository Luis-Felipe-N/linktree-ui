import CustomizeColorsButton from '@/components/appearance/customize/customize-colors'

export default function AppearanceTheme() {
  return (
    <aside className="relative z-10 p-4 lg:w-1/2 inset-0 border-l">
      <div className="mt-8 space-y-4 px-4">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Tema</p>
          <h1 className="font-semibold text-2xl">Personalize a aparência da sua página</h1>
          <p className="text-sm text-muted-foreground">
            Escolha presets profissionais ou ajuste manualmente cores de fundo e botões.
          </p>
        </div>

        <CustomizeColorsButton />

      </div>
    </aside>
  )
}