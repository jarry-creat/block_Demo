// 用sha256函数实现工作量证明机制
const sha256 = require('crypto-js/sha256')
 
console.log(sha256('luotuo1').toString())
console.log(sha256('luotuo2').toString())

// 对于不同的输入结果，哪怕是一个微笑的改动，输出的结果也是不一样的
// 相同的输入，结果是一样的。

// 需要得到一个开头值前4位全为0的哈希值，请告诉我x为多少
function proofOfWork() {
    let data = 'luotuo';
    let x = 1
    while(true) {
        if(sha256(data+x).toString().substring(0,4) !== '0000'){
            x = x+1
        }else{
            console.log(sha256(data+x).toString());
            console.log(x);
            break;
        }
    }
}
proofOfWork()
