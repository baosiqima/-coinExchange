<template>
    <!-- 订单 -->
    <div>
        <el-container class="order-container">
            <el-tabs class="order-tab" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="当前委托" name="current">
                    <el-table
                    :data="curDelegate"
                    style="width: 100%">
                    <el-table-column
                        prop="time"
                        width="180"
                        label="时间">
                    </el-table-column>
                    <el-table-column
                        prop="duad"
                        label="交易对">
                        <template slot-scope="scope">
                            {{scope.row.duad.toUpperCase()}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="direction"
                        label="方向">
                        <template slot-scope="scope">
                            <span 
                            :class="scope.row.direction_type == 1?'buy-direction':'sell-direction'">
                                {{scope.row.direction_type == 1?"买入":"卖出"}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="价格">
                    </el-table-column>
                    <el-table-column
                        prop="number"
                        label="数量">
                    </el-table-column>
                    <el-table-column
                        prop="total"
                        label="委托总数">
                    </el-table-column>
                    <el-table-column
                        prop="deal"
                        label="成交额">
                    </el-table-column>
                    <el-table-column
                        prop="untreated"
                        label="未成交">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button @click="cancelDetegate(scope.row)" type="text" size="small">撤销</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="委托历史" name="history">
                    <el-table
                    :data="hisDelegate"
                    @expand-change="expandLine"    
                    style="width: 100%">
                        <el-table-column
                            prop="time"
                            label="时间"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="duad"
                            label="交易对">
                            <template slot-scope="scope">
                                {{scope.row.duad.toUpperCase()}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="direction"
                            label="方向">
                            <template slot-scope="scope">
                                <span 
                                :class="scope.row.direction_type == 1?'buy-direction':'sell-direction'">
                                    {{scope.row.direction_type == 1?"买入":"卖出"}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            label="价格">
                        </el-table-column>
                        <el-table-column
                            prop="number"
                            label="数量">
                        </el-table-column>
                        <el-table-column
                            prop="total"
                            label="委托总数">
                        </el-table-column>
                        <el-table-column
                            prop="deal"
                            label="成交额">
                        </el-table-column>
                        <el-table-column
                            prop="untreated"
                            label="未成交">
                        </el-table-column>
                        <el-table-column type="expand"
                            prop=""
                            label="操作">
                            <template slot-scope="props">
                                <div class="details">
                                    <ul class="details_title">
                                        <li>时间</li>
                                        <li>价格</li>
                                        <li>数量</li>
                                        <li>成交额</li>
                                        <li>手续费</li>
                                    </ul>
                                    <ul v-if="!props.row.loading" v-for="(item,index) in props.row.detailList" :key="index" class="details_section">
                                        <li>{{item.time}}</li>
                                        <li>{{item.price}}</li>
                                        <li>{{item.number}}</li>
                                        <li>{{item.total}}</li>
                                        <li>{{item.fee}}</li>
                                    </ul>
                                    <div v-if="props.row.loading" class="details_loading">
                                        <i class="el-icon-loading"></i>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>   
                </el-tab-pane>
                <el-tab-pane label="成交明细" name="detail">
                    <el-table
                    :data="detailDelegate"
                    style="width: 100%">
                    <el-table-column
                        prop="time"
                        label="时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="duad"
                        label="交易对">
                        <template slot-scope="scope">
                            {{scope.row.duad.toUpperCase()}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="direction"
                        label="方向">
                        <template slot-scope="scope">
                            <span 
                            :class="scope.row.direction_type == 1?'buy-direction':'sell-direction'">
                                {{scope.row.direction_type == 1?"买入":"卖出"}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="价格">
                    </el-table-column>
                    <el-table-column
                        prop="number"
                        label="数量">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="total"
                        label="委托总数">
                    </el-table-column> -->
                    <el-table-column
                        prop="total"
                        label="成交额">
                    </el-table-column>
                    <el-table-column
                        prop="fee"
                        label="手续费">
                    </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-container>
    </div>
</template>

<script>
import { api } from '@/static/api'

export default {
  name: 'Order',
  data () {
    return {
        activeName:'current',
        curDelegate:[],
        hisDelegate:[],
        detailDelegate:[],
        hisDetails:[]
    }
  },
  components:{

  },
  created(){
      this.getCurDelegate()
      setInterval(this.getCurDelegate(),5000)
      this.getHisDelegate()
      setInterval(this.getHisDelegate(),5000)
      this.getDealDetail()
      setInterval(this.getDealDetail(),5000)
  },
  methods:{
      handleClick(a){
          console.log(a)
      },
      getCurDelegate(){
          var data = {}
          api.curDelegate()
          .then(res => {
              console.log(res)
              if(res.error_code == 1000){
                  this.curDelegate = res.entrusts
              }
          }).catch(err => {

          })
      },
      getHisDelegate(){
          var data = {}
          api.hisDelegate()
          .then(res => {
              console.log(res,111)
              if(res.error_code == 1000){
                  this.hisDelegate = res.entrusts 
              }
          }).catch(err => {

          })
      },
      getDealDetail(){
          var data = {}
          api.delegateDetail()
          .then(res => {
              console.log(res)
              if(res.error_code == 1000){
                  this.detailDelegate = res.entrusts
              }
          }).catch(err => {

          })
      },
      cancelDetegate(row){
            console.log(row)
            var data = {
                order_id:row.id,
                currency:row.order_type
            }
            api.cancelDelegate(data)
            .then(res => {
                this.$message(res.error_desc)
                this.getCurDelegate()
            }).catch(err => {})
      },
      expandLine(row, expandedRows){
          var self = this
          if(row.detailList && row.detailList.length >= 0){
              return
          }
          this.$set(row,'loading',true)
          var data = {
            order_id:row.id,
            currency:row.currency,
            trade_currency:row.trade_currency,
            trade_type:row.trade_type
          }
          api.orderDetail(data)
          .then(res => {
              console.log(res)
              if(res.error_code == 1000){  
                this.$set(row,'detailList',res.entrusts)
                this.$set(row,'loading',false)
                console.log(row,self.hisDelegate,expandedRows)
              }
          }).catch(err => {})
      }
      
  }
}
</script>

<style lang='scss' scoped>
.order-container{
    width: 1200px;
    min-height: 940px;
    padding: 0 20px;
    margin: 0 auto;
    background-color: #1a232c;
    margin-top: 30px;
    .order-tab{
        width: 100%;
    }
    .details{
        width:100%;
        background:#151922;
        .details_title{overflow: hidden;
            li{list-style: none;width: 226px;height: 45px;line-height: 45px;float: left;color: #5b667c;text-align: center;}
        }
        .details_section{overflow: hidden;
            li{list-style: none;width: 226px;height: 45px;line-height: 45px;float: left;color: #f6f9ff;text-align: center;}
        }
        .details_loading{
            text-align: center;
            padding: 15px 0;
        }
    }
}
</style>

