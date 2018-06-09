function get_obj_data(obj, key) {
    // 拷贝对象方便后续处理(由于对象是引用类型)
    obj = Object.assign({}, obj);

    // 分隔键为数组'a.b.c' => ['a','b']
    let key_list = key.split('.');
    key_list.forEach(key => {
        obj = obj[key];
    });

    //返回最后取到的值
    return obj;
}

/**
 * 解析模板
 * @param {string} tpl 需要解析的模板 `我叫{{user.name}},我今年{user.age}岁了`
 * @param {obj} data 需要插入的数据 {user: {name: 'whh',age: 19}}
 * @return {string} 我叫whh,我今年19岁了
 */
function parse(tpl, data) {
    //定义正则 用于匹配双花括号中的内容
    const re = /{{([^}]+)}}/g;

    let match;
    let tpl_replica = tpl;
    
    // exec()用于匹配字符串 返回一个数组 调一次匹配一次直到找不到匹配结果(返回null)
    while(match = re.exec(tpl)) {
        //"{{user.name}}"
        let variable = match[0];

        //"user.name"
        let key = match[1];

        //获取键的值 "whh",
        let replacement = get_obj_data(data, key);

        //将模板中的变量替换成数据
        tpl_replica = tpl_replica.replace(variable, replacement);
    }
    return tpl_replica;
}

window.parse = parse;