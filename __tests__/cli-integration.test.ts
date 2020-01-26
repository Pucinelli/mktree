const { system, filesystem } = require('gluegun');

const src = filesystem.path(__dirname, '..');

const cli = async cmd =>
  system.run('node ' + filesystem.path(src, 'bin', 'mktree') + ` ${cmd}`);

test('outputs version', async () => {
  const output = await cli('--version');
  expect(output).toContain('0.8.0');
});

test('outputs help', async () => {
  const output = await cli('--help');
  expect(output).toContain('0.8.0');
});

test('generates redux boilerplate from yaml', async () => {
  const output = await cli('structure.test.yml');

  expect(output).toContain('Redux');
  const genericAction = filesystem.read('Redux/Actions/GenericAction.js');

  expect(genericAction).toContain(
    `const genericAction = values => dispatch =>`
  );
  expect(genericAction).toContain(`dispatch({`);

  // cleanup artifact
  filesystem.remove('Redux');
});

test('generates redux boilerplate from tree output', async () => {
  const output = await cli('structure.test.txt');

  expect(output).toContain('Redux');
  expect(filesystem.exists('Redux/Actions/GenericAction.js')).toBeTruthy();

  // cleanup artifact
  filesystem.remove('Redux');
});

test('generates redux boilerplate with custom name', async () => {
  const output = await cli(
    'custom-structure.test.yml --var root_name=redux-test'
  );

  expect(output).toContain('$root_name');
  const genericAction = filesystem.read('redux-test/Actions/GenericAction.js');

  expect(genericAction).toContain(
    `const genericAction = values => dispatch =>`
  );
  expect(genericAction).toContain(`dispatch({`);

  // cleanup artifact
  filesystem.remove('redux-test');
});
