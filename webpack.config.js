module.exports = {
    // webpack folder’s entry js — excluded from jekyll’s build process.
    entry: "./webpack/entry.js",
    output: {
        // we’re going to put the generated file in the assets folder so jekyll will grab it.
        // if using GitHub Pages, use the following:
        // path: "assets/js"
        path: "assets/js/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel", // "babel-loader" is also a legal name to reference
                query: {
                    presets: ["react", "es2015"]
                }
            }
        ]
    }
};