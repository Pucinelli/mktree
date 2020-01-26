# mktree

Build entire directory structures with ease.

## About

Many times, developers have to deal with huge boilerplates to follow a pattern or because a framework requires it. This boilerplate often requires a specific directory structure, and even though this is an easy thing to do, it shouldn't take too long to do so.

This is where mktree enters. It was first meant to be used for personal projects, but I saw it could reach its full potential in the usage with starter tools.

## Usage

### CLI

`mktree` can be used with yaml files or with the output of the `tree` command. For example, lets imagine the following `structure.yml`:

```yaml
- Redux:
    - Actions:
        - GenericAction.js
    - Reducers:
        - GenericReducer.js
        - Reducers.js
    - Store:
        - DefaultStore.js
```

With the command `mktree structure.yml`, this structure will be created in your current working directory.

But, only a simple directory structure would be easy to create with `mkdir`. What makes mktree special is the fact that you can also specify contents for the files you will be creating. Take the previous directory structure, for example:

```yaml
- Redux:
    - Actions:
        - GenericAction.js: |
            const genericAction = values => dispatch =>
              dispatch({
                type: 'GENERIC_ACTION',
                payload: values
              });

            export { genericAction };
    - Reducers:
        - GenericReducer.js: |
            import { generic } from '../Store/DefaultStore';

            const GenericReducer = (store = generic, action) => {
              switch (action.type) {
                case 'GENERIC_ACTION':
                  return { ...store, ...action.payload };

                default:
                  return store;
              }
            };

            export default GenericReducer;
        - Reducers.js: |
            import { combineReducers } from 'redux';
            import genericReducer from '../Reducers/GenericReducer';

            const Reducers = combineReducers(
              {
                generic: genericReducer
              }
            );

            export default Reducers;
    - Store:
        - DefaultStore.js: |
            const generic = {
              data: null,
              otherData: null
            };

            export { generic };
```

**Everything** will be created, which allow the quick creation of projects that share the same boilerplate ~~yes react-redux, if it's not clear, I'm looking at you~~.

### In Code

You can also use mktree in code. After installing it, you can require the `cli` file and call the `run` function.

Example:

```javascript
const mktree = require('mktree/cli');
mktree.run(['structure.test.yml']);
```

_Please, note that this function returns a Promise, so you may want to wrap them on `async` functions or resolve the promise._

## Other features

### Input from `tree` command

Sometimes you just happen to have the project structure and want to replicate it easily. With some tools you can easily see your directory structure as a `tree`. The following output is the output given with the usage of the `tree` command of [lsd](https://github.com/Peltoche/lsd)

```
Redux
├── Actions
│  └── GenericAction.js
├── Reducers
│  ├── GenericReducer.js
│  └── Reducers.js
└── Store
   └── DefaultStore.js
```

You can save it with `lsd --tree src > structure.txt` and then in your project just call `mktree structure.txt`.

The same rules of the yaml apply here, but unfortunately you won't be able to create boilerplates with content for your files if you chose this method.

### Templating

What if you want to create a boilerplate with custom names? With mktree you can just use as many `--var` options as you need.

In your `structure.yml` file, where you want something to be replaced by variables just set it as `$foo` and call mktree as `mktree structure.yml --var foo=bar`. When the files are being created all occurences of `$foo` will be replaced by `bar`.

_Please, note that this feature may change syntax in the future_

## Roadmap

- Enable the definition of where the boilerplate must be created
- Enable piping of stdin as input, making possible the usage of mktree such as `tree src | mktree`

# License

MIT - see [LICENSE](LICENSE)
