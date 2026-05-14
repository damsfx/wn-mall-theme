import { defineConfig } from 'vite';
import tailwindcss from "@tailwindcss/vite";
import laravel from 'laravel-vite-plugin';
import pkg from './package.json'
import banner from 'vite-plugin-banner';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { viteStaticCopy } from 'vite-plugin-static-copy';


/*
 |--------------------------------------------------------------------------
 | Usefull functions
 |--------------------------------------------------------------------------
 */
Date.prototype.getBuild = function () {
    let mm = this.getMonth() + 1;
    let dd = this.getDate();
    let hours = this.getHours();
    let mins = this.getMinutes();
    let secs = this.getSeconds();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd,
        '-',
    (hours > 9 ? '' : '0') + hours,
    (mins > 9 ? '' : '0') + mins,
    (secs > 9 ? '' : '0') + secs,
    ].join('');
};


/*
 |--------------------------------------------------------------------------
 | Vite config
 |--------------------------------------------------------------------------
 */
export default defineConfig({
    build: {
        outDir: 'assets/dist',
        assetsDir: '',
        rollupOptions: {
            output: {
                assetFileNames: ({ name }) => {
                    let extType = name.split('.').at(1);
                    if (/\.css$/.test(name ?? '')) {
                        extType = 'css';
                    }
                    if (/\.(gif|jpe?g|png|webp|svg|ico)$/.test(name ?? '')) {
                        extType = 'images';
                    }
                    if (/.(woff|woff2|eot|ttf)/.test(name ?? '')) {
                        extType = 'fonts';
                    }
                    return `${extType}/[name]-[hash][extname]`;
                },
                chunkFileNames: 'js/[name]-[hash].js',
                entryFileNames: 'js/[name]-[hash].js',
            },
        },
    },
    experimental: {
        renderBuiltUrl: function (filename, { hostId, hostType, type }) {
            if (type === 'asset') {
                if (hostType === 'css') {
                    return filename.replace(/(?<type>images|fonts)/i, '../$<type>');
                }
            }
        }
    },
    server: {
        host: '0.0.0.0',
        port: 8000,
        cors: {
            origin: 'http://winter-mall.local', // or the specific origin of your Laravel app
            credentials: true,
        },
        hmr: {
            host: 'localhost',
            port: 8000,
        },
    },

    plugins: [
        tailwindcss(),

        laravel({
            publicDirectory: 'assets/dist',
            input: [
                'assets/src/css/app.css',
                'assets/src/js/app.js',
            ],
            refresh: {
                paths: [
                    './**/*.htm',
                    './**/*.block',
                    'assets/src/**/*.css',
                    'assets/src/**/*.js',
                ]
            },
        }),

        // viteStaticCopy({
        //     targets: [
        //         {
        //             src: 'assets/src/images/**/*',
        //             dest: 'images',
        //             // Optional: for more verbosity during debugging
        //             // flatten: false
        //         }
        //     ],
        //     // Options globales
        //     silent: false, // To view error messages
        //     watch: true    // To monitor changes in dev mode
        // }),

        ViteImageOptimizer({
            /* pass your config */
        }),

        banner((fileName) => {
            // Make a copy of the authors array, not a reference
            let authorLines = JSON.parse(JSON.stringify(pkg.authors));
            authorLines.forEach(function (author, index, myArr) {
                let baseString = ` * %name%`;
                baseString += (typeof author.company === 'undefined') ? '' : ` - %company%`;
                baseString += (typeof author.url === 'undefined') ? '' : ` (%url%)`;

                myArr[index] = baseString
                    .replace('%name%', author.name)
                    .replace('%company%', author.company || '')
                    .replace('%url%', author.url || '')
            });

            return [
                `/**!`,
                ` * ${pkg.name} - ${pkg.version} - ${new Date().getBuild()}`,
                ` * ${pkg.description}`,
                ` *`,
                authorLines.join('\n'),
                ` *`,
                ` * filebase: ${fileName}`, // - hash: ${pkg.hash}`,
                ` */`,
            ].join('\n');

        }),
    ],
});
