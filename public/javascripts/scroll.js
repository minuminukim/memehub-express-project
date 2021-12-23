export const docScroll = () =>{

    window.addEventListener('scroll', (event) => {
        let nav = document.querySelector("nav.landing-nav")
        let color = 'white';
        let originalColor = '#ffc017'

        if (scrollY >= 600){
            nav.style.background = color;
        }
        if (scrollY < 600) {
            nav.style.background = originalColor;
        }
    });
}
