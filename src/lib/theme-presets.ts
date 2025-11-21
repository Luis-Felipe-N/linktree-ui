/**
 * Presets modeled after the example appearance payload.
 * These presets follow the frontend `AppearanceTheme` shape (see `src/lib/types.ts`).
 * Use `getPreset(key)` to obtain a ready-made theme object that can be applied
 * to the ThemeGenerator form or sent to the backend (may need slight mapping).
 */
import type { AppearanceTheme } from './types'

export type ThemePreset = {
  key: string
  title: string
  description?: string
  theme: AppearanceTheme
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    key: 'new-york',
    title: 'New York',
    description: 'Preto elegante com contraste branco',
    theme: {
      key: 'new-york',
      editable: true,
      luminance: 'DARK',
      background: {
        color: '#010101',
        style: 'PLAIN',
        type: 'COLOR',
        properties: { backgroundColor: '#010101', color: '#FFFFFF' },
      },
      button: {
        type: 'FILL',
        properties: {
          backgroundColor: '#FFFFFF1A',
          color: '#FFFFFF',
          fontWeight: '600',
          border: 'none',
          borderRadius: '24px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
        },
      },
      socialStyle: { color: '#FFFFFF' },
      typeface: { color: '#FFFFFF', family: 'system' },
      heading: { type: 'text', logo: null, font: 'inter', color: '#FFFFFF', size: 'large', effect: 'none', logoSize: 'normal' },
      footer: { logoUrl: null, url: null, color: null },
    },
  },
  {
    key: 'kyoto',
    title: 'Kyoto',
    description: 'Roxo místico com contraste claro',
    theme: {
      key: 'kyoto',
      editable: true,
      luminance: 'DARK',
      background: {
        type: 'COLOR',
        color: '#110054',
        style: 'PLAIN',
        properties: { backgroundColor: '#110054', color: '#fff' },
      },
      button: {
        type: 'FILL',
        properties: {
          backgroundColor: '#FFFFFF33',
          color: '#A884F3',
          fontWeight: '600',
          border: 'none',
          borderRadius: '24px',
          boxShadow: '0 4px 16px rgba(168,132,243,0.4)'
        },
      },
      socialStyle: { color: '#A884F3' },
      typeface: { color: '#A884F3', family: 'system' },
      heading: { type: 'text', logo: null, font: 'inter', color: '#A884F3', size: 'large', effect: 'none', logoSize: 'normal' },
      footer: { logoUrl: null, url: null, color: null },
    },
  },
  {
    key: 'vancouver',
    title: 'Vancouver',
    description: 'Verde militar com texto claro',
    theme: {
      key: 'vancouver',
      editable: true,
      luminance: 'DARK',
      background: {
        type: 'COLOR',
        color: '#373E24',
        style: 'PLAIN',
        properties: { backgroundColor: '#373E24', color: '#E3DFF3' },
      },
      button: {
        type: 'FILL',
        properties: {
          backgroundColor: '#00000033',
          color: '#E3DFF3',
          fontWeight: '600',
          border: 'none',
          borderRadius: '24px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
        },
      },
      socialStyle: { color: '#E3DFF3' },
      typeface: { color: '#E3DFF3', family: 'system' },
      heading: { type: 'text', logo: null, font: 'inter', color: '#E3DFF3', size: 'large', effect: 'none', logoSize: 'normal' },
      footer: { logoUrl: null, url: null, color: null },
    },
  },
  {
    key: 'copenhagen',
    title: 'Copenhagen',
    description: 'Azul escuro com ciano vibrante',
    theme: {
      key: 'copenhagen',
      editable: true,
      luminance: 'DARK',
      background: {
        type: 'COLOR',
        color: '#080221',
        style: 'PLAIN',
        properties: { backgroundColor: '#080221', color: '#79FBF7', },
      },
      button: {
        type: 'FILL',
        properties: {
          backgroundColor: '#9992CC26',
          color: '#79FBF7',
          fontWeight: '600',
          border: 'none',
          borderRadius: '24px',
          boxShadow: '0 4px 16px rgba(121,251,247,0.3)'
        },
      },
      socialStyle: { color: '#79FBF7' },
      typeface: { color: '#79FBF7', family: 'system' },
      heading: { type: 'text', logo: null, font: 'inter', color: '#79FBF7', size: 'large', effect: 'none', logoSize: 'normal' },
      footer: { logoUrl: null, url: null, color: null },
    },
  },

  {
    key: 'lisbon',
    title: 'Lisbon',
    description: 'Azul com amarelo claro',
    theme: {
      key: 'lisbon',
      editable: true,
      luminance: 'DARK',
      background: {
        type: 'IMAGE',
        imageUrl: 'https://media.bio.site/public/library/image-bg-catalog/fresh3.png',
        color: '#5286af',
        style: 'PLAIN',
        properties: {
          backgroundImage: 'url(https://media.bio.site/public/library/image-bg-catalog/fresh3.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#5286af',
          color: '#fff'
        },
      },
      button: {
        type: 'FILL',
        properties: {
          backgroundColor: '#FFFFFF33',
          color: '#FDFFB0',
          fontWeight: '600',
          border: 'none',
          borderRadius: '24px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
        },
      },
      socialStyle: { color: '#FDFFB0' },
      typeface: { color: '#FDFFB0', family: 'system' },
      heading: { type: 'text', logo: null, font: 'inter', color: '#FDFFB0', size: 'large', effect: 'none', logoSize: 'normal' },
      footer: { logoUrl: null, url: null, color: null },
    },
  },

  {
    key: 'melbourne',
    title: 'Melbourne',
    description: 'Rosa com creme',
    theme: {
      key: 'melbourne',
      editable: true,
      luminance: 'DARK',
      background: {
        type: 'IMAGE',
        imageUrl: 'https://media.bio.site/public/library/image-bg-catalog/fresh4.png',
        color: '#db9b97',
        style: 'PLAIN',
        properties: {
          backgroundImage: 'url(https://media.bio.site/public/library/image-bg-catalog/fresh4.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#db9b97'
        },
      },
      button: {
        type: 'FILL',
        properties: {
          backgroundColor: '#0000004D',
          color: '#F4DDC8',
          fontWeight: '600',
          border: 'none',
          borderRadius: '24px',
          boxShadow: '0 4px 16px rgba(219,155,151,0.3)'
        },
      },
      socialStyle: { color: '#F4DDC8' },
      typeface: { color: '#F4DDC8', family: 'system' },
      heading: { type: 'text', logo: null, font: 'inter', color: '#F4DDC8', size: 'large', effect: 'none', logoSize: 'normal' },
      footer: { logoUrl: null, url: null, color: null },
    },
  },

  {
    key: 'capetown',
    title: 'Capetown',
    description: 'Coral com amarelo claro',
    theme: {
      key: 'capetown',
      editable: true,
      luminance: 'DARK',
      background: {
        type: 'IMAGE',
        imageUrl: 'https://media.bio.site/public/library/image-bg-catalog/fresh5.png',
        color: '#ce7875',
        style: 'PLAIN',
        properties: {
          backgroundImage: 'url(https://media.bio.site/public/library/image-bg-catalog/fresh5.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#ce7875'
        },
      },
      button: {
        type: 'FILL',
        properties: {
          backgroundColor: '#FFE9AE33',
          color: '#FFE9AE',
          fontWeight: '600',
          border: 'none',
          borderRadius: '24px',
          boxShadow: '0 4px 16px rgba(206,120,117,0.3)'
        },
      },
      socialStyle: { color: '#FFE9AE' },
      typeface: { color: '#FFE9AE', family: 'system' },
      heading: { type: 'text', logo: null, font: 'inter', color: '#FFE9AE', size: 'large', effect: 'shadow', logoSize: 'normal' },
      footer: { logoUrl: null, url: null, color: null },
    },
  },
]

export function getPreset(key: string): ThemePreset | undefined {
  return THEME_PRESETS.find((p) => p.key === key)
}

export default THEME_PRESETS

