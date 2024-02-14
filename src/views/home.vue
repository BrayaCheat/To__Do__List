<template>
  <section id="home" class="bg-zinc-100">
    <div class="container mx-auto md:p-36 flex flex-col gap-9">
      <div class="header p-9 bg-white rounded shadow">
        <div class="grid gap-9">
          <div class="flex justify-between items-center">
            <router-link to="/" class="text-3xl font-medium uppercase"
              >𝕿𝖔 𝕯𝖔 𝕷𝖎𝖘𝖙✍</router-link
            >
            <div
              class="search flex items-center gap-3 bg-zinc-200 py-1 px-3 rounded shadow"
            >
              <input
                type="text"
                class="border-0 outline-none ring-transparent bg-transparent focus:ring-0"
                placeholder="Search..."
                v-model="search"
              />
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <form method="post" class="flex flex-col gap-3">
            <textarea
              type="text"
              placeholder="Create your diary..."
              class="rounded shadow bg-zinc-200 border-0 focus:ring-0"
              v-model="article"
              required
            />
          </form>
          <button
            type="submit"
            @click="create"
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
          >
            Create
          </button>
        </div>
        <div class="flex flex-col items-start gap-9"></div>
      </div>
      <div v-if="lists.length > 0" class="flex flex-col gap-9 w-full">
        <div
          data-aos="fade-in"
          data-aos-duration="1000"
          v-for="list in searchData"
          :key="list.id"
          class="body p-9 bg-white rounded shadow flex items-center justify-between"
        >
          <h1 class="font-medium text-xl">{{ list.article }}</h1>
          <h1 class="font-medium text-xl">
            {{ new Date(list.create_at).toDateString() }}
          </h1>
          <div class="flex items-center gap-9">
            <router-link
              :to="{ name: 'edit', params: { id: list.id } }"
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow"
            >
              Edit
            </router-link>
            <button
              @click="remove(list.id)"
              type="button"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <div
          class="p-9 bg-white rounded shadow flex items-center justify-between"
        >
          <h1 class="font-medium text-xl">Not found</h1>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import Swal from "sweetalert2";
import { useRouter } from 'vue-router'

const article = ref("");
const lists = ref([]);
const search = ref("");
const router = useRouter()

onMounted(() => {
  fetchTodos();
});

const fetchTodos = async () => {
  try {
    const reponse = await axios.get("http://localhost:3000/api/list");
    lists.value = reponse.data.list;
  } catch (err) {
    if(err) {
      router.push('/errorPage')
    }
  }
};

const create = () => {
  if (article.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  } else {
    axios
      .post("http://localhost:3000/api/list", { article: article.value })
      .then(fetchTodos)
      .catch(console.error);

    article.value = "";
  }
};

const remove = (i) => {
  axios
    .delete("http://localhost:3000/api/list/" + i)
    .then(
      Swal.fire({
        icon: "success",
        title: "Delete Successful...",
        text: "",
        footer: '<a href="#">Why do I have this issue?</a>',
      })
    )
    .then(fetchTodos)
    .catch(console.error);
};

const searchData = computed(() => {
  return lists.value.filter((list) =>
    list.article.toLowerCase().includes(search.value)
  );
});
</script>
