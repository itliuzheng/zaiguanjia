const GET_VERIFY =
        {
        MACHINE_AUDIT:1,    //机审中
        MACHINE_APPLICATION_REJECTION:2,    //机审驳回
        MACHINE_AUDIT_REJECTION:3,    //机审拒绝
        MACHINE_AUDIT_SUCCESS:4,    //机审通过(流转过来后，就变成待[待匹配|待审批])
        TO_BE_MATCHED:5,    //待匹配/等价机审通过
        PENDING:6,    //待审批，融资企业叫 认证中
        APPROVAL_REJECTION:7,    //审批拒绝
        APPROVAL_SUCCESS:8,    //审批通过
        CREDIT_EXPIRED:80003,    //授信已经到期
        REGULATOR_CREDIT_END:800021,    //授信已终止
        VERIFY_SUCCESS:88888,
        AMOUNT_NOT_EXIST: 80001,	//未授信
        CORPORATE_INFORMATION_IS_NOT_CERTIFIED: 80006, //企业信息未认证

        CONTRACT_NO_COMPLETE: 90002,   //合同签订未完成
        PRODUCT_NOT_EXIT: 800010, //产品信息不存在
        PRODUCT_NOT_ENABLED: 800011, //产品信息未启用
        CORPORATE_INFORMATION_IS_IN_CERTIFIED: 800061, //企业信息认证中
        CORPORATE_INFORMATION_IS_IN_APPROVAL: 800071, //企业信息审批中
          }

export default GET_VERIFY

// CORPORATE_INFORMATION_IS_IN_CERTIFIED  800061  企业信息认证中
// CORPORATE_INFORMATION_IS_IN_APPROVAL 800071  企业信息审批中
