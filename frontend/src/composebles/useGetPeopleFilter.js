import { ref } from 'vue'
import { url } from '../constants/endPoint'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const data = ref([])

export function useGetPeopleFilter() {
	const getPeoples = async (params) => {
		const withParams = `${url}v1/pessoas/aberto/filtro?${params}`

		const reponse = await fetch(withParams, {
			method: 'GET',
			headers: {
				accept: '*/*',
			},
		})

		let res = await reponse.json()

		if (res.content.length === 0) {
			Swal.fire({
				icon: 'error',
				title: 'Nenhum resultado encontrado.',
				text: 'Verifique os dados e tente  novamente com outros filtros.',
				confirmButtonText: 'Ok',
			})
			return null
		} else {
			data.value = res.content
			return res
		}
	}

	const clearData = () => {
		data.value = []
	}

	return { data, getPeoples, clearData }
}
