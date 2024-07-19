<template>
  <div class="RingBar">
    <h2>环形图</h2>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import { data } from "autoprefixer";
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
const getSeries = () => {
  /** @type EChartsOption */
  const series = [];
  props.data.abnormals.forEach((item, index) => {
    series.push({
      name: item.name,
      type: "pie",
      center: ["55%", "55%"],
      radius: [73 - index * 15 + "%", 68 - index * 15 + "%"],
      data: [
        // 设置数据与名称
        { value: item.value, name: item.name },
        // 最大数据，展示比例
        {
          value: 1000,
          itemStyle: { color: "rgba(0,0,0,0)", borderWidth: 0 },
          tooltip: { show: false },
          hoverAnimation: false,
        },
      ],
      // 不展示 label
      label: { show: false },
      clockwise: false,
      hoverAnimation: false,
    });
    series.push({
      name: item.name,
      type: "pie",
      // 图形不响应事件
      silent: true,
      // z-index: 置于底层
      z: 1,
      // 逆时针排布
      clockWise: false,
      // 不展示鼠标移入动画
      hoverAnimation: false,
      // 半径位置，需要依次递减，否则会重复在一处进行展示
      radius: [73 - index * 15 + "%", 68 - index * 15 + "%"],
      // 中心点
      center: ["55%", "55%"],
      // 不展示 label
      label: { show: false },
      // 数据
      data: [
        // 绘制底线 75%
        {
          value: 7.5,
          itemStyle: { color: "rgb(3, 31, 62)", borderWidth: 0 },
          tooltip: { show: false },
          hoverAnimation: false,
        },
        // 绘制底线 25% 透明区域
        {
          value: 2.5,
          name: "",
          itemStyle: { color: "rgba(0,0,0,0)", borderWidth: 0 },
          tooltip: { show: false },
          hoverAnimation: false,
        },
      ],
    });
  });

  return series;
};
const renderChart = () => {
  /** @type EChartsOption */
  const option = {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      containLabel: true,
    },
    legend: {
      type: "plain",
      show: true,
      data: props.data.abnormals.map((i) => i.name),
      top: "14%",
      left: "60%",
      width: 0,
      icon: "circle",
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 5,
      textStyle: {
        color: "#fff",
      },
    },
    // Y 轴展示选项
    yAxis: [
      {
        type: "category",
        // 反向展示
        inverse: true,
        // 不展示轴线
        axisLine: {
          show: false,
        },
        // 不展示刻度
        axisTick: {
          show: false,
        },
      },
    ],
    // X 轴不展示
    xAxis: [
      {
        show: false,
      },
    ],
    //提示层
    tooltip: {
      show: true,
      trigger: "item",
      formatter: "{a}<br>{b}:{c}({d}%)",
    },
    series: getSeries(),
  };
  mChart.setOption(option);
};
watch(() => props.data, renderChart);
</script>

<style lang="less" scoped></style>
