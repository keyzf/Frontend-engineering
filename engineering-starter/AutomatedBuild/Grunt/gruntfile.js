/* Grunt 的入口文件 用于定义一些需要Grunt自动执行的任务
    需要导出一个函数，此函数接收一个Grunt的形参，内部提供一些创建任务时可以用到的API
*/

module.exports = grunt => {
    //注册任务
    grunt.registerTask('foo', () => {
        console.log('hello grunt~');
    });
    //可以注册多个任务 第一个参数：任务名称 第二个参数：任务描述出现在grunt --help帮助信息中
    grunt.registerTask('bar', '任务描述', () => {
        console.log('other task~');
    });
    // //默认任务 只需执行yarn grunt,而且他可以依次执行多个任务
    // grunt.registerTask('default',['foo','bar']);

    //异步任务
    grunt.registerTask('async-task', () => {
        //并没有执行
        setTimeout(() => {
            console.log('async-task');
        }, 1000);
    });
    //正确的异步任务执行
    grunt.registerTask('async', function () {
        //使用this.async()得到回调函数 在异步任务执行完毕后执行这个回调函数 标识这个任务完成了
        const done = this.async();
        setTimeout(() => {
            console.log('async-task');
            done();
        }, 1000);
    });
    //Grunt 标记任务失败
    grunt.registerTask('bad', () => {
        console.log('bad working~');
        return false;
    });
    //bar 任务不会执行了 因为bad标记任务失败了
    grunt.registerTask('default', ['foo', 'bad', 'bar']);
    //还可以通过yarn grunt default --force 即使任务失败也要强制执行所有任务

    //异步任务的失败的情况
    grunt.registerTask('bad-async',function()=>{
        const done = this.async();
        setTimeout(() => {
            console.log('bad async');
            done(false);//传递一个参数 标记false表示异步任务执行失败了
        }, 1000);
    });

}