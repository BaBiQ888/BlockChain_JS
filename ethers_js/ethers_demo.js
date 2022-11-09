const ethers = require("ethers")
require("dotenv").config()

async function main() {
    // 将RPC与私钥存储在环境变量中
    // RPC节点连接，直接用alchemy即可
    let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
    // 新建钱包对象
    let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    // 返回这个地址已经发送过多少次交易
    const nonce = await wallet.getTransactionCount()
    // 构造raw TX
    tx = {
      nonce: nonce,
      gasPrice: 100000000000,
      gasLimit: 1000000,
      to: null,
      value: 0,
      data: "",
      chainId: 1, //也可以自动获取chainId = provider.getNetwork()
    }
    // 签名，其中过程见下面详述
    let resp = await wallet.signTransaction(tx)
  	console.log(resp)
    // 发送交易
    const sentTxResponse = await wallet.sendTransaction(tx);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

