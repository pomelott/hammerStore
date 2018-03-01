<template>
	<div id="pop">
    <div class="module-dialog-layer" style="display: block;"></div>
      <div class="module-dialog clear module-dialog-address module-dialog-show">
        <div class="dialog-panel">
            <div class="topbar">
                <div class="dialog-tit clear">
                    <h4 class="js-dialog-title">管理收货地址</h4>
                </div>
                <span class="dialog-close" @click='closePopHandle'>x</span>
            </div>
            <div class="dialog-con js-dialog-container">
                <div class="animate-layer">
                    <div class="dialog-inner js-address-add">
                        <div class="save-address-box">
                            <div class="address-form">
                                <div class="module-form-row">
                                    <div class="form-item-v3">
                                        <input type="text" class="js-verify" v-model='receive.name' @blur='judgeName' placeholder="收货人姓名">
                                        <div class="verify-error" v-if='nameErr'>姓名格式错误</div>
                                    </div>
                                </div>
                                <div class="module-form-row">
                                    <div class="form-item-v3">
                                        <input type="text" class="js-verify" v-model='receive.phone' @blur='judgePhone' placeholder="手机号">
                                        <div class="verify-error" v-if='phoneErr'>手机号码错误</div>
                                    </div>
                                </div>
                                <div class="module-form-row clear">
                                    <div class="form-item-v3 area-code-w fn-left form-valid-item">
                                        <input type="text" class="js-verify js-address-area-code" v-model='receive.areaCode' placeholder="区号（可选）">
                                        <div class="verify-error"></div>
                                    </div>
                                    <div class="form-item-v3 telephone-w fn-right form-valid-item">
                                        <input type="text" class="js-verify js-address-telephone" v-model='receive.landLine' placeholder="固定电话（可选）">
                                        <div class="verify-error"></div>
                                    </div>
                                </div>
                                <div class="module-form-row clear">
                                    <div class="form-item-v3 select-item province-wrapper">
                                        <select name="province_code" class="province select-province js-form-province js-verify" v-model='receive.provinceId'>
                                            <option value="0">请选择省份</option>
                                            <option :value="item.area_id" v-for='(item, index) in mapList' :key='index'>{{item.area_name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="module-form-row clear">
                                    <div class="form-item-v3 select-item city-wrapper fn-left form-focus-item">
                                        <select class="city select-city js-form-city js-verify" v-model='receive.cityId'>
                                            <option value="0">请选择城市</option>
                                            <option :value="city.area_id" v-for='(city, index) in cityList' :key='index'>{{city.area_name}}</option>
                                        </select>
                                    </div>
                                    <div class="form-item-v3 select-item district-wrapper fn-right form-focus-item">
                                        <select class="city select-city js-form-city js-verify" v-model='receive.countyId'>
                                            <option value="0">请选择区县</option>
                                            <option :value="item.area_id" v-for='(item, index) in countyList' :key='index'>{{item.area_name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="module-form-row">
                                    <div class="form-item-v3">
                                        <input type="text" class="js-verify" placeholder="请输入详细地址" v-model='receive.add'>
                                        <div class="verify-error"></div>
                                    </div>
                                </div>
                                <div class="module-form-row fn-clear" @click.stop='setDefault' style='cursor: pointer'>
                                    <input type="checkbox" class="hide" >
                                    <span class="blue-checkbox" :class="{'blue-checkbox-on': receive.default}"></span>设为默认
                                </div>
                                <div class="dialog-blue-btn big-main-btn  js-verify-address" @click.stop='saveNewAddHandle' :class="{'disabled-btn': !allChecked}">
                                    <a>保存</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
  import mapList from '@/lib/addList'// 省市县地址数据
  export default {
    data () {
        return {
          // 临时地址数据
          receive: {
            'name':'',
            'phone': '',
            'areaCode': '',
            'landLine': '',
            'provinceId': 0,
            'province': '',
            'cityId': 0,
            'city': '',
            'countyId': 0,
            'county': '',
            'add': '',
            'default': false,
            'checked': false
          },
          mapList,
          phoneErr: false,// 手机号码检测
          nameErr: false,// 姓名检测
          allChecked: false// 检测地址数据是否填写完整
        }
    },
    methods: {
      // 关闭新增地址弹出窗
      closePopHandle () {
        this.$emit('closepop')
      },
      // 判断电话格式是否合理
      judgePhone () {
        if (this.receive.phone.length === 11) {
          this.phoneErr = false
        } else {
          this.phoneErr = true
        }
      },
      // 判断地址姓名是否合理
      judgeName () {
        let reg = /^[\u4e00-\u9fa5_a-zA-Z]{2,12}$/g
        console.log(this.receive.name.match(reg))
        if (this.receive.name.match(reg)) {
          this.nameErr = false
        } else {
          this.nameErr = true
        }
      },
      // 设置是否为默认地址
      setDefault () {
        this.receive.default = !this.receive.default
      },
      // 保存新增数据
      saveNewAddHandle () {
        this.$store.commit('saveNewAdd', this.receive)
        this.$emit('closepop')// 触发自定义事件closepop必须在commit之后(保证新增的地址先被提交至store中)
      }
    },
    computed: {
      // 过滤市数据
      cityList () {
        let city = []
        this.mapList.forEach((item) => {
          if (item.area_id === this.receive.provinceId) {
            city = item.city_list
          }
        })
        return city
      },
      // 过滤县乡数据
      countyList () {
        let county = []
        this.cityList.forEach((item) => {
          if (item.area_id === this.receive.cityId) {
            county = item.county_list
          }
        })
        return county
      }
    },
    watch: {
      // 监控省下拉菜单
      'receive.provinceId': function (val) {
          this.mapList.forEach((item) => {
            if (item.area_id === val) {
               this.receive.province = item.area_name
            }
          })
          if (val === '0') {
            this.receive.cityId = 0
            this.receive.countyId = 0
          }
      },
      // 监控市下拉菜单
      'receive.cityId': function (val) {
          if (val === '0') {
            this.receive.countyId = 0
          }
          this.cityList.forEach((item) => {
            if (item.area_id === val) {
               this.receive.city = item.area_name
            }
          })
      },
      // 监控县区下拉菜单
      'receive.countyId': function (val) {
          this.countyList.forEach((item) => {
            if (item.area_id === val) {
               this.receive.county = item.area_name
            }
          })
      },
      // 检测数据是否填写完整
      receive: {
        handler () {
          if (!this.phoneErr && this.receive.name && this.receive.phone && !this.nameErr && this.receive.province && this.receive.city && this.receive.county && this.receive.add) {
            this.allChecked = true
          } else {
            this.allChecked = false
          }
        },
        deep:true
      }
    }
  }
</script>