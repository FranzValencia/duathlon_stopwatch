<script setup>
import Stopwatch from "@/components/Stopwatch.vue";
import { ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const timers = ref([]);

const testSimStart = () => {
  console.log($refs);
  // window.app.$refs.stopwatch1.start();
};

const color = ref(null);
const title = ref(null);
const fontColor = ref("text-yellow-400");

const colors = ref([
  { name: "---", code: "surface-900" },
  { name: "C1", code: "bg-blue-500" },
  { name: "C2", code: "bg-blue-300" },
  { name: "C3", code: "bg-red-500" },
  { name: "C4", code: "bg-red-300" },
]);

const categories = ref([
  { label: "35 Yrold and Above Men", color: "orange", icon: "pi pi-mars" },
  { label: "34 Yrold and Below  Men", color: "blue", icon: "pi pi-mars" },
  { label: "35 Yrold and Above Women", color: "orange", icon: "pi pi-venus" },
  { label: "34 Yrold and Below  Women", color: "blue", icon: "pi pi-venus" },
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
  <img
    src="/header.png"
    alt=""
    srcset=""
    style="width: 100%; position: fixed; z-index: -1"
  />
  <div class="w-full" style="height: 280px"></div>
  <div class="flex flex-wrap">
    <template v-for="(timer, index) in timers">
      <Stopwatch
        :ref="`stopwatch${index}`"
        class="w-6 stopwatch"
        :key="index"
        v-if="timer.isVisible"
        :color="timers[index].color"
      >
        <template v-slot:palete>
          <!-- <Select
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
          /> -->
        </template>
        <template v-slot:title>
          <text
            class="m-0 p-0 flex justify-content-center text-center -text-white -text-yellow-400"
            contenteditable="true"
            style="
              -font-family: 'calibri' !important;
              font-family: 'queer' !important;
              font-size: 35px;
              _color: #f9ff00;
              color: white;
            "
            :style="'background-color: ' + categories[index].color"
          >
            <span class="uppercase">{{ categories[index].label }}</span>
        
          </text>
        </template>
        <template v-slot:buttons>
          <Button
            class="ctrls"
            @click="confirm2($event, index)"
            icon="pi pi-times"
            outlined
          ></Button>
          <Button
            class="ctrls"
            @click="testSimStart()"
            label="Test"
            outlined
          ></Button>
        </template>
      </Stopwatch>
    </template>
  </div>

  <Button
    class="m-0 p-2 w-full"
    @click="addTimer"
    label="Add Timer"
    icon="pi pi-plus"
    text
  ></Button>

  <Toast />
  <ConfirmPopup></ConfirmPopup>
</template>
<style>
.ctrls {
  border: none !important;
  color: aliceblue;
}
</style>
