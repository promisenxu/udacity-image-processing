# Image Processing - Fullstack JavaScript Nano Degree - Udacity

## Overview

This is Promise Xu repo for the Image Procesing project in the Udacity Fullstack JavaScript Nano Degree (FJND). Written in Typescript, this project is scaffolding with [TSDX](https://tsdx.io/).

## Commands

Upon downloading this project, pleas run `npm install` to make sure all dependencies are installed.

### Starting a Development Build

```bash
npm start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

**!!IMPORTANT!!**

After running the above command, in another terminal/command-line window, set to the project root folder, run:
```bash
node dist/index.js
```
to start the server.

Then open [http://localhost:3000/](http://localhost:3000/)

### Test
```bash
npm test
```

### Linting
```bash
npm lint
```

or, to auto fix all warnings:
```bash
npm lintfix
```

## Endpoints

This repo provides one single endpoint, at **/images/:imageName**, with the functionality of resizing the source image with two URL parameters, width and height.

### Allowable imageName

- encenadaport
- fjord
- icelandwaterfall
- palmtunnel
- santamonica

### Resize Configuration with URL parameters

There are two possible parameters to provided to the endpoint to specify how you want the source image to be resized, width and height.

For example, to resize the fjord image to width 100 and height 100:
[http://localhost:3000/images/fjord?width=100&height=100](http://localhost:3000/images/fjord?width=100&height=100)

### Caching

All rendered, resized images are saved as cache. Subsequent requests for the same image and same resize configuration would read directly from cache.

### Credit

Source images provided by Udacity