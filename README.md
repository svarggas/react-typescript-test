# Test project

## Scripts

```bash
npm install -> Install the dependencies
```
```bash
npm run dev -> Run the application locally
```
```bash
npm run build -> Build the project
```
```bash
npm run preview -> Preview the production build locally
```

## Steps for local run

In order for the application to run correctly you will need a `MEDIASTACK_ACCESS_KEY` and `PROTOCOL` as shown in the `.env.example` which can be found on the root of the project.

1. Create a `.env` file.
2. Add the `MEDIASTACK_ACCESS_KEY` as shown in the `.env.example` with the access key value.
3. Add the `PROTOCOL` as shown in the `.env.example` with the value; `http` for local development and `https` for production deployed code.
4. Run `npm install`
5. Run `npm run dev`
6. Application should start in localhost:3000 automatically

## Overview

The purpouse of the project is to showcase the capabilities regarding Front End Development. Focused on:
- Project architecture
- Good practices
- Vanilla CSS
- Standardized DX
