// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
// };
module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        root: ['./src'],
        alias: {
          '@root': './src',
        },
      },
    ],
  ],
  presets: ['module:metro-react-native-babel-preset', 'module:react-native-dotenv'],
};
