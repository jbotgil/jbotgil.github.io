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
                    violet: "#6d5cf6",
                    indigo: "#5b5bd6",
                    cyan: "#22d3ee",
                },
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
            },
            boxShadow: {
                'card': '0 1px 2px rgba(16,24,40,0.04), 0 14px 40px -20px rgba(16,24,40,0.18)',
                'card-lg': '0 2px 4px rgba(16,24,40,0.05), 0 28px 70px -30px rgba(16,24,40,0.32)',
                'glow-violet': '0 0 50px -12px rgba(109,92,246,0.55)',
            },
        },
    },
    plugins: [],
}