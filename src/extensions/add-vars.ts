import { GluegunToolbox } from 'gluegun';

module.exports = (toolbox: GluegunToolbox) => {
  toolbox.addVars = (file: string, vars: string | string[] | undefined) => {
    if (vars === undefined) return file;
    if (typeof vars === 'string') {
      const [key, value] = vars.split('=', 2);
      return file.replace(new RegExp(`\\$${key}`, 'g'), value || key);
    } else {
      const varList: string[] = vars;
      let fileContent = file;
      for (const variable of varList) {
        const [key, value] = variable.split('=', 2);
        console.log(key, value);
        fileContent.replace(new RegExp(`\\$${key}`, 'g'), value || key);
      }
      return fileContent;
    }
  };
};
