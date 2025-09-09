<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGetPeopleFilter } from '../composebles/useGetPeopleFilter'
import { useGetStatus } from '../composebles/useFilter'

const { status, updateStatus, nameGenerous, statusGenerous } = useGetStatus()
const { getPeoples, clearData } = useGetPeopleFilter()
const params = ref('')

const name = ref('')
const ageMin = ref('')
const ageMax = ref('')
const peopleFiltered = ref()

const filterPeople = async () => {
	withParams()
	peopleFiltered.value = await getPeoples(params.value)
	peopleFiltered.value.content.map((people: any) => {})
}

const clearFilter = () => {
	name.value = ''
	ageMin.value = ''
	ageMax.value = ''
	clearData()
}

const withParams = () => {
	params.value = `nome=${name.value}&faixaIdadeInicial=${ageMin.value}&faixaIdadeFinal=${ageMax.value}&sexo=${nameGenerous.value}&pagina=${0}&porPagina=${10}&status=${status.value}`
}
</script>

<template>
	<div id="filter-people">
		<div class="container mx-auto px-6 py-4">
			<div class="bg-light-200 flex flex-row justify-center items-center">
				<div class="filter-main w-full lg:w-3/6 bg-white p-4 rounded-md">
					<div class="button-check flex flex-col">
						<h2 class="filter-text font-bold text-xl text-primary text-center">
							FILTRE SUA BUSCA
						</h2>
						<div
							class="content-filter-header my-4 mobile-tablet:flex mobile-tablet:justify-center"
						>
							<button
								id="desaparecido"
								:class="[
									'select-filter p-1 mx-4 font-bold text-dark border-b-2 border-solid border-transparent',
									{ active: status === 'DESAPARECIDO' },
								]"
								@click="updateStatus('DESAPARECIDO')"
							>
								DESPARECIDOS
							</button>
							<button
								id="encontrado"
								:class="[
									'select-filter p-1 mx-4 font-bold text-dark border-b-2 border-solid border-transparent mobile-tablet:flex mobile-tablet:justify-center',
									{ active: status === 'LOCALIZADO' },
								]"
								@click="updateStatus('LOCALIZADO')"
							>
								LOCALIZADOS
							</button>
						</div>
						<div class="content-filter-main mb-4 mx-2">
							<div class="content-filter-peoples">
								<div
									class="content-filter-generous mobile-tablet:flex mobile-tablet:justify-around"
								>
									<button
										id="masculino"
										:class="[
											'generous male rounded-3xl font-bold border-b-2  px-4 py-2 border-solid border-transparent',
											{ active: nameGenerous === 'MASCULINO' },
										]"
										@click="statusGenerous('MASCULINO')"
									>
										Masculino
									</button>
									<button
										id="feminino"
										:class="[
											'generous female rounded-3xl font-bold border-b-2  px-4 py-2 border-solid border-transparent',
											{ active: nameGenerous === 'FEMININO' },
										]"
										@click="statusGenerous('FEMININO')"
									>
										Feminino
									</button>
								</div>
								<div class="more-details-filter mt-4">
									<div
										class="name-people flex flex-row p-2 gap-2 border-2 border-solid border-gray-300 rounded"
									>
										<div class="search-name">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 640 640"
											>
												<path
													d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"
												/>
											</svg>
										</div>
										<input
											id="name-people"
											class="input-name w-full font-bold"
											type="text"
											key="name"
											v-model="name"
											placeholder="Digite o nome da pessoa"
										/>
									</div>
								</div>
							</div>
						</div>
						<div
							class="content-filter-footer mb-4 flex gap-3 mx-2 mobile-tablet:flex-wrap"
						>
							<input
								id="age-min"
								v-mask="'##'"
								class="border-2 px-2 py-1 border-solid border-gray-300 rounded w-full"
								type="number"
								v-model="ageMin"
								key="age-min"
								min="0"
								max="190"
								placeholder="Idade Minima"
							/>
							<input
								id="age-max"
								v-mask="'###'"
								class="border-2 px-2 py-1 border-solid border-gray-300 rounded w-full"
								type="number"
								v-model="ageMax"
								key="age-max"
								min="0"
								max="190"
								placeholder="Idade Máxima"
							/>
							<button
								class="checkout-filter bg-primary text-white font-bold rounded px-5 py-2 w-full text-center"
								@click="filterPeople()"
							>
								BUSCAR
							</button>
							<button
								class="clear-filter bg-secondary text-primary border-2 border-solid border-primary font-bold rounded px-5 py-2 w-full text-center"
								@click="clearFilter()"
							>
								LIMPAR
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
#filter-people {
	z-index: -1;
}

.select-filter {
	color: var(--gray-disable);
}

.select-filter.active {
	color: var(--dark);
	border-color: var(--primary);
}

#name-people::placeholder,
#age-max::placeholder,
#age-min::placeholder {
	color: var(--gray-disable);
	font-size: 0.9rem;
	font-weight: bold;
}
</style>
