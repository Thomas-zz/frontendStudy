<!--  -->
<template>
  <div>
    <form>
      <input type="text" v-model="state2.stu.id" />
      <input type="text" v-model="state2.stu.name" />
      <input type="text" v-model="state2.stu.age" />
      <input type="submit" @click="addStus" />
    </form>
    <ul>
      <li
        v-for="(item, index) in state.stus"
        :key="item.id"
        @click="delStu(index)"
      >
        {{ item.name }} ---- {{ item.age }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import { reactive } from "vue";

export default {
  name: "App2",
  setup() {
    let { state, delStu } = useRemoveStudent();
    let { state2, addStus } = useAddStudent(state);

    return { state, delStu, state2, addStus };
  },
};

function useRemoveStudent() {
  let state = reactive({
    stus: [
      { id: 1, name: "zs", age: 10 },
      { id: 2, name: "ls", age: 20 },
      { id: 3, name: "ww", age: 30 },
    ],
  });

  function delStu(index) {
    state.stus = state.stus.filter((stu, idx) => idx !== index);
  }
  return { state, delStu };
}

function useAddStudent(state) {
  let state2 = reactive({
    stu: {
      id: "",
      name: "",
      age: "",
    },
  });

  function addStus(e) {
    e.preventDefault();
    const stu = Object.assign({}, state2.stu);
    state.stus.push(stu);
    state2.stu.id = "";
    state2.stu.name = "";
    state2.stu.age = "";
  }

  return { state2, addStus };
}
</script>
<style scoped></style>
