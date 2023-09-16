import path from 'node:path/posix';
import fs from 'node:fs';
import livereloadPlugin from 'rollup-plugin-livereload';
import resolvePlugin from '@rollup/plugin-node-resolve';
import commonjsPlugin from '@rollup/plugin-commonjs';
import postcssPlugin from 'rollup-plugin-postcss';
import terserPlugin from '@rollup/plugin-terser';
import jsonPlugin from '@rollup/plugin-json';
import replace from "@rollup/plugin-replace";
import delPlugin from 'rollup-plugin-delete';
import nodePolyfillsPlugin from 'rollup-plugin-polyfill-node';
import postcssImportPlugin from "postcss-import";
import postcssCombinePlugin from "postcss-combine-media-query";
import postcssPresetEnvPlugin from "postcss-preset-env";
import cssnanoPlugin from "cssnano";
import vue from 'rollup-plugin-vue';
import rollupPluginInjectProcessEnv from "rollup-plugin-inject-process-env";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import {obfuscator} from 'rollup-obfuscator';

const
    defaults = {
        prod: !process.env.ROLLUP_WATCH,
        ext: ['.js', '.mjs', '.cjs'],
        out: '.js',
        ignore: [
            '^_',
            '^\\.',
        ],
        formats: ['es'],
        input: ['assets'],
        output: ['public/build'],
        watch: [],
        livereload: true,
        obfuscate: false,
    },
    instances = new Map();


process.env['NODE_ENV'] ??= !process.env.ROLLUP_WATCH ? 'production' : 'development';

// process.env.BUILD = 'production';

class RTools {

    loadPlugins({name, output} = {}) {
        const
            {dir} = path.parse(output),
            {isProd} = this,
            plugins = [


                replace({
                    values: {
                        '__VUE_OPTIONS_API__': 'false',
                        '__VUE_PROD_DEVTOOLS__': 'true',
                        // '__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__': 'false',
                    },
                    preventAssignment: true

                }),


                vue({
                    target: 'browser',
                    css: false,
                    template: {
                        isProduction: isProd
                    }
                }),


                commonjsPlugin(),
                jsonPlugin(),
                postcssPlugin({
                    plugins: [
                        postcssImportPlugin(),
                        tailwindcss(),
                        autoprefixer(),
                        !isProd && postcssCombinePlugin(),
                        postcssPresetEnvPlugin({
                            autoprefixer: {
                                cascade: false,
                            },
                            features: {
                                'custom-properties': true,
                            },
                        }),
                        isProd && cssnanoPlugin({preset: 'default'}),
                    ],
                    sourceMap: !isProd,
                    extract: name + '.css',
                }),

                rollupPluginInjectProcessEnv({
                    NODE_ENV: process.env['NODE_ENV']
                }),

                resolvePlugin({
                    moduleDirectories: ['node_modules'],
                    extensions: this.cfg.ext,
                    browser: true,
                }),
                nodePolyfillsPlugin(),

            ];

        if (isProd) {
            plugins.unshift(delPlugin({
                targets: path.join(dir, '*.map')
            }));

            if (this.cfg.obfuscate) {
                plugins.push(obfuscator({sourceMap: false, stringArray: true}));
            }
            plugins.push(terserPlugin({
                mangle: false,
            }));
        } else {
            if (this.cfg.livereload) {
                plugins.push(livereloadPlugin({
                    delay: 200,
                    watch: this.cfg.livereload,
                }));
            }
        }


        return plugins;
    }

    static loadConfig(file = 'rollup.json') {
        let cfg;

        if (!instances.has(file)) {
            if (fs.existsSync(file)) {
                cfg = new RTools({
                    ...defaults,
                    ...JSON.parse(fs.readFileSync(file, {encoding: 'utf-8'}))
                });
            } else {
                cfg = new RTools(defaults);
            }
            instances.set(file, cfg);
        }
        return instances.get(file);
    }

    cfg = {};

    #watch;

    get isProd() {
        return this.cfg.prod;
    }

    get watch() {
        return this.#watch ??= [
            ...this.cfg.input,
            ...this.cfg.watch
        ].filter(
            dir => fs.existsSync(dir)
        ).map(dir => !fs.lstatSync(dir).isDirectory() ? path.parse(dir).dir : dir);
    }

    constructor(config) {
        this.cfg = config ?? {...defaults};
        this.fixConfig(this.cfg);

    }


    fixConfig(cfg) {
        ['input', 'output', 'formats', 'watch', 'ext'].forEach(prop => {

            if (false === cfg[prop]) {
                cfg[prop] = [];
            }

            if (!Array.isArray(cfg[prop])) {
                cfg[prop] = [cfg[prop]];
            }
        });

        if (typeof cfg.livereload === 'string') {
            cfg.livereload = [cfg.livereload];
        }


        if (cfg.livereload === true) {
            cfg.livereload = [...cfg.output];
        } else if (Array.isArray(cfg.livereload)) {
            cfg.livereload.push(...cfg.output);
        }
    }


    isJSFile(file) {
        return this.cfg.ext.some(
            ext => file.toLowerCase().endsWith(ext)
        );
    }


    isIgnored(file) {
        return this.cfg.ignore.some(
            re => (
                re instanceof RegExp ? re : new RegExp(re)
            ).test(file.toLowerCase())
        );
    }


    fileInfo({file, input, outputDir}) {
        const {name} = path.parse(file);
        return {
            name,
            input,
            output: path.join(outputDir, name + this.cfg.out),
        };
    }

    fileList({inputDir, outputDir} = {}) {
        if (!fs.existsSync(inputDir)) {
            return [];
        }
        if (!fs.lstatSync(inputDir).isDirectory()) {
            if (!this.isJSFile(inputDir)) {
                return [];
            }

            return [
                this.fileInfo({
                    input: inputDir,
                    outputDir,
                    file: path.parse(inputDir).base
                }),
            ];

        }
        return fs.readdirSync(inputDir)
            .filter(
                file => !this.isIgnored(file) && this.isJSFile(file)
            )
            .map(file => this.fileInfo({
                input: path.join(inputDir, file),
                file,
                outputDir
            }));
    }


    outputFormat({format, output, name} = {}) {

        const result = {
            format,
            sourcemap: !this.isProd,
        };
        if (['es'].includes(format)) {
            return {
                file: output,
                inlineDynamicImports: true,
                ...result
            };
        }
        if (['iife'].includes(format)) {
            return {
                file: path.join(path.parse(output).dir, `${name}.${format}${this.cfg.out}`),
                name,
                ...result,
            };
        }
        if (['umd'].includes(format)) {
            return {
                file: path.join(path.parse(output).dir, `${name}.${format}${this.cfg.out}`),
                name,
                exports: 'umd' === format ? 'named' : 'auto',
                ...result,
            };
        }
        throw new Error(`Invalid format ${format}`);
    }

    makeConfig(files = []) {
        return files.map(({
                              name,
                              input,
                              output
                          }) => ({
            context: 'globalThis',
            watch: {
                exclude: 'node_modules/**',
                include: this.watch.map(x => path.join(x, '**')),
            },
            input,
            output: this.cfg.formats.map(
                format => this.outputFormat({format, output, name})
            ),
            plugins: this.loadPlugins({name, output}),
        }));
    }

    generateConfig() {
        return [].concat(
            ...this.cfg.input.map(
                (dir, index) =>
                    this.makeConfig(
                        this.fileList(
                            {
                                inputDir: dir,
                                outputDir: this.cfg.output[index] ?? this.cfg.output[0]
                            }
                        )
                    )
            )
        );
    }
}


const cfg = RTools.loadConfig().generateConfig();
export default cfg;


