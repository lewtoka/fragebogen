(function() {
    let  intervalId = 1000;

    function checkForIcon() {
        const button = document.querySelector("#btnNext");
        const icon = document.querySelector('.fa-chevron-right');
        const form = document.getElementById('fragebogenForm');

        if (form) {
            return;
        }

        if (icon) {
            console.log('Icon found:', icon);
            clearInterval(intervalId); // Stop checking once the icon is found
            button.click();
        }
    }


    const frageseite = document.querySelector('.moduleHeader');
    if ( frageseite) {
        intervalId = setInterval(checkForIcon, 1000);
    }

})();

