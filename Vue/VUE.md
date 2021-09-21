# VUE

## 创建Vue项目

```
vue create <Project Name> //文件名 不支持驼峰（含大写字母）
```





## vue的生命周期

https://segmentfault.com/a/1190000011381906

```vue
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="vue.js"></script>
</head>
<body>
    <div id="app" ref="app">
        {{ name }}
    </div>
</body>
    <script>
        let vm=new Vue({
            el:"#app",
            data:{
                name:"liuting",
            },
            beforeCreate(){
                console.log("创建前：");
                console.log(this.$el);
                console.log(this.$data);
            },
            created(){
                console.log("创建完成：");
                console.log(this.$el);
                console.log(this.$data);
            },
            beforeMount(){
                console.log("挂载前：");
                console.log(this.$el);
                console.log(this.$data);
            },
            mounted(){
                console.log("挂载完成：");
                console.log(this.$el);
                console.log(this.$data);
            },
            beforeUpdate(){
                console.log('=即将更新渲染=');
                let name = this.$refs.app.innerHTML;
                console.log('name:'+name);
            },
            updated(){
                console.log('==更新成功==');
                let name = this.$refs.app.innerHTML;
                console.log('name:'+name);
            },
            /*beforeDestory(){
                console.log("销毁前：");
            },
            destoryed(){
                console.log("销毁完成：");
            }*/
        });
    </script>
</html>
```



## reactive理解

- vue3中提供的实现响应式数据的方法
- 在vue2 中响应式数据是通过defineProperty来实现的
- 在vue3中响应式数据是通过ES6的Proxy来实现的

注意点：

- 参数必须是对象（json/arr）
- 如果给reactive传递了其他对象
  - 默认情况下修改对象，界面不会自动更新
  - 如果想更新，可以通过重新赋值的方式



## ref理解

为我们创建了一个响应式引用

`ref(18) -> reactive({value: 18})`

Vue通过当前数据的__v_ref属性来判断是否是ref数据，如果是，就自动添加.value

通过`import {isRef, isReactive} form 'vue' `来引入依赖，判断是否是ref或reactive

## 递归监听和非递归监听

- reactive和ref都是递归监听
- shallowReactive和shallowReactive是非递归监听，性能消耗会比较小
- triggerRef(ref)  传入更新的ref类型数据，会主动触发界面更新

<img src="E:\frontendStudy\Vue\VUE.assets\image-20210816213151278.png" alt="image-20210816213151278" style="zoom:67%;" />