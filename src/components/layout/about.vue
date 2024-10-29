<template>
  <div class="bg-white">
    <header class="bg-green-500 text-white text-center py-12">
      <h1 class="text-4xl font-bold mt-16">About Us</h1>
    </header>

    <section class="text-center py-12 px-4">
      <h2 class="text-2xl font-bold">Mission And Values</h2>
      <p class="mt-4 text-gray-700 max-w-2xl mx-auto">
        Our mission is to provide exceptional healthcare services with a focus on availability, reliability, and support.
      </p>
      <div class="flex justify-center space-x-8 mt-8 animate-fadeIn">
        <div class="transition transform hover:scale-110">
          <h3 class="text-xl font-bold">85+</h3>
          <p class="text-gray-700">Specialists</p>
        </div>
        <div class="transition transform hover:scale-110">
          <h3 class="text-xl font-bold">25+</h3>
          <p class="text-gray-700">Years of Experience</p>
        </div>
      </div>
    </section>

    <section class="bg-green-500 text-white py-12 px-4">
      <h2 class="text-2xl font-bold text-center">Our Vision</h2>
      <p class="mt-4 text-center max-w-2xl mx-auto">
        Healthcare anytime, anywhere. We aim to revolutionize the healthcare industry by making quality healthcare accessible to everyone.
      </p>
    </section>

    <section class="text-center py-12 px-4">
      <h2 class="text-2xl font-bold">Our Healthcare Specialties</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
        <div class="p-4 shadow-lg rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
          <h3 class="text-xl font-bold">Cardiology</h3>
        </div>
        <div class="p-4 shadow-lg rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
          <h3 class="text-xl font-bold">Neurology</h3>
        </div>
        <div class="p-4 shadow-lg rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
          <h3 class="text-xl font-bold">Pediatrics</h3>
        </div>
        <div class="p-4 shadow-lg rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
          <h3 class="text-xl font-bold">Oncology</h3>
        </div>
      </div>
    </section>

    <section class="bg-gray-100 py-12 px-4">
      <h2 class="text-2xl font-bold text-center">State-Of-The-Art Technology</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-5xl mx-auto">
        <div class="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
          <h3 class="text-xl font-bold">Advanced Diagnostics</h3>
          <p class="text-gray-700 mt-2">We utilize the latest technology for accurate diagnostics.</p>
        </div>
        <div class="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
          <h3 class="text-xl font-bold">Telemedicine</h3>
          <p class="text-gray-700 mt-2">Consult with our specialists from the comfort of your home.</p>
        </div>
        <div class="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
          <h3 class="text-xl font-bold">Robotic Surgery</h3>
          <p class="text-gray-700 mt-2">Minimally invasive procedures with precision.</p>
        </div>
        <div class="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
          <h3 class="text-xl font-bold">Electronic Health Records</h3>
          <p class="text-gray-700 mt-2">Secure and easy access to your medical records.</p>
        </div>
      </div>
    </section>

    <section class="text-center py-12 px-4">
      <h2 class="text-2xl font-bold">Committed To Your Health And Happiness</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
        <div class="p-4 shadow-lg rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
          <h3 class="text-xl font-bold">Book Appointment</h3>
        </div>
        <div class="p-4 shadow-lg rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
          <h3 class="text-xl font-bold">Informed Staff</h3>
        </div>
        <div class="p-4 shadow-lg rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
          <h3 class="text-xl font-bold">Total Health</h3>
        </div>
        <div class="p-4 shadow-lg rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
          <h3 class="text-xl font-bold">Get Consultation</h3>
        </div>
      </div>
    </section>

    <section class="bg-green-500 text-white text-center py-12 px-4">
      <h2 class="text-2xl font-bold">Patient Testimonials</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
        <div class="p-4 shadow-lg rounded-lg bg-green-600 hover:bg-green-500 transition-colors">
          <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet tristique mi."</p>
          <h3 class="mt-4 font-bold">- Patient A</h3>
        </div>
        <div class="p-4 shadow-lg rounded-lg bg-green-600 hover:bg-green-500 transition-colors">
          <p>"Nullam ac augue eget diam posuere vehicula. Vivamus quis nulla ac justo euismod posuere."</p>
          <h3 class="mt-4 font-bold">- Patient B</h3>
        </div>
        <div class="p-4 shadow-lg rounded-lg bg-green-600 hover:bg-green-500 transition-colors">
          <p>"Fusce tincidunt, arcu nec vestibulum tincidunt, eros massa ullamcorper urna."</p>
          <h3 class="mt-4 font-bold">- Patient C</h3>
        </div>
      </div>
    </section>

    <section class="text-center py-12 px-4 w-full">
      <h2 class="text-2xl font-bold">Get Answer To Your Most Asked Questions</h2>
      <div class="mt-8">
        <div class="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90">
          <h3 class="text-xl font-bold">How do I make an appointment online?</h3>
          <p class="mt-2 text-gray-700">You can book an appointment online through our website or mobile app.</p>
        </div>
        <div class="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90 mt-4">
          <h3 class="text-xl font-bold">What types of medical tests do you offer?</h3>
          <p class="mt-2 text-gray-700">We offer a wide range of medical tests including blood tests, imaging, and more.</p>
        </div>
        <div class="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90 mt-4">
          <h3 class="text-xl font-bold">Do you accept insurance plans?</h3>
          <p class="mt-2 text-gray-700">Yes, we accept most major insurance plans.</p>
        </div>
      </div>
    </section>

    <footer class="bg-green-500 text-white text-center py-8">
      <p>&copy; Copyright [Your Name]. All rights reserved. Made By Binary Boats⛵</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutUs'
});
</script>

<style scoped>
/* You can add your component-specific styles here */
</style>
