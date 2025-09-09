import { ref } from 'vue'
import { url } from '../constants/endPoint'

const data = ref([])

export function usePostPeopleDetail() {
	const postPeoples = async (params) => {
		const formData = new FormData()

		formData.append('descricao ', params.descricao)
		formData.append('informacao', params.informacao)
		formData.append('data', params.data)
		formData.append('ocoId', params.ocoId)

		if (params.files && params.files.length > 0) {
			params.files.forEach((file, index) => {
				formData.append('files', file)
			})
		}

		const withParams = `${url}v1/ocorrencias/informacoes-desaparecido`

		const response = await fetch(withParams, {
			method: 'POST',
			body: formData,
		})

		const res = await response.json()
		data.value = res.content
		return res
	}

	const clearData = () => {
		data.value = []
	}

	return { data, postPeoples, clearData }
}
