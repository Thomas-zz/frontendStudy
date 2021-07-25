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

