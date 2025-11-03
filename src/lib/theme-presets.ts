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
        noise: false,
        __typename: 'ColorBackground',
      },
      buttonStyle: {
        type: 'FILL',
        backgroundStyle: { color: '#ffffff', __typename: 'ButtonBackgroundStyle' },
        shadowStyle: { type: 'SHADOW_FULL', color: '#000000', __typename: 'ButtonShadowStyle' },
        cornerStyle: { type: 'ROUNDED_FULL', __typename: 'ButtonCornerStyle' },
        textStyle: { color: '#000000', __typename: 'ButtonTextStyle' },
        __typename: 'ButtonStyle',
      },
      socialStyle: { color: '#000000', __typename: 'SocialStyle' },
      typeface: { color: '#000000', family: 'link sans product', __typename: 'Typeface' },
      heading: { type: 'text', logo: null, font: 'salsa', color: '#000000', size: 'large', effect: 'none', logoSize: 'normal', __typename: 'HeadingOptions' },
      footer: { logoUrl: null, url: null, color: null, __typename: 'Footer' },
      __typename: 'CustomTheme',
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
        style: 'STRIPES',
        __typename: 'GradientBackground',
      },
      buttonStyle: {
        type: 'FILL',
        backgroundStyle: { color: '#111827', __typename: 'ButtonBackgroundStyle' },
        shadowStyle: { type: 'SHADOW_SMALL', color: '#000000', __typename: 'ButtonShadowStyle' },
        cornerStyle: { type: 'ROUNDED', __typename: 'ButtonCornerStyle' },
        textStyle: { color: '#ffffff', __typename: 'ButtonTextStyle' },
        __typename: 'ButtonStyle',
      },
      socialStyle: { color: '#ffffff', __typename: 'SocialStyle' },
      typeface: { color: '#ffffff', family: 'system', __typename: 'Typeface' },
      heading: { type: 'text', logo: null, font: 'salsa', color: '#ffffff', size: 'large', effect: 'none', logoSize: 'normal', __typename: 'HeadingOptions' },
      footer: { logoUrl: null, url: null, color: null, __typename: 'Footer' },
      __typename: 'CustomTheme',
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
        style: 'WAVES',
        __typename: 'GradientBackground',
      },
      buttonStyle: {
        type: 'OUTLINE',
        backgroundStyle: { color: '#ffffff', __typename: 'ButtonBackgroundStyle' },
        shadowStyle: { type: 'NONE', color: '#000000', __typename: 'ButtonShadowStyle' },
        cornerStyle: { type: 'ROUNDED', __typename: 'ButtonCornerStyle' },
        textStyle: { color: '#2b6cb0', __typename: 'ButtonTextStyle' },
        __typename: 'ButtonStyle',
      },
      socialStyle: { color: '#2b6cb0', __typename: 'SocialStyle' },
      typeface: { color: '#2b6cb0', family: 'system', __typename: 'Typeface' },
      heading: { type: 'text', logo: null, font: 'inter', color: '#2b6cb0', size: 'large', effect: 'none', logoSize: 'normal', __typename: 'HeadingOptions' },
      footer: { logoUrl: null, url: null, color: null, __typename: 'Footer' },
      __typename: 'CustomTheme',
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
      background: { type: 'COLOR', color: '#ffffff', style: 'PLAIN', __typename: 'ColorBackground' },
      buttonStyle: { type: 'GHOST', backgroundStyle: { color: '#ffffff', __typename: 'ButtonBackgroundStyle' }, shadowStyle: { type: 'NONE', __typename: 'ButtonShadowStyle' }, cornerStyle: { type: 'ROUNDED', __typename: 'ButtonCornerStyle' }, textStyle: { color: '#111827', __typename: 'ButtonTextStyle' }, __typename: 'ButtonStyle' },
      socialStyle: { color: '#111827', __typename: 'SocialStyle' },
      typeface: { color: '#111827', family: 'system', __typename: 'Typeface' },
      heading: { type: 'text', logo: null, font: 'inter', color: '#111827', size: 'medium', effect: 'none', logoSize: 'normal', __typename: 'HeadingOptions' },
      footer: { logoUrl: null, url: null, color: null, __typename: 'Footer' },
      __typename: 'CustomTheme',
    },
  },
]

export function getPreset(key: string): ThemePreset | undefined {
  return THEME_PRESETS.find((p) => p.key === key)
}

export default THEME_PRESETS

