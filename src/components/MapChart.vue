<template>
  <div class="MapChart">
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import mapJson from "@/assets/MapData/china.json";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const target = ref();
let mChart = null;
onMounted(() => {
  echarts.registerMap("china", mapJson);
  mChart = echarts.init(target.value);
  renderChart();
});
const renderChart = () => {
  /** @type EChartsOption */
  const options = {
    timeline: {
      show: true,
      autoPlay: true,
      loop: true,
      width: "80%",
      bottom: "0",
      right: "10%",
      left: "10%",
      data: props.data.voltageLevel,
      playInterval: 4000,
    },
    grid: {
      right: "2%",
      top: "15%",
      width: "20%",
    },
    geo: {
      show: true,
      map: "china",
      center: [114, 33],
      roam: true,
      zoom: 0.8,
      itemStyle: {
        borderColor: "rgba(147, 235, 248, 1)",
        borderWidth: 1,
        areaColor: {
          // 经向色值
          type: "radial",
          x: 0.5,
          y: 0.5,
          r: 0.5,
          colorStops: [
            // 0% 处的颜色
            {
              offset: 0,
              color: "rgba(147, 235, 248, 0)",
            },
            // 100% 处的颜色
            {
              offset: 1,
              color: "rgba(147, 235, 248, .2)",
            },
          ],
          globalCoord: false,
        },
        emphasis: {
          areaColor: "#389BB7",
          borderWidth: 0,
        },
      },
    },
    options: [],
  };
  props.data.voltageLevel.map((item, index) => {
    options.options.push({
      /** @type EChartsOption */

      backgroundColor: "#142037",
      title: [
        {
          text: "2019~2023 年度数据统计",
          left: 0,
          top: 0,
          textStyle: {
            color: "#fff",
            fontSize: 30,
          },
        },
        {
          text: item + "年度数据统计",
          right: 0,
          top: "4%",
          textStyle: {
            color: "#ccc",
            fontSize: 25,
          },
        },
      ],
      xAxis: {
        show: true,
        type: "value",
        scale: true,
        position: "top",
        axisLabel: {
          show: true,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        show: true,
        type: "category",
        axisLabel: {
          interval: 0,
          textStyle: {
            color: "#ddd",
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#fff",
          },
        },
        axisTick: {
          show: false,
        },
        data: props.data.categoryData[item].map((i) => i.name),
      },
      series: [
        {
          type: "bar",
          data: props.data.categoryData[item],
          itemStyle: {
            color: props.data.colors[index],
            borderWidth: 0,
          },
        },
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          data: props.data.topData[item],
          showEffectOn: "render",
          rippleEffect: {
            brushType: "stroke",
          },
          label: {
            show: true,
            position: "right",
            formatter: "{b}",
            color: "#fff",
          },
          itemStyle: {
            color: props.data.colors[index],
          },
        },
      ],
    });
  });
  mChart.setOption(options);
};
</script>

<style lang="less" scoped></style>
