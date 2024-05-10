<template>
  <p>v-model: {{ date }}</p>
  <date-input v-model="date" name="date"></date-input>
  <hr />
  <p>v-model: {{ date2 }}</p>
  <date-input v-model="date2" name="date"></date-input>
  <hr />
</template>
<script setup lang="ts">
import DateInput from "@/components/DateInput.vue";

const date = ref("");
const date2 = ref("2019-02-18");
</script>
