<script setup>
import BackButton from "../components/BackButton.vue";
import '../modules/utils/sprite';
import ViteIcon from "@/components/icons/ViteIcon.vue";

</script>

<template>


  <div class="h-[100%] max-h-[100%] w-[100%] p-5 pt-0">

    <div class="absolute top-0 left-0 z-10 w-full h-[128px] md:h-[160px] bg-gradient-to-r from-sky-500 to-sky-900"/>
    <header class="relative z-20 h-[160px] md:h-[192px]">
      <nav class="absolute top-0 left-0 pt-2 z-[100]">
        <BackButton/>
      </nav>
      <div class="flex flex-col items-center mb-3 pt-[80px] md:pt-[112px]">
        <h1 class="text-neutral-100">
          A Propos
        </h1>
      </div>
    </header>

    <div
        class="mx-auto flex flex-col py-6 h-[calc(100vh-260px)] max-h-[calc(100vh-260px)] md:h-[calc(100vh-228px)] md:max-h-[calc(100vh-228px)]">

      <div class="flex justify-center m-auto flex-col text-center w-full h-full ">
        <div class="font-medium text-neutral-900 text-lg md:text-2xl">
          Cette application a été développée par
          <a target="_blank" href="https://aanger.netlify.app/"
             class="text-sky-700 hover:text-sky-500 block">
            Aymeric Anger
          </a>
          en utilisant ces technologies:
        </div>

        <div class="w-[80%] mx-auto my-12">
          <div class="flex flex-nowrap items-center justify-around w-[95%] mx-auto">


            <a
                href="https://vitejs.dev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vite"
                class="ms-2"
            >
              <ViteIcon size="64"/>

            </a>

            <a
                target="_blank"
                href="https://vuejs.org/"
                aria-label="Vue.js"
                class=""
                rel="noopener noreferrer">


              <svg viewBox="0 0 128 128" height="64">
                <path
                    d="M0 8.934l49.854.158 14.167 24.47 14.432-24.47L128 8.935l-63.834 110.14zm126.98.637l-24.36.02-38.476 66.053L25.691 9.592.942 9.572l63.211 107.89zm-25.149-.008l-22.745.168-15.053 24.647L49.216 9.73l-22.794-.168 37.731 64.476zm-75.834-.17l23.002.009m-23.002-.01l23.002.01"
                    fill="none"></path>
                <path d="M25.997 9.393l23.002.009L64.035 34.36 79.018 9.404 102 9.398 64.15 75.053z"
                      fill="#35495e"></path>
                <path d="M.91 9.569l25.067-.172 38.15 65.659L101.98 9.401l25.11.026-62.966 108.06z"
                      fill="#41b883"></path>
              </svg>


            </a>
            <a
                target="_blank"
                href="https://sass-lang.com/"
                aria-label="SaSS"
                rel="noopener noreferrer"
                class="ms-2"
            >
              <svg viewBox="0 0 128 128" height="64">
                <path fill-rule="evenodd" clip-rule="evenodd" fill="#CB6699"
                      d="M1.219 56.156c0 .703.207 1.167.323 1.618.756 2.933 2.381 5.45 4.309 7.746 2.746 3.272 6.109 5.906 9.554 8.383 2.988 2.148 6.037 4.248 9.037 6.38.515.366 1.002.787 1.561 1.236-.481.26-.881.489-1.297.7-3.959 2.008-7.768 4.259-11.279 6.986-2.116 1.644-4.162 3.391-5.607 5.674-2.325 3.672-3.148 7.584-1.415 11.761.506 1.22 1.278 2.274 2.367 3.053.353.252.749.502 1.162.6 1.058.249 2.136.412 3.207.609l3.033-.002c3.354-.299 6.407-1.448 9.166-3.352 4.312-2.976 7.217-6.966 8.466-12.087.908-3.722.945-7.448-.125-11.153a11.696 11.696 0 00-.354-1.014c-.13-.333-.283-.657-.463-1.072l6.876-3.954.103.088c-.125.409-.258.817-.371 1.23-.817 2.984-1.36 6.02-1.165 9.117.208 3.3 1.129 6.389 3.061 9.146 1.562 2.23 5.284 2.313 6.944.075.589-.795 1.16-1.626 1.589-2.513 1.121-2.315 2.159-4.671 3.23-7.011l.187-.428c-.077 1.108-.167 2.081-.208 3.055-.064 1.521.025 3.033.545 4.48.445 1.238 1.202 2.163 2.62 2.326.97.111 1.743-.333 2.456-.896a10.384 10.384 0 002.691-3.199c1.901-3.491 3.853-6.961 5.576-10.54 1.864-3.871 3.494-7.855 5.225-11.792l.286-.698c.409 1.607.694 3.181 1.219 4.671.61 1.729 1.365 3.417 2.187 5.058.389.775.344 1.278-.195 1.928-2.256 2.72-4.473 5.473-6.692 8.223-.491.607-.98 1.225-1.389 1.888a3.701 3.701 0 00-.48 1.364 1.737 1.737 0 001.383 1.971 9.661 9.661 0 002.708.193c3.097-.228 5.909-1.315 8.395-3.157 3.221-2.386 4.255-5.642 3.475-9.501-.211-1.047-.584-2.065-.947-3.074-.163-.455-.174-.774.123-1.198 2.575-3.677 4.775-7.578 6.821-11.569.081-.157.164-.314.306-.482.663 3.45 1.661 6.775 3.449 9.792-.912.879-1.815 1.676-2.632 2.554-1.799 1.934-3.359 4.034-4.173 6.595-.35 1.104-.619 2.226-.463 3.405.242 1.831 1.742 3.021 3.543 2.604 3.854-.892 7.181-2.708 9.612-5.925 1.636-2.166 1.785-4.582 1.1-7.113-.188-.688-.411-1.365-.651-2.154.951-.295 1.878-.649 2.837-.868 4.979-1.136 9.904-.938 14.702.86 2.801 1.05 5.064 2.807 6.406 5.571 1.639 3.379.733 6.585-2.452 8.721-.297.199-.637.356-.883.605a.869.869 0 00-.205.67c.021.123.346.277.533.275 1.047-.008 1.896-.557 2.711-1.121 2.042-1.413 3.532-3.314 3.853-5.817l.063-.188-.077-1.63c-.031-.094.023-.187.016-.258-.434-3.645-2.381-6.472-5.213-8.688-3.28-2.565-7.153-3.621-11.249-3.788a25.401 25.401 0 00-9.765 1.503c-.897.325-1.786.71-2.688 1.073-.121-.219-.251-.429-.358-.646-.926-1.896-2.048-3.708-2.296-5.882-.176-1.544-.392-3.086-.025-4.613.353-1.469.813-2.913 1.246-4.362.223-.746.066-1.164-.646-1.5a2.854 2.854 0 00-.786-.258c-1.75-.254-3.476-.109-5.171.384-.6.175-1.036.511-1.169 1.175-.076.381-.231.746-.339 1.122-.443 1.563-.757 3.156-1.473 4.645-1.794 3.735-3.842 7.329-5.938 10.897-.227.385-.466.763-.752 1.23-.736-1.54-1.521-2.922-1.759-4.542-.269-1.832-.481-3.661-.025-5.479.339-1.356.782-2.687 1.19-4.025.193-.636.104-.97-.472-1.305-.291-.169-.62-.319-.948-.368a11.643 11.643 0 00-5.354.438c-.543.176-.828.527-.994 1.087-.488 1.652-.904 3.344-1.589 4.915-2.774 6.36-5.628 12.687-8.479 19.013-.595 1.321-1.292 2.596-1.963 3.882-.17.326-.418.613-.63.919-.17-.201-.236-.339-.235-.477.005-.813-.092-1.65.063-2.436a172.189 172.189 0 011.578-7.099c.47-1.946 1.017-3.874 1.538-5.807.175-.647.178-1.252-.287-1.796-.781-.911-2.413-1.111-3.381-.409l-.428.242.083-.69c.204-1.479.245-2.953-.161-4.41-.506-1.816-1.802-2.861-3.686-2.803-.878.027-1.8.177-2.613.497-3.419 1.34-6.048 3.713-8.286 6.568a2.592 2.592 0 01-.757.654c-2.893 1.604-5.795 3.188-8.696 4.778l-3.229 1.769c-.866-.826-1.653-1.683-2.546-2.41-2.727-2.224-5.498-4.393-8.244-6.592-2.434-1.949-4.792-3.979-6.596-6.56-1.342-1.92-2.207-4.021-2.29-6.395-.105-3.025.753-5.789 2.293-8.362 1.97-3.292 4.657-5.934 7.611-8.327 3.125-2.53 6.505-4.678 10.008-6.639 4.901-2.743 9.942-5.171 15.347-6.774 5.542-1.644 11.165-2.585 16.965-1.929 2.28.258 4.494.78 6.527 1.895 1.557.853 2.834 1.97 3.428 3.716.586 1.718.568 3.459.162 5.204-.825 3.534-2.76 6.447-5.195 9.05-3.994 4.267-8.866 7.172-14.351 9.091a39.478 39.478 0 01-9.765 2.083c-2.729.229-5.401-.013-7.985-.962-1.711-.629-3.201-1.591-4.399-2.987-.214-.25-.488-.521-.887-.287-.391.23-.46.602-.329.979.219.626.421 1.278.762 1.838.857 1.405 2.107 2.424 3.483 3.298 2.643 1.681 5.597 2.246 8.66 2.377 4.648.201 9.183-.493 13.654-1.74 6.383-1.78 11.933-4.924 16.384-9.884 3.706-4.13 6.353-8.791 6.92-14.419.277-2.747-.018-5.438-1.304-7.944-1.395-2.715-3.613-4.734-6.265-6.125C68.756 18.179 64.588 17 60.286 17h-4.31c-5.21 0-10.247 1.493-15.143 3.274-3.706 1.349-7.34 2.941-10.868 4.703-7.683 3.839-14.838 8.468-20.715 14.833-2.928 3.171-5.407 6.67-6.833 10.79a40.494 40.494 0 00-1.111 3.746m27.839 36.013c-.333 4.459-2.354 8.074-5.657 11.002-1.858 1.646-3.989 2.818-6.471 3.23-.9.149-1.821.185-2.694-.188-1.245-.532-1.524-1.637-1.548-2.814-.037-1.876.62-3.572 1.521-5.186 1.176-2.104 2.9-3.708 4.741-5.206 2.9-2.361 6.046-4.359 9.268-6.245l.243-.1c.498 1.84.735 3.657.597 5.507zM54.303 70.98c-.235 1.424-.529 2.849-.945 4.229-1.438 4.777-3.285 9.406-5.282 13.973-.369.845-.906 1.616-1.373 2.417a1.689 1.689 0 01-.283.334c-.578.571-1.126.541-1.418-.206-.34-.868-.549-1.797-.729-2.716-.121-.617-.092-1.265-.13-1.897.039-4.494 1.41-8.578 3.736-12.38.959-1.568 2.003-3.062 3.598-4.054a6.27 6.27 0 011.595-.706c.85-.239 1.372.154 1.231 1.006zm17.164 21.868l6.169-7.203c.257 2.675-4.29 8.015-6.169 7.203zm19.703-4.847c-.436.25-.911.43-1.358.661-.409.212-.544-.002-.556-.354a2.385 2.385 0 01.093-.721c.833-2.938 2.366-5.446 4.647-7.486l.16-.082c1.085 3.035-.169 6.368-2.986 7.982z"></path>
              </svg>
            </a>
          </div>
          <div class="flex flex-nowrap items-center justify-evenly w-[95%] mx-auto">


            <a
                target="_blank"
                href="https://tailwindcss.com//"
                aria-label="Tailwind CSS"
                rel="noopener noreferrer"
                class=""
            >

              <svg viewBox="0 0 128 128" height="160">
                <defs>
                  <linearGradient id="tailwindcss-original-wordmark-a" gradientUnits="userSpaceOnUse" x1="2.21"
                                  y1="511.596" x2="3.211" y2="511.596"
                                  gradientTransform="matrix(27.16757 5.6391 -9.3985 16.30055 4747.487 -8290.643)">
                    <stop offset="0" stop-color="#2298bd"></stop>
                    <stop offset="1" stop-color="#0ed7b5"></stop>
                  </linearGradient>
                </defs>
                <path
                    d="M13.227 56.074c-3.528 0-5.727 1.778-6.602 5.301 1.324-1.773 2.875-2.426 4.625-1.977 1 .25 1.727.977 2.523 1.801 1.301 1.324 2.801 2.852 6.079 2.852 3.523 0 5.722-1.778 6.597-5.301-1.324 1.773-2.875 2.426-4.625 1.977-1-.25-1.722-.977-2.523-1.801-1.301-1.324-2.801-2.852-6.074-2.852zM6.602 64C3.074 64 .875 65.773 0 69.3c1.324-1.777 2.875-2.425 4.625-1.976 1 .25 1.727.977 2.523 1.801 1.301 1.324 2.801 2.852 6.079 2.852 3.523 0 5.722-1.778 6.597-5.301-1.324 1.773-2.875 2.426-4.625 1.972-1-.25-1.722-.972-2.523-1.796C11.398 65.523 9.898 64 6.602 64zm0 0"
                    fill="url(#tailwindcss-original-wordmark-a)"></path>
                <path
                    d="M39.676 62.75h-2.301v4.477c0 1.199.773 1.171 2.3 1.097v1.801c-3.1.375-4.323-.477-4.323-2.898V62.75h-1.704v-1.926h1.704v-2.5l2-.597v3.097h2.296v1.926zm8.8-1.926h2v9.301h-2v-1.352c-.703.977-1.8 1.579-3.25 1.579-2.527 0-4.624-2.153-4.624-4.903 0-2.773 2.097-4.898 4.625-4.898 1.449 0 2.546.597 3.25 1.574zm-2.953 7.625c1.676 0 2.954-1.25 2.954-2.972 0-1.727-1.278-2.977-2.954-2.977-1.671 0-2.949 1.25-2.949 2.977.028 1.722 1.278 2.972 2.95 2.972zm8.301-9.023c-.699 0-1.273-.602-1.273-1.278 0-.699.574-1.273 1.273-1.273.7 0 1.278.574 1.278 1.273.023.676-.579 1.278-1.278 1.278zm-1 10.699v-9.3h2v9.3zm4.324 0V56.551h2v13.574zm15.079-9.3h2.125l-2.926 9.3h-1.977l-1.926-6.273-1.949 6.273h-1.972l-2.926-9.3H62.8l1.8 6.425 1.95-6.426h1.926l1.921 6.426zm4.597-1.4c-.699 0-1.273-.6-1.273-1.277 0-.699.574-1.273 1.273-1.273.7 0 1.278.574 1.278 1.273.023.676-.551 1.278-1.278 1.278zm-1 10.7v-9.3h2v9.3zm9.227-9.55c2.074 0 3.574 1.425 3.574 3.823v5.727h-2v-5.5c0-1.426-.824-2.148-2.074-2.148-1.324 0-2.375.773-2.375 2.671v5h-2v-9.296h2v1.199c.625-1 1.625-1.477 2.875-1.477zm13.125-3.473h2v13.023h-2v-1.352c-.7.977-1.801 1.579-3.25 1.579-2.528 0-4.625-2.153-4.625-4.903 0-2.773 2.097-4.898 4.625-4.898 1.449 0 2.55.597 3.25 1.574zm-2.95 11.347c1.672 0 2.95-1.25 2.95-2.972 0-1.727-1.278-2.977-2.95-2.977-1.675 0-2.953 1.25-2.953 2.977 0 1.722 1.278 2.972 2.954 2.972zm11.672 1.926c-2.796 0-4.921-2.148-4.921-4.898 0-2.778 2.097-4.903 4.921-4.903 1.829 0 3.403.95 4.153 2.403l-1.727 1c-.398-.875-1.324-1.426-2.449-1.426-1.648 0-2.875 1.25-2.875 2.926 0 1.671 1.25 2.921 2.875 2.921 1.125 0 2.023-.574 2.477-1.421l1.722.972c-.75 1.477-2.347 2.426-4.176 2.426zm7.528-7c0 1.7 5 .676 5 4.125 0 1.852-1.625 2.875-3.625 2.875-1.852 0-3.2-.852-3.801-2.176l1.727-1c.296.852 1.046 1.352 2.074 1.352.898 0 1.574-.301 1.574-1.051 0-1.648-5-.727-5-4.05 0-1.75 1.5-2.848 3.398-2.848 1.528 0 2.801.699 3.454 1.921l-1.704.954c-.324-.727-.972-1.051-1.75-1.051-.722-.028-1.347.3-1.347.949zm8.574 0c0 1.7 5 .676 5 4.125 0 1.852-1.625 2.875-3.625 2.875-1.852 0-3.2-.852-3.8-2.176l1.726-1c.3.852 1.05 1.352 2.074 1.352.898 0 1.574-.301 1.574-1.051 0-1.648-5-.727-5-4.05 0-1.75 1.5-2.848 3.403-2.848 1.523 0 2.796.699 3.449 1.921l-1.7.954c-.328-.727-.976-1.051-1.75-1.051-.726-.028-1.351.3-1.351.949zm0 0"
                    fill="#2d3748"></path>
              </svg>
            </a>

            <a
                href="https://imagekit.io/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ImageKit"
                class=""

            >
              <svg
                  width="128"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#0450d5"
                  fill-rule="evenodd"
                  data-name="Layer 1"
                  viewBox="0 0 158 33">
                <path
                    d="M3.53 5a2.65 2.65 0 0 1-.72-2 2.82 2.82 0 0 1 .8-1.9A2.67 2.67 0 0 1 5.55.34a2.43 2.43 0 0 1 1.86.8A2.54 2.54 0 0 1 8.25 3a2.59 2.59 0 0 1-.84 2 2.74 2.74 0 0 1-1.94.75A2.67 2.67 0 0 1 3.53 5Zm7.73 13.6c-2.7 7.34-12.93 9.32-11-.2l2.2-10.8h4.68c-1.07 5.75-1.87 9.25-2.66 13.25s4.28 1.07 5.43-2.26h1.35Z"
                />
                <path
                    d="M36.89 18.79c-2.7 7.3-12.14 8.33-10.71.75.47-2.62 1-5.31 1.54-8.29.84-3.89-2.85-1-4.08 2.14a1 1 0 0 0-.12.28c-.2 1.07-1.79 10-1.94 10.91h-4.41c.95-5.31 1.67-9.52 2.34-13.21s-2.77-1.47-4.16 1.39c0 0 0 .08-.08.12l-2.34 11.66H8.25l3.41-17h4.68l-.44 2.3c2.7-3.25 7.62-3.65 7.9 1 3.57-4.84 9.68-5.2 8.05 2.77l-.56 3c-.29 1.5-.29 1.58-.83 4.39s4 1 5.08-2.22h1.35Z"
                />
                <path
                    d="M46.49 10.7c-2.07-3.77-6.07-.12-7.26 5.39-1.31 6.15 1 9.32 5.63 3l1.63-8.41Zm9.2 8.05C53.35 25 45.22 27.2 44.74 21.37 41.13 26.72 33.4 25.73 34 18.71c.48-5.47 3.17-11 9.24-11.15h8.61l-.25 1.31c-1.07 5.2-1.78 8.21-2.53 12.14s4.2.95 5.31-2.22h1.31Z"
                />
                <path
                    d="M65.57 10.42c-2.07-3.85-6.19-.12-7.42 5.47-1.35 6.31 1 9.52 5.71 3.14-.04-.03 1.71-8.61 1.71-8.61ZM71 7.4l-2.66 12.82c-1.42 7.89-3.73 15-13.8 12.14l3.13-3.26c1.71 1.31 2.94 1.47 3.89.92l.12-.56 1.55-7.54c-3.77 4.72-11 3.53-10.48-3.37.68-7.81 5.2-10.91 8.61-11.07.64 0 1.27-.08 2-.08Zm4.64 8.93c5.36.16 6-6.27 5.12-6.94-.67-.52-2.18.12-3.41 2.06A13.1 13.1 0 0 0 75.6 16a1.08 1.08 0 0 1 0 .36Zm10.2 2.38c-2.66 4.88-5.44 6.15-9.32 6-6.43-.2-6.51-8.33-3.38-13.33 2.58-4 7-4.84 8.93-3.21 1.74 1.39 1.78 4 .75 6A7.54 7.54 0 0 1 75.48 18c0 1.62.64 3.53 2.11 4.24 2.61 1.23 5.35-.83 7-3.45-.02-.08 1.21-.08 1.21-.08Z"
                />
                <path
                    d="M95 9.74c-1.59.84-3.69 4-4.88 5.48l-.36 1.63c.36-.12.68-.28 1-.4 5.47-2.26 6.94-8.17 4.24-6.71Zm3 14.84h-4.79l-3.76-5.83-1.07 5.83h-4.76L88.34.82h4.6c-.8 4.24-1.51 7.5-2.3 11.74A17.06 17.06 0 0 1 95.08 8c4.84-2.94 6.27 5.55-1.87 9l4.84 7.54ZM102.93 5a2.69 2.69 0 0 1-.71-2 2.86 2.86 0 0 1 .79-1.9A2.7 2.7 0 0 1 105 .34a2.43 2.43 0 0 1 1.86.8 2.53 2.53 0 0 1 .83 1.9 2.58 2.58 0 0 1-.87 1.96 2.74 2.74 0 0 1-1.94.75 2.63 2.63 0 0 1-1.95-.75Zm7.7 13.6c-2.7 7.34-12.93 9.32-11-.2l2.19-10.8h4.68c-1.07 5.75-1.86 9.25-2.65 13.25s4.28 1.07 5.43-2.26h1.35Z"
                />
                <path
                    d="M120 18.63c-2.7 7.26-12.73 9.2-10.83-.12L111 9.67h-2l.84-2.07h1.62l.91-4.4 4.84-1-1.11 5.4h2.74l-1 2.07h-2.14l-2.26 11.26c-.8 4 4 1 5.19-2.3Zm1.27 1.47a2.74 2.74 0 0 1 1.94-.8 2.72 2.72 0 0 1 2.79 2.78 2.8 2.8 0 0 1-.79 2 3 3 0 0 1-2 .79 2.78 2.78 0 0 1-1.94-4.72M133.16 5a2.64 2.64 0 0 1-.71-2 2.81 2.81 0 0 1 .79-1.9 2.67 2.67 0 0 1 1.94-.8 2.45 2.45 0 0 1 1.87.8 2.56 2.56 0 0 1 .83 1.9 2.62 2.62 0 0 1-.83 2 2.76 2.76 0 0 1-2 .75 2.62 2.62 0 0 1-1.89-.75Zm7.7 13.6c-2.7 7.34-12.94 9.32-11-.2l2.19-10.8h4.68c-1.07 5.75-1.86 9.25-2.66 13.25s4.29 1.07 5.44-2.26h1.35Z"
                />
                <path
                    d="M149.74 15.85a7.5 7.5 0 0 1-3.25-1.54l1.78-2.42a5.06 5.06 0 0 0 1.47.91c-.55-2.5-2.7-4.76-4.6-2.06-1.71 2.46-3.21 9.87-.2 11.58 1.63.95 4-.71 4.84-6.31v-.16Zm8.09-3.45a15.5 15.5 0 0 1-4 2.78c-1 7.73-7.3 10.75-11.31 9.2-3.17-1.15-4.32-4.08-4-7.18A11.46 11.46 0 0 1 144 8.67c3.17-1.82 7.89-2 9.52 1.95A6 6 0 0 1 154 13a12.12 12.12 0 0 0 3.76-1.75Z"
                />
              </svg>
            </a>
          </div>
          <div class="flex flex-nowrap items-center justify-around w-[95%] mx-auto">

            <a
                href="https://fonts.google.com/icons?icon.set=Material+Symbols"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Material Icons"
            >
              <i class="ng-gfonts" size="64"/>
            </a>
            <a
                href="https://devicon.dev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DevIcons"
                class=""
            >

              <svg viewBox="0 0 128 128" height="64">
                <path fill="#558d6c" d="M4.92 8l10.17 87.05L64 119.95V8H4.92z"></path>
                <path fill="#5aa579" d="M64 8v111.95l.05.05 48.93-24.91L123.08 8H64z"></path>
                <path fill="#60be86" d="M18.84 22.11l6.49 65.18L64 105.97V22.11H18.84z"></path>
                <path fill="#65d693" d="M64 22.11v83.86l.05.05 38.69-18.76 6.42-65.15H64z"></path>
                <path fill="#5aa579"
                      d="M105.72 54.9L73.14 39.42l-1.83-.9-1.12 2.28L64 53.41V68.3l9.15-18.08 21.5 9.57-23.09 10.37-.87.47v10.88L73 80.38l32.78-15.69a2 2 0 00.92-2v-5.78a2 2 0 00-.98-2.01z"></path>
                <path fill="#558d6c"
                      d="M56 69.39l-21.79-9.6 23.3-10.37 1.76-.7V37.76l-3.4 1.44-33.93 15.69a2.26 2.26 0 00-1.28 2v5.77a2.22 2.22 0 001.24 2l33.44 15.52 2 .9 1.21-2.26L64 68.3V53.41z"></path>
              </svg>

            </a>

            <a
                class="text-slate-700 text-4xl font-bold ms-2" style="line-height: 64px;"
                href="https://michalsnik.github.io/aos/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AOS"
            >
              AOS
            </a>
          </div>

        </div>


        <div class="flex flex-col justify-center items-center font-medium text-neutral-900 text-lg md:text-2xl">
          Les sources de ce projet sont disponibles sur
          <a
              class="flex mt-2 md:mt-4"
              href="https://github.com/aangerformapro/mes-anniversaires"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
          >

            <svg viewBox="0 0 128 128" height="32" class="mx-2">
              <g fill="#181616">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"></path>
                <path
                    d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path>
              </g>
            </svg>
            github
          </a>


        </div>
      </div>


    </div>


  </div>


</template>

<style scoped>

</style>