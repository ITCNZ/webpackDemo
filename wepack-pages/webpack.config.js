/**
 * webpack概念
 * build modules with dependencies  基于node环境
 * 打包应用程序中的所有模块 得到静态资源(bundle)文件  放到指定目录中
 * 从wp4.0开始  不必引入一个配置文件  因为提供了一个默认的配置文件
 */
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 const webpack = require('webpack');
 const path = require('path');
 const { entry, htmlWebpackPlugins } = require('./mpa.js')

 const config = {
   // 提供mode配置选项, 告知wp使用响应模式的内置优化
   mode: 'development',
   // entry: "./src/index.js",
   entry: entry,
 
   // output属性 告诉wp在哪里输出它创建的bundles 以及如何命名这些文件
   output: {
     // 用于输出文件的文件名  动态   chunkhash和hash占位符不能同时使用---[name].[id].[hash].js
     filename: 'js/[name].[hash].js',
     // 目标输出目录 ⚠️  绝对路径
     path: path.resolve(process.cwd(), 'dist'),
     // cdn地址
     publicPath: "",
     // 散列摘要前缀长度
     hashDigestLength: 4
   },
   // 插件目的在于解决 loader 无法实现的其他事
   // webpack 插件是一个具有 apply 属性的 JavaScript 对象
   plugins: [
     new webpack.HotModuleReplacementPlugin(),
     new webpack.ProgressPlugin(),
     new CleanWebpackPlugin('dist'), // 坑 按最新的配没效果  老的写法是把dist传进去
     // new HtmlWebpackPlugin({
     //   title: "webpack hello", // index.html中 要做插入才生效
     //   template: './src/index.html'
     // }),
     new MiniCssExtractPlugin({
       filename: 'css/[name].[contenthash].css'
     }),
     ...htmlWebpackPlugins
   ],
   optimization: {
     usedExports: true
   }
 }
 
 
 // commonJS 只支持这样写
 module.exports = config;