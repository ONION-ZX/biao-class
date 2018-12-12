// var [a,b,c] = [1,2,3];
// var [a,[b,c]] = [1,[2,3]];
// var [a, , c] = [1,2,3];
// var [a, ...c] = [1,2,3];
// console.log(a);
// console.log(c);
// var [a,b,c='default',d='default'] = [1,2,3];
// console.log('a:',a);
// console.log('b:',b);
// console.log('c:',c);
// console.log('d:',d);
// var obj = {
//     a:1,
//     b:2,
// };

// var {c,b} = obj;
// console.log('c:',c);
// console.log('b:',b);
// var obj = {
//     arr: [
//         'Yo.',
//         {
//             a:1,
//         }
//     ]
// };
// let {arr:[greet, {a}]} = obj;
// console.log('greet:',greet);
// console.log('a:',a);
// let {a:A=1, b=2} = {a:10};
// console.log("A:",A);
// console.log("b:",b);
// let {floor, pow} = Math;
// let a = 1.9;
// console.log(floor(a));
// console.log(pow(2,3));
// let {length} = 'yo';
// console.log(length); 
// let [a,b,c] = 'yo';
// console.log(a,b,c);

// var arr = [1,2];
// function test([a,b]) {
//     console.log(a);
//     console.log(b);
// }

// test(arr); 

// console.log('Yo'.endsWith('o')); 
// console.log('Yo'.endsWith('Y')); 
// console.log('Yo '.repeat(3));
// let title = "yo world";
// let tpl = `
//     <div>
//         <span>${title + `<span>${'你好世界'}</span>`}<span/>
//     </div>
// `;
// console.log(tpl);
// Symbol
// undefined
// null
// String
// Number
// Object
// Boolean
// let a = Symbol();
// let b = Symbol();
// console.log(a === b); 

// var user = new Proxy({},{
//     get: function(obj,prop) {
//         if(prop == 'full_name')
//             return obj.fname + ' ' + obj.lname;
//     },
//     set: function(obj,prop,value) {
//         if(prop == 'age') {
//             if(value > 200)
//                 throw new RangeError('The age seems invalid');
//             obj[prop] = value;
//         }
//     }
// })
// user.fname = 'Bob';
// user.lname = 'Wood';
// console.log(user);

// var arr = [1,2,3,3];
// console.log(arr);
// console.log(s);
// var s = new Set([1,2,3,3]);
// console.log(s.has(5));
// s.add(4);
// console.log(s);
// s.delete(2);
// console.log(s);
// s.clear();
// console.log(s);

// var ss = new Set([1,2,3,4,5,5,3,2]);
// console.log(ss);
// var arr = Array.from(ss);
// console.log(arr); 

// let obj = {
//     name: 'whh',
//     age: 18,
//     children: {
//         name: 'lsd',
//     }
// }
// let obj2 = JSON.parse(JSON.stringify(obj));
// obj.name = 'zks';
// console.log(obj2.name);

// function Super() {
//     Super.prototype.getNumber = function() {
//         return 1;
//     }
// }

// function Sub() {}
// let s = new Sub();
// Sub.prototype = Object.create(Super.prototype, {
//     constructor: {
//         value: Sub,
//         enumerable: false,
//         writable: true,
//         configurable: true
//     }
// })


// class MyDate extends Date {
//     test() {
//         return this.getTime();
//     }
// }
// let myDate = new MyDate();
// myDate.test();

// function MyData() {};
// MyData.prototype.test = function() {
//     return this.getTime();
// }
// let d = new Date();
// Object.setPrototypeOf(d, MyData.prototype);
// Object.setPrototypeOf(MyData.prototype, Date.prototype);

// let a = {
//     value: 1,
// }

// function getValue(name, age) {
//     console.log(name);
//     console.log(age);
//     console.log(this.value);
// }

// getValue.call(a,'whh', 18);
// getValue.call(a,['whh',18]);
let user = [
    {
        name: 'whh',
        age: 18,
    },
    {
        name: 'lsd',
        age: 19,
    },
    {
        name: 'zks',
        age: 22,
    },
    {
        name: 'lbb',
        age: 29,
    }
]
// let new_arr = user.map(row => row.age);
// console.log(new_arr); 
// let new_filter = user.filter(row => row.age>18);
// console.log(new_filter); 
// let num = [4,6,2,5];
// let sum = num.reduce((total,n)=>{return total+=n});
// console.log(sum);