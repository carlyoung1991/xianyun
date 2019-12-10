<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info" :model="{ users }" ref="formUser">
        <div
          class="member-info-item"
          v-for="(user, index) in users"
          :key="index"
        >
          <el-form-item
            label="乘机人类型"
            :prop="`users.${index}.username`"
            :rules="{
              required: true,
              message: '请输入乘机人姓名',
              trigger: 'blur'
            }"
          >
            <el-input
              placeholder="姓名"
              class="input-with-select"
              v-model="user.username"
            >
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item
            label="证件类型"
            :prop="`users.${index}.id`"
            :rules="{
              required: true,
              message: '请输入乘机人身份证',
              trigger: 'blur'
            }"
          >
            <el-input
              placeholder="证件号码"
              class="input-with-select"
              v-model="user.id"
            >
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <!-- 移除乘机人 -->
          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers"
        >添加乘机人</el-button
      >
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div
          class="insurance-item"
          v-for="(item, index) in data.insurances"
          :key="index"
        >
          <el-checkbox
            :label="
              `${item.type}:￥${item.price}/份X${users.length}最高赔付${item.compensation}`
            "
            border
            @change="handleInsurance(item.id)"
          >
          </el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form
          label-width="80px"
          :model="{ contactName, contactPhone, captcha }"
          :rules="contactRules"
          ref="formContact"
        >
          <el-form-item label="姓名" prop="contactName">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机" prop="contactPhone">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码" prop="captcha" >
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <!-- 避免用户重复提交，属性为真可以点击，属性为假不可点击 -->
        <el-button
          :disable="isSubmit"
          type="warning"
          class="submit"
          @click="handleSubmit"
          >提交订单</el-button
        >
      </div>
    </div>
    <div v-show="false">{{ allPrice }}</div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      isSubmit: false,
      users: [
        {
          username: "",
          id: ""
        }
      ],
      insurances: [],
      contactName: "", // 联系人名字
      contactPhone: "13517728017", // 联系人电话
      invoice: false,
      captcha: "",
      contactRules: {
        contactName: {
          required: true,
          message: "请输入联系人姓名",
          trigger: "blur"
        },
        contactPhone: {
          required: true,
          message: "请输入联系人电话",
          trigger: "blur"
        },
        captcha: {
          required: true,
          message: "请输入手机验证码",
          trigger: "blur"
        }
      }
    };
  },
  //   总金额要使用兄弟组件传值的方式。

  // 在订单表单组件中计算总金额，并传递给父组件
  computed: {
    allPrice() {
      let price = 0;
      console.log(123);
      let len = this.users.length;
      price += this.data.seat_infos.org_settle_price * len;
      //计算添加保险价钱
      this.insurances.forEach(id => {
        //这里遍历的是选中的保险id
        this.data.insurances.forEach(item => {
          if (item.id == id) {
            price += item.price * len;
          }
        });
      });
      price += this.data.airport_tax_audlet * len;
      //发送设置总金额事件
      console.log("价格", price);

      this.$emit(
        "setAllprice",
        (price = {
          len: len,
          price: price
        })
      );
      //为什么要return price
      return price;
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
    },
    //处理保险多选项
    handleInsurance(id) {
      // 存在则去除
      if (this.insurances.indexOf(id) > -1) {
        let arr = this.insurances.slice(0);
        arr.splice(this.insurances.indexOf(id), 1);
        this.insurances = arr;
      } else {
        //不存在添加到insurance
        this.insurances = [...new Set([...this.insurances, id])];
      }
    },

    // 发送手机验证码
    handleSendCaptcha() {
      // 判断手机号码是否符合格式
      if (!/^1[3456789]\d{9}$/.test(this.contactPhone)) {
        this.$confirm("手机号码错误", "提示", {
          confirmButtonText: "",
          showCancelButton: false,
          type: "warning"
        });
        this.contactPhone = "";
      } else {
        this.$axios({
          url: `/captchas`,
          method: "POST",
          data: {
            tel: this.contactPhone
          }
        }).then(res => {
          const { code } = res.data;
          this.$confirm(`请查收验证码：${code}`, "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "success"
          });
        });
      }
    },

    // 提交订单
    handleSubmit() {
      if (this.isSubmit) {
        return false;
      }
      this.isSubmit = true;
      //准备好创建订单的数据了
      const orderData = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: false,
        seat_xid: this.data.seat_infos.seat_xid,
        air: this.data.id,
        captcha:this.captcha
      };
      //获取用户的token
      const token= this.$store.state.user.userInfo.token;
      //如果有token和没token
      if(!token){
        this.$message({
          message: "请先登录",
          type: "error"
        })
        this.$router.push({
          path:'/user/login'
        })
        return
      }

      this.$axios({
        url: '/airorders',
        method: "post",
        data: orderData,
        headers: {
          Authorization: 'Bearer '+token
        }
      }).then(res => {
        //跳转到付款也
        console.log(res);
        this.isSubmit = false;
        if(res.message==="订单提交成功"){
          this.$router.push('/air/pay')
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 10px;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>
