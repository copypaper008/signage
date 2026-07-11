# Under-Awning Lightbox Designer

An interactive wizard for designing a custom under-awning lightbox sign and previewing it composited onto a photo of your own storefront.

## Features

- Step-by-step wizard: size, corner shape, frame finish, face color & illumination, text/logo graphics
- Live canvas preview of the design as you configure it
- Upload a photo of your own awning/storefront and drag, resize, and rotate the design onto it (powered by Konva)
- Download the final composited image, or generate a pre-filled "request a quote" email

## Stack

React + TypeScript + Vite, [Konva](https://konvajs.org/) / `react-konva` for canvas rendering and the drag-resize-rotate compositor, [Zustand](https://github.com/pmndrs/zustand) for wizard state.

## Development

```bash
npm install
npm run dev
```

```bash
npm run build   # type-check + production build
npm run lint     # oxlint
```
