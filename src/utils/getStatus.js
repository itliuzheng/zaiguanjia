const userType = {
  2:'融资企业端',
  3:'金融机构端',
  4:'监管方端',
};

//1-机审中	2-机审驳回	3-机审拒绝	5-待匹配/等价机审通过	6-待审批，融资企业叫 认证中	7-审批拒绝	8-通过  99 授信已经到期    100 监管方授信已终止
const GET_STATUS = {
  MACHINE_AUDIT:1,    //机审中
  MACHINE_APPLICATION_REJECTION:2,    //机审驳回
  MACHINE_AUDIT_REJECTION:3,    //机审拒绝
  MACHINE_AUDIT_SUCCESS:4,    //机审通过(流转过来后，就变成待[待匹配|待审批])
  TO_BE_MATCHED:5,    //待匹配/等价机审通过
  PENDING:6,    //待审批，融资企业叫 认证中
  APPROVAL_REJECTION:7,    //审批拒绝
  APPROVAL_SUCCESS:8,    //审批通过
  CREDIT_EXPIRED:99,    //授信已经到期
  REGULATOR_CREDIT_END:100,    //授信已终止
}

export default GET_STATUS
