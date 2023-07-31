import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'

export default {
	input: './src/packages/index.js',
	output: {
		file: './lib/index.js',
		format: 'cjs'
	},
	plugins: [
		babel(),
		postcss()
	],
	// 设置react为外部引用，可避免打包时打进去，否则警告(!) Unresolved dependencies
	external: ['react']
}
