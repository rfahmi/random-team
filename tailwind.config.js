module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: "#2d2d7b",
                "primary-light": "#6F4AB1",
                danger: "#e3342f",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
