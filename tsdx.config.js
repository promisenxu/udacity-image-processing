const copy = require('rollup-plugin-copy');

module.exports = {
    rollup(config) {
        config.plugins.push(
            copy({
                targets: [
                    { src: 'src/images/source/*.jpg', dest: 'dist/images/source' },
                    { src: 'src/images/cache', dest: 'dist/images' }, // Must copy files and folder separately - otherwise npm build would fail
                ],
            })
        );
        return config;
    },
};
