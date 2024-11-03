<template>
       <div class="hero from-amber-100 via-rose-300 to-red-500 bg-gradient-to-br">
        <div class="heading mx-auto text-center">
            <h1 class="mx-auto my-5 text-center sm:text-4xl text-3xl font-bold">Have Some Questions?</h1>
            <div class="contact-icons flex sm:flex-row flex-col items-center justify-center text-center mx-auto">
                <div class="flex flex-row my-2"><img src="https://img.icons8.com/material-sharp/24/marker.png" alt="location icon" width="25" height="25"
                        class="mr-2">
                    Location</div>
                <div class="flex flex-row my-2"><img src="https://img.icons8.com/material-rounded/25/phone--v1.png" alt="phone icon" width="25" height="25"
                        class="ml-5 mr-2">
                    Phone No.</div>
                <div class="flex flex-row my-2"><img src="https://img.icons8.com/material-rounded/96/mail.png" alt="mail icon" width="25" height="25"
                        class="ml-5 mr-2">
                    Email Id </div>
            </div>
        </div>
        <div class="form-portion bg-stone-100 sm:w-[80%] w-[90%] mx-auto">
            <form class="p-5 mt-5">
                <div class="initials flex md:flex-row flex-col justify-evenly">
                    <label for="full-name" class="text-xl md:mb-0 mb-1">Full Name : </label>
                    <input type="text" name="full-name" id="" placeholder="Enter your full name"
                        class="md:w-[35%] w-1/1 px-4 py-2 md:mb-0 mb-3 rounded-xl">

                    <label for="full-name" class="text-xl md:mb-0 mb-1">Email Id : </label>
                    <input type="email" name="email-id" id="" placeholder="Enter your email"
                        class="md:w-[35%] w-1/1 px-4 py-2 rounded-xl">
                </div>
                <div class="md:p-5 p-1 sm:mt-1 mt-1">

                    <div class="md:mt-1 mt-2">
                        <label for="subject" class="text-xl">Subject : </label><br>
                        <input type="text" name="subject" placeholder="Mention your area of concern"
                            class=" w-[100%] px-4 py-2 mt-1 rounded-xl">
                    </div>
                    <div class="mt-5">
                        <label for="subject" class="text-xl">Questions / Message : </label><br>
                        <textarea name="message" rows="5" placeholder="Write your message here"
                            class="w-[100%] px-4 py-2 rounded-xl appearance-none text-heading text-md"
                            autoComplete="off" spellCheck="false">

                        </textarea>
                    </div>
                </div>
                <div class="btn mt-2 w-[100%] bg-transparent flex items-center">
                    <button type="submit"
                        class="px-4 py-2 mx-auto rounded-xl text-center text-xl bg-black text-white hover:text-black hover:bg-white hover:font-bold hover:shadow-xl">Send
                        Message</button>
                </div>
            </form>
        </div>
    </div>
</template>