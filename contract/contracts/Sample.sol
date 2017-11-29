pragma solidity ^0.4.17;

contract Sample {
  int num;

  function setter(int _num) public {
    num = _num;
  }

  function getter() public constant returns(int){
    return num;
  }
}
