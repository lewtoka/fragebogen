(function() {
    function checkForIcon() {
        const button = document.querySelector("#btnNext");
        const icon = document.querySelector('.fa-chevron-right');
        if (icon) {
            console.log('Icon found:', icon);
            clearInterval(intervalId); // Stop checking once the icon is found
            button.click();
        } else {
            console.log('Icon not found yet.');
        }
    }

    const intervalId = setInterval(checkForIcon, 1000);

})();

