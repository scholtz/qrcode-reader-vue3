const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  css: { extract: false },

  lintOnSave: false,

  transpileDependencies: ["webrtc-adapter"],

  chainWebpack: (config) => {
    // Disable eslint during build
    config.module.rules.delete('eslint');
    
    // Enable TypeScript declaration generation
    if (process.env.NODE_ENV === "production") {
      config.module
        .rule("ts")
        .use("ts-loader")
        .tap((options) => {
          return {
            ...options,
            compilerOptions: {
              declaration: true,
              declarationDir: "./dist/types",
            },
          };
        });
    }
  },
});
