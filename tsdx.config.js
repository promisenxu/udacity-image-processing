const images = require('@rollup/plugin-image');
const static_files = require('rollup-plugin-static-files');

module.exports = {
    rollup(config) {
        config.plugins = [
            images({ include: ['**/*.png', '**/*.jpg'] }),
            ...config.plugins,
        ];
        config.plugins.push(
            static_files({
                include: ['./src/images/source']
            })
        );
        return config;
    },
};
