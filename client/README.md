# Notes app client

Client of Notes app that creates a board where users can create/edit/delete and re-arrange sticky notes.
Client uses browser's local storage that allows to persist changes even if internet connection is lost.Notes application make use of Socket.io client and changes made locally would be visible for other users.

## How to run locally

To install necessary dependencies:

```shell
yarn
```

To run app in development mode:

```shell
yarn run start
```

## How to test

To run test suite:

```shell
yarn run test
```

## Future improvements

- Refactor `index.css` file to smaller `<component-name>.module.css` files and place them next to components
- Update tests for custom hook `useDragAndDrop.ts`
- Validate whether notes should have author field
