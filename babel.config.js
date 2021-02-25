
module.exports = {
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env']],
  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-arrow-functions'],
  env: {
    production: {
      plugins: [
        ['transform-rename-import', { 'original': './index.module.scss', 'replacement': './index.module.css' }]
      ]
    }
  }
}
