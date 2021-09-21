## Vue3.0是如何变快的

### diff算法优化

- vue2中的虚拟dom是进行全量的对比
- vue3新增了静态标记（PatchFlag）
  - 在与上次虚拟节点进行对比的时候，只对比带有patch flag的节点
  - 并且可以通过flag的信息得知当前节点要对比的具体的内容

### hoistStatic 静态提升

### cacheHandlers 时间侦听器缓存

### ssr渲染

<img src="E:\frontendStudy\Vue\Vue3\Vue3.0.assets\image-20210813120442737.png" alt="image-20210813120442737" style="zoom:57%;" />

## 用Vite创建项目

- 安装Vite
  - npm install -g create-vite-app
- 利用Vite创建Vue3项目
  - create-vite-app projectName
- 安装依赖运行项目
  - cd projectName
  - npm install
  - npm run dev





## 递归监听和非递归监听

- reactive和ref都是递归监听
- shallowReactive和shallowReactive是非递归监听，性能消耗会比较小
- triggerRef(ref)  传入更新的ref类型数据，会主动触发界面更新

<img src="E:\frontendStudy\Vue\VUE.assets\image-20210816213151278.png" alt="image-20210816213151278" style="zoom:67%;" />

### reactive理解

- vue3中提供的实现响应式数据的方法
- 在vue2 中响应式数据是通过defineProperty来实现的
- 在vue3中响应式数据是通过ES6的Proxy来实现的

注意点：

- 参数必须是对象（json/arr）
- 如果给reactive传递了其他对象
  - 默认情况下修改对象，界面不会自动更新
  - 如果想更新，可以通过重新赋值的方式



### ref理解

为我们创建了一个响应式引用

`ref(18) -> reactive({value: 18})`

Vue通过当前数据的__v_ref属性来判断是否是ref数据，如果是，就自动添加.value

通过`import {isRef, isReactive} form 'vue' `来引入依赖，判断是否是ref或reactive

### shallowRef & shallowReactive

![image-20210902090915573](E:\frontendStudy\Vue\Vue3\Vue3.0.assets\image-20210902090915573.png)



## 性能优化

### toRaw

![image-20210902091208258](E:\frontendStudy\Vue\Vue3\Vue3.0.assets\image-20210902091208258.png)

![image-20210902091754041](E:\frontendStudy\Vue\Vue3\Vue3.0.assets\image-20210902091754041.png)

![image-20210902092137525](E:\frontendStudy\Vue\Vue3\Vue3.0.assets\image-20210902092137525.png)

markRaw：让某个数据永远不被追踪，永远不会变成响应式数据

- obj = markRaw(obj)

### toRef

![image-20210902093900400](E:\frontendStudy\Vue\Vue3\Vue3.0.assets\image-20210902093900400.png)

toRef和ref的区别

![image-20210902094033934](E:\frontendStudy\Vue\Vue3\Vue3.0.assets\image-20210902094033934.png)

### toRefs

![image-20210902094451684](E:\frontendStudy\Vue\Vue3\Vue3.0.assets\image-20210902094451684.png)

### customRef

自定义ref，返回一个ref对象，可以显式地控制依赖追踪和触发响应

![image-20210902095705617](E:\frontendStudy\Vue\Vue3\Vue3.0.assets\image-20210902095705617.png)

## readonly...

### readonly

创建一个只读的数据，并且递归只读

### shallowReadonly

创建一个只读的数据，但不是递归只读

### isReadonly

判断是否是只读的数据