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
          <el-input v-model="form.resource" placeholder="字段名称" autocomplete="off" style="width:170px"></el-input>
          <el-input v-model="form.desc" placeholder="字段值" autocomplete="off" style="width:170px;margin-left:20px"></el-input>
          <!-- 下拉框 -->
          <el-select v-model="form.region" placeholder="请选择格式" style="width:150px;margin-left:20px">
            <el-option value="文本"></el-option>
            <el-option value="数字"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 属性列表布局 -->
    <el-row type="flex" class="row-bg" justify="space-around" style="margin-top:20px">
        <el-col :span="6"><div class="grid-content bg-purple"></div>
        <div style="margin-bottom:20px">模块编辑</div>
        <!-- 树形图 -->
            <el-tree :expand-on-click-node='false' :data="data" :props="defaultProps" @node-click="handleNodeClick">
                <span class="tree" slot-scope="{ node, data }">
                    <span>{{ data.label }}</span>
                    <span>
                        <el-button size="mini" type="text" @click="append(data)">修改</el-button>
                        <el-button size="mini" type="text" @click="append(data)">新增</el-button>
                        <el-button size="mini" type="text" @click="remove(node, data)">删除</el-button>
                    </span>
                </span>
            </el-tree>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div>
            <div style="margin-bottom:20px">文字声明</div>
            <el-tree :expand-on-click-node='false' :data="data" :props="defaultProps" @node-click="handleNodeClick">
                <span class="tree" slot-scope="{ node, data }">
                    <span>{{ data.label }}</span>
                </span>
            </el-tree>
        </el-col>
    </el-row>
  </div>
</template>

<script>
// let id = 1000
export default {
  name: 'Boss',
  components: {},
  props: {},
  data () {
    return {
      dialogFormVisible: false, // 点击关闭对话框
      form: {
        name: '',
        region: '',
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      // 树形图
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    // 树形选择节点时触发
    handleNodeClick (data) {
      console.log(data)
    },
    // 添加弹框
    append (data) {
    //   const newChild = { id: id++, label: 'testtest', children: [] }
    //   if (!data.children) {
    //     this.$set(data, 'children', [])
    //   }
    //     data.children.push(newChild)
      this.dialogFormVisible = true
    },
    // 删除
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
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
</style>
