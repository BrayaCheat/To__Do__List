<template>
  <div id="edit">
    <div class="container mx-auto md:p-36 flex flex-col gap-9">
      <div class="header p-9 bg-white rounded shadow">
        <div class="flex flex-col">
          <div class="flex justify-between items-center">
            <router-link to="/" class="text-3xl font-medium"
              >𝕰𝖉𝖎𝖙 𝖄𝖔𝖚𝖗 𝕷𝖎𝖘𝖙✍</router-link
            >
            <span class="cursor-pointer" @click="redirect"
              ><i class="fa-solid fa-arrow-left text-2xl"></i
            >
          </span>
          </div>
        </div>
        <div class="flex flex-col gap-9">
          <form class="flex flex-col gap-3">
            <span
              >Created at:
              {{ new Date(article.create_at).toDateString() }}</span
            >
            <textarea
              type="text"
              placeholder="Here..."
              class="rounded shadow bg-zinc-200 ring-0 focus:ring-0 border-0"
              v-model="article.article"
              required
            />
            
          </form>
          <button
            @click="update"
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
const article = ref({ id: 0, article: "", create_at: null });
const props = defineProps(["id"]);

onMounted(() => {
  axios
    .get("http://localhost:3000/api/list/" + props.id)
    .then((response) => (article.value = response.data.article));
});

const update = () => {
  axios
    .put("http://localhost:3000/api/list/" + props.id, {
      article: article.value.article,
    })
    .then((window.location.href = "/"));
};

// const redirect = () => {
//   window.location.href = "/";
// };
</script>
