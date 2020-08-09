/* gulp 配置文件 */
const {src,dest,parallel,series} = require('gulp');

const loadPlugins = require('gulp-load-plugins');
//自动加载插件
const plugins = loadPlugins();
//yarn add gulp-sass --dev 
const sass = plugins.sass;
const babel  = plugins.babel;
const swig = plugins.swig;
const imagemin = plugins.imagemin;
//注意del不属于gulp 不能被load-plugins管理
const del = require('del');


//每一个插件都是提供了一个函数 每个函数的结果返回转换流
const style = ()=>{
  return src('src/assets/styles/*.scss',{base:'src'})//保留基本的路径否则 在dist目录里面只有样式文件没有之前的目录
   .pipe(sass({outputStyle:'expanded'}))//编译scss文件 expanded 完全展开css文件
    .pipe(dest('dist'))
}

// yarn add gulp-babel --dev
//注意还需要安装 babel内部的插件 这个插件才会正真的转换
//yarn add @babel/core @babel/preset-env --dev 


const script = ()=>{
  return src('src/assets/scripts/*.js',{base:'src'})
  .pipe(babel({presets:['@babel/preset-env']}))
  .pipe(dest('dist'));
}

//3. 模板文件
//yarn add gulp-swig --dev  


//数据文件 一般是在页面中写死的东西
const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

const page=()=>{
  return src('src/**/*.html',{base:'src'})//src/**/*.html表示：src下面任意子目录下面的.html文件
  .pipe(swig({data:data}))
  .pipe(dest('dist'));
}

//图片读取和压缩 安装插件：yarn add gulp-imagemin --dev

const image = ()=>{
  return src('src/assets/images/**',{base:'src'})
  .pipe(imagemin())
  .pipe(dest('dist'));
}
//字体文件 svg也会有 压缩svg
const font = ()=>{
  return src('src/assets/fonts/**',{base:'src'})
  .pipe(imagemin())
  .pipe(dest('dist'));
}

//其他文件任务
const extra = ()=>{
  return src('public/**',{base:'public'})
  .pipe(dest('dist'));
}

//yarn add del --dev 自动清除dist文件
//清除任务
const clean = ()=>{
  return del(['dist']);
}

const compile = parallel(style,script,page,image,font);
//先进行清除dist文件
const build = series(clean,parallel(compile,extra));

//将任务导出
module.exports={
  build
}