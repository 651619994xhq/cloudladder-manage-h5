<template>
  <div class="product-list">
    <TakeOrderHeader @onGetNewOrderEvent="handleGetNewOrderEvent"></TakeOrderHeader>
    <el-divider></el-divider>
    <el-form :inline="true" :model="queryTableData" class="demo-form-inline" ref="formRef">
      <el-form-item label="订单号">
        <el-input v-model="queryTableData.orderNo" placeholder="请输入订单号"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="queryTableData.mobileNo" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="queryTableData.orderState" placeholder="请选择">
          <el-option
            v-for="(item,index) in ORDER_STATE"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品名称">
        <el-select v-model="queryTableData.productCode" placeholder="请选择">
          <el-option
            v-for="(item,index) in productList"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
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
        prop="orderNo"
        label="B端订单号"
        width="320">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称"
        width="220">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="140">
        <template slot-scope="scope">{{scope.row.createTime | dateTimeFormat}}</template>
      </el-table-column>
      <el-table-column
        prop="uid"
        label="用户ID"
        width="140">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名"
        width="140">
      </el-table-column>
      <el-table-column
        prop="mobileNo"
        label="手机号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="orderState"
        label="订单状态"
        width="100">
        <template slot-scope="scope">{{scope.row.orderState | ORDER_STATE_FILTER}}</template>
      </el-table-column>
      <el-table-column
        prop="withdrawAmount"
        label="授信额度"
        width="260">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="260">
        <template slot-scope="scope">{{scope.row.updateTime | dateTimeFormat}}</template>
      </el-table-column>
      <el-table-column
        prop="loanState"
        label="处理人"
        width="260">
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-view"
            size="mini"
            type="primary"
            @click="handleStartTaskEvent(scope.$index, scope.row)">开始任务
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page=pagination.currentPage
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      style="padding:20px 0"
    >
    </el-pagination>
    <TakeOrderCarousel :is-show="processData.isShow" :data="processData.data" @onClose="processData.isShow=false"></TakeOrderCarousel>
  </div>
</template>
<script>
    import {IsUnevenNum} from 'utils/tool';
    import {ORDER_STATE} from 'utils/constants';
    import TakeOrderHeader from './takeOrderHeader';
    import TakeOrderCarousel from './takeOrderCarousel';
    import {getOrderList,assignCase,getOrderProcess} from '@/common/service/index';
    import {mapActions, mapState} from 'vuex'

    export default {
        name: 'realTimeTakeOrder',
        data() {
            return {
                ORDER_STATE,
                tableLoading: false,//table加载
                tableData: [],
                tableData2: [],
                queryTableData: {
                    mobileNo: '',
                    orderNo: '',
                    orderState: '',
                    productCode: '',
                },
                saveTableData: {},
                dialog: {
                    dialogVisible: false,//是否展示弹窗
                },
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 10
                },
                processData:{
                    isShow:false,
                    data:[]
                }
            }
        },
        components:{
            TakeOrderHeader,
            TakeOrderCarousel
        },
        computed: {
            ...mapState(['productList']),
        },
        filters: {},
        //加载数据
        created() {
            this.initTableData();
        },
        //销毁数据
        destroyed() {
        },
        //自定义方法
        methods: {
            ...mapActions(['GET_PRODUCT_LIST']),
            //初始化数据
            async initTableData() {
                 this.GET_PRODUCT_LIST();
                this.showTableLoading();
                let [err, data] = await getOrderList({mobileNo: '', orderNo: '', orderState: '', productCode: '',});
                if (err !== null) {
                    this.$message({type: 'error', message: err || '系统错误'});
                    return;
                }
                ;
                this.hideTableLoading();
                this.tableData = data.data || [];
                this.pagination = {currentPage: 1, pageSize: 10, total: data.total || 10};
            },
            async updateTableData() {
            },
            //判断表格行数
            tableRowClassName({row, rowIndex}) {
                if (IsUnevenNum(rowIndex)) {
                    return 'warning-row';
                }
                ;
                return 'success-row';
            },
            //查询订单
            async handleQuery() {
                this.showTableLoading();
                let [err, data] = await getOrderList({...this.queryTableData, pageNum: 1, pageSize: 10});
                if (err !== null) {
                    this.$message({type: 'error', message: err || '系统错误'});
                    return;
                }
                ;
                this.saveTableData = {...this.queryTableData};
                this.tableData = data ? data : [];
                this.pagination = {currentPage: 1, pageSize: 10, total: data.total || 10};
                this.hideTableLoading();
            },
            //重置
            handleReset() {
                console.log('重置')
                this.queryTableData = {
                    mobileNo: '',
                    orderNo: '',
                    orderState: '',
                    productCode: '',
                };
            },
            //展示加载
            showTableLoading() {
                this.tableLoading = true;
            },
            //隐藏加载
            hideTableLoading() {
                this.tableLoading = false;
            },

            async onPaginationChange(value, type) {
                this.showTableLoading();
                let {pageSize, currentPage: pageNum} = this.pagination;
                if (type == 'handleSizeChange') {
                    pageSize = value;
                }
                ;
                if (type == 'handleCurrentChange') {
                    pageNum = value;
                }
                ;
                let [err, data] = await getOrderList({...this.saveTableData, pageSize, pageNum});
                if (err !== null) {
                    this.hideTableLoading();
                    this.$message({type: 'error', message: err || '系统错误'});
                    return;
                }
                ;
                this.tableData = data.data || [];
                this.pagination = {
                    pageSize,
                    currentPage: pageNum,
                    total: data.total || 10
                }
                this.hideTableLoading();
            },
            async handleSizeChange(value) {
                await this.onPaginationChange(value, 'handleSizeChange')
            },

            async handleCurrentChange(value) {
                await this.onPaginationChange(value, 'handleCurrentChange')
            },
            async handleStartTaskEvent() {
                //TODO 在这里调用 获取流程接口 开始弹出流程框
                let [err,data]=await getOrderProcess({orderNo:row.orderNo});
                // let data=[
                //     {
                //         nodeCode:1,    //对应节点
                //         processSeq:'', //节点顺序
                //         processType:'', //流程类型
                //         componentCode:'sms_login', //组件编码
                //         componentValue:'短信登录',//组件值
                //     },
                //     {
                //         nodeCode:1,    //对应节点
                //         processSeq:'', //节点顺序
                //         processType:'', //流程类型
                //         componentCode:'idcard', //组件编码
                //         componentValue:'身份证信息',//组件值
                //     },
                //     {
                //         nodeCode:1,    //对应节点
                //         processSeq:'', //节点顺序
                //         processType:'', //流程类型
                //         componentCode:'bankcard', //组件编码
                //         componentValue:'银行卡验证',//组件值
                //     },
                //     {
                //         nodeCode:1,    //对应节点
                //         processSeq:'', //节点顺序
                //         processType:'', //流程类型
                //         componentCode:'sms_verify', //组件编码
                //         componentValue:'短信验证',//组件值
                //     }
                // ]
                this.processData.isShow=true;
                this.processData.data=data||[];
s            },
            /**
             * 这个逻辑 先调用客服分配任务成功之后，在在清空查询条件 重新获取订单列表
             * @returns {Promise<void>}
             */
            async handleGetNewOrderEvent() {
                let [err,data]=await assignCase();
                if(err!=null){this.$message({type:'error',message:err||'系统错误'});return ;};
                this.showTableLoading();
                let [err1, data1] = await getOrderList({mobileNo: '', orderNo: '', orderState: '', productCode: '',});
                if (err1 !== null) {
                    this.$message({type: 'error', message: err || '系统错误'});
                    return;
                };
                this.hideTableLoading();
                this.tableData = data1.data || [];
                this.pagination = {currentPage: 1, pageSize: 10, total: data1.total || 10};
                this.queryTableData = {mobileNo: '',orderNo: '',orderState: '',productCode: '',};
                this.saveTableData={mobileNo: '',orderNo: '',orderState: '',productCode: '',};
            },
        }
    }
</script>
<style scoped lang="scss">
  .product-list {
    width: 100%;
    height: 100%;
  }


</style>
