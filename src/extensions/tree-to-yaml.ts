import { GluegunToolbox } from 'gluegun';

module.exports = (toolbox: GluegunToolbox) => {
  toolbox.treeToYaml = (file: string) => {
    return (
      '- ' +
      file
        .replace(/[└├]/g, '')
        .replace(/ {2}/g, ' ')
        .replace(/── /g, '  - ')
        .replace(/──/g, ' ')
        .replace(/\n/g, ':\n')
        .replace(/│/g, ' ')
    );
  };
};
