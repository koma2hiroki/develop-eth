
非Etherumエンジニアのための、スマートコントラクト開発環境作成方法です。

_「コントラクト開発するわけではないけど、開発環境をローカルに立てたい・・・！」_

という方へのまとめ。


# 環境 for Mac

##### homebrew
MacOS用パッケージ管理ツールです。

##### nodebrew
node.jsのバージョン管理ツールです。

##### node
node.jsです。

##### npm
node.jsのパッケージ管理ツールです。

node.jsで必要なライブラリが簡単にインストール出来ます。

##### truffle
コントラクト開発のためのフレームワークです。

開発環境構築、ビルド/デプロイなどコントラクト開発のためのツールが詰まっています。

https://github.com/trufflesuite/truffle

巷の記事だと、「まずはgethをインストール」のような流れになっていますが、
現状(ver4.0.1)ではtruffleによってある程度の機能が提供されているのでgethをインストールする必要はありません。


# インストール

※ node.jsをインストールされている方は「truffle」のみインストールしてください。

##### homebrewインストール
```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

##### nodebrewインストール
```
$ brew install nodebrew
```

##### node.js最新版インストール
```
$ nodebrew install-binary latest
```

##### インストールしたnode.jsを有効化
```
# インストールしたnode.jsを確認する
$ nodebrew ls

# 表示されたバージョンを有効化
# ex) nodebrew use v1.0.0
$ nodebrew use {version}
```

##### node.jsインストールの確認

(npmはnode.jsと一緒にインストールされているようです)
```
# nodeのバージョン表示
$ node -v
# npmのバージョン表示
$ npm -v
```

##### truffleインストール
```
$ npm install -g truffle
```

##### truffleのインストール確認
```
$ truffle version
```


# 疎通確認

truffleを使ったコントラクト疎通確認の流れです。


### - プロジェクト構成

##### contract
コントラクト側プロジェクトです。truffleフレームワークを使用しています。

contract/contractsには「Sample.sol」があります。

こちらがSolidityで書かれた今回のソースファイルになります。

##### node.js
コントラクトをコールする側のプロジェクトです。

node.jsを使っています。


### - 確認方法

#### コントラクタ側

truffleをdevelopモードで立ち上げるとアカウントが勝手に10個作られます。
また、コントラクタ開発環境が「 http://localhost:9545/ 」で立ち上がります。

```
# コントラクトプロジェクトに移動
$ cd contract
# developモードで立ち上げ
$ truffle develop
Truffle Develop started at http://localhost:9545/

Accounts:
(0) 0x627306090abab3a6e1400e9345bc60c78a8bef51
(1) 0xf17f52151ebef6c7334fad080c5704d77216b732
(2) 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fea
(3) 0x821aea9a577a9b44299b9c15c88cf3087f3b5544
(4) 0x0d1d4e623d10f9fba5db95830f7d3839406c6af2
(5) 0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a24
(6) 0x2191ef87e392377ec08e7c08eb105ef5448eced3
(7) 0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b2
(8) 0x6330a553fc93768f612722bb8c2ec78ac90b3bbb
(9) 0x5aeda56215b167893e80b4fe645ba6d5bab767d4

Mnemonic: candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
```

次にtruffleのdevelopモードにてmigrateします。
(migrateは、イーサリアム環境にソースをアップするような認識でいます。。。本当はどうなんだろう)

```
truffle(develop)> migrate
Compiling ./contracts/Sample.sol...
Writing artifacts to ./build/contracts

Using network 'develop'.

Network up to date.
```

Solidityのコンパイルが走り「contract/build/contracts/Sample.json」が作られれば成功です。

Sample.jsonは, Sample.solのAPI仕様書(?)のようなものです。
こちらを見ればSampleコントラクトクラスがどのようなAPI形式になっているか分かるようです。


#### 呼び出し側

node.jsからコントラクタを呼び出します。

Sample.setterでコントラクタ側に「5」を代入し、Sample.getterから「5」を取り出すといった内容です。

※ コントラクタの「truffle develop」を起動したままにしておいてください。

##### コントラクタクライアントのweb3をインストール
```
# develop-eth/node.jsディレクトリに移動
$ cd node.js
# web3をインストール
$ npm install
```

##### アカウントの変更

index.jsの10行目のfromの文字列を「truffle develop」時に表示されたAccountsのいずれかに変更してください。
```
const from = "0x627306090abab3a6e1400e9345bc60c78a8bef51";
```

##### 起動/表示確認
```
$ node index.js
{ [String: '5'] s: 1, e: 0, c: [ 5 ] }
```
「c: [ 5 ]」となっていれば成功です。
