import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
	state: {
		cartList: [],
		numTotal: 0,
		priceTotal: 0
	},
	mutations: {
		addCartData (state, data) {
			let flag = true
			state.cartList.forEach(goods => {
				if (goods.sku_id === data.sku_id) {
					goods.count++
					flag = false
				}
			})
			if (flag) {
				Vue.set(data, 'count', 1)
				state.cartList.push(data)
			}
		}
	},
	getters: {
		calNumToal: state => {
			let total = 0
			state.cartList.forEach(goods => {
				total += goods.count
			})
			state.numTotal = total
			return state.numTotal
		},
		calPriceTotal (state) {
			let total = 0
			state.cartList.forEach(goods => {
				total += goods.count * goods.price
			})
			state.priceTotal = total
			return state.priceTotal
		}
	}
})

export default store