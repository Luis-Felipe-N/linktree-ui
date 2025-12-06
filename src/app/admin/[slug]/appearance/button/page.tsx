import CustomizeButtonPanel from '@/components/appearance/customize/customize-button'

export default function AppearanceButtonPage() {
  return (
    <aside className="relative z-10 p-4 lg:w-1/2 inset-0 border-l">
      <div className="mt-8 space-y-4 px-4">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Botões</p>
          <h1 className="font-semibold text-2xl">Personalize o comportamento dos botões</h1>
          <p className="text-sm text-muted-foreground">
            Ajuste forma, cores e leveza dos botões para combinar com o seu tema.
          </p>
        </div>
        <CustomizeButtonPanel />
      </div>
    </aside>
  )
}
