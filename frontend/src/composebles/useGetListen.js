import { url } from '../constants/endPoint'

export function useGetListen() {
	const getPeoples = async () => {
		const response = await fetch(`${url}v1/pessoas/aberto/dinamico?registros=55`)

		const data = await response.json()

		return data
	}
	return { getPeoples }
}
