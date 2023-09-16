<script setup>
import {RouterView, useRouter} from "vue-router";
import AOS from "aos";
import 'aos/dist/aos.css';


const router = useRouter();


router.beforeEach((to, from) => {

  return new Promise(resolve => {

    const toDepth = to.path.split('/').length;
    const fromDepth = from.path.split('/').length;

    if (toDepth < fromDepth) {
      const elem = document?.querySelector('#app>.aos-animate');
      if (elem) {
        elem.classList.remove('aos-animate');
        return setTimeout(
            () => {
              resolve(true);
            },
            400
        );
      }
    }
    resolve(true);
  });
});

AOS.init({once: true});

</script>

<template>
  <RouterView v-slot="{Component, route}">
    <Component :is="Component" :key="route.path" :data-aos="route.meta.transition" v-if="route.meta.transition"/>
    <Component :is="Component" v-else/>
  </RouterView>
</template>

<style>
</style>