# Linktree UI

Aplicação de gerenciamento de links estilo Linktree com customização de temas em tempo real.


## Stack

- Next.js 15 + TypeScript
- Tailwind CSS
- Radix UI + shadcn/ui
- Prisma

## Instalação

```bash
# Clone e instale
git clone https://github.com/Luis-Felipe-N/linktree-ui.git
cd linktree-ui
npm install

# Configure o ambiente
cp .env.example .env.local

# Rode o projeto
npm run dev
```

## Estrutura

```
src/
├── app/          # Rotas (auth, admin)
├── components/   # Componentes React
├── contexts/     # Contextos (appearance, auth)
├── hooks/        # Hooks customizados
└── lib/          # Utils, types, API
```

## Temas

Use o contexto de aparência para gerenciar temas:

```typescript
import { useAppearanceContext } from '@/contexts/appearance'

const { theme, loadPreset, updateButtonStyle } = useAppearanceContext()

// Carrega preset
loadPreset('sunset')

// Customiza
updateButtonStyle({ className: 'bg-blue-500 rounded-lg' })
```

**Presets disponíveis**: groove, sunset, ocean, minimal

## Autor

[Luis Felipe](https://github.com/Luis-Felipe-N)

