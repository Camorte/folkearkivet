/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                'fade-in': 'fadeIn 500ms ease-in',
                'fade-out': 'fadeOut 500ms ease-in-out'
            },

            // that is actual animation
            keyframes: (theme) => ({
                fadeIn: {
                    from: { opacity: '0' },
                    to: { opacity: '1' }
                },
                fadeOut: {
                    from: { opacity: '1' },
                    to: { opacity: '0' }
                }
            })
        }
    },
    plugins: []
};
