module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        ['feat', 'fix'] // Les types autorisés sont "feat" et "fix"
      ]
    }
  };