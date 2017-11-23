/**
 * Created by qhyang on 2017/2/23.
 */

module.exports = function(grunt) {

    let config = {
        copy: {
            main: {
                expand: true,
                src: "./src/**",
                dest: "./temp"
            },
            "i18n-output": {
                src: "./temp/messages.xlf",
                dest: "./src/locale/messages.xlf"
            }
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
                dest: "./temp",
                ext: ".component.html"
            }
        },
        "file-creator": {
            main: {
                "./temp/tsconfig.json": function(fs, fd, done) {
                    fs.writeSync(fd, `{
                        "compilerOptions": {
                            "emitDecoratorMetadata": true,
                            "experimentalDecorators": true,
                            "lib": ["es2015", "dom"],
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
        clean: [ "./temp/", "./temp/tsconfig.json" ]
    };

    let replaceTasks = {
        "theme.scss": {}
    };

    const scssFileMappings = grunt.file.expandMapping("./src/**/*.scss", "./temp");

    let loadStyleTask = {
        options: {
            includePaths: [ "./node_modules" ]
        },
        compile: {
            files: { }
        }
    };

    for (let i = 0, len = scssFileMappings.length; i < len; i++) {
        const src = scssFileMappings[i].src[0],
            dest = scssFileMappings[i].dest;

        loadStyleTask.compile.files[dest.replace(/scss$/, "css")] = dest;

        // replace specific lines
        if (/\/theme\.scss/.test(dest) === true) {
            replaceTasks["theme.scss"] = {
                src: src,
                dest: dest,
                replacements: [{
                    from: "~@angular/material/_theming.scss",
                    to: "@angular/material/_theming.scss"
                }]
            };
        }
    }

    config.sass = loadStyleTask;

    try {
        const fileMappings = grunt.file.expandMapping("./src/**/*.ts", "./temp");

        for (let i = 0, len = fileMappings.length; i < len; i++) {
            const src = fileMappings[i].src[0],
                dest = fileMappings[i].dest,
                srcFile = grunt.file.read(src);

            let replacements = [];

            if (srcFile.indexOf(".pug") !== -1) {
                replacements.push({
                    from: "require(\"." + src.substring(src.lastIndexOf("/"), src.lastIndexOf(".")) + ".pug\")",
                    to: "`" + grunt.file.read("./temp/" + src.replace(".ts", ".html")) + "`"
                });
            }

            // if (srcFile.indexOf("styles") !== -1) {
            //     replacements.push({
            //         from: /require\((?:.|\n)*?\.scss(?:"|')\)/g,
            //         to: "`" + grunt.file.read("./temp/" + src.slice(0, src.lastIndexOf("/"))) + "`"
            //     });
            // }

            // Remove this later
            if (srcFile.indexOf("styles") !== -1) {
                replacements.push({
                    from: /styles:(?:.|\n)*?],?/g,
                    to: ""
                });
            }


            // Remove specific lines

            replacements.push({
                from: "private",
                to: "public"
            });

            replacements.push({
                from: "protected",
                to: "public"
            });

            replacements.push({
                from: "../aot/temp/src/app/app.module.ngfactory",
                to: "../../aot/temp/src/app/app.module.ngfactory"
            });

            replaceTasks["load-external-" + i] = {
                src: src,
                dest: dest,
                replacements: replacements
            };
        }
    } catch(e) { }

    config.replace = replaceTasks;

    grunt.initConfig(config);

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-pug");
    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks("grunt-text-replace");
    grunt.loadNpmTasks("grunt-file-creator");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.registerTask("prepare", [ "file-creator", "copy:main" ]);
    grunt.registerTask("compile-pug", [ "pug" ]);
    grunt.registerTask("compile-sass", [ "replace:theme.scss", "sass" ]);

    let loadExternalTasks = [];

    for (task in config.replace) {
        if (/load\-external\-/.test(task)) {
            loadExternalTasks.push('replace:' + task);
        }
    }

    grunt.registerTask("load-external", loadExternalTasks);
    grunt.registerTask("i18n-output", [ "copy:i18n-output" ]);
    grunt.registerTask("clean", [ "clean" ]);

};