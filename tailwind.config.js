/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0a0f1e",
                secondary: "#111831",
                accent: "#38bdf8",
                brand: {
                    sky: "#38bdf8",
                    violet: "#a855f7",
                    pink: "#ec4899",
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'text-brand': 'linear-gradient(135deg, #38bdf8 0%, #a855f7 50%, #ec4899 100%)',
                'card-brand': 'linear-gradient(135deg, rgba(56,189,248,0.16) 0%, rgba(168,85,247,0.12) 50%, rgba(236,72,153,0.10) 100%)',
            },
            boxShadow: {
                'glow': '0 0 60px -12px rgba(56,189,248,0.45)',
                'glow-violet': '0 0 60px -12px rgba(168,85,247,0.45)',
                'glow-pink': '0 0 60px -12px rgba(236,72,153,0.45)',
                'card': '0 8px 30px -12px rgba(0,0,0,0.6)',
            },
            animation: {
                'gradient-x': 'gradient-x 3s linear infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
                'spin-slow': 'spin 14s linear infinite',
            },
            keyframes: {
                'gradient-x': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-16px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.08)' },
                },
            },
        },
    },
    plugins: [],
}