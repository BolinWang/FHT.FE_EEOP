webpackJsonp([40],{C0YM:function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,".container .el-upload--picture-card.uploadImage[data-v-28d365ae]{width:120px;height:90px;line-height:88px;display:inline-block}",""])},QmXh:function(e,t,a){var l=a("C0YM");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("8bSs")("76495f50",l,!0)},eSUc:function(e,t,a){var l=a("Alxp")(a("lzfC"),a("vaZO"),function(e){a("QmXh")},"data-v-28d365ae",null);e.exports=l.exports},lzfC:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("lC5x"),o=a.n(l),i=a("hRKE"),r=a.n(i),s=a("rVsN"),n=a.n(s),c=a("J0Oq"),m=a.n(c),p=a("IHPB"),u=a.n(p),d=a("TIfe"),b=a("E4LH"),f=a("H1GV"),v=a.n(f),g=a("fDDG"),y=a.n(g),F=a("0xDb"),C=a("Ao5+");t.default={components:{Preview:v.a,ImageCropper:y.a},data:function(){return{rules:{idNum:[{required:!0,trigger:"blur",validator:function(e,t,a){Object(b.d)(t)?a():a(new Error("请输入正确身份证号码"))}}],volumn:[{required:!0,trigger:"blur",validator:function(e,t,a){Object(b.a)(t)?a():a(new Error("请输入正整数"))}}]},text:"",accept:"image/png, image/jpeg, image/jpg",companyTableVisible:!1,personalTableVisible:!1,companyForm:{},cropperList:[],personalForm:{},key:null}},mounted:function(){},methods:{textCard:function(){return"33000000000000"!==this.text&&(null!==this.text&&""!==this.text)},closeDialog:function(e){this[e]=!1,Object(F.e)(this.companyForm)},submit:function(e){var t=this;this.$refs.ruleForm.validate(function(a){a&&Object(C.i)(t.companyForm).then(function(a){t[e]=!1,t.getData(),console.log("12"),console.log(a)})})},emitDelete:function(e,t){this.companyForm[t]=e},emitCropperList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];this.cropperList=e},emitCropperData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];e.forEach(function(e,t){e.type=1});var t=[].concat(u()(this.companyForm[this.key]),u()(e));this.companyForm[this.key]=t.map(function(e,t){return-1!==e.src.indexOf("data:image/jpeg;base64")?{src:e.src,tag:0}:{src:e.src,tag:1}})},uploadImg:function(e,t){var a=this;return m()(o.a.mark(function l(){var i,s,c,m;return o.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:if(e.target.value){l.next=3;break}return console.log("取消上传..."),l.abrupt("return",!1);case 3:i=[],s=function(e){return new n.a(function(l){var o=new FileReader;o.onerror=function(e){console.log("读取异常....")},o.onload=function(o){var i="object"===r()(o.target.result)?window.URL.createObjectURL(new Blob([o.target.result])):o.target.result,s="";if(s=e.name?e.name.split(".")[0].length<=30?e.name.split(".")[0]:e.name.split(".")[0].substr(0,30):"",console.log(a.companyForm[t].length),a.companyForm[t].length>2)return a.$message.error("您已上传"+a.companyForm[t].length+"张图片，最多还能上传"+(3-a.companyForm[t].length)+"张图片"),!1;l({img:i,imageName:s,type:1})},o.readAsArrayBuffer(e)})},c=e.target.files,m=0;case 7:if(!(m<c.length)){l.next=20;break}if(a.accept.includes(c[m].type)){l.next=12;break}return a.$message.error("请上传"+a.accept.replace(/image\//gi,"")+"的图片"),e.target.value=null,l.abrupt("return",!1);case 12:return l.t0=i,l.next=15,s(c[m]);case 15:l.t1=l.sent,l.t0.push.call(l.t0,l.t1);case 17:m++,l.next=7;break;case 20:a.cropperList=i.map(function(e,t){return{img:e.img,imageName:e.imageName,type:e.type}}),a.layer_cropper=!0,a.key=t,e.target.value=null;case 24:case"end":return l.stop()}},l,a)}))()},open:function(e){this.datalist=e,console.log(e),1===this.datalist.type?this.personalTableVisible=!0:this.companyTableVisible=!0,this.getData()},getData:function(){var e=this,t={sessionId:d.a,id:this.datalist.id};Object(C.k)(t).then(function(t){e.companyForm=t.data,e.text=e.companyForm.idNum})}}}},vaZO:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[e.companyTableVisible?a("el-dialog",{staticClass:"organEdit",attrs:{title:"飞虎队企业机构",width:"800px",visible:e.companyTableVisible},on:{"update:visible":function(t){e.companyTableVisible=t}}},[a("el-form",{ref:"ruleForm",attrs:{model:e.companyForm,inline:!0,rules:e.rules}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"企业名称"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.companyForm.companyName,callback:function(t){e.$set(e.companyForm,"companyName",t)},expression:"companyForm.companyName"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"企业法人"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.companyForm.legalPerson,callback:function(t){e.$set(e.companyForm,"legalPerson",t)},expression:"companyForm.legalPerson"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"社会统一信用代码"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.companyForm.unifiedSocialCreditCode,callback:function(t){e.$set(e.companyForm,"unifiedSocialCreditCode",t)},expression:"companyForm.unifiedSocialCreditCode"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"出房费率"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.companyForm.splitFee,callback:function(t){e.$set(e.companyForm,"splitFee",t)},expression:"companyForm.splitFee"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"企业联系人"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.companyForm.name,callback:function(t){e.$set(e.companyForm,"name",t)},expression:"companyForm.name"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"手机号码"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.companyForm.mobile,callback:function(t){e.$set(e.companyForm,"mobile",t)},expression:"companyForm.mobile"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"联系人身份证",prop:"idNum"}},[a("el-input",{attrs:{disabled:e.textCard()},model:{value:e.companyForm.idNum,callback:function(t){e.$set(e.companyForm,"idNum",t)},expression:"companyForm.idNum"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"房源体量",prop:"volumn"}},[a("el-input",{model:{value:e.companyForm.volumn,callback:function(t){e.$set(e.companyForm,"volumn",t)},expression:"companyForm.volumn"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"银行开户名"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.companyForm.accountName,callback:function(t){e.$set(e.companyForm,"accountName",t)},expression:"companyForm.accountName"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"银行卡号"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.companyForm.bankCardNum,callback:function(t){e.$set(e.companyForm,"bankCardNum",t)},expression:"companyForm.bankCardNum"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"平台代收租服务","label-width":"120px"}},[a("div",{staticClass:"previewItems"},[a("Preview",{attrs:{"pic-list":e.companyForm.proxyImageList,"delete-icon":"delete",disabled:""},on:{emitDelete:function(t){e.emitDelete(t,"proxyImageList")}}})],1),e._v(" "),a("label",{staticClass:"el-upload el-upload--picture-card uploadImage",attrs:{for:"uploadImages"}},[a("i",{staticClass:"el-icon-plus"}),e._v(" "),a("input",{attrs:{type:"file",id:"uploadImages",accept:e.accept,multiple:""},on:{change:function(t){e.uploadImg(t,"proxyImageList")}}})])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"房源发布和租客引流服务","label-width":"120px"}},[a("div",{staticClass:"previewItems"},[a("Preview",{attrs:{"pic-list":e.companyForm.attractionFlowImageList,"delete-icon":"delete",disabled:""},on:{emitDelete:function(t){e.emitDelete(t,"attractionFlowImageList")}}})],1),e._v(" "),a("label",{staticClass:"el-upload el-upload--picture-card uploadImage",attrs:{for:"uploadImageflow"}},[a("i",{staticClass:"el-icon-plus"}),e._v(" "),a("input",{attrs:{type:"file",id:"uploadImageflow",accept:e.accept,multiple:""},on:{change:function(t){e.uploadImg(t,"attractionFlowImageList")}}})])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"企业营业执照","label-width":"120px"}},[a("div",{staticClass:"previewItems"},[a("Preview",{attrs:{"pic-list":e.companyForm.businessLicenseImageList,"delete-icon":"delete",disabled:""},on:{emitDelete:function(t){e.emitDelete(t,"businessLicenseImageList")}}})],1),e._v(" "),a("label",{staticClass:"el-upload el-upload--picture-card uploadImage",attrs:{for:"uploadImagebusiness"}},[a("i",{staticClass:"el-icon-plus"}),e._v(" "),a("input",{attrs:{type:"file",id:"uploadImagebusiness",accept:e.accept,multiple:""},on:{change:function(t){e.uploadImg(t,"businessLicenseImageList")}}})])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"联系人身份证照片"}},[a("div",{staticClass:"previewItems"},[a("Preview",{attrs:{"pic-list":e.companyForm.idCardImageList,"delete-icon":"delete",disabled:""},on:{emitDelete:function(t){e.emitDelete(t,"idCardImageList")}}})],1),e._v(" "),a("label",{staticClass:"el-upload el-upload--picture-card uploadImage",attrs:{for:"uploadImageidCard"}},[a("i",{staticClass:"el-icon-plus"}),e._v(" "),a("input",{attrs:{type:"file",id:"uploadImageidCard",accept:e.accept,multiple:""},on:{change:function(t){e.uploadImg(t,"idCardImageList")}}})])])],1)],1)],1),e._v(" "),a("ImageCropper",{attrs:{cropperList:e.cropperList},on:{emitCropperList:e.emitCropperList,emitCropperData:e.emitCropperData}}),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.closeDialog("companyTableVisible")}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submit("companyTableVisible")}}},[e._v("确 定")])],1)],1):a("el-dialog",{staticClass:"organEdit",attrs:{title:"飞虎队个人机构",width:"800px",visible:e.personalTableVisible},on:{"update:visible":function(t){e.personalTableVisible=t}}},[a("el-form",{ref:"ruleForm",attrs:{model:e.companyForm,inline:!0,rules:e.rules}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"姓名"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.companyForm.name,callback:function(t){e.$set(e.companyForm,"name",t)},expression:"companyForm.name"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"手机号码"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.companyForm.mobile,callback:function(t){e.$set(e.companyForm,"mobile",t)},expression:"companyForm.mobile"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"身份证",prop:"idNum"}},[a("el-input",{attrs:{disabled:e.textCard()},model:{value:e.companyForm.idNum,callback:function(t){e.$set(e.companyForm,"idNum",t)},expression:"companyForm.idNum"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"出房费率"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.companyForm.splitFee,callback:function(t){e.$set(e.companyForm,"splitFee",t)},expression:"companyForm.splitFee"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"房源体量",prop:"volumn"}},[a("el-input",{model:{value:e.companyForm.volumn,callback:function(t){e.$set(e.companyForm,"volumn",t)},expression:"companyForm.volumn"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"银行开户名"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.companyForm.accountName,callback:function(t){e.$set(e.companyForm,"accountName",t)},expression:"companyForm.accountName"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"银行卡号"}},[a("el-input",{attrs:{disabled:!0},model:{value:e.companyForm.bankCardNum,callback:function(t){e.$set(e.companyForm,"bankCardNum",t)},expression:"companyForm.bankCardNum"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"平台代收租服务","label-width":"120px"}},[a("div",{staticClass:"previewItems"},[a("Preview",{attrs:{"pic-list":e.companyForm.proxyImageList,"delete-icon":"delete",disabled:""},on:{emitDelete:function(t){e.emitDelete(t,"proxyImageList")}}})],1),e._v(" "),a("label",{staticClass:"el-upload el-upload--picture-card uploadImage",attrs:{for:"uploadImagesper"}},[a("i",{staticClass:"el-icon-plus"}),e._v(" "),a("input",{attrs:{type:"file",id:"uploadImagesper",accept:e.accept,multiple:""},on:{change:function(t){e.uploadImg(t,"proxyImageList")}}})])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"房源发布和租客引流服务","label-width":"120px"}},[a("div",{staticClass:"previewItems"},[a("Preview",{attrs:{"pic-list":e.companyForm.attractionFlowImageList,"delete-icon":"delete",disabled:""},on:{emitDelete:function(t){e.emitDelete(t,"attractionFlowImageList")}}})],1),e._v(" "),a("label",{staticClass:"el-upload el-upload--picture-card uploadImage",attrs:{for:"uploadImagesflow"}},[a("i",{staticClass:"el-icon-plus"}),e._v(" "),a("input",{attrs:{type:"file",id:"uploadImagesflow",accept:e.accept,multiple:""},on:{change:function(t){e.uploadImg(t,"attractionFlowImageList")}}})])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"身份证照片","label-width":"120px"}},[a("div",{staticClass:"previewItems"},[a("Preview",{attrs:{"pic-list":e.companyForm.idCardImageList,"delete-icon":"delete",disabled:""},on:{emitDelete:function(t){e.emitDelete(t,"idCardImageList")}}})],1),e._v(" "),a("label",{staticClass:"el-upload el-upload--picture-card uploadImage",attrs:{for:"uploadImagesidCards"}},[a("i",{staticClass:"el-icon-plus"}),e._v(" "),a("input",{attrs:{type:"file",id:"uploadImagesidCards",accept:e.accept,multiple:""},on:{change:function(t){e.uploadImg(t,"idCardImageList")}}})])])],1)],1)],1),e._v(" "),a("ImageCropper",{attrs:{cropperList:e.cropperList},on:{emitCropperList:e.emitCropperList,emitCropperData:e.emitCropperData}}),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.closeDialog("personalTableVisible")}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submit("personalTableVisible")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]}}});