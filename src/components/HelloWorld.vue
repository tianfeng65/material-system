<template>
<div>
  <!-- 搜索区域 -->
  <div class="header">
    <el-form inline label-width="80px" :model="formData">
      <el-form-item label="名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="供应商">
        <el-select v-model="formData.supplier" placeholder="请选择供应商">
          <el-option v-for="item of suppliersOptions" :label="item" :value="item" :key="item"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 数据表格区域 -->
  <div class="table" v-if="tableData.length">
    <el-table :data="tableData" :stripe="true" :border="true" style="width: 100%">
      <el-table-column v-for="(item, key) of tableData[0]" :prop="key" :label="key" :key="key"></el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      formData: {
        name: '特级王中王',
        supplier: 'kk店'
      },
      suppliersOptions: [],
      selectedSupplier: '',
      tableData: []
    }
  },
  async created () {
    await this.getSuppliers()
    this.handleSearch()
  },
  methods:{
    getSuppliers() {
      this.$axios.get('/api/suppliers').then(res => this.suppliersOptions = res.data)
    },
    handleSearch() {
      this.$axios.post('/api/search',{
        ...this.formData
      }).then(res=>{
        this.tableData = res.data
        this.calcTableColumns()
      }).catch(err=>{
        console.log(err)
      })
    },
    calcTableColumns() {

    }
  }
}
</script>
<style lang="scss">
.header{
  background: rgb(219, 215, 240);
  height: 70px;
  display: flex;
  justify-content: flex-start;
  .el-form{
    display: flex;
    align-items: center;
    .el-form-item{
      margin-bottom: 0;
    }
  }
}
</style>