/** @type import('aos/src/js/aos.js') */
import * as AOS from 'aos';
import 'aos/dist/aos.css';
import aosConfig from "@/config/aos.config";
import router from "@/router";


/** @type {import(aos/src/js/aos.js)} */
export default AOS;


export const routerPlugin = (/** @type {import('vue-router').Router} */router) => {

    router.beforeEach((to, from) => {

        return new Promise(resolve => {

            if (typeof document === "undefined") {
                return resolve(true);
            }

            const toDepth = to.path.length;
            const fromDepth = from.path.length;

            if (toDepth < fromDepth) {
                const elem = document?.querySelector('[data-aos].aos-animate');
                if (elem) {

                    const
                        duration = JSON.parse(elem.dataset.aosDuration ?? ('' + (aosConfig.duration ?? 400))),
                        delay = JSON.parse(elem.dataset.aosDelay ?? ('' + (aosConfig.delay ?? 0))),
                        offset = JSON.parse(elem.dataset.aosOffset ?? ('' + (aosConfig.offset ?? 120))),
                        timeout = duration + delay + offset;


                    elem.classList.remove('aos-animate');
                    return setTimeout(
                        () => {
                            resolve(true);
                        },
                        timeout
                    );
                }
            }
            resolve(true);
        });
    });
}


// SSR?
if (
    typeof window !== "undefined" &&
    typeof window.document !== "undefined"
) {
    AOS.init(aosConfig);
}