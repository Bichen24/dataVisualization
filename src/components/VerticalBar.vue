<template>
  <div class="VerticalBar">
    <h2>【服务占用比】</h2>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: {},
  },
});
let mChart = null;
const target = ref();
onMounted(() => {
  mChart = echarts.init(target.value);
  renderChart();
});
const renderChart = () => {
  /** @type EChartsOption */
  mChart.setOption({
    xAxis: {
      show: true,
      type: "category",
      data: props.data.servers.map((i) => i.name),
      axisTick: {
        show: true,
      },
      axisLabel: {
        color: "#fff",
      },
    },
    yAxis: {
      show: false,
      type: "value",
      max: 100,
    },
    grid: {
      left: "0",
      right: "0",
      top: "10%",
      bottom: "0",
      containLabel: true,
    },
    series: {
      type: "bar",
      data: props.data.servers.map((i) => ({ name: i.name, value: i.value })),
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
        borderRadius: 5,
      },
      // 每个柱子的样式
      itemStyle: {
        color: "#479AD3",
        borderRadius: 5,
      },
      barWidth: 12,
      //每个柱体上的提示文字
      label: {
        show: true,
        position: "top",
        formatter: "{c}%",
        color: "#fff",
      },
    },
  });
};
watch(() => props.data, renderChart);
</script>

<style lang="less" scoped></style>
