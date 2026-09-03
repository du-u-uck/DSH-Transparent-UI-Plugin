# Development notes / 开发说明

This plugin ships two layers of code. Keep both in sync whenever you change behaviour.
本插件有两层代码，改动功能时必须同步。

## Source vs runtime / 源码与运行时

- `src/client/` is the readable TypeScript source — the reference implementation.
- `lib/client.js` is the prebuilt bundle DSH actually loads at runtime (the package `main`).
  It keeps the host's expected `window.__ModuleLoader__.load(...)` wrapper with CSS inlined.
  That wrapper comes from an unpublished DSH client build preset, so `lib/client.js` is
  maintained as a minimally patched build here, not regenerated from `src/`.
- The plugin card (`AquaPluginCard.tsx`) and the General-settings appearance row
  (`AquaAppearanceRow.tsx`) read the same `enabled` state. The appearance row always shows
  the glass-effect master switch and hides the knobs while the effect is off.

## When you change something / 改动时

1. Edit the source under `src/client/`.
2. Mirror the identical change into `lib/client.js` (same locale keys, class names, wiring).
3. Validate the bundle: `node --check lib/client.js`.

## Type-checking / 类型校验

Outside the DSH monorepo, after installing dev dependencies:

```sh
npx tsc -p tsconfig.standalone.json
```

(Bundling still needs the unpublished host preset; see CHANGELOG.)

## Install for local testing / 本地安装

```powershell
powershell -ExecutionPolicy Bypass -File .\install.ps1 -Source (Get-Location).Path -Profile web
```

Reload the DSH web UI afterwards.
