/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
		},
		colors: {
			primary: "rgb(2, 153, 255)",
			"primary-content": "rgb(255, 255, 255)",
			"primary-light": "rgb(53, 174, 255)",

			background: "rgb(26, 26, 26)",
			foreground: "rgb(38, 38, 38)",
			border: "rgb(64, 64, 64)",

			text: "rgb(251, 251, 251)",

			error: "rgb(255, 2, 2)",

			"error-content": "rgb(255, 255, 255)",
		},

		extend: {},
	},
	plugins: ["prettier-plugin-tailwindcss"],
};
