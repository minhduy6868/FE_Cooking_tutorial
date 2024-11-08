<script setup lang="ts">
import SideBar from '@/components/layout/SideBar.vue'
import Carousel from '@/components/layout/Carousel.vue'
import Footer from '@/components/layout/Footer.vue'
import Card from '@/components/ui/card/CardCooking.vue'
</script>

<template>
  <section class="w-full overflow-hidden dark:bg-gray-900">
    <div class="flex flex-col">
      <!-- Cover Image -->
      <div class="relative w-full">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080"
          alt="User Cover"
          class="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem] object-cover"
        />

        <!-- Profile Image and Name -->
        <div
          class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        >
          <div
            class="w-[141px] h-[141px] rounded-full bg-[url('https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxwZW9wbGV8ZW58MHwwfHx8MTcxMTExMTM4N3ww&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat flex justify-center items-end relative"
          >
            <input
              id="upload_profile"
              type="file"
              name="profile"
              hidden
              required
            />
            <label
              for="upload_profile"
              class="bg-white rounded-full w-6 h-6 text-center absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 flex items-center justify-center cursor-pointer"
            >
              <svg
                data-slot="icon"
                class="w-5 h-5 text-blue-700"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                ></path>
              </svg>
            </label>
          </div>
          <h1
            class="mx-5 my-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif text-center"
          >
            Samuel Abera
          </h1>
        </div>
      </div>

      <!-- Description and Details -->
      <div
        class="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-6 items-center my-6 mt-24"
      >
        <p class="text-center w-fit text-gray-700 dark:text-gray-400 text-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam debitis labore
          consectetur voluptatibus mollitia dolorem veniam omnis ut quibusdam minima sapiente
          repellendus asperiores explicabo, eligendi odit, dolore similique fugiat dolor, doloremque
          eveniet.
        </p>

        <div class="w-full my-auto py-6 flex flex-col gap-4">
          <div class="w-full flex sm:flex-row xs:flex-col gap-4">
            <div class="w-full">
              <dl
                class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700"
              >
                <div class="flex flex-col pb-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Full Name</dt>
                  <dd class="text-lg font-semibold">Samuel Abera</dd>
                </div>
                <div class="flex flex-col py-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Date Of Birth</dt>
                  <dd class="text-lg font-semibold">21/02/1997</dd>
                </div>
              </dl>
            </div>
            <div class="w-full">
              <dl
                class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700"
              >
                <div class="flex flex-col pb-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                  <dd class="text-lg font-semibold">samuelabera87@gmail.com</dd>
                </div>
                <div class="flex flex-col py-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone Number</dt>
                  <dd class="text-lg font-semibold">+251913****30</dd>
                </div>
                <div class="flex flex-col py-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Location</dt>
                  <dd class="text-lg font-semibold">Ethiopia, Addis Ababa</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- List Post -->
  <div class="max-w-screen-xl mx-auto p-3 sm:p-10 md:p-16">
    <div class="max-w-screen-xl mx-auto sm:p-3 md:p-3 bg-orange-500 text-white">
      <h2 class="text-2xl font-bold text-center">Danh sách các món đã đăng</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10"></div>
    </div>

    <hr class="mb-6 border-gray-300" />
    <div class="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
      <Card
        title="Why to eat salad?"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        image="https://images.pexels.com/photos/6086/food-salad-healthy-vegetables.jpg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
        link="#"
        category="Cooking"
        time="16 hours ago"
      ></Card>

      <Card
        title="Why to eat salad?"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        image="https://images.pexels.com/photos/6086/food-salad-healthy-vegetables.jpg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
        link="#"
        category="Cooking"
        time="16 hours ago"
      ></Card>

      <Card
        title="Why to eat salad?"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        image="https://images.pexels.com/photos/6086/food-salad-healthy-vegetables.jpg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
        link="#"
        category="Cooking"
        time="16 hours ago"
      ></Card>

      <!-- CARD 1 -->
      <div class="rounded overflow-hidden shadow-lg flex flex-col">
        <a href="#"></a>
        <div class="relative">
          <a href="#">
            <img
              class="w-full"
              src="https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
              alt="Sunset in the mountains"
            />
            <div
              class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"
            ></div>
          </a>
          <a href="#!">
            <div
              class="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out"
            >
              Cooking
            </div>
          </a>
        </div>
        <div class="px-6 py-4 mb-auto">
          <a
            href="#"
            class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
            >Simplest Salad Recipe ever</a
          >
          <p class="text-gray-500 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
        <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
          <span
            href="#"
            class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
          >
            <svg
              id="Layer_1"
              height="13px"
              width="13px"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              style="enable-background: new 0 0 512 512"
              xml:space="preserve"
            >
              <g>
                <g>
                  <path
                    d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"
                  ></path>
                </g>
              </g>
            </svg>
            <span class="ml-1">6 mins ago</span>
          </span>

          <span
            href="#"
            class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
          >
            <svg
              class="h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              ></path>
            </svg>
            <span class="ml-1">39 Comments</span>
          </span>
        </div>
      </div>

      <!-- CARD 2 -->
      <div class="rounded overflow-hidden shadow-lg flex flex-col">
        <a href="#"></a>
        <div class="relative">
          <a href="#">
            <img
              class="w-full"
              src="https://images.pexels.com/photos/1600727/pexels-photo-1600727.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
              alt="Sunset in the mountains"
            />
            <div
              class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"
            ></div> </a
          ><a href="#!">
            <div
              class="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out"
            >
              Cooking
            </div>
          </a>
        </div>
        <div class="px-6 py-4 mb-auto">
          <a
            href="#"
            class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
            >Best FastFood Ideas (Yummy)</a
          >
          <p class="text-gray-500 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
        <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
          <span
            href="#"
            class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
          >
            <svg
              id="Layer_1"
              height="13px"
              width="13px"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              style="enable-background: new 0 0 512 512"
              xml:space="preserve"
            >
              <g>
                <g>
                  <path
                    d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"
                  ></path>
                </g>
              </g>
            </svg>
            <span class="ml-1"> 10 days ago</span>
          </span>

          <span
            href="#"
            class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
          >
            <svg
              class="h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              ></path>
            </svg>
            <span class="ml-1">0 Comments</span>
          </span>
        </div>
      </div>

      <!-- CARD 3 -->
      <div class="rounded overflow-hidden shadow-lg flex flex-col">
        <a href="#"></a>
        <div class="relative">
          <a href="#">
            <img
              class="w-full"
              src="https://images.pexels.com/photos/6086/food-salad-healthy-vegetables.jpg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
              alt="Sunset in the mountains"
            />
            <div
              class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"
            ></div> </a
          ><a href="#!">
            <div
              class="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out"
            >
              Cooking
            </div>
          </a>
        </div>
        <div class="px-6 py-4 mb-auto">
          <a
            href="#"
            class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
            >Why to eat salad?</a
          >
          <p class="text-gray-500 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
        <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
          <span
            href="#"
            class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
          >
            <svg
              id="Layer_1"
              height="13px"
              width="13px"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              style="enable-background: new 0 0 512 512"
              xml:space="preserve"
            >
              <g>
                <g>
                  <path
                    d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"
                  ></path>
                </g>
              </g>
            </svg>
            <span class="ml-1">16 hours ago</span>
          </span>

          <span
            href="#"
            class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
          >
            <svg
              class="h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              ></path>
            </svg>
            <span class="ml-1">9 Comments</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any specific styles you need here */
</style>
