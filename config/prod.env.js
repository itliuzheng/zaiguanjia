'use strict'
var buildtype = process.argv.slice(2)[0];

var obj = {
  NODE_ENV: '"production"',
  BASE_API:'"http://119.147.171.108/logisticsFinance"'
}

switch(buildtype){
  case 'pro'://生产
    process.argv.srconfig = 'pro';
    obj.srconfig = '"pro"';
    break;
  case 'test'://测试
    process.argv.srconfig = 'test';
    obj.srconfig = '"test"';
    obj.BASE_API = '"http://119.147.171.111:81/logisticsFinance"';
    break;
  default://默认
    process.argv.srconfig = 'pro';
    obj.srconfig = '"pro"';
    break;
}
console.log('---------start build ---------'+buildtype);
console.log('---------start build ---------'+obj.NODE_ENV);

module.exports = obj
