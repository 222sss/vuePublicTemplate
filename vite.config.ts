import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 全局别名
import path from 'path'

// 解决问题：解决import {ref, reactive …} 引入的问题，这样就不需要在每个组件中重复引入了
import AutoImport from 'unplugin-auto-import/vite'

// 兼容低版本浏览器
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          '@/api/index.ts': [['*', 'request']] // 导入指定文件下的api，导入的会是一个模块并给这个模块命名为request，导入方式为request.api.方法名
        }
      ],
      eslintrc: {
        enabled: true
      }
    }),

    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': path.resolve('src')
    }
  },
  // 静态资源基础路径 base: './' || '',
  base: './',
  server: {
    host: '0.0.0.0',
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true // 允许跨域

    // 设置代理，根据我们项目实际情况配置
    // proxy: {
    //   '/api': {
    //     target: 'https://www.baidu.com',
    //     changeOrigin: true,
    //     secure: false,
    //   }
    // }
  },
  css: {
    //css预处理
    preprocessorOptions: {
      less: {
        additionalData: '@import "./src/styles/index.less";'
      }
    }
  }
})
