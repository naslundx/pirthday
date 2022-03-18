echo "Building..." && \
    mkdir -p public/ && \
    cp static/* public/ && \
    ./node_modules/.bin/minify source/index.html > public/index.html
    ./node_modules/.bin/minify source/style.css > public/style.min.css
    ./node_modules/.bin/minify source/script.js > public/script.min.js && \
echo "Done.";
