import { default as tailwindConfig } from '@leapwallet/react-ui/tailwind-config'

/** @type {import('tailwindcss').Config} */
export default {
  ...tailwindConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ]
}
