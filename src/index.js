module.exports = function check(str, bracketsConfig) {

    let res = true;
    if (checkBracketsPaired(str, bracketsConfig)) {
        for (let i = 0; i < bracketsConfig.length; i++) {
            let result = checkComplex(str, bracketsConfig, i);
            console.log('end', result);
            res &= result;
        }
    }
    return res;

    function checkComplex(ss, pattern, i) {
        let lastOpen;
        let firstClose;
        if (pattern[i][0] == pattern[i][1]) {
            lastOpen = ss.indexOf(pattern[i][0]);
            console.log('open', lastOpen);
            firstClose = ss.slice(0, firstClose).lastIndexOf(pattern[i][1]);
            console.log('close', firstClose);
        } else {
            firstClose = ss.indexOf(pattern[i][1]);
            console.log('close', firstClose);
            lastOpen = ss.slice(0, firstClose).lastIndexOf(pattern[i][0]);
            console.log('open', lastOpen);
        }
            let block = ss.slice(lastOpen, firstClose + 1);
            console.log('block', block);
            let result = true;
            if (firstClose == -1 && lastOpen == -1) {
                result = true;
                console.log('1', result);
            } else if (firstClose == -1 || lastOpen == -1) {
                result = false;
                console.log('2', result);
            } else {
                if (pattern.length > i + 1) {
                    result &= checkComplex(block, pattern, i + 1);
                    console.log('3', result)
                }
                let replaced = ss.replace(block, '');
                result &= checkComplex(replaced, pattern, i);
                console.log('4', result);
            }

            return result;
        }

        function checkBracketsPaired(exp, pattern) {
            if (!(((exp.match(new RegExp('/[' + pattern[0] + ']/g')) || []).length) == ((exp.match(new RegExp('/[' + pattern[1] + ']/g')) || []).length))) {
                return false;
            }
            return true;
        }
    }
