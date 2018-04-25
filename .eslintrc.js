module.exports = {
	extends: 'airbnb',
	root: true,	
	
	overrides: [
		{
			files: [				
				'**/__tests__/**',
			],
			env: {
				node: true,
				browser: true,
				jest: true,
			},
			rules: {
				// allow test files to import dev dependencies
				'import/no-extraneous-dependencies':
                    ['error',
                        {
                            devDependencies: true,
                            optionalDependencies: true,
                            peerDependencies: true,
                        },
					]
				}
		},		
	],
};
