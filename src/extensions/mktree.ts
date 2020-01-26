import { GluegunToolbox } from 'gluegun';
import { join } from 'path';

module.exports = (toolbox: GluegunToolbox) => {
  toolbox.mktree = async (
    tree: any,
    path: string = toolbox.filesystem.cwd()
  ) => {
    const keys = tree instanceof Array ? tree : Object.keys(tree);
    for (const key of keys) {
      if (key instanceof Object) {
        await toolbox.mktree(key, path);
      } else {
        const filePath = join(path, key);
        if (tree[key] instanceof Object) {
          await toolbox.filesystem.dirAsync(filePath);
          await toolbox.mktree(tree[key], filePath);
        } else {
          await toolbox.filesystem.writeAsync(filePath, tree[key] || '');
        }
      }
    }
  };
};
