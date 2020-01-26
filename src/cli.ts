import { build } from 'gluegun';

const run = async (argv: string[]) => {
  const cli = build()
    .brand('mktree')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'mktree-*', hidden: true })
    .help()
    .version()
    .create();

  const toolbox = await cli.run(argv);

  return toolbox;
};

module.exports = { run };
