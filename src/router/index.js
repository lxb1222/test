import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: "/",
			redirect: "/index",
		},
		{
			path: "/index",
			component: () => import("@/views/index/index"),
			meta: {
				// keepAlive: true,
			},
		},
		{
			path: "/park-details",
			meta: {},
			component: () => import("@/views/park-details/index"),
		},
		{
			path: "/column-list",
			component: () => import("@/views/column-list/index"),
		},
	],
});

router.beforeEach((to, from, next) => {
	let { title, needLogin } = to.meta;
	let { isLogin } = store.state;
	// document.title = title;

	if (needLogin && !isLogin) {
		next({
			path: "/login",
		});
	} else {
		next();
	}
});

export default router;
