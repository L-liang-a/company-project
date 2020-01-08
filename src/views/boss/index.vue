<template>
  <div class="boss">
      <!-- 新增弹框 -->
    <el-button type="success" @click="dialogFormVisible = true">新增</el-button>

    <!-- 新增弹框 -->
    <el-dialog title="名称" :visible.sync="dialogFormVisible">
      <el-form :model="form">
          <!-- 添加名称 -->
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入内容" autocomplete="off" style="width:170px"></el-input>
        </el-form-item>
        <!-- 添加框 -->
        <el-form-item :label-width="formLabelWidth">
          <el-input v-model="children.fieldName" placeholder="字段名称" autocomplete="off" style="width:170px"></el-input>
          <el-input v-model="children.parameter" placeholder="字段值" autocomplete="off" style="width:170px;margin-left:20px"></el-input>
          <!-- 下拉框 -->
          <el-select v-model="children.type" placeholder="请选择格式" style="width:150px;margin-left:20px">
            <el-option label='文本' value="1"></el-option>
            <el-option label='数字' value="2"></el-option>
          </el-select>
          <div class="iconme">
            <i class="el-icon-circle-plus" @click="addList" />
            <i class="el-icon-remove-outline" @click="deleteList" />
          </div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="Add()">确 定</el-button>
      </div>
    </el-dialog>

     <!-- 修改弹框 -->
    <el-dialog title="名称" :visible.sync="changeShow">
      <el-form :model="able">
          <!-- 添加名称 -->
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="able.name" placeholder="请输入内容" autocomplete="off" style="width:170px"></el-input>
        </el-form-item>
        <!-- 添加框 -->
        <el-form-item :label-width="formLabelWidth" v-for="(item, index) in able.list" :key="index">
          <el-input v-model="item.fieldName" placeholder="字段名称" autocomplete="off" style="width:170px"></el-input>
          <el-input v-model="item.parameter" placeholder="字段值" autocomplete="off" style="width:170px;margin-left:20px"></el-input>
          <!-- 下拉框 -->
          <el-select :value="item.type==1?'文本':'数字'" placeholder="请选择格式" style="width:150px;margin-left:20px">
            <el-option label='文本' value="1"></el-option>
            <el-option label='数字' value="2"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeShow = false">取 消</el-button>
        <el-button type="primary" @click="xiugai()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 属性列表布局 -->
    <el-row type="flex" class="row-bg" justify="space-around" style="margin-top:20px">
        <el-col :span="6"><div class="grid-content bg-purple"></div>
        <div style="margin-bottom:20px">模块编辑</div>
        <!-- 树形图 -->
        <!--  :props="defaultProps" -->
            <el-tree node-key="id" :expand-on-click-node='false' :data="list" @node-click="handleNodeClick">
                <span class="tree" slot-scope="{ node, data }">
                    <span>{{ data.name }}</span>
                    <span>
                      <!-- 这个data是list数组里的每一项 -->
                        <el-button size="mini" type="text" @click="change(data.id)">修改</el-button>
                        <el-button size="mini" type="text" @click="dialogFormVisible = true">新增</el-button>
                        <el-button size="mini" type="text" @click="remove(node,data,data.id)">删除</el-button>
                    </span>
                </span>
            </el-tree>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div>
            <div style="margin-bottom:20px">文字声明</div>
             <!-- :props="defaultProps" -->
            <el-tree :expand-on-click-node='false' :data="rightList" @node-click="handleNodeClick">
                <span class="tree" slot-scope="{ node, data }">
                    <span>{{ data.name }}</span>
                </span>
            </el-tree>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'Boss',
  components: {},
  props: {},
  data () {
    return {
      id: {
        id: 0
      },
      dialogFormVisible: false, // 新增对话框
      changeShow: false, // 修改弹框
      // 用来绑定第二行的input框和下拉框
      children: {
        fieldName: '',
        parameter: '',
        type: ''
      },
      form: {
        id: 0,
        // parentId: 0,
        name: '',
        fields: [this.children]
      },
      formLabelWidth: '120px',
      // 树形图
      list: [], // 属性列表
      rightList: [], // 右侧的属性列表
      able: {} // 修改列表
      // defaultProps: {
      //   children: 'children',
      //   label: 'label'
      // }
    }
  },
  computed: {},
  watch: {},
  created () {
    // 获取树形列表
    this.getTreeList()
    // 获取右边树形列表
    this.getRightTreeList()
  },
  methods: {
    // 关闭弹框恢复默认值
    close () {
      this.dialogFormVisible = false
      this.form.name = ''
      this.form.fields = [{
        fieldName: '',
        parameter: '',
        type: null
      }]
    },
    // 树形选择节点时触发
    handleNodeClick (data) {
      // console.log(data)
    },
    // 删除
    remove (node, data, id) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
      // 点击删除（传什么）
      this.id.id = id
      this.$axios({
        method: 'post',
        url: '/node/delete',
        data: qs.stringify(this.id)
      }).then(res => {
        console.log(res)
      })
    },
    // 获取树形列表
    getTreeList () {
      this.$axios({
        method: 'post',
        url: '/node/list'
      }).then(res => {
        // console.log(res.data.data)
        this.list = res.data.data
        // console.log(this.list)
      })
    },
    // 获取右边树形列表
    getRightTreeList () {
      // console.log(123)
      this.$axios({
        method: 'post',
        url: '/node/nodeip'
      }).then(res => {
        // console.log(res.data.data)
        this.rightList = res.data.data
      })
    },
    // 调用修改和添加的方法
    // node/nodeip 右边树列表
    Add () {
      this.form.fields = JSON.stringify(this.form.fields)
      this.$axios({
        method: 'post',
        url: '/node/add',
        data: qs.stringify(this.form)
      }).then(res => {
        // console.log(res)
        console.log('添加成功')
        if (res.code === 200) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        } else {
          this.$message.error('请出入名称')
        }
      })
    },
    // 修改
    change (id) {
      // console.log(id)
      this.id.id = id
      this.changeShow = true
      this.$axios({
        method: 'post',
        url: 'node/field',
        data: qs.stringify(this.id)
      }).then(res => {
        // console.log(res.data.data)
        this.able = res.data.data
        console.log(this.able)
      })
    },
    // 确认修改
    xiugai () {

    },
    addList () {
      this.form.fields.push({})
    },
    deleteList () {
      this.form.fields.shift({})
    }
  },
  mounted () {}
}
</script>

<style scoped lang="less">
.tree {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
.iconme {
  position: absolute;
  top: 0%;
  right: 6%;
}
</style>
