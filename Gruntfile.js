/**
 * Created by qhyang on 2017/2/23.
 */

module.exports = function(grunt) {

    let config = {
        copy: {
            main: {
                expand: true,
                src: "./src/**",
                dest: "./i18n",
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
        }
    };
    try {
        let filesMapping = grunt.file.expandMapping("src/**/*.component.ts", "./i18n");
        let loadHtmlTasks = {};
        for (let i = 0, len = filesMapping.length; i < len; i++) {
            const src = filesMapping[i].src[0],
                dest = filesMapping[i].dest;
            let replacements = [{
                from: "require(\"." + src.substring(src.lastIndexOf("/"), src.lastIndexOf(".")) + ".pug\")",
                to: "`" + grunt.file.read("./i18n/" + src.replace("ts", "html")) + "`"
            }];
            if (grunt.file.read(src).indexOf("require(\"." + src.substring(src.lastIndexOf("/"), src.lastIndexOf(".")) + ".scss\")") !== -1) {
                replacements.push({
                    from: "require(\"." + src.substring(src.lastIndexOf("/"), src.lastIndexOf(".")) + ".scss\")",
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

    grunt.registerTask("i18n-compile-pug", ["copy", "pug"]);
    grunt.registerTask("i18n-load-external", ["replace"]);

};