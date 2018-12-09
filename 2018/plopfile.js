module.exports = function(plop) {
  plop.setGenerator('new day', {
    description: 'new day files',
    prompts: [
      {
        type: 'input',
        name: 'fileName',
        message: 'File name?',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/{{fileName}}/',
        templateFiles: 'plop-templates/*',
      },
      {
        type: 'add',
        path: 'src/{{fileName}}/__tests__/{{fileName}}.test.js',
        templateFile: 'plop-templates/__tests__/test.js',
      },
    ],
  });
};
