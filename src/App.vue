<!--
 * @Author: J.sky bosichong@qq.com
 * @Date: 2023-02-18 08:47:12
 * @LastEditors: J.sky bosichong@qq.com
 * @LastEditTime: 2023-02-19 08:55:58
 * @FilePath: /vue_naive_todos/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import Header from "./components/Header.vue";
import { darkTheme } from "naive-ui";
import { ref, computed, watchEffect, onMounted } from "vue";

let id = 0; // ID
const theme = ref(null); //主题变量
const themebtntit = ref("暗色主题"); //主体按钮title
const newTodo = ref(""); // 新建待办事项的文本内容
const filterkey = ref(1); // 通过这个键值来过滤filteredTodos,用来展示不同状态下的待办事项列表
const inputRef = ref(null); // newtodo输入框
const todos = ref(JSON.parse(localStorage.getItem("mytodos") || "[]")); // 整个项目的数据数组

/**
 * 输入框获取焦点
 */
function handleFocus() {
  inputRef.value.focus();
}

onMounted(() => {
  handleFocus();
});

// 状态持久
watchEffect(() => {
  localStorage.setItem("mytodos", JSON.stringify(todos.value));
});

const filteredTodos = computed(() => {
  if (filterkey.value == 1) {
    return todos.value;
  } else if (filterkey.value == 2) {
    return todos.value.filter((t) => !t.done);
  } else if (filterkey.value == 3) {
    return todos.value.filter((t) => t.done);
  }
});

const all = () => {
  filterkey.value = 1;
};
const active = () => {
  filterkey.value = 2;
};
const completed = () => {
  filterkey.value = 3;
};

/**
 * 切换亮色和暗色主题
 */
const changetheme = () => {
  theme.value = theme.value == null ? darkTheme : null;
  themebtntit.value = themebtntit.value == "亮色主题" ? "暗色主题" : "亮色主题";
};

/**
 * 删除
 * @param {*} todo
 */
const removeTodo = (todo) => {
  // console.log(todo);
  todos.value = todos.value.filter((t) => t !== todo);
};

/**
 * 增加
 * @param {*} e
 */
const addTodo = (e) => {
  // console.log(newTodo.value);
  todos.value.push({ id: id++, text: newTodo.value, done: false });
  newTodo.value = "";
};
</script>

<template>
  <n-config-provider :theme="theme">
    <header>
      <div>
        <n-h1>
          <n-text type="success">Todos</n-text>
        </n-h1>
        <n-text>
          本项目依赖
          <n-a href="https://cn.vitejs.dev/" target="_blank" rel="noopener">Vite</n-a> +
          <n-a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</n-a> +
          <n-a
            href="https://https://www.naiveui.com/zh-CN/dark.dev/"
            target="_blank"
            rel="noopener"
            >Naive UI</n-a
          >
          搭建。
        </n-text>
      </div>
    </header>

    <main>
      <n-layout-header>
        <n-space vertical>
          <n-input
            v-model:value="newTodo"
            @keyup.enter="addTodo"
            size="small"
            placeholder="按回车键添加代办事项"
            autosize
            style="min-width: 50%"
            ref="inputRef"
          ></n-input>
        </n-space>
      </n-layout-header>
      <n-layout-content>
        <n-list v-for="todo in filteredTodos" :key="todo.id">
          <n-list-item>
            <n-space>
              <n-checkbox v-model:checked="todo.done" size="large" name="basic-demo">
              </n-checkbox>
              <n-text :delete="todo.done"
                ><label>{{ todo.text }}</label></n-text
              >
              <n-button @click="removeTodo(todo)" size="tiny">x</n-button>
            </n-space>
          </n-list-item>
        </n-list>
      </n-layout-content>
      <n-layout-footer>
        <n-space>
          <n-button-group>
            <n-button @click="all"> 所有条目 </n-button>
            <n-button @click="completed"> 已完成 </n-button>
            <n-button @click="active"> 未完成 </n-button>
          </n-button-group>
          <n-button @click="changetheme">
            {{ themebtntit }}
          </n-button>
        </n-space>
      </n-layout-footer>
    </main>
    <n-global-style />
  </n-config-provider>
</template>

<style scoped></style>
