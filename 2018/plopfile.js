module.exports = function(plop) {
  plop.setGenerator('new day', {
    description: 'new day files',
    prompts: [
      {
        type: 'input',
        name: 'dayNumber',
        message: 'Day number?'
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/day{{dayNumber}}/',
        templateFiles: 'plop-templates/*'
      },
      {
        type: 'add',
        path: 'src/day{{dayNumber}}/__tests__/day{{dayNumber}}.test.js',
        templateFile: 'plop-templates/__tests__/test.js'
      }
    ]
  });
};
