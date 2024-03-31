module.exports = {
    testEnvironment: 'node', // Indique à Jest de simuler l'environnement Node.js
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$', // Motif de recherche pour les fichiers de test
    moduleFileExtensions: ['js', 'json', 'node'], // Extensions de fichiers à prendre en charge
    collectCoverage: true, // Active la collecte de la couverture des tests
    coverageReporters: ['json', 'lcov', 'text', 'html'], // Formats de rapport de couverture des tests
  };
  