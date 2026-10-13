import type { Config } from 'tailwindcss'
const config: Config = { darkMode: ['class'], content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#070b19', cyan: '#5ce1e6', violet: '#a78bfa', coral: '#ff7a90' }, fontFamily: { sans: ['var(--font-geist)', 'sans-serif'] } } }, plugins: [] }
export default config
