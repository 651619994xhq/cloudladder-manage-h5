<template>
  <div class="product-list">
    <!--       这是头部-->
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
            :value="item.code">
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
            @click="handleStartTaskEvent(scope.$index, scope.row)">开始任务</el-button>
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
  </div>
</template>
<script>
    import {IsUnevenNum} from 'utils/tool';
    import {ORDER_STATE} from 'utils/constants';
    import {getOrderList,getProductList} from '@/common/service/index';
    import {mapActions,mapState} from 'vuex'
    export default {
        name:'realTimeTakeOrder',
        data() {
            return {
                ORDER_STATE,
                tableLoading: false,//table加载
                tableData: [],
                tableData2: [],
                queryTableData:{
                    mobileNo:'',
                    orderNo:'',
                    orderState:'',
                    productCode:'',
                },
                productList:[],
                saveTableData:{

                },
                dialog:{
                    dialogVisible:false,//是否展示弹窗
                },
                pagination:{
                    currentPage:1,
                    pageSize:10,
                    total:10
                },
            }
        },
        computed:{
            ...mapState(['appNameList']),
        },
        filters:{
        },
        //加载数据
        created(){this.initTableData();},
        //销毁数据
        destroyed(){},
        //自定义方法
        methods: {
            ...mapActions(['GET_APPNAME_LIST']),
            //初始化数据
            async initTableData(){
                this.showTableLoading();
                let [err,data]=await getOrderList({mobileNo:'',orderNo:'',orderState:'',productCode:'',});
                if(err !== null){this.$message({type:'error',message:err||'系统错误'});return ;};
                this.hideTableLoading();
                this.tableData=data.data||[];
                this.pagination={currentPage:1,pageSize:10,total:data.total||10};
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
            //查询订单
            async handleQuery(){
                  this.showTableLoading();
                  let [err,data]=await getOrderList({...this.queryTableData,pageNum:1,pageSize:10});
                  if(err !== null){this.$message({type:'error',message:err||'系统错误'});return ;};
                  this.saveTableData={...this.queryTableData};
                  this.tableData=data?data:[];
                  this.pagination={currentPage:1,pageSize:10,total:data.total||10};
                  this.hideTableLoading();
            },
            //重置
            handleReset(){
                console.log('重置')
                this.queryTableData={
                    mobileNo:'',
                    orderNo:'',
                    orderState:'',
                    productCode:'',
                };
            },
            //展示加载
            showTableLoading(){this.tableLoading=true;},
            //隐藏加载
            hideTableLoading(){this.tableLoading=false;},

            async onPaginationChange(value,type){
                this.showTableLoading();
                let {pageSize,currentPage:pageNum}=this.pagination;
                if(type=='handleSizeChange'){
                    pageSize=value;
                };
                if(type=='handleCurrentChange'){
                    pageNum=value;
                };
                let [err,data]=await getOrderList({...this.saveTableData,pageSize,pageNum});
                if(err!==null){this.hideTableLoading();this.$message({type:'error',message:err||'系统错误'});return ;};
                this.tableData=data.data||[];
                this.pagination={
                    pageSize,
                    currentPage: pageNum,
                    total:data.total||10
                }
                this.hideTableLoading();
            },
            async handleSizeChange(value){
                await this.onPaginationChange(value,'handleSizeChange')
            },

            async handleCurrentChange(value){
                await this.onPaginationChange(value,'handleCurrentChange')
            },
            async handleStartTaskEvent(){

            },
            //查询订单需要
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
