import { ref } from 'vue'

export const useFormatDate = () => {
	const DatePeople = ref({
		ultimaOcorrencia: {
			dtDesaparecimento: '2025-01-13T21:00:00',
		},
	})

	const formatDate = (date) => {
		const data = new Date(date)
		return data.toLocaleDateString('pt-BR')
	}

	return { formatDate, DatePeople }
}
