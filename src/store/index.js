import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
	state: {
		cartList: [],// 购物车数据
		// 收货信息
		receiveInfo: [{
	      'name': '王某某',
	      'phone': '13811111111',
	      'areaCode': '010',
	      'landLine': '64627856',
	      'provinceId': 110000,
	      'province': '北京市',
	      'cityId': 110100,
	      'city': '市辖区',
	      'countyId': 110106,
	      'county': '海淀区',
	      'add': '上地十街辉煌国际西6号楼319室',
	      'default': true,
	      'checked': true
	    },{
	      'name': '李某某',
	      'phone': '13811111111',
	      'areaCode': '010',
	      'landLine': '64627856',
	      'provinceId': 110000,
	      'province': '北京市',
	      'cityId': 110100,
	      'city': '市辖区',
	      'countyId': 110106,
	      'county': '海淀区',
	      'add': '上地十街辉煌国际东6号楼350室',
	      'default': false,
	      'checked': false
	    }],
		numTotal: 0, // 购物车商品总数量
		priceTotal: 0,// 购物车商品总价格
		modelFlag: false,// 弹出层开关
		cartShowFlag: false,// 购物车开关
		// 添加至购物车时显示的小球
		ball: {
			show: false,
			el: null,
			img: ''
		},
		orderList:[]
	},
	mutations: {
		// 将商品列表添加至购物车
		addCartData (state, data) {
			let flag = true// 是否为未加过的商品(包括规格颜色不同的商品)
			if (!state.ball.show) { // 小球未显示时才能继续添加商品(用于解决连续点击的bug)
				state.cartList.forEach(goods => {
					if (goods.sku_id === data.itemInfo.sku_id) {
						if (goods.count >= goods.limit_num) { // 超过规定数量后显示模态框
							state.modelFlag = true
						} else {
							goods.count += data.count// 购物车有相同类型商品，数量增加相应的值
							// 初始化小球数据
							state.ball.el = event.path[0]
							state.ball.show = true
							state.ball.img = data.itemInfo.ali_image
							state.cartShowFlag = true// 每添加一次显示模态框
						}
						flag = false
					}
				})
				if (flag) {
					Vue.set(data.itemInfo, 'count', data.count)// 购物车没有相同类型商品，则将新商品添加至cartList中，并将数量设置为1
					Vue.set(data.itemInfo, 'checked', true)// 购物车没有相同类型商品，则将新商品添加至cartList中，并将选中状态设置为true
					state.cartList.push(data.itemInfo)
					state.cartShowFlag = true// 每添加一次显示模态框
					// 初始化小球数据
					state.ball.el = event.path[0]
					state.ball.show = true
					state.ball.img = data.itemInfo.ali_image
				}
			}
		},
		// 从购物车删除商品
		doDelGoods (state, data) {
			let nowIndex = state.cartList.indexOf(data)
			// let nowCount = state.cartList[nowIndex].count
			// nowCount--
			// Vue.set(state.cartList[nowIndex], 'count', nowCount)
			// if (!nowCount) {
				state.cartList.splice(nowIndex, 1)
			// }
		},
		// 在购物车中增加商品
		plusCartNum (state, id) {
			state.cartList.forEach((goods) => {
				if (goods.sku_id === id) {
					if (goods.count >= goods.limit_num) return
					goods.count++
				}
			})
		},
		// 在购物车中减少商品
		subCartNum (state, id) {
			state.cartList.forEach((goods) => {
				if (goods.sku_id === id) {
					if (goods.count <= 1) return
					goods.count--
				}
			})
		},
		// 关闭模态框
		closeModel (state) {
			state.modelFlag = false
		},
		// 控制头部的购物车显示
		showCart (state) {
			state.cartShowFlag = true
		},
		// 控制头部的购物车消失
		hideCart (state) {
			state.cartShowFlag = false
		},
		// 购物车中控制商品是否选中
		changeChecked (state, id) {
			state.cartList.forEach((goods) => {
				if (goods.sku_id === id) {
					goods.checked = !goods.checked
				}
			})
		},
		// 控制购物车中的全选
		changeAllChecked (state, allChecked) {
			state.cartList.forEach((goods) => {
				goods.checked = !allChecked
			})
		},
		// 删除购物车中选中的商品
		delChoseGoods (state) {
			let i = state.cartList.length
			while (i--) {
				console.log(state.cartList[i].checked)
				if (state.cartList[i].checked) {
					state.cartList.splice(i, 1)
				}
			}
		},
		// 保存新增地址
		saveNewAdd (state, newAdd) {
			if (newAdd.default) {
				state.receiveInfo.forEach((goods) => {
					goods.default = false
				})
			}
			state.receiveInfo.push(newAdd)
		},
		// 提交订单
		subOrd (state, ord) {
			// 将新订单保存
			state.orderList.unshift(ord)
			// 将购物车中选中提交至订单的商品删掉
			let i = state.cartList.length
			while (i--) {
				if (state.cartList[i].checked) {
					state.cartList.splice(i, 1)
				}
			}
		},
		// 支付完成
		payOrdNow (state, ordId) {
			state.orderList.forEach((ord) => {
				if (ord.orderId === ordId) {
					ord.isPay = true
				}
			})
		}
	},
	actions: {
		hideCartAct ({commit}) {
			setTimeout(() => {
				commit('hideCart')
			}, 500)
		}
	},
	getters: {
		// 计算购物车中的总数量
		calNumToal: state => {
			let total = 0
			state.cartList.forEach(goods => {
				total += goods.count
			})
			state.numTotal = total
			return state.numTotal
		},
		// 计算购物车中的总价格
		calPriceTotal (state) {
			let total = 0
			state.cartList.forEach(goods => {
				total += goods.count * goods.price
			})
			state.priceTotal = total
			return state.priceTotal
		},
		// 购物车页面是否为全选
		judgeAllChecked (state) {
			let allChecked = true
			state.cartList.forEach((goods) => {
				if (!goods.checked) {
					allChecked = false
					// return
				}
			})
			return allChecked
		},
		// 返回购物车中选中商品的总数量
		choseAllNum (state) {
			let choseAllNum = 0
			state.cartList.forEach((goods) => {
				if (goods.checked) {
					choseAllNum += goods.count
				}
			})
			return choseAllNum
		},
		// 返回购物车中选中商品的总价格
		choseAllTotalPrice (state) {
			let choseAllPrice = 0
			state.cartList.forEach((goods) => {
				if (goods.checked) {
					choseAllPrice += goods.count * goods.price
				}
			})
			return choseAllPrice
		},
		// 返回结算页面的商品（购物车中选中的商品）
		toCheckGoods (state) {
			let checkGoods = []
			state.cartList.forEach((goods) => {
				if (goods.checked) {
					checkGoods.push(goods)
				}
			})
			return checkGoods
		}
	}
})

export default store