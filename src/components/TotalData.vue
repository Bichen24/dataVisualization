<template>
  <div class="p-6">
    <div class="text-slate-300 text-center">
      数据总量：
      <span
        ref="totalCountTarget"
        class="font-[total-font] text-gradient text-7xl ml-2 mr-2 font-bold"
      >
        679,473,929
      </span>
      条记录
    </div>
    <div class="mt-3 flex flex-wrap">
      <div class="w-1/3 text-center text-slate-400 text-sm">
        华北：
        <span ref="city1" class="font-[total-font] text-[#5DC5EF] text-3xl">
          8,778,988
        </span>
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        东北：<span
          ref="city2"
          class="font-[total-font] text-[#5DC5EF] text-3xl"
          >8,778,988</span
        >
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        华东：<span
          ref="city3"
          class="font-[total-font] text-[#5DC5EF] text-3xl"
          >8,778,988</span
        >
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        中南：<span
          ref="city4"
          class="font-[total-font] text-[#5DC5EF] text-3xl"
          >8,778,988</span
        >
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        西南：<span
          ref="city5"
          class="font-[total-font] text-[#5DC5EF] text-3xl"
          >8,778,988</span
        >
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        西北：<span
          ref="city6"
          class="font-[total-font] text-[#5DC5EF] text-3xl"
          >8,778,988</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { CountUp } from "countup.js";
import { onMounted, ref, watch } from "vue";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const totalCountTarget = ref();
const city1 = ref();
const city2 = ref();
const city3 = ref();
const city4 = ref();
const city5 = ref();
const city6 = ref();
onMounted(() => {
  render();
});
const render = () => {
  new CountUp(totalCountTarget.value, props.data.total).start();
  new CountUp(city1.value, props.data.hb).start();
  new CountUp(city2.value, props.data.db).start();
  new CountUp(city3.value, props.data.hd).start();
  new CountUp(city4.value, props.data.zn).start();
  new CountUp(city5.value, props.data.xn).start();
  new CountUp(city6.value, props.data.xb).start();
};
watch(() => props.data, render);
</script>

<style lang="less" scoped></style>
