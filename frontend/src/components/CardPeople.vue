<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useGetStatus } from '../composebles/useFilter'
import { useGetPeopleFilter } from '../composebles/useGetPeopleFilter'
import { useGetListen } from '../composebles/useGetListen'
import { useFormatDate } from '../composebles/useFormatDate'

const { formatDate } = useFormatDate()
const { getPeoples } = useGetListen()

const { data } = useGetPeopleFilter()

const allPeoples = ref([])
const storePeople = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(12)

onMounted(async () => {
	allPeoples.value = await (<any>getPeoples())
	storePeople.value = allPeoples.value
})

watch(
	data,
	(newValue) => {
		if (newValue.length > 0) {
			allPeoples.value = newValue
		} else {
			allPeoples.value = storePeople.value
		}
	},
	{ deep: true, immediate: true },
)

const totalPages = computed(() => {
	return Math.ceil(allPeoples.value.length / itemsPerPage.value)
})

const currentPageData = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage.value
	const end = start + itemsPerPage.value
	return allPeoples.value.slice(start, end)
})

const pageNumbers = computed(() => {
	const pages = []
	for (let i = 1; i <= totalPages.value; i++) {
		pages.push(i)
	}
	return pages
})

const goToPage = (page: number) => {
	if (page >= 1 && page <= totalPages.value) {
		currentPage.value = page
	}
}

const previousPage = () => {
	if (currentPage.value > 1) {
		currentPage.value--
	}
}

const nextPage = () => {
	if (currentPage.value < totalPages.value) {
		currentPage.value++
	}
}
</script>

<template>
	<div id="main-content" class="content-main">
		<div class="container mx-auto px-6 py-4 flex flex-col justify-between items-center">
			<div id="title-card-content" class="mb-7">
				<h1 class="text-3xl font-bold text-primary mx-auto uppercase">Resultado</h1>
			</div>
			<div id="card-info" class="w-full">
				<div
					class="card-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 tablets-desktop:grid-cols-2 gap-11"
				>
					<div
						class="card-people flex flex-col bg-gray-100 rounded-b-2 mx-2 shadow-md rounded-lg relative"
						v-for="people in currentPageData"
						:key="people.id"
					>
						<div class="card-header p-2 h-72 mobile-tablet:h-3/5">
							<img
								class="img rounded-lg w-full h-full object-cover object-top"
								:src="people?.urlFoto ?? '/images/no-image.webp'"
								alt="Pessoa Imagem"
							/>
							<div class="card-flag">
								<span
									:class="[
										'flag-info font-bold text-white text-xs px-3 py-1 absolute right-0',
										{
											located:
												people.ultimaOcorrencia.dataLocalizacao != null,
										},
									]"
								>
									{{
										people.ultimaOcorrencia.dataLocalizacao == null
											? 'Desaparecida'
											: 'Localizada'
									}}
								</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 640 640"
									class="flag-icon absolute"
								>
									<path
										d="M224.5 160C224.5 147.1 232.3 135.4 244.3 130.4C256.3 125.4 270 128.2 279.1 137.4L439.1 297.4C451.6 309.9 451.6 330.2 439.1 342.7L279.1 502.7C269.9 511.9 256.2 514.6 244.2 509.6C232.2 504.6 224.5 492.9 224.5 480L224.5 160z"
									/>
								</svg>
							</div>
						</div>
						<div class="card-body px-3 py-1 relative pb-11">
							<div class="card-content-head">
								<h2 class="card-name font-bold uppercase">{{ people.nome }}</h2>
							</div>
							<div class="card-content-body my-1">
								<h3 class="card-age text-gray-700">
									{{ people.idade }} anos,
									<span class="card-generous">{{ people.sexo == 'MASCULINO' ? 'Masculino' : 'Feminino' }}</span>
								</h3>
							</div>
							<div class="card-content-footer flex flex-col my-1">
								<span class="more-infos-date">
									<strong>Data: </strong
									>{{ formatDate(people.ultimaOcorrencia.dtDesaparecimento) }}
								</span>
								<span class="more-infos-location">
									<strong>Local: </strong
									>{{ people.ultimaOcorrencia.localDesaparecimentoConcat }}
								</span>
								<span
									class="more-infos-details"
									v-if="
										people.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
											?.vestimentasDesaparecido &&
										![
											'NÃO INFORMADO',
											'N/I',
											'n/i',
											'Não Informado',
											null,
											'',
										].includes(
											people.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
												?.vestimentasDesaparecido,
										)
									"
								>
									<strong>Detalhes: </strong
									>{{
										people.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
											?.vestimentasDesaparecido
									}}
								</span>
							</div>
						</div>
						<div class="card-footer">
							<a :href="'/details/' + people.id" class="card-link absolute">
								<span class="sr-only absolute"></span>
							</a>
						</div>
					</div>
				</div>
			</div>

			<div id="pagination" v-if="totalPages > 1">
				<div class="box-pagination">
					<button
						@click="previousPage"
						:disabled="currentPage === 1"
						class="pagination-btn pagination-prev"
						:class="{ disabled: currentPage === 1 }"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<polyline points="15,18 9,12 15,6"></polyline>
						</svg>
						Anterior
					</button>

					<div class="pagination-numbers">
						<button
							v-for="page in pageNumbers"
							:key="page"
							@click="goToPage(page)"
							class="pagination-number"
							:class="{ active: page === currentPage }"
						>
							{{ page }}
						</button>
					</div>

					<button
						@click="nextPage"
						:disabled="currentPage === totalPages"
						class="pagination-btn pagination-next"
						:class="{ disabled: currentPage === totalPages }"
					>
						Próximo
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<polyline points="9,18 15,12 9,6"></polyline>
						</svg>
					</button>
				</div>

				<div class="pagination-info">
					<span>
						Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} -
						{{ Math.min(currentPage * itemsPerPage, allPeoples.length) }}
						de {{ allPeoples.length }} pessoas
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.card-people {
	min-height: 510px;
	transition:
		transform 0.25s ease-out,
		filter 0.25s ease-out,
		opacity 0.25s ease-out,
		box-shadow 0.25s ease-out;
}

.card-people:hover {
	transform: scale(1.02);
	box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
	transition:
		transform 0.32s cubic-bezier(0.22, 0.61, 0.36, 1),
		box-shadow 0.32s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.card-content:has(.card-people:hover) .card-people:not(:hover) {
	box-shadow: 3px 3px 18px 5px gray;
	filter: blur(0.062rem);
	opacity: 0.8;
	transform: scale(0.97);
	transition:
		transform 0.3s ease,
		filter 0.3s ease,
		opacity 0.3s ease;
}

.flag-info {
	top: 39%;
	left: auto;
	bottom: auto;
	background-color: var(--red);
	color: var(--light);
	transform: translateX(6px);
}

.flag-info.located {
	background-color: var(--locate);
}

.flag-icon {
	width: 20px;
	right: -12px;
	fill: rgb(184, 0, 0);
	bottom: 54%;
	z-index: -2;
}

.flag-info.located + .flag-icon {
	fill: var(--locate);
}

.card-link {
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	text-decoration: none;
}

.sr-only {
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}

#pagination {
	width: 100%;
	margin-top: 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 15px;
}

.box-pagination {
	display: flex;
	align-items: center;
	gap: 15px;
	flex-wrap: wrap;
	justify-content: center;
}

.pagination-btn {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 10px 16px;
	background: #f8f9fa;
	border: 1px solid #dee2e6;
	border-radius: 6px;
	color: #495057;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease;
}

.pagination-btn:hover:not(.disabled) {
	background: #e9ecef;
	border-color: #adb5bd;
}

.pagination-btn.disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.pagination-numbers {
	display: flex;
	gap: 5px;
}

.pagination-number {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: 1px solid #dee2e6;
	background: #fff;
	color: #495057;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease;
	display: flex;
	align-items: center;
	justify-content: center;
}

.pagination-number:hover {
	background: #f8f9fa;
	border-color: #adb5bd;
}

.pagination-number.active {
	background: var(--primary);
	color: white;
	border-color: var(--primary);
}

.pagination-info {
	color: #6c757d;
	font-size: 14px;
	text-align: center;
}

@media (max-width: 768px) {
	.box-pagination {
		flex-direction: column;
		gap: 10px;
	}

	.pagination-numbers {
		order: -1;
	}

	.pagination-number {
		width: 35px;
		height: 35px;
		font-size: 14px;
	}

	.pagination-btn {
		padding: 8px 12px;
		font-size: 14px;
	}
}

@media (max-width: 992px) {
	.card-flag {
		transform: translate(8px, -17px);
	}

	.flag-info {
		top: auto;
		transform: translate(6px, -13px);
	}

	.flag-icon {
		bottom: unset;
	}
}
</style>
