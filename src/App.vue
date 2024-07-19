<script setup>
import VerticalBar from "./components/VerticalBar.vue";
import RadarBar from "./components/RadarBar.vue";
import Relation from "./components/Relation.vue";
import RingBar from "./components/RingBar.vue";
import MapChart from "./components/MapChart.vue";
import WordCloud from "./components/WordCloud.vue";
import TotalData from "./components/TotalData.vue";
import HorizontalBar from "./components/HorizontalBar.vue";
import { ref } from "vue";
import { fetchAppData } from "@/api/fetchAppData";
const appData = ref(null);
const getAppData = async () => {
  const data = await fetchAppData();
  appData.value = data;
  console.log(appData.value);
};
getAppData();
setInterval(() => {
  getAppData();
}, 3000);
</script>

<template>
  <div
    class="bg-[url('assets/imgs/bg.jpg')] bg-no-repeat h-screen bg-cover text-white bg-center flex overflow-hidden p-5"
    v-if="appData"
  >
    <!-- 左 -->
    <div class="bg-slate-800 bg-opacity-50 flex-1 flex flex-col mr-5">
      <!-- 横向柱状图 -->
      <HorizontalBar
        class="flex-1 box-border mb-2"
        :data="appData.regionData"
      />
      <!-- 雷达图 -->
      <RadarBar class="flex-1 box-border mb-2" :data="appData.riskData" />
      <!-- 关系图 -->
      <Relation class="flex-1 box-border" :data="appData.relationData" />
    </div>
    <!-- 中 -->
    <div class="w-1/2 mr-5 flex flex-col">
      <!-- 数据总览图 -->
      <TotalData class="bg-opacity-50 bg-slate-800" :data="appData.totalData" />
      <!-- 地图可视化 -->
      <MapChart
        class="bg-opacity-50 bg-slate-800 flex-1 mt-4"
        :data="appData.mapData"
      />
    </div>
    <!-- 右 -->
    <div class="flex-1 bg-slate-800 bg-opacity-50 flex flex-col p-3">
      <!-- 竖向柱状图 -->
      <VerticalBar class="flex-1 box-border mb-2" :data="appData.serverData" />
      <!-- 环形图 -->
      <RingBar class="flex-1 box-border mb-2" :data="appData.abnormalData" />
      <!-- 文档云图 -->
      <WordCloud class="flex-1 box-border" :data="appData.wordCloudData" />
    </div>
  </div>
</template>

<style scoped></style>
