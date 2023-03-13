module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'airbnb',
		'airbnb/hooks',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/jsx-runtime',
	],
	'overrides': [
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'simple-import-sort',
	],
		'simple-import-sort/imports': [2, {
			groups: [
				['^react'],
				['^antd'],
				['^@?\\w'],
				['@/(.*)'],
				['^~'],
				['^~/asmlib'],
				['^[./]'],
				['^~assets'],
				['@.+.(sc|sa|c)ss$'],
				['.(sc|sa|c)ss$'],
				['.module.(sc|sa|c)ss$'],
			],
		}],
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};
