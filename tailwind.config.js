export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                serif: ['Playfair Display', 'ui-serif', 'Georgia', 'serif'],
            },
            colors: {
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                },
                accent: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    500: '#64748b',
                    700: '#334155',
                    900: '#0f172a',
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};