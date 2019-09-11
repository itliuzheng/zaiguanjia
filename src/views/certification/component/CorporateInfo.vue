<template>
  <div ref="initform">

    <!--企业信息录入-->
    <div v-show="entry_active == 0" class="tab">
      <h3>企业信息录入</h3>
      <el-form
        ref="info0"
        :rules="infoRule"  class="width-554" label-position="right" label-width="180px" :model="info">

        <el-form-item label="贷款金额（元）" prop="loanAmount">
          <el-input v-model.number="info.loanAmount" placeholder="请输入贷款金额"></el-input>
        </el-form-item>
        <el-form-item label="贷款期限（月）" prop="loanTerm"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'blur'
          }" >
          <el-input v-model="info.loanTerm" placeholder="请输入贷款期限"></el-input>
        </el-form-item>
        <el-form-item label="贷款用途" prop="loanUsage"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'blur'
          }" >
          <el-input v-model="info.loanUsage" placeholder="请输入贷款用途"></el-input>
        </el-form-item>
        <el-form-item label="企业全称">
          <p>{{info.companyName}}</p>
        </el-form-item>
        <el-form-item label="统一社会信用代码" prop="socialCreditCode"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'blur'
          }" >
          <el-input v-model="info.socialCreditCode" placeholder="请输入企业的统一社会信用代码"></el-input>
        </el-form-item>
        <el-form-item label="成立日期" prop="establishmentDate"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'change'
          }" >
          <el-date-picker v-model="info.establishmentDate" placeholder="请选择企业的成立日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="申请人同是法人" prop="applicantIsLegal"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'change'
          }" >
          <el-select v-model="info.applicantIsLegal" placeholder="请选择">
            <el-option label="是" :value="1" ></el-option>
            <el-option label="否" :value="0" ></el-option>
          </el-select>
        </el-form-item>
        <template v-if="info.applicantIsLegal == 0">
          <el-form-item label="法人姓名" prop="legalPerson"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'blur'
            }" >
            <el-input v-model="info.legalPerson" placeholder="请输入企业的法定代表人"></el-input>
          </el-form-item>
          <el-form-item label="法人身份证号" prop="legalIdCard" >
            <el-input v-model="info.legalIdCard" placeholder="请输入法人的身份证号"></el-input>
          </el-form-item>
          <el-form-item label="法人手机号" prop="legalContactNumber">
            <el-input v-model="info.legalContactNumber" placeholder="请输入法人的手机号"></el-input>
          </el-form-item>
        </template>

        <el-form-item label="公司年销售额（元）" prop="annualSales"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'blur'
          }" >
          <el-input v-model="info.annualSales" placeholder="请输入企业的公司年销售额"></el-input>
        </el-form-item>
        <el-form-item label="公司员工数" prop="employeeNumber">
          <el-input v-model="info.employeeNumber" placeholder="请输入企业的公司员工数"></el-input>
        </el-form-item>
        <el-form-item label="经营地址" prop="companyAddress">
          <el-input v-model="info.companyAddress" placeholder="请输入企业的经营地址"></el-input>
        </el-form-item>
        <el-form-item label="车辆主要停放地址" prop="carAddress">
          <el-input v-model="info.carAddress" placeholder="请输入企业的车辆主要停放地址"></el-input>
        </el-form-item>
        <el-form-item label="营业执照上传" prop="businessLicenseUrl"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'blur'
          }" >
          <div class="clearfix">
            <div class="upload-inline fl">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                name="businessLicenseUrl"
                :show-file-list="false"
                :http-request="uploadHttp"
                >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>

              <img  v-if="info.businessLicenseUrl" :src="info.businessLicenseUrl" class="avatar">
            </div>
            <div class="fr instance">
              <p class="title instance-title">示例：</p>
              <img :src="instanceUrl" alt="">
              <p class="instance-title">详细要求</p>
              <ol>
                <li>营业执照原件；</li>
                <li>证件信息清晰无遮挡；</li>
                <li>证件边框花纹完整。</li>
              </ol>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="道路运输许可证" prop="roadTransportPermitUrl"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'blur'
          }" >
          <div class="clearfix">
            <div class="upload-inline fl">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                name="roadTransportPermitUrl"
                :show-file-list="false"
                :http-request="uploadHttp"
                >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>

              <img  v-if="info.roadTransportPermitUrl" :src="info.roadTransportPermitUrl" class="avatar">
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!--申请人信息录入-->
    <div v-show="entry_active == 1" class="tab">
      <h3>申请人信息录入</h3>

      <el-form ref="info1" :rules="infoRule"  class="width-554" label-position="right" label-width="180px" :model="info">

        <el-form-item label="申请人姓名" prop="authorizedName"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'blur'
          }" >
          <el-input v-model="info.authorizedName" placeholder="请输入申请人的姓名"></el-input>
        </el-form-item>
        <el-form-item label="申请人身份证号" prop="authorizedIdCard" >
          <el-input v-model="info.authorizedIdCard" placeholder="请输入申请人的身份证号"></el-input>
        </el-form-item>
        <el-form-item label="申请人手机号" prop="authorizedContactNumber"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'blur'
          }" >
          <el-input v-model="info.authorizedContactNumber" placeholder="请输入申请人的手机号"></el-input>
        </el-form-item>
        <el-form-item label="申请人银行卡号" prop="authorizedBankAccount"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'blur'
          }" >
          <el-input v-model="info.authorizedBankAccount" placeholder="请输入申请人的银行卡号"></el-input>
        </el-form-item>
        <el-form-item label="申请人银行卡预留手机号" prop="authorizedBankMobile"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'blur'
          }" >
          <el-input v-model="info.authorizedBankMobile" placeholder="请输入预留手机号"></el-input>
        </el-form-item>
        <el-form-item label="婚姻状况" prop="maritalStatus"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'change'
          }" >
          <el-select v-model="info.maritalStatus" placeholder="请选择">
            <el-option label="已婚" :value="2" ></el-option>
            <el-option label="未婚" :value="1" ></el-option>
            <el-option label="其他" :value="0" ></el-option>
          </el-select>
        </el-form-item>
        <div v-if="info.maritalStatus == 2">
          <el-form-item label="配偶姓名" prop="spouseName"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'blur'
            }" >
            <el-input v-model="info.spouseName" placeholder="请输入配偶姓名"></el-input>
          </el-form-item>
          <el-form-item label="配偶身份证号" prop="spouseIdCard"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'blur'
            }" >
            <el-input v-model="info.spouseIdCard" placeholder="请输入配偶身份证号"></el-input>
          </el-form-item>
          <el-form-item label="配偶手机号" prop="spouseMobile"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'blur'
            }" >
            <el-input v-model="info.spouseMobile" placeholder="请输入配偶手机号"></el-input>
          </el-form-item>
          <el-form-item label="子女个数" prop="childrenNumber"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'blur'
            }" >
            <el-input v-model="info.childrenNumber" placeholder="请输入子女个数"></el-input>
          </el-form-item>

        </div>
        <el-form-item label="学历" prop="education"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'change'
          }" >
          <el-select v-model="info.education" placeholder="请选择">
            <el-option :label="list.label" :value="list.value" v-for="list in educationList" :key="list.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="当前从事行业年限" prop="industryYears"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'blur'
          }" >
          <el-input v-model="info.industryYears" placeholder="请输入当前从事行业年限"></el-input>
        </el-form-item>
        <el-form-item label="住宅性质" prop="residentialNature"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'change'
          }" >
          <el-select v-model="info.residentialNature" placeholder="请选择">
            <el-option :label="list.label" :value="list.value" v-for="list in residentialList" :key="list.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="住宅地址" prop="residentialAddress"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'blur'
          }" >
          <el-input v-model="info.residentialAddress" placeholder="请输入住宅地址"></el-input>
        </el-form-item>
        <el-form-item label="申请人身份证照片"  prop="authorizedIdCardFontUrl"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'change'
          }" >
          <div class="clearfix">
            <div class="fl">

              <div class="upload-inline fl">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  name="authorizedIdCardFontUrl"
                  :show-file-list="false"
                  :http-request="uploadHttp"
                  >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <img  v-if="info.authorizedIdCardFontUrl" :src="info.authorizedIdCardFontUrl" class="avatar">
              </div>
              <p class="blue">身份证正面照片</p>
              <div class="upload-inline fl">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  name="authorizedIdCardBackUrl"
                  :show-file-list="false"
                  :http-request="uploadHttp"
                  >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <img  v-if="info.authorizedIdCardBackUrl" :src="info.authorizedIdCardBackUrl" class="avatar">
              </div>
              <p class="blue">身份证反面照片</p>
            </div>
            <div class="fr instance">
              <p class="title instance-title">示例：</p>
              <img :src="photoUrl" alt="">
              <p class="instance-title">详细要求</p>
              <ol>
                <li>身份证原件；</li>
                <li>证件信息清晰无遮挡；</li>
                <li>身份证边线完整。</li>
              </ol>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="申请人征信报告">
          <div class="clearfix">
            <div class="upload-inline fl">
              <el-upload
                class="avatar-uploader"
                ref="upload2"
                name="authorizedCreditUrl"
                action="https://jsonplaceholder.typicode.com/posts/"
                :multiple="true"
                :on-remove="handleRemove"
                :http-request="uploadHttps">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('upload2')">点击上传</el-button>-->
              </el-upload>
              <!--<img  v-if="info.legalCreditUrl" :src="info.legalCreditUrl" class="avatar">-->
            </div>
          </div>
        </el-form-item>
        <el-form-item label="配偶征信报告"  v-if="info.maritalStatus == 2 && info.loanAmount >= 200000">
          <div class="clearfix">
            <div class="upload-inline fl">
              <el-upload
                class="avatar-uploader"
                ref="upload3"
                name="authorizedSpouseCreditUrl"
                action="https://jsonplaceholder.typicode.com/posts/"
                :multiple="true"
                :on-remove="handleRemoveSpouse"
                :http-request="uploadHttps">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('upload3')">点击上传</el-button>-->
              </el-upload>
              <!--<img  v-if="info.legalCreditUrl" :src="info.legalCreditUrl" class="avatar">-->
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!--联系人信息录入-->
    <div v-show="entry_active == 2"  class="tab">
      <h3>联系人信息录入</h3>
      <el-form
        ref="info2"
        :rules="infoRule"  class="width-554" label-position="right" label-width="180px" :model="info">

        <div v-for="(list,index) in info.contactInfo">
          <el-form-item :label="list.label" :prop="'contactInfo.'+index+'.position'"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'blur'
            }" >
            <el-input v-model="list.position" :placeholder="'请输入'+list.label"></el-input>
          </el-form-item>

          <el-form-item label="姓名" :prop="'contactInfo.'+index+'.name'"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'blur'
            }" >
            <el-input v-model="list.name" placeholder="请输入姓名"></el-input>
          </el-form-item>

          <el-form-item label="联系电话" :prop="'contactInfo.'+index+'.mobile'"
            :rules="{
              required: true, message: '此项不能为空', trigger: 'blur'
            }" >
            <el-input v-model="list.mobile" placeholder="请输入联系电话"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!--增信信息录入-->
    <div v-show="entry_active == 3"  class="tab">
      <h3 class="h3-trust">增信信息录入<span>（选填）</span></h3>
      <p class="remark">注：填写以下信息有助于提升额度</p>

      <el-form class="width-554"
        ref="info3"
        :rules="infoRule" label-position="right" label-width="180px" :model="info">

        <el-form-item label="上传银行流水">
          <div class="clearfix">
            <div class="upload-inline fl upload-150">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                name="bankFlowUrl"
                :show-file-list="false"
                :on-change="fileChange"
                :http-request="uploadHttpFile"
                >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>

              <img   v-if="is_excel" :src="require('@/images/excel.jpg')" class="avatar">
              <div v-else>
                <img   v-if="info.bankFlowUrl" :src="info.bankFlowUrl" class="avatar">
              </div>
            </div>
            <div class="fr instance">
              <p class="title trust-title">注：银行流水，近一年的纸质版银行流水拍照或网银银行流水的Execl电子表格版本（该账户需反映主营业务往来，个人或企业账户均可）</p>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="上传房产证" >
          <div class="clearfix">
            <div class="upload-inline upload-150">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                name="realEstateCertificateUrl"
                :show-file-list="false"
                :http-request="uploadHttp"
                >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <img   v-if="info.realEstateCertificateUrl" :src="info.realEstateCertificateUrl" class="avatar">
            </div>
          </div>
        </el-form-item>
        <el-form-item label="上传行驶证">
          <div class="clearfix">
            <div class="upload-inline upload-150">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                name="drivingLicenseUrl"
                :show-file-list="false"
                :http-request="uploadHttp"
                >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>

              <img  v-if="info.drivingLicenseUrl" :src="info.drivingLicenseUrl" class="avatar">
            </div>
          </div>
        </el-form-item>

        <el-form-item label="上年销售总额（元）" >
          <el-input v-model="info.previousYearTotalSale" placeholder="请输入上年销售总额"></el-input>
        </el-form-item>
        <el-form-item label="上年销售净利润（元）" >
          <el-input v-model="info.previousYearNetProfitSale" placeholder="请输入上年销售净利润"></el-input>
        </el-form-item>

      </el-form>
    </div>

    <!--<div class="section" v-if="title=='edit'">-->
    <div class="section">
      <el-button type="primary" @click="nexStep(entry_active)" >提交</el-button>
    </div>
  </div>

</template>
<script>
  import ajax from '@/utils/ajax'
  import tool from '@/components/component/tool'

  export default {
    props:['title','entry_active'],
    data(){
      const validatePhoneNum = (rule, value, callback)=> {
        let validate = tool.validatePhoneNum(value);
        if(!validate.boolean){
          callback(new Error(validate.msg));
        }else{
          callback();
        }
      };
      const validateIdCard = (rule, value, callback)=> {
        let validate = tool.validateIdCard(value);
        if(!validate.boolean){
          callback(new Error(validate.msg));
        }else{
          callback();
        }
      };
      const validateNumber = (rule, value, callback)=> {
        let validate = tool.validateNumber(value);
        if(!validate.boolean){
          callback(new Error(validate.msg));
        }else{
          callback();
        }
      };
      return {
        info:{
          contactInfo:[
            {"label":"财务联系人职务","position":"","name":"","mobile":"","contactType":1},
            {"label":"TMS使用人职务","position":"","name":"","mobile":"","contactType":2}
          ]
        },
        api:'/corporate/financing-company-info/',
        instanceUrl:require("../../../images/instance.png"),
        photoUrl:require("../../../images/user.png"),
        shouchiUrl:require("../../../images/shouchi.png"),
        infoRule:{
          legalIdCard:[
            {required: true, message: '此项不能为空', trigger: 'blur',},
            {validator:validateIdCard, trigger: 'blur',}
          ],
          authorizedIdCard:[
            {required: true, message: '此项不能为空', trigger: 'blur',},
            {validator:validateIdCard, trigger: 'blur',}
          ],
          legalContactNumber:[
            {required: true, message: '此项不能为空', trigger: 'blur',},
            {validator:validatePhoneNum, trigger: 'blur',}
          ],
          authorizedContactNumber:[
            {required: true, message: '此项不能为空', trigger: 'blur',},
            {validator:validatePhoneNum, trigger: 'blur',}
          ],
          loanAmount:[
            {required: true, message: '此项不能为空', trigger: 'blur',},
            {validator:validateNumber, trigger: 'blur',}
          ],
        },
        educationList:[
          {
            value:1,
            label:'初中及以下'
          },
          {
            value:2,
            label:'高中'
          },
          {
            value:3,
            label:'大专'
          },
          {
            value:4,
            label:'本科'
          },
          {
            value:5,
            label:'硕士及以上'
          },
        ],
        residentialList:[
          {
            value:1,
            label:'自购无贷款'
          },
          {
            value:2,
            label:'自购有贷款'
          },
          {
            value:3,
            label:'租赁'
          },
          {
            value:4,
            label:'农村自建房'
          },
        ],
        authorizedCreditUrlList:[],
        authorizedSpouseCreditUrlList:[],
        is_excel:false,




      }
    },
    beforeMount(){
      var _this = this;

      setTimeout(function () {
        _this.getUserName();
      },10);
      this.entry_active = 1;
    },
    methods: {

      getUserName:function () {
        let url = `/user/companyName`;
        var _this = this;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'get',
          }).then(function (res) {
            let data = res.data;
            // _this.info.companyName = data;
            _this.$set(_this.info,'companyName',data);

          }).catch(error => {
            reject(error)
          })
         })
      },
      fileChange(file, fileList){
        if(file.raw.name.indexOf('.xlsx') != -1 || file.raw.name.indexOf('xls')!= -1){
          this.is_excel = true;
        }
      },
      uploadHttpFile(data){
        let name = data.filename;
        var _this = this;

        let formData = new FormData();
        formData.append('img', data.file);

        new Promise((resolve,reject) => {
          ajax.post(`${_this.api}upload`,formData,
            { 'Content-Type': 'multipart/form-data'}).
          then(function (res) {
            let data = res.data;
            if(data.code == 1){
              _this.$message({
                type: 'success',
                message: '上传成功'
              });

              _this.$set(_this.info,name,data.data);

              _this.$forceUpdate()
            }else{
            _this.$message.error(data.msg);
          }
          }).catch(error => {
            reject(error)
          })
        })
      },
      uploadHttp(data){
        let id = this.uploadId || 1;
        let name = data.filename;
        var _this = this;

        let formData = new FormData();
        formData.append('img', data.file);

        new Promise((resolve,reject) => {
          ajax.post(`${_this.api}upload`,formData,{ 'Content-Type': 'multipart/form-data'}).then(function (res) {
            let data = res.data;
            if(data.code == 1){
              _this.$message({
                type: 'success',
                message: '上传成功'
              });

              _this.$set(_this.info,name,data.data);

              _this.$forceUpdate()
            }else{
            _this.$message.error(data.msg);
          }
          }).catch(error => {
            reject(error)
          })
        })
      },
      uploadHttps(data,fileList){
        let _this = this;
        let name = data.filename;

        let formData = new FormData();
        formData.append('img', data.file);
        new Promise((resolve,reject) => {
          ajax.post(`${_this.api}upload-v2`,formData, { 'Content-Type': 'multipart/form-data'}).
          then(function (res) {
            let data = res.data;
            if(data.code == 1){
              _this.$message({
                type: 'success',
                message: '上传成功'
              });

              let src = '';

              if(!_this.info[name]){
                src = data.data.url;
              }else{
                src += _this.info[name] + ','+data.data.url;
              }

              _this.$set(_this.info,name,src);

              _this.$forceUpdate()
            }else{
            _this.$message.error(data.msg);
          }
          }).catch(error => {
            reject(error)
          })
        })
      },
      handleRemove(file, fileList) {

        let arr = this.info.authorizedCreditUrl.split(',');
        let url = null;
        let index = 0;
        arr.forEach((value,i)=>{
          if(value.name == file.name){
            url = value.url;
            index = i;
          }
        });

       let UrlList =  this.info.authorizedCreditUrl.split(',');
       UrlList.splice(index,1);

       this.info.authorizedCreditUrl = UrlList.join(',');
       this.authorizedCreditUrlList = UrlList;


      },
      handleRemoveSpouse(file, fileList) {

        let arr = this.info.authorizedSpouseCreditUrl.split(',');
        let url = null;
        let index = 0;
        arr.forEach((value,i)=>{
          if(value.name == file.name){
            url = value.url;
            index = i;
          }
        });

       let UrlList =  this.info.authorizedSpouseCreditUrl.split(',');
       UrlList.splice(index,1);

       this.info.authorizedSpouseCreditUrl = UrlList.join(',');
       this.authorizedSpouseCreditUrlList = UrlList;


      },
      submitUpload(type) {
        this.$refs[type].submit();
      },
      validate3(){
        let _this = this;
        _this.addIncreaseTrust();
      },
      validate2(){
        let _this = this;
        this.$refs.info2.validate((value)=>{
          if(value) {
            _this.addContactInfo();
          }
        });
      },
      validate1(){
        let _this = this;
        this.$refs.info1.validate((value)=>{
          if(value) {

            if(!this.info.authorizedCreditUrl){
              this.$message.error('申请人征信未上传');
              return false;
            }
            if(this.info.maritalStatus == 2){
              // if(!this.info.authorizedSpouseCreditUrl){
              //   this.$message.error('申请人配偶征信未上传');
              //   return false;
              // }
              if(this.info.loanAmount >= 200000){
                if(!this.info.authorizedSpouseCreditUrl){
                  this.$message.error('申请人配偶征信未上传');
                  return false;
                }
              }
            }
            _this.addAuthorizedInfo();
          }
        });
      },
      validate0(){
        let _this = this;
        this.$refs.info0.validate((value)=>{
          if(value) {

            if(!this.info.businessLicenseUrl){
              this.$message.error('企业征信未上传');
              return false;
            }
            if(!this.info.roadTransportPermitUrl){
              this.$message.error('道路运输许可证未上传');
              return false;
            }

            _this.addCompanyInfo();
          }
        });
      },
      emitValue(){
        this.$emit('onChangeValue',this.entry_active,this.info);
      },
      addCompanyInfo(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        let url = `${this.api}add-company-info`;
        var _this = this;

        console.log(_this.info);

        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:_this.info
          }).then(function (res) {
            loading.close();
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                _this.$message.success(data.msg);
                _this.emitValue();
              }
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      addAuthorizedInfo(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        let url = `${this.api}add-authorized-info`;
        var _this = this;
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:_this.info
          }).then(function (res) {
            loading.close();
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                _this.$message.success(data.msg);
                _this.emitValue();
              }
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      addContactInfo(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        let url = `${this.api}add-contact-info`;
        var _this = this;
        console.log(_this.info);
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:_this.info.contactInfo
          }).then(function (res) {
            loading.close();
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                _this.$message.success(data.msg);
                _this.emitValue();
              }
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      addIncreaseTrust(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        let url = `${this.api}add-increase-trust`;
        var _this = this;
        console.log(_this.info);
        new Promise((resolve,reject) => {
          ajax({
            url:url,
            method:'post',
            data:_this.info
          }).then(function (res) {
            loading.close();
            let data = res.data;
            if(data.code == 1){
              if(data.data){
                _this.$message.success(data.msg);
                _this.$router.go(0);
              }
            }else{
              _this.$message.error(data.msg);
            }

          }).catch(error => {
            reject(error)
          })
         })
      },
      nexStep(){
        let _this = this;
        _this[`validate${_this.entry_active}`]();

        document.documentElement.scrollTop = 150;
      },
    },
    mounted(){
    }
  }
</script>
<style lang="scss">

  .tab{
    .el-date-editor.el-input,.el-select{
      width: 100%;
    }
  }
</style>
<style scoped lang="scss">
  $red : #ff4c4c;
  .tab{
    margin-bottom: 45px;
    h3{
      text-align: left;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      color: #333;
      border-bottom: 1px solid #dddddd;
      margin-bottom: 40px;
      span{
        color: #1986f6;
      }
    }
    .h3-trust{
      margin-bottom: 18px;
    }
    .remark{
      color: #1986f6;
      font-size: 12px;
      text-align: left;
    }
    .width-554{
      width: 600px;
      margin: 0 auto;
    }
  }
  .section{
    margin-top: 45px;
    padding-bottom: 30px;
    button{
      width: 300px;
      background: linear-gradient(120deg, #7ab5f4 35%, #4b81f2 65%);
    }
  }
  .upload-inline{
    width: 240px;
    height: 300px;
    border: 1px solid #3e8ae5;
    background: #f5faff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    position: relative;
    button{
      margin-top: 133px;
      position: relative;
      z-index: 2;
    }
    img{
      z-index: 1;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
  .upload-150{
    height: 150px;
    border: 1px solid #3e8ae5;
    background: #f5faff;
    button{
      position: absolute;
      margin: 0;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%,-50%);
      -moz-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
      -o-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);
    }
  }
  .instance{
    width: 150px;
    text-align: left;
    img{
      height: 157px;
    }
    .title{
      line-height: 1;
      margin-bottom: 10px;
    }
    .instance-title{
      font-size: 14px;
      color: #999;
    }
    .trust-title{
      font-size: 12px;
      color: #666;
      line-height: 20px;
    }
    ol{
      padding-left: 15px;
      li{
        font-size: 12px;
        color: #999;
        white-space: nowrap;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        line-height: 1.5;
      }
    }
  }
</style>
