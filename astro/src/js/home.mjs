import DEF from './defaults.mjs';

export default function () {
    // VARS
    const CSS_HAS_BG = DEF.CSS_HAS_BG;
    let elHeader, hasBg = false;

    // MAIN
    if (document)
        document.addEventListener('scroll', () => {
            if (!elHeader) elHeader = document.getElementsByTagName('header')[0];
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            if (winScroll > 20) {
                // add background
                if (!hasBg) {
                    hasBg = true;
                    elHeader?.classList.add(CSS_HAS_BG);
                }
            } else {
                // remove background
                if (hasBg) {
                    hasBg = false;
                    elHeader?.classList.remove(CSS_HAS_BG);
                }
            }
        });
}
