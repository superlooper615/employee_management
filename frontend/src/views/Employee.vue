<template>
  <container>
  <el-header>
    <el-row>
      <template>
      <el-button type="primary" @click="show()" round>New</el-button>
      <el-row align="center" style="text-align:center;font-size:30px;color:blue">
        The total number of employees:{{this.tableData.length}} employees</el-row>
      <el-dialog  :title="titleName[dialogStatus]" :visible.sync="dialogVisible" :append-to-body="true" width="30%">
        <el-form ref="form1" :model="form1" label-width="180px" οnsubmit="return validateCallback(this, navTabAjaxDone);">
          <el-form-item label="Employee ID">
            <el-input v-model="form1.employeeId" disabled></el-input>
          </el-form-item>
          <el-form-item label="First Name">
            <el-input v-model="form1.firstName"></el-input>
          </el-form-item>
          <el-form-item label="Last Name">
            <el-input v-model="form1.lastName"></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="form1.email"></el-input>
          </el-form-item>
          <el-form-item label="Phone">
            <el-input v-model="form1.Phone"></el-input>
          </el-form-item>
          <el-form-item label="Address">
            <el-input type="textarea" v-model="form1.address"></el-input>
          </el-form-item>
          <el-form-item label="Employee Status">
            <el-input v-model="form1.employeeStatus"></el-input>
          </el-form-item>
          <el-form-item label="Employee Type">
            <el-input v-model="form1.employeeType"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="AddModify()">Conform</el-button>
            <!-- <el-button type="primary" @click="modifyEmployee()">Modify</el-button> -->
          </el-form-item>
        </el-form>
    </el-dialog>
      </template>
    </el-row>
  </el-header>
  <el-main>
    <el-table
    :data="tableData"
    border
    style="width: 80%"
    :row-class-name="tableRowClassName">
    <el-table-column

      prop="employeeId"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="firstName"
      label="First Name"
      width="180">
    </el-table-column>
    <el-table-column
      prop="lastName"
      label="Last Name"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="Email"
      width="180">
    </el-table-column>
    <el-table-column
      prop="Phone"
      label="Phone"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="Address"
      width="580">
    </el-table-column>
    <el-table-column
      prop="employeeStatus"
      label="Employee Status"
      width="180">
    </el-table-column>
    <el-table-column
      prop="employeeType"
      label="Employee Type"
      width="180">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Option"
      width="180">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row), deleteEmployee(scope.row.employeeId),toURL()" type="text" size="small">DELETE</el-button>
        <el-button type="text" size="small" @click="editShow(scope.row.employeeId)">MODIFY</el-button>
        
      </template>
    </el-table-column>
  </el-table>
  </el-main>
</container>
  
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      },
      async deleteEmployee(employeeId){
        await this.$http.delete('/employee/'+employeeId).then(res => {
          //console.log(res.data);
          this.$message({
            message:"Delete new Employee success!",
            type:"warning"
          })
          this.$http.get('employee').then(res => {
            this.tableData = res.data
          })
        })
      },
      async onSubmit(){
          await this.$http.post('/employees/',this.form1).then(res => {
          //console.log(res.data);
          this.$message({
            message:"Add new Employee success!",
            type:"success"
          })
          this.dialogVisible=false
          //this.dialogStatus="add"
          // this.$http.get('employee').then(res => {
          //   this.tableData = res.data
          // })
          //this.$refs[form1].resetFields();
          window.location.reload();
          
          
        })
      },
      AddModify(){
        this.dialogVisible=false
        if(this.dialogStatus=='add'){
          this.onSubmit();
        
      
        }else{
          this.modifyEmployee()
        }
      },
      async editShow(employeeId){
        await this.$http.get('/employee/'+employeeId).then(res => {
          console.log(res.data);
          this.form1 = res.data
           this.dialogVisible = true
           this.dialogStatus='edit'
        })
      },
      show (){
        this.dialogVisible = true
        this.dialogStatus='add'
      },
      async modifyEmployee(){
        await this.$http.put('/employee/'+this.form1.employeeId,this.form1).then(res => {
          console.log(res.data);
          this.$message({
            message:"Modify Employee success!",
            type:"success"
          })
          this.dialogVisible=false
          // this.$http.get('employee').then(res => {
          //   this.tableData = res.data
          // })
          //this.$refs[form1].resetFields();
          window.location.reload();
          
        })
      },
    },
    data() {
      
      return {
        titleName:{
          add:'Add Employee',
          edit:'Modify Employee'
        },
        dialogStatus:'',
        tableData:[],
        dialogVisible:false,
        // form: {
        //   employeeId: '',
        //   firstName: '',
        //   lastName: '',
        //   email: '',
        //   Phone: '',
        //   address: '',
        //   employeeStatus: '',
        //   employeeType:''
        // },
        form1: {
          employeeId: '',
          firstName: '',
          lastName: '',
          email: '',
          Phone: '',
          address: '',
          employeeStatus: '',
          employeeType:''
        }

      };
    },
    created(){
      this.$http.get('employee').then(res => {
        this.tableData = res.data
      })
    }

  }
</script>