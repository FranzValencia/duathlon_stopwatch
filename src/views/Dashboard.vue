<script setup>
import Stopwatch from "@/components/Stopwatch.vue";
import { ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const timers = ref([]);
const color = ref(null);
const title = ref(null);

const colors = ref([
  { name: "C1", code: "bg-blue-500" },
  { name: "C2", code: "bg-blue-300" },
  { name: "C3", code: "bg-red-500" },
  { name: "C4", code: "bg-red-300" },
]);

function addTimer() {
  timers.value.push({
    isVisible: true,
    color: color.value ? color.value.code : colors.value[0].code,
  });
}

const setColor = (index) => {
  timers.value[index].color = color.value.code;
};

const remove = (index) => {
  timers.value[index].isVisible = false;
};

const confirm2 = (event, index) => {
  confirm.require({
    target: event.currentTarget,
    message: "Do you want to delete this timer?",
    icon: "pi pi-info-circle",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Delete",
      severity: "danger",
    },
    accept: () => {
      timers.value[index].isVisible = false;

      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "Timer deleted",
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
  <div class="flex flex-wrap">
    <template v-for="(timer, index) in timers">
      <Stopwatch
        class="w-4 stopwatch"
        :key="index"
        v-if="timer.isVisible"
        :color="timers[index].color"
      >
        <template v-slot:palete>
          <Select
            style="border: none; width: 100px"
            v-model="color"
            @change="setColor(index)"
            editable
            :options="colors"
            optionLabel="name"
            placeholder="Assign Color"
            variant="filled"
            size="small"
            :class="timer.color"
            class="m-1"
          />
        </template>
        <template v-slot:title>
          <h1
            class="m-0 flex justify-content-center"
            contenteditable="true"
          ></h1>
        </template>
        <template v-slot:buttons>
          <Button
            class="ctrls"
            @click="confirm2($event, index)"
            icon="pi pi-times"
            outlined
          ></Button>
        </template>
      </Stopwatch>
    </template>
  </div>
  
  <Button class="m-2" @click="addTimer" label="Add Timer" icon="pi pi-plus" size="large"></Button>

  <Toast />
  <ConfirmPopup></ConfirmPopup>
</template>
<style>
.ctrls {
  border: none !important;
  color: aliceblue;
}
</style>
