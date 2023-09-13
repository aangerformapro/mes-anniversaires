import elements from 'tw-elements/dist/plugin.cjs';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "public/**/*.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./node_modules/tw-elements/dist/js/**/*.js",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        elements
    ],
    darkMode: "class",
}
