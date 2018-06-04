const output = {
    trim: trim,
};

function trim(str, cap_list) {
    let arr = cap_list.split('');

    arr.forEach(function (cap) {
        if (str.startsWith(cap)) {
            str = str.substring(1);
            str = trim(str, cap);
        }

        if (str.endsWith(cap)) {
            str = str.substring(0, str.length - 1);
            str = trim(str, cap);
        }
    });

    return str;
}

export default output;
