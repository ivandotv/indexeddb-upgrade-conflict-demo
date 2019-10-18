# IndexedDB upgrade conflict version resolution

This is the repository for my blog post about [IndexedDB upgrade conflict version resolution](https://dev.to/ivandotv/handling-indexeddb-upgrade-version-conflict-368a)

## Scenario

When the user has multiple tabs of the same site open, there is a potential for completely ruining the data in the indexedDB database if the versions of the DB don't match.

For a deeper explanation of the problem and for the solution [please refer to the article](https://dev.to/ivandotv/handling-indexeddb-upgrade-version-conflict-368a)

## Usage

```sh
npm install
```

```sh
npm start
```

- Open browser to `http://localhost:8080`
- Open multiple tabs to `http://localhost:8080`
- Increase `version` variable in the `main.js` file
- Reload one tab, and watch what happens in other tabs (with the old database)
