export const docScroll = () =>{

    window.addEventListener('scroll', (event) => {
        let nav = document.querySelector("nav.landing-nav")
        let color = 'white';
        let originalColor = '#ffc017'

        let elementTarget = document.querySelector(".landing-header-main")

        if (scrollY >= elementTarget.offsetTop + elementTarget.offsetHeight){
            nav.style.background = color;
        }
        if (scrollY < elementTarget.offsetTop + elementTarget.offsetHeight) {
            nav.style.background = originalColor;
        }
    });
}


//landing-header-main
