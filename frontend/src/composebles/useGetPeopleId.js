import { url } from '../constants/endPoint'

export function useGetPeopleId() {
	const getPeople = async (id) => {
		const response = await fetch(`${url}v1/pessoas/${id}`)
		const data = await response.json()
		return data
	}

	return { getPeople }
}
