/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    violet: "#8b5cf6",
                    indigo: "#6366f1",
                    cyan: "#22d3ee",
                    sky: "#38bdf8",
                    pink: "#ec4899",
                },
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
            },
            boxShadow: {
                'glass': '0 8px 32px -8px rgba(0,0,0,0.12)',
                'glass-lg': '0 24px 60px -12px rgba(0,0,0,0.25)',
                'glow-violet': '0 0 60px -12px rgba(139,92,246,0.55)',
                'glow-cyan': '0 0 60px -12px rgba(34,211,238,0.55)',
            },
            animation: {
                'gradient-x': 'gradient-x 4s ease infinite',
                'float-slow': 'float 9s ease-in-out infinite',
                'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
            },
            keyframes: {
                'gradient-x': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                'pulse-soft': {
                    '0%, 100%': { opacity: '0.5' },
                    '50%': { opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}