# 后台管理系统前端项目

## 项目简介

本项目是一个基于 Vue.js 开发的现代化后台管理系统前端项目，提供了丰富的管理功能和用户界面组件，帮助开发者快速构建企业级管理系统。

## 技术栈

- **前端框架**：Vue.js
- **UI组件库**：Element UI
- **状态管理**：Vuex
- **路由管理**：Vue Router
- **HTTP请求**：Axios
- **打包工具**：Webpack
- **CSS预处理器**：SCSS/LESS

## 功能特性

- 响应式布局，适配多种设备屏幕
- 完善的权限管理系统
- 可配置的菜单和路由
- 丰富的UI组件和图表
- 多主题支持
- 国际化支持
- 模块化的代码组织

## 项目结构

```
├── public                 # 静态资源
│   ├── favicon.ico        # 网站图标
│   └── index.html         # HTML模板
├── src                    # 源代码
│   ├── api                # API请求
│   ├── assets             # 主题、字体等静态资源
│   ├── components         # 全局公用组件
│   ├── i18n               # 语言切换
│   ├── icons              # SVG图标
│   ├── layout             # 全局布局
│   ├── router             # 路由配置
│   ├── store              # Vuex存储
│   ├── styles             # 全局样式
│   ├── utils              # 全局工具方法
│   ├── views              # 页面视图
│   ├── App.vue            # 入口页面
│   └── main.js            # 入口文件
├── .env.development       # 开发环境变量
├── .env.production        # 生产环境变量
├── package.json           # 项目依赖
└── vue.config.js          # Vue配置
```

## 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 启动开发服务器

```bash
npm run serve
# 或
yarn serve
```

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

### 部署说明

构建完成后，生成的`dist`目录需要部署到Web服务器上。注意以下几点：

1. 确保前端API路径配置正确
2. 如使用history路由模式，需配置服务器将所有请求重定向到index.html
3. 建议使用Nginx等Web服务器部署静态资源

## 环境变量配置

### 开发环境 (.env.development)

```
ENV="development"
VUE_APP_BASE_API="/api"
```

### 生产环境 (.env.production)

```
ENV="production"
VUE_APP_BASE_API="http://127.0.0.1:8888/api/private/v1/"
```

## 权限控制

本系统采用基于角色的访问控制（RBAC）:

1. 用户登录获取Token和用户角色
2. 根据角色动态生成可访问的路由表
3. 页面级权限和按钮级权限分离控制

## 常见问题

### API请求失败

- 检查API地址配置是否正确
- 确认开发环境代理配置正确
- 生产环境确保API地址可访问

### 页面空白

- 检查路由配置
- 确认权限是否正确设置
- 查看控制台是否有错误信息

## 浏览器兼容性

- 现代浏览器和Internet Explorer 11+
- 推荐使用Chrome, Firefox, Safari

## 贡献指南

1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交Pull Request

## 许可证

[MIT](LICENSE)