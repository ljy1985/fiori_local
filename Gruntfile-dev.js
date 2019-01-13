module.exports = function (grunt) {
	"use strict";


    var proxy = require('http-proxy-middleware')
    grunt.loadNpmTasks('grunt-browser-sync');


    var odataProxy = proxy('/sap', {
        target: '<hostname of neteweaver stack for extension projects and odata>',
        changeOrigin: false // for vhosted sites
      })
    
      var resourcesProxy = proxy('/resources', {
        target: 'https://sapui5.hana.ondemand.com',
        changeOrigin: true // for vhosted sites
      })

          
      var testResourcesProxy = proxy('/test-resources', {
        target: 'https://sapui5.hana.ondemand.com',
        changeOrigin: true   // for vhosted sites
      })

	grunt.initConfig({
        browserSync: {
            default_options : {
                bsFiles: {
                    src : '**/*,js'
                },
                options: {
                    server: {
                        baseDir: ['webapp'],
                        middleware: [odataProxy,resourcesProxy,testResourcesProxy]
                    },
                    startPath: '/test-resources/sap/ushell/shells/sandbox/fioriSandbox.html'
                }
            },
        },
    });

    grunt.registerTask("default", [
		"browserSync",
	]);

};