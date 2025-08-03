module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx',
          ],
          root: ['.'],
          alias: {
            src: './src',
            common: './src/common',
            components: './src/components',
            screens: './src/screens',
            store: './src/store',
            reducers: './src/store/reducers',
          },
        },
      ],
      'react-native-reanimated/plugin',

      [
        'module:react-native-dotenv',
        {
          envName: 'ENV',
          moduleName: 'react-native-dotenv',
          path: '.env',
          safe: false,
          allowUndefined: false,
        },
      ],
    ],
    overrides: [
      {
        test: fileName => !fileName.includes('node_modules/react-native-maps'),
        plugins: [['@babel/plugin-transform-private-methods', {loose: true}]],
      },
    ],
  };
};

/*Erivan couttolenc : */
// Ce fichier configure Babel pour l'application React Native.
// - Utilise le preset standard `metro-react-native-babel-preset`.
// - Ajoute un plugin `module-resolver` pour permettre des alias personnalisés (ex : `src`, `components`, etc.).
// - Intègre le plugin `react-native-reanimated`, requis pour le bon fonctionnement de Reanimated.
// - Utilise `react-native-dotenv` pour charger les variables d’environnement depuis un fichier `.env`.
// - Applique une règle spéciale (`overrides`) pour éviter les conflits avec `react-native-maps` en activant
//   `@babel/plugin-transform-private-methods` (en mode loose) uniquement hors de ce module.
