<template>
  <main
    class="relative flex h-screen w-full flex-col bg-no-repeat bg-cover bg-center"
    style="
      background-image: url(&quot;https://media.wired.com/photos/6423826d7f6ce88e606d7b55/3:2/w_1280%2Cc_limit/Lamborghini-Revuelto-Featured-Gear.jpg&quot;);
    "
  >
    <!-- Overlay to create fade effect -->
    <div class="absolute inset-0 bg-white bg-opacity-90">
      <section class="pb-20 pt-10">
        <div class="grid grid-cols-12">
          <div class="col-span-1 col-start-1"></div>

          <div class="col-span-5 col-start-2">
            <the-headline />
            <car-search-form />
          </div>

          <div class="col-span-1 col-start-12"></div>
        </div>
      </section>

      <spot-light class="flex flex-row justify-center pb-16">
        <template #default="{ img, title, price, link }">
          <router-link
            :to="link"
            class="mx-5 flex h-96 w-72 flex-col rounded-lg border bg-brand-gray-2"
          >
            <img :src="img" class="h-96 object-cover rounded-xl" />

            <div class="mt-3 h-48 px-6 py-4">
              <h3 class="text-lg font-medium">
                {{ title }}
              </h3>

              <p class="mt-3 text-sm">
                {{ `${new Intl.NumberFormat("en-US").format(price)} ${"USD"}` }}
              </p>
            </div>

            <span class="px-6 pb-4 text-sm text-brand-blue-1">See cars</span>
          </router-link>
        </template>
      </spot-light>
    </div>
  </main>
</template>

<script lang="ts" setup>
import TheHeadline from "@/components/CarSearch/TheHeadline.vue";
import CarSearchForm from "@/components/CarSearch/CarSearchForm.vue";
import SpotLight from "@/components/CarSearch/SpotLight.vue";
</script>
