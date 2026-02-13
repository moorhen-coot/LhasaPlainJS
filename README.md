# LhasaPlainJS

A vanilla JS wrapper for [`lhasa-ligand-builder`](https://www.npmjs.com/package/lhasa-ligand-builder). Bundles React and all dependencies into a single ES module so you can use Lhasa (Moorhen's ligand builder) from any environment — plain HTML, Vue, Angular, Svelte, or anything else.

## Installation

```bash
npm install lhasa-ligand-builder-plainjs
```

## Usage

```js
import { createLhasa } from 'lhasa-ligand-builder-plainjs'

const lhasa = createLhasa(document.getElementById('lhasa-root'), {
  assetsBaseUrl: '/lhasa-assets/',
})

// To clean up:
lhasa.destroy()
```

CSS is injected automatically — no stylesheet imports needed.

## Asset setup

Lhasa requires runtime assets (`lhasa.js`, `lhasa.wasm`, `Components-inchikey.ich`, and the `icons/` directory) to be served by your web server. Use one of the bundler plugins below or copy the assets manually.

### Vite

```js
// vite.config.js
import lhasaCopyAssets from 'lhasa-ligand-builder-plainjs/lhasa-vite-plugin'

export default {
  plugins: [lhasaCopyAssets()],
}
```

### Webpack

```js
// webpack.config.js
const LhasaCopyAssetsPlugin = require('lhasa-ligand-builder-plainjs/lhasa-webpack-plugin')

module.exports = {
  plugins: [new LhasaCopyAssetsPlugin()],
  devServer: {
    static: [LhasaCopyAssetsPlugin.devServerStatic()],
  },
}
```

### Manual copy (fallback)

Copy the contents of `node_modules/lhasa-ligand-builder/dist/assets/` to your public directory (e.g. `public/lhasa-assets/`).

## Cross-origin isolation

Lhasa's WASM module uses `SharedArrayBuffer`, which requires these HTTP headers:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

During development with Vite, [`vite-plugin-cross-origin-isolation`](https://www.npmjs.com/package/vite-plugin-cross-origin-isolation) handles this automatically.

## Building from source

```bash
npm install
npm run build
```

## License

GPL-3.0 — see [LICENSE](LICENSE).
