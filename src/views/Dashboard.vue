<script setup>
import Stopwatch from "@/components/Stopwatch.vue";
import { ref } from "vue";

const timers = ref([]);
const color = ref("bg-blue-300");

function addTimer() {
  timers.value.push({ isVisible: true, color: "bg-blue-300" });
}

const remove = (index) => {
  timers.value[index].isVisible = false;
};
</script>

<template>
  <div class="flex flex-wrap">
    <template v-for="(timer, index) in timers">
      <Stopwatch
        class="w-4 stopwatch"
        :key="index"
        v-if="timer.isVisible"
        :color="timer.color"
      >
        <template v-slot:buttons>
          <Button
            size="small"
            outlined
            @click="remove(index)"
            icon="pi pi-times"
          ></Button>
          
        </template>
      </Stopwatch>
    </template>
  </div>
  <Button @click="addTimer" label="Add" class="m-2"></Button>
</template>
