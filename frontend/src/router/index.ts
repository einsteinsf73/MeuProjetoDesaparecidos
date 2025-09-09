import { createRouter, createWebHistory } from 'vue-router'
import LayoutDefault from '@/layouts/LayoutDefault.vue'
import LayoutDetails from '@/layouts/LayoutDetail.vue'
import CardPeople from '@/components/CardPeople.vue'
import PeopleDetail from '@/components/PeopleDetail.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '',
			component: LayoutDefault,
			children: [
				{
					path: '',
					name: 'home',
					component: CardPeople,
				},
			],
		},
		{
			path: '/details/:id',
			component: LayoutDetails,
			children: [
				{
					path: '',
					name: 'details',
					component: PeopleDetail,
				},
			],
		},
	],
})

export default router
