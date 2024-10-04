<script setup>
import { ref, computed, defineProps } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const props = defineProps(["color"]);

const time = ref(0);
const timer = ref(null);

const start = () => {
  if (timer.value) return;
  timer.value = setInterval(() => {
    time.value += 1;
  }, 1000);
};

const stop = () => {
  clearInterval(timer.value);
  timer.value = null;
};

const reset = () => {
  stop();
  time.value = 0;
};

const formattedTime = computed(() => {
  // const minutes = Math.floor(time.value / 60)
  //   .toString()
  //   .padStart(2, "0");
  // const seconds = (time.value % 60).toString().padStart(2, "0");
  // return `${minutes}:${seconds}`;
  const hours = Math.floor(time.value / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((time.value % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time.value % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
});

const confirm2 = (event) => {
  confirm.require({
    target: event.currentTarget,
    message: "Do you want to reset this timer?",
    icon: "pi pi-info-circle",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Reset",
      severity: "warn",
    },
    accept: () => {
      reset();
      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "Timer reseted",
        life: 3000,
      });
    },
    // reject: () => {
    //   toast.add({
    //     severity: "error",
    //     summary: "Rejected",
    //     detail: "You have rejected",
    //     life: 3000,
    //   });
    // },
  });
};
</script>

<template>
  <div
    class="p-0 justify-content-center border-dashed"
    :class="color"
    style="font-family: 'Arial Narrow'"
  >
    <slot name="palete"></slot>
    <slot name="title"></slot>
    <h5
      id="stopwatch"
      class="w-full flex justify-content-center m-0 p-0 -text-white -text-yellow-500"
      style="font-family: 'advanced_dot_digital-7' !important; font-size: 45px; color: #f9ff00;"
    >
      {{ formattedTime }}
    </h5>
    <div class="flex gap-1 justify-content-center">
      <Button
        class="ctrls"
        size="small"
        outlined
        @click="start"
        label="Start"
        icon="pi pi-play"
      ></Button>
      <Button
        class="ctrls"
        size="small"
        outlined
        @click="stop"
        label="Stop"
        icon="pi pi-pause"
      ></Button>
      <Button
        class="ctrls"
        @click="confirm2($event)"
        label="Reset"
        icon="pi pi-undo"
        outlined
      ></Button>
      <Button
        class="ctrls"
        @click="confirm2($event)"
        label="Split"
        icon="pi pi-flag-fill"
        outlined
      ></Button>
      <slot name="buttons"></slot>
    </div>
  </div>
</template>
<style>
.ctrls {
  border: none !important;
  color: aliceblue;
}
</style>
