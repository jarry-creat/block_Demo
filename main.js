// block chain
//  block 里面存储1.data 2.自己的哈希值,3.之前区块的哈希值
// 自己的哈希值，是由存储在区块里面的信息(data + 之前区块的哈希值 )算出来的

// 定义一个区块的类
const sha256 = require('crypto-js/sha256')
class Block {
    constructor(data,previousHash){
        this.data = data
        this.previousHash = previousHash
        this.hash = this.computedHash()
    }

    computedHash() {
        return sha256(this.data+this.previousHash).toString()
    }
}

// 区块的链
// 生成祖先区块
class Chain {
    constructor() {
        this.chain = [this.bigBang()]
    }
    bigBang() {
        const genesisBlock = new Block('我是祖先','') 
        return genesisBlock
    }
    // 得到最近的一个区块
    getLatestBlock() {
        return this.chain[this.chain.length-1]
    }

    // 添加区块到区块链
    addBlockToChain(newBlock) {
        // data
        // 找到最近一个block的hash
        // 这个hash就是新区块的previousHash
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.computedHash()
        this.chain.push(newBlock)
    }
    // 验证这个当前的区块链是否合法
    // 当前的数据有没有被篡改
    // 我们要验证区块的previousHash  是否等于 previous区块的hash

    validateChain() {
        if(this.chain.length === 1){
            if(this.chain[0].hash !== this.chain[0].computedHash()){
                return false
            }
            return true
        }
        // 从第二个区块开始验证,验证到最后一个区块
        for(let i = 1 ; i <= this.chain.length -1 ; i++){
            const blockToValidate = this.chain[i]
            // 当前的数据有没有被篡改
            if(blockToValidate.hash !== blockToValidate.computedHash()) {
                console.log('数据篡改')
                return false
            }
            // 我们要验证区块的previousHash 是否等于 previous区块的hash
            const previousBlock = this.chain[i-1]
            if(blockToValidate.previousHash !== previousBlock.hash ){
                console.log('前后区块链断裂')
                return false
            }
        }
        return true
    }
}
const luotuoChain = new Chain()
console.log(luotuoChain.validateChain())
 
const block1 = new Block('转载十元','')
luotuoChain.addBlockToChain(block1)
const block2 = new Block('转载十个十元','')
luotuoChain.addBlockToChain(block2)
console.log(luotuoChain)
console.log(luotuoChain.validateChain())

// 尝试篡改这个区块链
