<template>
  <div>
    <form>
      <input type="text" v-model="stu.id">
      <input type="text" v-model="stu.name">
      <input type="text" v-model="stu.age">
      <input type="submit" @click="addStus">
    </form>
    <ul>
      <li v-for="(item, index) in stus" :key="item.id" @click="delStu(index)">{{item.name}} ---- {{item.age}}</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      stus : [
        {id: 1, name: 'zs', age: 10},
        {id: 2, name: 'ls', age: 20},
        {id: 3, name: 'ww', age: 30}
      ],
      stu: {
        id: '',
        name: '',
        age: ''
      }
    }
  },
  methods: {
    delStu(index){
      this.stus = this.stus.filter((stu, idx) => idx !== index);
    },
    addStus(e){
      // 组织表单默认事件
      e.preventDefault();
      const stu = Object.assign({}, this.stu);
      this.stus.push(stu);
      this.stu.id = '';
      this.stu.name = '';
      this.stu.age = ''
    }
  },
  components: {
  }
}
</script>
