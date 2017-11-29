
// web3モジュールを読み込み
var Web3 = require('web3');
var web3 = new Web3();

// 起動しているtruffle developに接続
web3.setProvider(new web3.providers.HttpProvider('http://localhost:9545/'));

// TODO 「truffle develop」時に表示されたAccountsのいずれかを記載する
const from = "0x627306090abab3a6e1400e9345bc60c78a8bef51";

try {
    // Sampleコントラクタクラスの情報を読み込み
  const sampleJson = require('../contract/build/contracts/Sample.json');

  // ABIと呼ばれる「API仕様書のようなもの」を指定
  const abi = web3.eth.contract(sampleJson.abi);
  // コントラクトのアドレスを指定して,contractクラスを生成する
  // 引数には,Sample.jsonのnetworks.addressを指定する
  const contract = abi.at(sampleJson.networks[4447].address);

  // Sample.setterを呼び,contract側のnumに5を入れる
  contract.setter(5, {from:from} , function(err, result){
    if (err) {
      console.log("ERROR:", err);
      return;
    }

    // Sample.getterを呼び,contract側のnumを確認する
    // 返却値.cに返却値が入っている
    //   ex)  { [String: '5'] s: 1, e: 0, c: [ 5 ] }
    console.log(contract.getter());
  });

} catch(e) {
  console.error(e);
}
