const { ethers } = require("hardhat")

// 对要签名的参数进行编码
function getMessageBytes(account, tokenId) {
    // 对应solidity的Keccak256
    const messageHash = ethers.utils.solidityKeccak256(["address", "uint256"], [account, tokenId])
    console.log("Message Hash: ", messageHash)
  	// 由于 ethers 库的要求，需要先对哈希值数组化
    const messageBytes = ethers.utils.arrayify(messageHash)
    console.log("messageBytes: ", messageBytes)
  	// 返回数组化的hash
    return messageBytes
}

// 返回签名
async function getSignature(signer, account, tokenId) {
    const messageBytes = getMessageBytes(account, tokenId)
    // 对数组化hash进行签名，自动添加"\x19Ethereum Signed Message:\n32"并进行签名
    const signature = await signer.signMessage(messageBytes)
    console.log("Signature: ", signature)
}

async function main() {
    signers = await ethers.getSigners()
    // 我们将accounts[0]作为deployer和signer，account[1]、account[2]、account[3]作为白名单地址
    for (let index = 1; index < 4; index++) {
        await getSignature(signers[0], signers[index].address, index)
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

