<template>
    <div class="product-list">
        <!--       这是头部-->
        <el-form :inline="true" :model="queryTableData" class="demo-form-inline" ref="formRef">
            <el-form-item label="预留手机号">
                <el-input v-model="queryTableData.phoneNo" placeholder="请输入预留手机号"></el-input>
            </el-form-item>
            <el-form-item label="平台订单号">
                <el-input v-model="queryTableData.sourceOrderId" placeholder="请输入平台订单号"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="queryTableData.userName" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="银行卡号">
                <el-input v-model="queryTableData.bankNo" placeholder="请输入银行卡号"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
                <el-input v-model="queryTableData.idCard" placeholder="请输入身份证号"></el-input>
            </el-form-item>
            <el-form-item label="推荐单号">
              <el-input v-model="queryTableData.taskInstanceId" placeholder="请输入推荐单号"></el-input>
            </el-form-item>
            <el-form-item label="用户Id">
              <el-input v-model="queryTableData.userId" placeholder="请输入用户Id"></el-input>
            </el-form-item>
            <el-form-item label="注册手机号">
              <el-input v-model="queryTableData.registerPhoneNo" placeholder="请输入手机号"></el-input>
            </el-form-item>
<!--            <el-form-item label="APP名称">-->
<!--                <el-select v-model="queryTableData.appName" placeholder="请选择APP名称" :clearable="true">-->
<!--                    <el-option :label="item.appName" :value="item.appCode" v-for="(item ,index) in appNameList" :key="index"></el-option>-->
<!--                </el-select>-->
<!--            </el-form-item>-->
            <el-form-item label="资方名称">
                <el-select v-model="queryTableData.taskName" placeholder="请选择资方名称">
                  <el-option
                    v-for="(item,index) in productList"
                    :key="index"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
                </el-select>
            </el-form-item>
            <el-form-item label="创建时间" prop="time" :rules="[{required: true, message: '创建时间必填'}]">
                <el-date-picker
                        v-model="queryTableData.time"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="timestamp"
                        :default-time="['00:00:00']">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="handleQuery('formRef')">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-setting" @click="handleReset">重置</el-button>
            </el-form-item>
        </el-form>
        <!--        这是表格-->
        <el-table
                :data="tableData"
                style="width: 100%"
                border
                stripe
                :row-class-name="tableRowClassName"
                v-loading="tableLoading"
        >
            <el-table-column
                    prop="taskInstanceId"
                    label="订单号"
                    width="320">
            </el-table-column>
            <el-table-column
                    prop="sourceOrderId"
                    label="平台订单号"
                    width="220">
            </el-table-column>
            <el-table-column
                    prop="realName"
                    label="姓名"
                    width="140">
                <template slot-scope="scope">{{scope.row.realName | noPassByName}}</template>
            </el-table-column>
            <el-table-column
                    prop="appName"
                    label="APP名称"
                    width="140">
            </el-table-column>
            <el-table-column
                    prop="productName"
                    label="资方名称"
                    width="140">
            </el-table-column>
            <el-table-column
                    prop="borrowAmount"
                    label="借款金额"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="periods"
                    label="借款期限"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="loanState"
                    label="借款状态"
                    width="260">
            </el-table-column>
            <el-table-column
                    label="放款时间"
                    width="200">
                <template slot-scope="scope">{{scope.row.loanTime | dateTimeFormat}}</template>
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
                <template slot-scope="scope">
                    <el-button
                            icon="el-icon-view"
                            size="mini"
                            type="primary"
                            @click="handleLook(scope.$index, scope.row)">订单详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--        这是分页器-->
<!--        <el-pagination-->
<!--                @size-change="handleSizeChange"-->
<!--                @current-change="handleCurrentChange"-->
<!--                :current-page=pagination.currentPage-->
<!--                :page-sizes="[10, 20, 30, 40]"-->
<!--                :page-size="pagination.pageSize"-->
<!--                layout="total, sizes, prev, pager, next, jumper"-->
<!--                :total="pagination.total"-->
<!--                style="padding:20px 0"-->
<!--        >-->
<!--        </el-pagination>-->
        <!--        这是弹窗-->
        <el-dialog :title="dialog.title" :visible.sync="dialog.dialogVisible" :close-on-click-modal="false" width="60%">
            <el-card class="box-card">
                    <el-row :gutter="80"><el-col :span="12"><div class="left-item">用户ID:</div></el-col><el-col :span="12"><div class="right-item">{{dialog.userId}}</div></el-col></el-row>
                    <el-row :gutter="80"><el-col :span="12"><div class="left-item">订单号:</div></el-col><el-col :span="12"><div class="right-item">{{dialog.taskInstanceId}}</div></el-col></el-row>
                    <el-row :gutter="80"><el-col :span="12"><div class="left-item">平台订单号:</div></el-col><el-col :span="12"><div class="right-item">{{dialog.sourceOrderId}}</div></el-col></el-row>
                    <el-row :gutter="80"><el-col :span="12"><div class="left-item">订单创建时间:</div></el-col><el-col :span="12"><div class="right-item">{{dialog.createTime | dateTimeFormat}}</div></el-col></el-row>
                    <el-row :gutter="80"><el-col :span="12"><div class="left-item">订单原状态:</div></el-col><el-col :span="12"><div class="right-item">{{dialog.state}}</div></el-col></el-row>
                    <el-row :gutter="80"><el-col :span="12"><div class="left-item">外部订单号:</div></el-col><el-col :span="12"><div class="right-item">{{dialog.externalOrderId}}</div></el-col></el-row>
                    <el-row :gutter="80"><el-col :span="12"><div class="left-item">APP名称:</div></el-col><el-col :span="12"><div class="right-item">{{dialog.appName}}</div></el-col></el-row>
                    <el-row :gutter="80"><el-col :span="12"><div class="left-item">资方名称:</div></el-col><el-col :span="12"><div class="right-item">{{dialog.productName}}</div></el-col></el-row>
            </el-card>
            <el-card class="box-card">
                <el-row :gutter="80"><el-col :span="12"><div class="left-item">预留手机号:</div></el-col><el-col :span="12"><div class="right-item">{{dialog.mobile | noPassByMobile}}</div></el-col></el-row>
                <el-row :gutter="80"><el-col :span="12"><div class="left-item">姓名:</div></el-col><el-col :span="12"><div class="right-item">{{dialog.realName | noPassByName}}</div></el-col></el-row>
                <el-row :gutter="80"><el-col :span="12"><div class="left-item">银行卡号:</div></el-col><el-col :span="12"><div class="right-item">{{dialog.bankCardNo | noPassByIdCard}}</div></el-col></el-row>
                <el-row :gutter="80"><el-col :span="12"><div class="left-item">身份证号:</div></el-col><el-col :span="12"><div class="right-item">{{dialog.idNumber | noPassByIdCard}}</div></el-col></el-row>
            </el-card>
            <el-card class="box-card">
                <el-row :gutter="80"><el-col :span="12"><div class="left-item">借款金额:</div></el-col><el-col :span="12"><div class="right-item">{{dialog.borrowAmount}}</div></el-col></el-row>
                <el-row :gutter="80"><el-col :span="12"><div class="left-item">借款期限:</div></el-col><el-col :span="12"><div class="right-item">{{dialog.periods}}</div></el-col></el-row>
                <el-row :gutter="80"><el-col :span="12"><div class="left-item">借款状态:</div></el-col><el-col :span="12"><div class="right-item">{{dialog.loanState}}</div></el-col></el-row>
                <el-row :gutter="80"><el-col :span="12"><div class="left-item">放款时间:</div></el-col><el-col :span="12"><div class="right-item">{{dialog.loanTime | dateTimeFormat}}</div></el-col></el-row>
            </el-card>
            <el-table
                    :data="tableData2"
                    border
                    show-summary
                    style="width: 100%">
                <el-table-column
                        label="还款方式"
                        width="180">
                    等额本息还款
                </el-table-column>
                <el-table-column
                        label="期数">
                    <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column
                        prop="periodDate"
                        label="还款时间">
                </el-table-column>
                <el-table-column
                        prop="repayAmount"
                        label="应还本金">
                </el-table-column>
                <el-table-column
                        prop="repayInterest"
                        label="应还利息">
                </el-table-column>
                <el-table-column
                        prop="repayTotalAmount"
                        label="应还金额">
                </el-table-column>
                <el-table-column
                        label="还款状态">
                    <template slot-scope="scope">{{scope.row.periodState | formatPeriodState}}</template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
    import {IsUnevenNum} from 'utils/tool';
    import {queryTaskOrderList,queryRepayPlans,queryNewRepayPlans,getProductList} from '@/common/service/index';
    import {mapActions,mapState} from 'vuex'
    export default {
        name:'orderList',
        data() {
            return {
                tableLoading: false,//table加载
                tableData: [],
                tableData2: [],
                queryTableData:{
                    appName:'',
                    bankNo:'',
                    idCard:'',
                    phoneNo:'',
                    startTime:'',
                    endTime:'',
                    taskName:'',
                    userName:'',
                    time:'',
                    sourceOrderId:'',
                    taskInstanceId:'',//推荐单号
                    userId:'',//用户id
                    registerPhoneNo:'',//注册手机号
                },
                productList:[],
                submitTableData:{

                },
                dialog:{
                    dialogVisible:false,//是否展示弹窗
                },
                pagination:{
                    currentPage:1,
                    pageSize:10,
                    total:300
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            }
        },
        computed:{
          ...mapState(['appNameList']),
        },
        filters:{
           formatPeriodState(periodState){
                if(periodState==0){
                    return '待还款'
                }
                if(periodState==1){
                   return '已还款'
                }
                if(periodState==2){
                   return '已逾期'
                }
               if(periodState==3){
                   return '已结清'
               }
           }
        },
        //加载数据
        created(){this.initTableData();},
        //销毁数据
        destroyed(){},
        //自定义方法
        methods: {
            ...mapActions(['GET_APPNAME_LIST']),
            //事件详情
            timeDefault(){
                let date = new Date(), endTime=date.getTime(),startTime=endTime-3*30*24*60*60*1000
                this.queryTableData.time=[startTime,endTime];
            },
            //初始化数据
            async initTableData(){
                this.timeDefault();
                this.GET_APPNAME_LIST();
                this.$getProductList();
            },
            async updateTableData(){
            },
            //判断表格行数
            tableRowClassName({row, rowIndex}) {
                if (IsUnevenNum(rowIndex)) {
                    return 'warning-row';
                } ;
                return 'success-row';
            },
            //查询新的还款计划
            async handleLook(index, row) {
                this.tableData2=[];
                this.dialog={...this.dialog,...row};
                this.showDialog();
                let [err,data]=await queryNewRepayPlans({taskId: row.taskInstanceId});
                if(err !== null){this.$message({type:'error',message:'获取还款计划失败'});return ;};
                this.tableData2=data.repayDetails?data.repayDetails:[];
            },
            //查询订单
            async handleQuery(formName){
              console.log(this.queryTableData.taskInstanceId)
                if(!this.queryTableData.phoneNo&&!this.queryTableData.bankNo&&!this.queryTableData.idCard&&!this.queryTableData.userName&&!this.queryTableData.sourceOrderId&&!this.queryTableData.taskInstanceId&&!this.queryTableData.userId&&!this.queryTableData.registerPhoneNo){
                    this.$message({type:'info',message:'请输入查询相关信息'});
                    return
                };
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.showTableLoading();
                        let startTime=this.queryTableData.time?this.queryTableData.time[0]:'',endTime=this.queryTableData.time?this.queryTableData.time[1]:'';
                        let [err,data]=await queryTaskOrderList({...this.queryTableData,startTime,endTime});
                        if(err !== null){this.$message({type:'error',message:'查询失败'});return ;};
                        this.submitTableData={...this.queryTableData};
                        this.tableData=data?data:[];
                        this.hideTableLoading();
                    } else {
                        console.log('error submit');
                        return false;
                    }
                });
            },
            //重置
            handleReset(){
                console.log('重置')
                this.queryTableData={ appName:'',bankNo:'',idCard:'',phoneNo:'',startTime:'',endTime:'',taskName:'lianzidai',userName:'',time:'',sourceOrderId:''};
            },
            //展示加载
            showTableLoading(){this.tableLoading=true;},
            //隐藏加载
            hideTableLoading(){this.tableLoading=false;},

            async handleSizeChange(value){},

            async handleCurrentChange(value){},

            //展示弹窗
            showDialog(){ this.dialog.dialogVisible = true;},
            //关闭弹窗
            hideDialog(){this.dialog.dialogVisible = false; },

            handleDialogCancel(){this.hideDialog();},

            async handleDialogSure(formName){ },
            //查询订单需要
            clearValidate(formName){
                if(!formName){return};
                this.$nextTick(()=>{
                    this.$refs[formName].clearValidate&&this.$refs[formName].clearValidate();
                })
            },
            //获取资方名称
            async $getProductList(){
              this.productList=[];
              let [err,data]=await getProductList();
              if(err !== null){this.$message({type:'error',message:err||'资方名称获取失败'});return ;};
              console.log(data)
              this.productList=data||[];
              this.queryTableData.taskName=this.productList[0]&&this.productList[0].code;
            }
        }
    }
</script>
<style scoped lang="scss">
    .product-list{
        width: 100%;
        height: 100%;
    }
    .text{
        text-align: center;
    }
    .left-item{
        text-align: right;
    }
    .right-item{
        text-align: left;
    }

</style>
