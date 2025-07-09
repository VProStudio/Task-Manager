const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.platforms = ['native', 'web', 'ios', 'android'];

config.resolver.alias = {
    '@': path.resolve(__dirname, './'),
    '@components': path.resolve(__dirname, './components'),
    '@screens': path.resolve(__dirname, './screens'),
    '@types': path.resolve(__dirname, './types'),
    '@utils': path.resolve(__dirname, './utils'),
    '@store': path.resolve(__dirname, './store'),
    '@hooks': path.resolve(__dirname, './hooks'),
    '@theme': path.resolve(__dirname, './theme'),
};

module.exports = config;