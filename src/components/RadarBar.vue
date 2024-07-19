<template>
  <div class="RadarBar">
    <h2>【云端报警风险】</h2>
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
  const options = {
    grid: {
      left: "0",
      right: "0",
      top: 0,
      bottom: 0,
      containLabel: true,
    },
    radar: {
      name: {
        textStyle: {
          color: "#05D5FF",
          fontSize: 14,
        },
      },
      shape: "polygon",
      center: ["50%", "50%"],
      radius: "80%",
      startAngle: 120,
      splitLine: {
        show: true,
      },
      //每个category
      indicator: props.data.risks.map((item) => ({
        name: item.name,
        max: 100,
      })),
      // 轴线配置
      axisLine: {
        lineStyle: {
          color: "rgba(5, 213, 255, .8)",
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: "rgba(5, 213, 255, .8)", // 设置网格的颜色
        },
      },
      // 不展示拆分区域
      splitArea: {
        show: false,
      },
    },
    angleAxis: {
      min: 0,
      interval: 0,
      clockwise: false,
    },
    radiusAxis: {
      splitLine: {
        show: true,
      },
      color: "#fff",
    },
    // 中心点
    polar: {
      center: ["50%", "50%"],
      radius: 0,
    },
    series: {
      type: "radar",
      data: [
        {
          value: props.data.risks.map((item) => item.value),
        },
      ],
      // 拐点的样式，还可以取值'rect','angle'等
      symbol: "circle",
      // 拐点的大小
      symbolSize: 10,
      // 折线拐点标志的样式
      itemStyle: {
        normal: {
          color: "#05D5FF",
        },
      },
      // 区域填充样式
      areaStyle: {
        normal: {
          color: "#05D5FF",
          opacity: 0.5,
        },
      },
      // 线条样式
      lineStyle: {
        width: 2,
        color: "#05D5FF",
      },
      // 图形上的文本标签
      label: {
        normal: {
          show: true,
          formatter: (params) => {
            return params.value;
          },
          color: "#fff",
        },
      },
    },
  };
  mChart.setOption(options);
};
watch(() => props.data, renderChart);
</script>

<style lang="less" scoped></style>
