<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(index)"
        :class="{ active: index === currentTab }"
      >
        <i :class="item.icon"></i>{{ item.name }}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          v-model="form.departCity"
          @select="selectDepartSelect"
          class="el-autocomplete"
          :trigger-on-focus="false"
          :highlight-first-item="true"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <!-- trigger-on-focus输入后再激活输入建议 -->
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          v-model="form.destCity"
          @select="selectDestSelect"
          :trigger-on-focus="false"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          v-model="form.departDate"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-button
          style="width:100%;"
          type="primary"
          icon="el-icon-search"
          @click="handleSubmit"
        >
          搜索
        </el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="reverseCity">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0
    };
  },
  components: { moment },
  methods: {
    handleSearchTab(index) {
      if (index == 1) {
        this.$confirm("目前暂不支持往返，请使用单程搜索！", "提示", {
          confirmButtonText: "哦",
          showCancelButton: false,
          type: "warning"
        });
      }
    },
    // 出发城市输入框获得焦点时触发
    //value是选中的值，cb是回调函数，接受要展示的列表
    async queryDepartSearch(value, cb) {
      const arr = await this.searchCity(value);
      this.form.departCode = arr[0].sort;
      cb(arr);
    },
    async queryDestSearch(value, cb) {
      // cb是回调函数，接受要展示的列表
      const arr = await this.searchCity(value);
      this.form.destCode = arr[0].sort;
      cb(arr);
    },
    //封装发送请求
    searchCity(value) {
      return this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        console.log(res);
        const { data } = res.data;
        const arr = data.map(element => {
          return {
            ...element,
            value: element.name.replace("市", "")
            //使用正则表达匹配城市名
            // value:element.name.replace(/市$/,'')
          };
        });
        // const cityList =arr.filter(element=>{
        //   // 过滤器里面，所有合法数据应该return true
        //   if(element.sort){
        //     return true
        //   }
        //   return element .sort
        // })
        // 用过滤器将所有不带sort的数据去掉
        const cityList = arr.filter(element => element.sort);
        return cityList;
      });
    },
    //出发城市下拉选择时触发
    selectDepartSelect(item) {
      // 我们的搜索建议列表其实是使用数组进行渲染的,
      // 每一个元素都是一个对象
      // 当我们点击列表里面的其中一个选项时,
      // 这个选项对应的 对象就会被自动传到 这个 select 时间当中
      // 当我们点击了一个选项, 触发 select 事件以后
      // 会有一个 被点击选项的对象传到这个函数里面
      // 将 item.sort 放到 form.departCode
      // 这个 item 就是一个城市
      this.form.departCode = item.sort;
    },
    // 目标城市下拉选择时触发
    selectDestSelect(item) {
      this.form.destCode = item.sort;
    },
    // 确认选择日期时触发
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },
    // 提交表单是触发
    handleSubmit() {
       // query 的参数都会作为 url location.search 参数待在最后以问号开头,& 分隔
      // params
      // 1. 如果我们的路由配置, path 里面有动态路由参数, 而且你传的 params 也是相同名称的属性,那么这个参数就会显示在url上
      // 2. 如果没有配置动态路由,参数一样可以传递,跳转之后的页面 可以通过 this.$route.params 接受,但是不会显示在 url,一旦刷新,这个传值就会丢失.
      for(var i in this.form){
        if(!this.form[i]){
          this.$message('不能为空')
          return false
        }else{
          this.$router.push({
            path: '/air/flights',
            query: this.form
          })
        }
      }
      // 添加的操作需要回到机票首页的搜索表单中，搜索跳转时把搜索的记录添加到本地。
      // 将当前搜索的数据放入vuex
      // 作为历史记录保持
      // 不能直接赋值vuex,要使用muations
      this.$store.commit('history/addHistoryItem',this.form)
      console.log(this.form);
    },

    reverseCity(){
      // 这里面需要做的事情是将出发地和到达地互换
      // this.form.departCity = this.form.destCity;
      // 如果这样子的话 那么数据就会丢失
      // 应该先创建临时变量储存
      const {destCity,destCode,departCity,departCode} =this.form
      this.form.departCity=destCity
      this.form.departCode=destCode
      this.form.destCity=departCity
      this.form.destCode=departCode
    }
  }
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  margin-bottom: 20px;
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
