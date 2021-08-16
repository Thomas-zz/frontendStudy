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

