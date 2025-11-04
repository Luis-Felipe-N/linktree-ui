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
    key: 'groove',
    title: 'Groove (verde suave)',
    description: 'Cor de fundo suave com grid e botão branco (espécie de exemplo exportado).',
    theme: {
      key: 'custom',
      editable: true,
      luminance: 'LIGHT',
      background: {
        color: '#ccd7a3',
        style: 'GRID',
        type: 'COLOR',
        className: 'bg-[#ccd7a3]',
        noise: false,
        properties: { backgroundColor: '#ccd7a3' },
      },
      buttonStyle: {
        type: 'FILL',
        className: 'bg-white text-black shadow-lg rounded-full px-4 py-2',
        backgroundStyle: { color: '#ffffff', properties: { backgroundColor: '#ffffff' } },
        shadowStyle: { type: 'SHADOW_FULL', color: '#000000', properties: { boxShadow: '0 8px 30px rgba(0,0,0,0.18)' } },
        cornerStyle: { type: 'ROUNDED_FULL' },
        textStyle: { color: '#000000', properties: { color: '#000000' } },
        shapeStyle: { properties: { border: 'none' } },
      },
      socialStyle: { color: '#000000' },
      typeface: { color: '#000000', family: 'link sans product' },
      heading: { type: 'text', logo: null, font: 'salsa', color: '#000000', size: 'large', effect: 'none', logoSize: 'normal' },
      footer: { logoUrl: null, url: null, color: null },
    },
  },

  {
    key: 'sunset',
    title: 'Sunset',
    description: 'Gradiente quente com botão escuro.',
    theme: {
      key: 'sunset',
      editable: true,
      luminance: 'LIGHT',
      background: {
        type: 'GRADIENT',
        gradientStart: '#ff7e5f',
        gradientEnd: '#feb47b',
        gradientDirection: 'to right',
        className: 'bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]',
        style: 'STRIPES',
        properties: { backgroundImage: 'linear-gradient(to right, #ff7e5f, #feb47b)' },
      },
      buttonStyle: {
        type: 'FILL',
        shapeStyle: { properties: { border: 'none' } },
        className: 'bg-[#111827] text-white rounded px-4 py-2 shadow-sm',
        backgroundStyle: { color: '#000', properties: { backgroundColor: '#000' } },
        shadowStyle: { type: 'SHADOW_SMALL', color: '#000000', properties: { boxShadow: '0 4px 12px rgba(0,0,0,0.08)' } },
        cornerStyle: { type: 'ROUNDED' },
        textStyle: { color: '#ffffff', properties: { color: '#ffffff' } },
      },
      socialStyle: { color: '#ffffff' },
      typeface: { color: '#ffffff', family: 'system' },
      heading: { type: 'text', logo: null, font: 'salsa', color: '#ffffff', size: 'large', effect: 'none', logoSize: 'normal' },
      footer: { logoUrl: null, url: null, color: null },
    },
  },

  {
    key: 'ocean',
    title: 'Ocean',
    description: 'Tons de azul com um botão de destaque claro.',
    theme: {
      key: 'ocean',
      editable: true,
      luminance: 'LIGHT',
      background: {
        type: 'GRADIENT',
        gradientStart: '#2b6cb0',
        gradientEnd: '#2c7a7b',
        gradientDirection: '135deg',
        className: 'bg-gradient-to-br from-[#2b6cb0] to-[#2c7a7b]',
        style: 'WAVES',
        properties: { backgroundImage: 'linear-gradient(135deg, #2b6cb0, #2c7a7b)' },
      },
      buttonStyle: {
        type: 'OUTLINE',
        className: 'bg-white text-[#2b6cb0] border border-[#2b6cb0] rounded px-4 py-2',
        backgroundStyle: { color: '#ffffff', properties: { backgroundColor: '#ffffff' } },
        shadowStyle: { type: 'NONE', color: '#000000', properties: {} },
        cornerStyle: { type: 'ROUNDED', properties: {} },
        textStyle: { color: '#2b6cb0', properties: { color: '#2b6cb0' } },
      },
      socialStyle: { color: '#2b6cb0' },
      typeface: { color: '#2b6cb0', family: 'system' },
      heading: { type: 'text', logo: null, font: 'inter', color: '#2b6cb0', size: 'large', effect: 'none', logoSize: 'normal' },
      footer: { logoUrl: null, url: null, color: null },
    },
  },

  {
    key: 'minimal',
    title: 'Minimal',
    description: 'Fundo branco limpo e botão sutil.',
    theme: {
      key: 'minimal',
      editable: true,
      luminance: 'LIGHT',
      background: { type: 'COLOR', color: '#ffffff', style: 'PLAIN', className: 'bg-white', properties: { backgroundColor: '#ffffff' } },
      buttonStyle: { type: 'GHOST', className: 'bg-transparent text-[#111827] rounded px-4 py-2', backgroundStyle: { color: '#ffffff', properties: { backgroundColor: '#ffffff' } }, shadowStyle: { type: 'NONE', properties: {} }, cornerStyle: { type: 'ROUNDED', properties: {} }, textStyle: { color: '#111827', properties: { color: '#111827' } } },
      socialStyle: { color: '#111827' },
      typeface: { color: '#111827', family: 'system' },
      heading: { type: 'text', logo: null, font: 'inter', color: '#111827', size: 'medium', effect: 'none', logoSize: 'normal' },
      footer: { logoUrl: null, url: null, color: null },
    },
  },
]

export function getPreset(key: string): ThemePreset | undefined {
  return THEME_PRESETS.find((p) => p.key === key)
}

export default THEME_PRESETS

