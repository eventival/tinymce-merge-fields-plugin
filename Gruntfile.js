const {CheckerPlugin} = require("awesome-typescript-loader");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const path = require("path");
const swag = require("@ephox/swag");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (grunt) => {
  const packageData = grunt.file.readJSON("package.json");
  const BUILD_VERSION =
    packageData.version +
    "-" +
    (process.env.BUILD_NUMBER ? process.env.BUILD_NUMBER : "0");
  const libPluginPath = "lib/main/ts/Main.js";
  const scratchPluginPath = "scratch/compiled/plugin.js";
  const scratchPluginMinPath = "scratch/compiled/plugin.min.js";
  const tsDemoSourceFile = path.resolve("src/demo/ts/Demo.ts");
  const jsDemoDestFile = path.resolve("scratch/compiled/demo.js");

  grunt.initConfig({
    pkg: packageData,

    clean: {
      dirs: ["dist", "scratch"],
    },

    eslint: {
      options: {
        fix: grunt.option("fix"),
      },
      plugin: ["src/**/*.ts"],
    },

    shell: {
      command: "tsc",
    },
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          directory: '/src/demo/html',
        }
      }
    },
    rollup: {
      options: {
        treeshake: true,
        format: "iife",
        onwarn: swag.onwarn,
        plugins: [
          swag.nodeResolve({
            basedir: __dirname,
            prefixes: {},
          }),
          swag.remapImports(),
        ],
      },
      plugin: {
        files: [
          {
            src: libPluginPath,
            dest: scratchPluginPath,
          },
        ],
      },
    },

    uglify: {
      plugin: {
        files: [
          {
            src: scratchPluginPath,
            dest: scratchPluginMinPath,
          },
        ],
      },
    },

    concat: {
      license: {
        options: {
          process: (src) => {
            const buildSuffix = process.env.BUILD_NUMBER
              ? "-" + process.env.BUILD_NUMBER
              : "";
            return src.replace(
              /@BUILD_NUMBER@/g,
              packageData.version + buildSuffix
            );
          },
        },
        // scratchPluginMinPath is used twice on purpose, all outputs will be minified for premium plugins
        files: {
          "dist/tinymce-merge-fields-plugin/plugin.js": [
            "src/text/license-header.js",
            scratchPluginMinPath,
          ],
          "dist/tinymce-merge-fields-plugin/plugin.min.js": [
            "src/text/license-header.js",
            scratchPluginMinPath,
          ],
        },
      },
    },
    sass: {
      dist: {
        files: [
          {
            expanded: true,
            src: ['src/scss/*.scss'],
            dest: "dist/tinymce-merge-fields-plugin/style.css",
            ext: ".css"
          }
        ]
      }
    },
    copy: {
      css: {
        files: [
          {
            src: ["CHANGELOG.txt", "LICENSE.txt"],
            dest: "dist/tinymce-merge-fields-plugin",
            expand: true,
          },
        ],
      },
    },

    webpack: {
      options: {
        mode: "development",
        watch: true,
      },
      dev: {
        entry: tsDemoSourceFile,
        devtool: "source-map",

        resolve: {
          extensions: [".ts", ".js", ".scss"],
        },

        module: {
          rules: [
            {
              test: /\.js$/,
              use: ["source-map-loader"],
              enforce: "pre",
            },
            {
              test: /\.ts$/,
              use: [
                {
                  loader: "ts-loader",
                  options: {
                    transpileOnly: true,
                    experimentalWatchApi: true,
                  },
                },
              ],
            },
            {
              test: /\.(s(a|c)ss)$/,
              use: [MiniCssExtractPlugin.loader,'css-loader',{
                loader: "sass-loader",
                options: {
                  sourceMap: true,
                  implementation: require.resolve("sass"),
                },
              }]
            }
          ],
        },

        plugins: [new LiveReloadPlugin(), new CheckerPlugin(), new MiniCssExtractPlugin()],

        output: {
          filename: path.basename(jsDemoDestFile),
          path: path.dirname(jsDemoDestFile),
        },
      },
    },
  });

  require("load-grunt-tasks")(grunt);
  grunt.loadNpmTasks("@ephox/swag");
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask("version", "Creates a version file", () => {
    grunt.file.write(
      "dist/tinymce-merge-fields-plugin/version.txt",
      BUILD_VERSION
    );
  });

  grunt.registerTask("default", [
    "clean",
    "eslint",
    "shell",
    "rollup",
    "uglify",
    "concat",
    "copy",
    "sass",
    "version"
  ]);
};
