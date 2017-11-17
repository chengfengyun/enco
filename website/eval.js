// eval("var a=1"); //声明一个变量a并赋值1。
// eval("2+3"); //执行加运算，并返回运算值。
// eval("mytest()"); //执行mytest()函数。
// eval("{b:2}"); //声明一个对象。
// eval("("+data+")");把json字符串转为json对象[object Object].


// eval函数接收一个参数s，如果s不是字符串，则直接返回s。否则执行s语句。如果s语句执行结果是一个值，则返回此值，否则返回undefined。 
// 需要特别注意的是对象声明语法“{}”并不能返回一个值，需要用括号括起来才会返回值，简单示例如下：
var code1 = '"a" + 2'; //表达式 
var code2 = '{a:2}'; //语句 
console.log(eval(code1)); //->'a2' 
console.log(eval(code2)); //->undefined 
console.log(eval('(' + code2 + ')')); //->[object Object]

var s = 'global'; //定义一个全局变量 
function demo1() {
    eval('var s="local"');
}
demo1();
console.log(s); //->global

// 很好理解，上面的demo1函数等价于：function demo1(){var s='local';}，其中定义了一个局部变量s。 
// 所以最后的输出是global并不是什么奇怪的事情，毕竟大家都能很清楚的区分局部变量和全局变量。 
// 仔细体会一下，可以发现eval函数的特点，它总是在调用它的上下文变量空间（也称为：包，closure）内执行，无论是变量定义还是函数定义都是如此，所以如下的代码会产生函数未定义的错误：

// var s = 'function test(){return 1;}'; //一个函数定义语句 
// function demo2() {
//     eval(s);
// }
// demo2();
// console.log(test()); //->error:test is not defined


// function xx() {
//     eval('var x=1;'); //局部变量 
//     with(window) { eval('var x=3;'); } //全局变量 
//         //也可以用封装的 evalGlobal( 'var x=3' ); 
//     console.log(x); //1  局部变量 
//     console.log(window.x); //3  全局变量 
// }
// xx();