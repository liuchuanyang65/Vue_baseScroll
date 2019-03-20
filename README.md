# Vue_baseScroll

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目说明
```
1、本项目采用了postcss-px-to-viewport插件实现px与vm的转换(直接使用px会自动转换为vm) 在.postcssrc.js文件中进行相关配置 
2、stylus
3、基本组件已全局注册可直接使用
4、如需使用上拉刷新、下拉加载功能 直接使用base-box标签 并进行相对应的配置即可 并可根据需求引用 mixins(路径: '@/plugins/mixins/list') 相关参数可详见该文件
```
