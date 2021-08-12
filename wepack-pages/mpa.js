const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const path = require('path');


const setMpa = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  // 获取src目录下符合规则的所有入口文件  得到的是个数组
  const entryFiles = glob.sync(path.join(__dirname, "./js/*.js"))
  // 遍历文件集合 生成所需要的entry htmlWebpackPlugins
  entryFiles.map((item, index) => {
    // 根据正则表达式 match 匹配  得到的是个数组
    // const match = item.match(/src\/(.*)\/index\.js$/);
    // 数组下标为1的那一项是匹配的结果  match的使用方法自查
    // const pageName = match && match[1];
    const pageName = item.replace(/(.*\/)*([^.]+).*/ig,"$2")
    entry[pageName] = item;
    // 多页面所需要的模版集合
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        title: pageName,
        template: path.join(__dirname, `./views/${pageName}.html`),
        filename: `html/${pageName}.html`,
        chunks: [pageName],
        inject: "body"
      })
    )
  })
  console.log("返回", entryFiles, '--------------mid-------------', entry, '---------2222---------', htmlWebpackPlugins, '--------end---------')
  // 对外输出多页面打包需要的入口集合、 模版集合
  return { entry, htmlWebpackPlugins }
}

module.exports = setMpa();
