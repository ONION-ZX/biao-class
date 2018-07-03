 /* eslint-disable */
import Vue from 'vue';

function parse_str_rule(str) {
    let rule = {};
    str.split('|').forEach(r => {
        let arr = r.split(':');
        let key = arr[0];
        let val = arr[1];

        val = val === undefined ? true : val;
        
        rule[key] = val;
    });
    return rule;
}

const validate = {
    username() {},
    required(val) {
        if(typeof val === 'number')
            return true;
        return !!val;
    },
    min_length(val, min) {
        return val.length >= parseInt(min);
    },
    max_length(val, max) {
        return val.length <= parseInt(max);
    },
}

export default Vue.directive('validate',{
    bind: function(el, binding) {
        let rule = parse_str_rule(binding.value);
        el.addEventListener('keyup', () => {
            let val = el.value;

            for(let key in rule) {
                let validator = validate[key];
                let argument = rule[key];

                if(validator && validator(val, argument)) {
                    console.log(key + '不合法');
                } else {
                    console.log(key + '合法');
                }
            }
        })
    }
})