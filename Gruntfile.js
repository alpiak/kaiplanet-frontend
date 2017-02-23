/**
 * Created by qhyang on 2017/2/23.
 */

module.exports = function(grunt) {

    let filesMapping = grunt.file.expandMapping("src/**/*.component.ts", "./i18n");
    let loadHtmlTasks = {};
    for (let i = 0, len = filesMapping.length; i < len; i++) {
        try {
            const src = filesMapping[i].src[0],
                dest = filesMapping[i].dest;
            loadHtmlTasks["task" + i] = {
                src: src,
                dest: dest,
                replacements: [{
                    from: "require(\"." + src.substring(src.lastIndexOf("/"), src.lastIndexOf(".")) + ".pug\")",
                    to: "`" + grunt.file.read("./i18n/" + src.replace("component.ts", "html")) + "`"
                }, {
                    from: /require\("(\S*)"\)/g,
                    to: "window.$1"
                }]
            }
        } catch(e) { }
    }

    grunt.initConfig({
        pug: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                expand: true,
                src: "src/**/*.pug",
                dest: "./i18n",
                ext: ".html",
                rename: function (dest, src) {
                    return dest + src;
                }
            }
        },
        replace: loadHtmlTasks
    });

    grunt.loadNpmTasks("grunt-contrib-pug");
    grunt.loadNpmTasks("grunt-text-replace");

    grunt.registerTask("i18n-pug", ["pug"]);
    grunt.registerTask("i18n-replace", ["replace"]);

};