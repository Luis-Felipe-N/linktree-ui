# Linktree UI

<div align="center">
  
  ![Linktree UI Cover](https://raw.githubusercontent.com/Luis-Felipe-N/linktree-ui/main/public/cover.png)
  
  ### 🎨 Aplicação de gerenciamento de links estilo Linktree
  **Customização de temas em tempo real com 9+ presets profissionais**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  
</div>

---


## ✨ Features

- 🎨 **9+ Temas Profissionais** - New York, Buenos Aires, Kyoto, Vancouver, São Paulo, Copenhagen, Lisbon, Melbourne, Capetown
- 🎭 **Customização em Tempo Real** - Cores, formas, bordas, sombras
- 🖼️ **Suporte a Imagens de Fundo** - Backgrounds personalizados com imagens
- 📱 **Preview Ao Vivo** - Visualize mudanças instantaneamente
- 🌈 **Contraste Otimizado** - Todas as combinações garantem legibilidade
- 💾 **Persistência Local** - Seus temas salvos automaticamente

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS + CSS-in-JS
- **Componentes**: Radix UI + shadcn/ui
- **Banco de Dados**: Prisma
- **Estado Global**: React Context API

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Luis-Felipe-N/linktree-ui.git
cd linktree-ui

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Execute o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── (auth)/          # Rotas de autenticação (login, register)
│   ├── admin/           # Painel administrativo
│   │   └── appearance/  # Editor de temas
│   ├── layout.tsx       # Layout raiz com providers
│   └── page.tsx         # Página inicial
├── components/
│   ├── appearance/      # Preview e geradores de tema
│   ├── auth/            # Componentes de autenticação
│   ├── style/           # Customizadores (cores, formas, raios)
│   └── ui/              # Componentes base (shadcn/ui)
├── contexts/
│   ├── appearance.tsx   # Context de temas
│   └── auth.tsx         # Context de autenticação
├── hooks/
│   └── use-appearance.tsx  # Hook de gerenciamento de temas
└── lib/
    ├── theme-presets.ts    # 9 presets profissionais
    ├── types.ts            # TypeScript types
    └── api/                # Configuração da API
```

## 🎨 Sistema de Temas

### Presets Disponíveis

| Preset | Categoria | Cores | Características |
|--------|-----------|-------|-----------------|
| **New York** | Dark | Preto + Branco | Minimalista elegante |
| **Buenos Aires** | Dark | Laranja + Amarelo | Vibrante e quente |
| **Kyoto** | Dark | Roxo Escuro + Lavanda | Místico e suave |
| **Vancouver** | Dark | Verde Militar + Lavanda | Natural e calmo |
| **São Paulo** | Dark | Verde Escuro + Neon | Alto contraste urbano |
| **Copenhagen** | Dark | Azul Marinho + Ciano | Moderno e tech |
| **Lisbon** | Dark | Azul + Amarelo + Imagem | Português clássico |
| **Melbourne** | Dark | Rosa + Creme + Imagem | Suave e artístico |
| **Capetown** | Dark | Coral + Amarelo + Imagem | Tropical e alegre |

### Uso do Context

```typescript
import { useAppearanceContext } from '@/contexts/appearance'

function MyComponent() {
  const { theme, loadPreset, updateBackground, updateButtonStyle } = useAppearanceContext()

  // Carregar um preset
  const handleLoadPreset = () => {
    loadPreset('new-york')
  }

  // Customizar background
  const handleUpdateBackground = () => {
    updateBackground({ 
      color: '#FF0000',
      type: 'COLOR' 
    })
  }

  // Customizar botões
  const handleUpdateButton = () => {
    updateButtonStyle({
      backgroundStyle: { 
        color: '#0000FF',
        properties: { backgroundColor: '#0000FF' }
      },
      textStyle: {
        color: '#FFFFFF',
        properties: { color: '#FFFFFF', fontWeight: '600' }
      },
      shapeStyle: {
        properties: { borderRadius: '24px' }
      }
    })
  }

  return (
    <div style={theme.background.properties}>
      <h1 style={theme.typeface}>Meu Título</h1>
      <button style={{
        ...theme.buttonStyle.backgroundStyle?.properties,
        ...theme.buttonStyle.textStyle?.properties,
        ...theme.buttonStyle.shapeStyle?.properties
      }}>
        Meu Botão
      </button>
    </div>
  )
}
```

### Estrutura de um Tema

```typescript
type AppearanceTheme = {
  key: string
  editable: boolean
  luminance: 'LIGHT' | 'DARK'
  background: {
    type: 'COLOR' | 'GRADIENT' | 'IMAGE'
    color?: string
    imageUrl?: string
    properties: React.CSSProperties
  }
  buttonStyle: {
    type: 'FILL' | 'OUTLINE'
    backgroundStyle: {
      color: string
      properties: React.CSSProperties
    }
    textStyle: {
      color: string
      properties: React.CSSProperties
    }
    shapeStyle: {
      properties: React.CSSProperties
    }
    shadowStyle?: {
      type: string
      color: string
      properties: React.CSSProperties
    }
  }
  typeface: {
    color: string
    family: string
  }
  // ... outros campos
}
```

## 🤝 Contribuindo

Contribuições são sempre bem-vindas!

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

**Luis Felipe Nunes**

- GitHub: [@Luis-Felipe-N](https://github.com/Luis-Felipe-N)
- LinkedIn: [Luis Felipe](https://www.linkedin.com/in/luis-felipe-n/)

---

<div align="center">
  Feito com ❤️ e ☕ por Luis Felipe
</div>

