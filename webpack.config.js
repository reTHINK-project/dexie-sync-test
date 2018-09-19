const path = require('path');

const config = {
  context: path.resolve(__dirname, 'src'),  
  entry: {
    // removing 'src' directory from entry point, since 'context' is taking care of that
    syncableTest1: './syncableTest1.js',
    syncableTest2: './syncableTest2.js',
    syncableTest3: './syncableTest3.js',
    syncableTest4: './syncableTest4.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'development'  
}

module.exports = config;