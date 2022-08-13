<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="inputVal"
      @change="monitorInputValChange"
    />
    <a-button type="primary" @click="addItem">添加事项</a-button>

    <a-list bordered :dataSource="showList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="
            (e) => {
              monitorCheckboxStatusChange(e, item.id);
            }
          "
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ unfinishedStatistics }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button
            :type="viewKey == 'all' ? 'primary' : 'default'"
            @click="changeStyle('all')"
            >全部</a-button
          >
          <a-button
            :type="viewKey == 'undone' ? 'primary' : 'default'"
            @click="changeStyle('undone')"
            >未完成</a-button
          >
          <a-button
            :type="viewKey == 'completed' ? 'primary' : 'default'"
            @click="changeStyle('completed')"
            >已完成</a-button
          >
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clearCompleted">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "app",
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getList");
  },
  computed: {
    ...mapState(["inputVal", "viewKey"]),
    ...mapGetters(["unfinishedStatistics", "showList"]),
  },
  methods: {
    // 监听文本框值的变化
    monitorInputValChange(e) {
      this.$store.commit("setInputVal", e.target.value);
    },
    // 添加列表项
    addItem() {
      if (this.inputVal.trim().length <= 0) {
        return this.$message.warning("文本框内容不能为空！");
      }
      this.$store.commit("addItem");
    },
    // 根据id删除对应列表项
    removeItem(id) {
      this.$store.commit("removeItem", id);
    },
    // 监听复选框选中状态的改变
    monitorCheckboxStatusChange(e, id) {
      const param = {
        id: id,
        status: e.target.checked,
      };
      this.$store.commit("changeCheckboxStatus", param);
    },
    // 清除已完成
    clearCompleted() {
      this.$store.commit("clearCompleted");
    },
    // 点击按钮修改高亮显示
    changeStyle(key) {
      this.$store.commit("changeStyleKey", key);
    },
  },
};
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>