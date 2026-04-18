![logo](https://freezer.com.ar/logo.png)

### 1. Install dependencies

```
npm install
```

### 2. Set up sharp (native image module)

If you have `ignore-scripts=true` in `~/.npmrc`, the `sharp` binary inside `@kriya/gridsome` won't be set up automatically. Run:

```
(cd node_modules/@kriya/gridsome/node_modules/sharp && SHARP_IGNORE_GLOBAL_LIBVIPS=1 node install/libvips && npx prebuild-install)
```

> `SHARP_IGNORE_GLOBAL_LIBVIPS=1` forces downloading the vendored libvips bundle that the prebuilt binary links against, even if libvips is already installed globally.

### 3. Start development server

```
npm run develop
```
