<template>
  <div class="Relation">
    <div>【数据传递信息】</div>
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
    xAxis: {
      show: false,
      type: "value",
    },
    yAxis: {
      show: false,
      type: "value",
    },
    series: [
      {
        type: "graph",
        layout: "none",
        coordinateSystem: "cartesian2d",
        symbolSize: 26,
        z: 3,
        label: {
          show: true,
          position: "bottom",
          color: "#fff",
          fontSize: 10,
          distance: 10,
        },
        edgeLabel: {
          show: true,
          color: "#fff",
          position: "middle",
          formatter: function (params) {
            let txt = "";
            if (params.data.speed !== undefined) {
              txt = params.data.speed;
            }
            return txt;
          },
        },
        // 边两端的标记类型
        edgeSymbol: ["none", "arrow"],
        // 边两端的标记大小
        edgeSymbolSize: 10,
        data: props.data.relations.map((item) => {
          // id 为 0 ，表示数据中心，数据中心单独设置
          if (item.id !== 0) {
            return {
              name: item.name,
              category: 0,
              // 位置
              value: item.value,
            };
          } else {
            return {
              name: item.name,
              // 位置
              value: item.value,
              // 数据中心圆的大小
              symbolSize: 100,
              // 圆的样式
              itemStyle: {
                normal: {
                  // 渐变色
                  color: {
                    colorStops: [
                      { offset: 0, color: "#157eff" },
                      { offset: 1, color: "#35c2ff" },
                    ],
                  },
                },
              },
              // 字体
              label: { normal: { fontSize: "14" } },
            };
          }
        }),
        links: props.data.relations.map((item, index) => ({
          // 方向
          source: item.source,
          target: item.target,
          // 线的样式
          lineStyle: { normal: { color: "#12b5d0", curveness: 0.2 } },
          // 线条文字
          label: {
            show: true,
            position: "middle",
            offset: [15, 0],
            formatter: `${item.speed}kb/s`,
          },
        })),
      },
      {
        // 用于带有起点和终点信息的线数据的绘制
        type: "lines",
        // 使用二维的直角坐标系
        coordinateSystem: "cartesian2d",
        // z-index
        z: 1,
        // 线特效的配置
        effect: {
          show: true,
          smooth: false,
          trailLength: 0,
          symbol: "arrow",
          color: "rgba(55,155,255,0.5)",
          symbolSize: 12,
        },
        // 线的样式
        lineStyle: {
          normal: {
            curveness: 0.2,
          },
        },
        // 线的数据级，前后线需要重合。数据固定
        data: [
          [{ coord: [0, 300] }, { coord: [50, 200] }],
          [{ coord: [0, 100] }, { coord: [50, 200] }],
          [{ coord: [50, 200] }, { coord: [100, 100] }],
          [{ coord: [50, 200] }, { coord: [100, 300] }],
        ],
      },
    ],
  });
};
watch(() => props.data, renderBar);
</script>

<style lang="less" scoped></style>
