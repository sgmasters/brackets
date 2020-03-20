module.exports = function check(str, bracketsConfig) {

    let res = true;
    if (checkBracketsPaired(str, bracketsConfig)) {
        for (let i = 0; i < bracketsConfig.length; i++) {
            let result = checkComplex(str, bracketsConfig, i);
            res &= result;
        }
    } else {
        return false;
    }
    return res;

    function checkComplex(ss, pattern, i) {
        let result = true;
        let lastOpen;
        let firstClose;

        if (pattern[i][0] == pattern[i][1]) {
            lastOpen = ss.indexOf(pattern[i][0]);
            if (lastOpen != -1) {
                firstClose = lastOpen + 1 + ss.substr(lastOpen + 1).indexOf(pattern[i][1]);
            } else {
                firstClose = lastOpen;
            }
            if (firstClose == lastOpen && lastOpen != -1) {
                return false;
            }
        } else {
            firstClose = ss.indexOf(pattern[i][1]);
            lastOpen = ss.slice(0, firstClose).lastIndexOf(pattern[i][0]);
        }
        let block = ss.slice(lastOpen, firstClose + 1);
        result = true;
        if (firstClose == -1 && lastOpen == -1) {
            result &= true;
        } else if (firstClose == -1 || lastOpen == -1) {
            return false;
        } else {

            if (pattern.length > i + 1) {
                result &= checkComplex(block, pattern, i + 1);
            }
            let replaced = ss.replace(block, '');
            if (replaced != '') {
                result &= checkComplex(replaced, pattern, i);
            }

        }
        return result;
    }

    function checkBracketsPaired(exp, pattern) {
        let result = true;
        for (let i = 0; i < pattern.length; i++) {
            let open = '\[\\' +  pattern[i][0] + '\]';
            let close = '\[\\' +  pattern[i][1] + '\]';

            if ((((exp.match(new RegExp(open, 'g'))) || []).length) == ((exp.match(new RegExp(close, 'g')) || []).length)) {
                result &= true;
            } else {
                result &= false;
            }
        }
        return result;
    }
}
