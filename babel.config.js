
module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-env'],
  plugins: ['@babel/plugin-proposal-class-properties'],
  env: {
    production: {
      plugins: [
        ['transform-rename-import', { 'original': './index.scss', 'replacement': './index.css' }]
      ]
    }
  }
}
