export const docScroll = () =>{

    window.addEventListener('scroll', (e) => {
        let nav = document.querySelector("nav.landing-nav")
        let color = 'white';
        let originalColor = '#ffc017'

        let eTarget = document.querySelector(".landing-header-main")

        if (scrollY >= eTarget.offsetTop + eTarget.offsetHeight){
            nav.style.background = color;
        }
        if (scrollY < eTarget.offsetTop + eTarget.offsetHeight) {
            nav.style.background = originalColor;
        }
    });
}
