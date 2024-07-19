<template>
  <div class="HorizontalBar">
    <div>【大区数据展示】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref, watch } from "vue";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
let mChart = null;
const target = ref();
onMounted(() => {
  mChart = echarts.init(target.value);
  renderBar();
});
const renderBar = () => {
  /** @type EChartsOption */
  mChart.setOption({
    grid: {
      left: "10%",
      right: "10%",
      top: "10%",
      bottom: 0,
      containLabel: true,
    },
    xAxis: {
      type: "value",
      show: false,
      max: function (value) {
        return parseInt(value.max * 1);
      },
    },
    yAxis: {
      show: true,
      type: "category",
      inverse: true,
      data: props.data.regions.map((i) => i.name),
      axisLabel: {
        show: true,
        color: "#fff",
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: {
      type: "bar",
      data: props.data.regions.map((i) => ({ name: i.name, value: i.value })),
      barWidth: 12,
      label: {
        show: true,
        position: "right",
        color: "#fff",
      },
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
        borderRadius: 10,
      },
      itemStyle: {
        color: "#479AD3",
        borderRadius: 10,
      },
    },
  });
};
watch(
  () => props.data,
  () => {
    renderBar();
  }
);
</script>

<style lang="less" scoped></style>
