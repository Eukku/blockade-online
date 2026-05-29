(function () {
    const mainCss = document.getElementById('main_css');

    if (!mainCss) {
        console.warn('CSS link with id="main_css" was not found');
        return;
    }

    mainCss.href = 'style.css?v=5';
})();