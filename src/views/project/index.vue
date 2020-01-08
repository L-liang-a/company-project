<template>
  <div class="project">
      <!-- 新增弹框 -->
    <!-- <el-button type="success" @click="dialogFormVisible = true">新增</el-button> -->

    <!-- 新增弹框 -->
    <el-dialog title="名称" :visible.sync="dialogFormVisible">
      <el-form :model="form">
          <!-- 添加名称 -->
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.input" placeholder="请输入内容" autocomplete="off" style="width:170px"></el-input>
        </el-form-item>
        <!-- 文件上传 -->
        <div class="upLoadAdd">
          <el-form-item label="文件上传" :label-width="formLabelWidth">
            <!-- action  上传地址
                headers 请求头
                :on-success="onsuccess" 上传成功后
                :headers="onloadheaders"
                multiple
            -->
            <el-upload
                accept=".txt,.wps,.xls,.pdf,.swf,.exe,.doc,.docx"
                class="upload-demo"
                action="http://192.168.1.106/upload/localUpload"
                :on-success="handleAvatarSuccess"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>

            <!-- 自己上传 -->
            <!-- <el-button
              style="float:right"
              type="success"
              size="small"
              @click="onClickLoad"
            >上传文件</el-button> -->
      <!-- input file类型 的 change事件，当改变的时候触发 -->
      <!-- <input type="file" hidden ref="file" @change="onChangefile"> -->
          </el-form-item>
          <!-- 下拉框 -->
          <el-form-item :label-width="formLabelWidth">
            <!-- <div class="iconme">
              <i class="el-icon-circle-plus" @click="addList" />
              <i class="el-icon-remove-outline" @click="deleteList" />
            </div> -->
            <el-cascader
              :options="options"
              :props="props"
              clearable
              class="user"
              ref="a"
              @change="checkeds"
            ></el-cascader>
          </el-form-item>
        </div>
          <!-- 输入框 -->
          <el-form-item :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="textarea"
              style="width:550px"
            >
            </el-input>
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
        <!-- 文件上传 -->
        <div class="upLoadAdd">
          <el-form-item label="文件上传" :label-width="formLabelWidth">
            <!-- action  上传地址
                headers 请求头
                :on-success="onsuccess" 上传成功后
            -->
            <!-- <el-upload
                accept=".txt,.wps,.xls,.pdf,.swf,.exe,.doc,.docx"
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :file-list="changeFileList">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload> -->
          </el-form-item>
          <!-- 添加框 -->
          <el-form-item :label-width="formLabelWidth">
            <!-- <div class="iconme">
              <i class="el-icon-circle-plus" @click="addList" />
              <i class="el-icon-remove-outline" @click="deleteList" />
            </div> -->
            <el-cascader
              :options="options"
              :props="props"
              clearable
              class="user"
            ></el-cascader>
          </el-form-item>
        </div>
          <!-- 输入框 -->
          <el-form-item :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="textarea"
              style="width:550px"
            >
            </el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeShow = false">取 消</el-button>
        <el-button type="primary" @click="xiugai()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 属性列表布局 -->
    <el-row type="flex" class="row-bg" justify="space-around" style="margin-top:60px">
        <el-col :span="6"><div class="grid-content bg-purple"></div>
        <div style="margin-bottom:20px">模块编辑</div>
        <!-- 树形图 -->
            <el-tree :expand-on-click-node='false' :data="list" @node-click="handleNodeClick">
                <span class="tree" slot-scope="{ node, data }">
                    <span>{{ data.name }}</span>
                    <span>
                        <el-button size="mini" type="text" @click="change(data.id)">修改</el-button>
                        <el-button size="mini" type="text" @click="Adduser(data.id)">新增</el-button>
                        <el-button size="mini" type="text" @click="remove(node, data, data.id)">删除</el-button>
                    </span>
                </span>
            </el-tree>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div>
            <div style="margin-bottom:20px">文字声明</div>
            <!-- 树形图 -->
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
// import qs from 'qs'
export default {
  name: 'Project',
  components: {},
  props: {},
  data () {
    return {
      id: {
        id: 0
      },
      fileList: [], // 上传列表
      changeFileList: [], // 修改列表
      dialogFormVisible: false, // 点击新增对话框
      changeShow: false, // 修改弹框
      // form: {
      //   id: 0,
      //   // parentId: 0,
      //   name: '',
      //   fields: [
      //     {
      //       fieldName: '',
      //       parameter: '',
      //       type: ''
      //     }
      //   ]
      // },
      // 绑定名称的输入框
      form: {
        input: ''
      },
      formLabelWidth: '120px',
      // 树形图
      list: [],
      rightList: [], // 右侧的属性列表
      able: {}, // 修改列表
      // defaultProps: {
      //   children: 'children',
      //   label: 'name',
      //   value: 'uid'
      // },
      // 修改下拉框的属性
      props: {
        multiple: true,
        label: 'name',
        value: 'uid'
      },
      // 人员列表
      options: [
        {
          name: '',
          children: [
            {
              uid: '',
              name: ''
            }
          ]
        }
      ],
      staff: [], // 选择的人员信息
      // parameter: [], // 传入的参数是选择人员的id
      fileURL: [], // 传入的参数文件的地址
      fileURLS: {},
      textarea: '', // 传入的参数文本域
      // 选择的人员信息
      each: {
        uid: ''
      },
      nodeID: Number // 节点的id
      // form表单
      // formData: {
      //   id: Number,
      //   name: '', // 名称
      //   fields: [], // 选择人员的id
      //   file: [], // 文件地址
      //   introduce: '' // 文本域
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
    // 文件上传
    handleAvatarSuccess (response) {
      // console.log(response.data)
      // this.$set(this.fileURLS, 'url', response.data)
      this.fileURL.push(response.data)
      // console.log(this.fileURL)
    },
    // // 点击手动上传文件
    // onClickLoad () {
    //   this.$refs.file.click()
    // },
    // // 改变input
    // onChangefile () {
    //   console.log(this.$refs.file.files[0])
    //   /**
    //    * 上传文件必要的三步
    //    */
    //   // 创建FormData对象
    //   const formData = new FormData()
    //   // 获取用户选择的那个对象
    //   const fileobj = this.$refs.file.files[0]
    //   // 手动往表单添加成员，并命名
    //   // formData.append('name', fileobj)
    //   this.$set(formData, 'name', fileobj)
    //   console.log(formData.name.name)
    //   this.formData = formData
    //   this.$axios({
    //     method: 'post',
    //     url: '/localUpload'
    //   }).then(res => {
    //     console.log(res)
    //   })
    // },
    // 获取选择人员的iud和name
    checkeds () {
      var getArr = this.$refs.a.getCheckedNodes()
      // console.log(this.staff)
      this.staff = []
      getArr.forEach(item => {
        // console.log(item.value, item.label)
        this.each.uid = item.value
        this.staff.push(this.each)
        this.each = {}
      })
      // console.log(this.staff)
    },
    // 关闭弹框恢复默认值
    close () {
      this.dialogFormVisible = false
      this.form.input = ''
      this.textarea = ''
      this.options = [
        {
          name: '',
          children: [
            {
              uid: '',
              name: ''
            }
          ]
        }
      ]
    },
    // 树形选择节点时触发
    handleNodeClick (data) {
      // console.log(data)
    },
    // 删除
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    // 获取树形列表
    getTreeList () {
      // console.log('获取树形列表成功')
      this.$axios({
        method: 'post',
        url: '/node/project/list'
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
    // 点击新增获取人员列表
    Adduser (id) {
      this.dialogFormVisible = true
      // console.log(id)
      this.nodeID = id // 把节点的id存起来

      this.$axios({
        method: 'post',
        url: '/role/user'
      }).then(res => {
        this.options = res.data.data
        // console.log(this.options)
      })
    },
    // 点击新增确认
    Add () {
      // console.log(this.nodeID)
      // console.log(this.staff, 123)
      // console.log('节点id---', this.nodeID, '名称---', this.form.input, '人员的uid---', JSON.stringify(this.staff), '文件地址---', this.fileURL, '文本域---', this.textarea)
      this.$axios({
        method: 'post',
        url: '/node/project/add',
        // headers: { 'Content-Type': 'x-www-form-urlencoded' },
        data: {
          id: this.nodeID, // 节点的id
          name: this.form.input, // 名称
          fields: JSON.stringify(this.staff), // 选择人员的id
          file: this.fileURL, // 文件地址
          introduce: this.textarea // 文本域
        }
      }).then(res => {
        console.log(res, '添加成功')
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改
    change (id) {
      // console.log(id)
      this.id.id = id
      this.changeShow = true
      console.log('修改成功')
    },
    // 点击修改确认
    xiugai () {
      console.log('确认修改')
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
.upLoadAdd {
  display: flex;
  justify-content: space-between;
  .user {
    width: 150px;
    margin-right: 50px;
  }
}
</style>
