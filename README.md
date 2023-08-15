# 《WebGL编程指南》知识案例

## 工程说明

该工程代码主要参考《WebGL编程指南》配套的案例（standard_examples 目录）再以自己的方式实现其效果，与书本中的代码不一样的地方是，通过装饰器与策略模式，隐藏了许多关于缓冲区的细节，使得代码更为短小精悍，h5 版本的体验地址：https://juliusjiang.github.io/webgl_guide/h5_preview/build/
![image](https://github.com/JULIUSJIANG/webgl_guide/assets/33363444/b18c2ba9-933d-4442-8b35-dd2a02bf56b5)

## 目录说明
* 工程目录 self_implements 放置的是最原始的代码文件，框架为 NodeJS + React + Antd + Electron
  
* 工程目录 h5_preview 是 self_implements 剥离对 Electron 的依赖后，能够直接通过 React 发布 h5 的版本，体验地址对应代码仓库的目录 self_implements/build，是 h5 版本的发布

* 工程目录 standard_examples 是《WebGL编程指南》配套案例的标准代码


## 注意事项
* 工程针对书本中出现的重要案例均写了对应的类，类名为在书中出现的页数及其简单描述

* 所有的案例类均置于文件目录 webgl_guide/self_implements/src_ts/demo/ 底下，这也是最值得关注的目录
<img width="436" alt="1692136860771" src="https://github.com/JULIUSJIANG/webgl_guide/assets/33363444/5e638156-a40c-4186-914a-4f81a990fb1b">

* 看到代码 MgrData.inst.dataVersion++，可以简单地认为整个画面即将全部刷新，包含 react 以及 webgl

* h5_preview 中的 src_ts 与 self_implements 中的 src_ts 核心逻辑一致，主要差异在于：
  
  > h5_preview 的运行环境为浏览器，没有主进程，所以剔除了主进程的入口文件 IndexMain.ts
  > 
  > MgrSdkCoreElectron.ts 依赖于 IndexMain.ts，不兼容浏览器环境下的运行，所以用新的策略 MgrSdkCoreH5.ts 顶替掉
  
* h5 版本发布以后，index.html 中的 script 标签 src 值的 "/static/js..." 要改成 "./static/js..."，脚本文件的引用才不会出错，页面才能正常运行


## NodeJS基础
* NodeJS 是 js 的一个运行环境，需要下载、安装，官网地址：https://nodejs.org/en
  
* NodeJS 工程根目录均存在文件 package.json，该文件记录了工程的依赖项，cmd 中在该目录下运行命令 npm install 的话会自动安装依赖项
  
* package.json 中的 scripts 属性记录了工程的可执行操作，如：
  
  > self_implements 的调试：npm run start、构建：npm run make
  > 
  > h5_preview 的调试：npm run start、构建：npm run build
