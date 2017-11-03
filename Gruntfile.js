/**
 * Created by qhyang on 2017/2/23.
 */

module.exports = function(grunt) {

    let config = {
        copy: {
            main: {
                expand: true,
                src: "./src/**",
                dest: "./i18n"
            },
            output: {
                src: "./i18n/messages.xlf",
                dest: "./src/locale/messages.xlf"
            },
        },
        pug: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                expand: true,
                src: "./src/**/*.pug",
                dest: "./i18n",
                ext: ".component.html"
            }
        },
        "file-creator": {
            main: {
                "./i18n/tsconfig.json": function(fs, fd, done) {
                    fs.writeSync(fd, `{
                        "compilerOptions": {
                            "emitDecoratorMetadata": true,
                            "experimentalDecorators": true,
                            "module": "commonjs",
                            "moduleResolution": "node",
                            "noImplicitAny": true,
                            "suppressImplicitAnyIndexErrors": true,
                            "target": "es5",
                            "sourceMap": true
                        },
                        "include": [
                            "./"
                        ]
                    }`);
                    done();
                }
            }
        },
        clean: ["./i18n", "./i18n/tsconfig.json"]
    };
    try {
        let fileMappings = grunt.file.expandMapping("src/**/*.ts", "./i18n");
        let loadHtmlTasks = {};
        for (let i = 0, len = fileMappings.length; i < len; i++) {
            const src = fileMappings[i].src[0],
                dest = fileMappings[i].dest,
                srcFile = grunt.file.read(src);

            let replacements = [];

            if (srcFile.indexOf(".pug") !== -1) {
                replacements.push({
                    from: "require(\"." + src.substring(src.lastIndexOf("/"), src.lastIndexOf(".")) + ".pug\")",
                    to: "`" + grunt.file.read("./i18n/" + src.replace(".ts", ".html")) + "`"
                });
            }

            if (srcFile.indexOf("styles") !== -1) {
                replacements.push({
                    from: /styles:(?:.|\n)*?],?/g,
                    to: ""
                });
            }

            // Remove specific unsupported lines

            if (srcFile.indexOf("const QuillModule = require(\"ngx-quill/bundles/index.js\").QuillModule;") !== -1) {
                replacements.push({
                    from: "const QuillModule = require(\"ngx-quill/bundles/index.js\").QuillModule;",
                    to: ""
                });
            }

            if (srcFile.indexOf("QuillModule,") !== -1) {
                replacements.push({
                    from: "QuillModule,",
                    to: ""
                });
            }


            loadHtmlTasks["task" + i] = {
                src: src,
                dest: dest,
                replacements: replacements
            };
        }
        config.replace = loadHtmlTasks;
    } catch(e) { }

    grunt.initConfig(config);

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-pug");
    grunt.loadNpmTasks("grunt-text-replace");
    grunt.loadNpmTasks('grunt-file-creator');
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.registerTask("i18n-compile-pug", ["file-creator", "copy:main", "pug"]);
    grunt.registerTask("i18n-load-external", ["replace"]);
    grunt.registerTask("i18n-clean", ["copy:output", "clean"]);

};