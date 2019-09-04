# Career Network

## Development

- Ensure `node` is installed
- It is suggested to install an `eslint` plugin for your chosen editor

Clone repo and run (specifying the desired environment, if not `dev1`):

```sh
npm install
npm run env:dev1
npm run dev
```

## Deployment

Clone repo and install:

```sh
npm install
```

Specify the Firebase project to which you would like to deploy (`ppe` shown here as an example):

```sh
npm run env:ppe
```

(Optional) Preview the exported static site locally:

```sh
npm run preview
```

If all looks good, ship it:

```sh
npm run deploy
```
