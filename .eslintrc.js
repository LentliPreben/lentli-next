module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  root: true,
  plugins: ['prettier'],
  rules: {
    semi: [2, 'never'],
    'no-return-await': 2,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        semi: false,
        bracketSpacing: true,
        bracketSameLine: true,
        printWidth: 80,
        tabWidth: 2,
        useTabs: false
      }
    ]
  }
}
