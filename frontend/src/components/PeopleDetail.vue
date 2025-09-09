<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGetPeopleId } from '../composebles/useGetPeopleId'
import { useFormatDate } from '../composebles/useFormatDate'
import Modal from './ModalDetail.vue'

const { formatDate } = useFormatDate()
const { getPeople } = useGetPeopleId()

const today = ref(new Date())
const route = useRoute()
const people = ref<any>([])

const dayDifference = computed(() => {
	if (!people.value?.ultimaOcorrencia?.dtDesaparecimento) return 0
	const dateApi = new Date(people.value.ultimaOcorrencia.dtDesaparecimento)
	const difference = today.value.getTime() - dateApi.getTime()
	return Math.floor(difference / (1000 * 3600 * 24))
})

onMounted(async () => {
	people.value = await getPeople(route.params.id)
})
</script>

<template>
	<div id="detail-people">
		<div class="container mx-auto px-6 py-4">
			<div
				v-if="people && people?.ultimaOcorrencia"
				class="main-details w-full flex justify-center align-center mobile-tablet:flex-col"
			>
				<div
					class="left-detail bg-white p-4 flex justify-center align-center items-center flex-col rounded-tl-xl rounded-bl-xl mobile-tablet:rounded-tr-xl mobile-tablet:rounded-bl-none"
				>
					<div class="text-detail lg:hidden mb-3">
						<h1 class="detail-name text-2xl font-bold text-primary text-center">
							{{ people.nome }}
						</h1>
						<h2 class="detail-importants text-center text-cian text-lg font-bold">
							{{ people.idade }} anos - {{ people.sexo }}
						</h2>
					</div>
					<div
						:class="[
							'image-content rounded-xl lg:w-80 mobile-tablet:w-full',
							{
								whereBorder: people?.ultimaOcorrencia?.dataLocalizacao == null,
							},
						]"
					>
						<img
							class="img people-detail-img rounded-lg w-full h-full object-cover object-top"
							:src="people.urlFoto ?? '/images/no-image.webp'"
							alt=""
						/>
					</div>
					<h2
						:class="[
							'text-status text-2xl font-bold text-white rounded-full text-center mx-auto my-3 p-3 mt-0 ml-0',
							{
								where: people?.ultimaOcorrencia?.dataLocalizacao == null,
							},
						]"
					>
						{{
							people?.ultimaOcorrencia?.dataLocalizacao == null
								? 'Desaparecido'
								: 'Localizada'
						}}
					</h2>
					<div
						v-if="people?.ultimaOcorrencia?.dataLocalizacao == null"
						class="help-with-detail"
					>
						<div id="modal">
							<Modal :oco-Id="people?.ultimaOcorrencia?.ocoId" />
						</div>
					</div>
				</div>
				<div
					class="right-detail bg-white w-3/6 p-4 rounded-tr-xl rounded-br-xl mobile-tablet:w-full mobile-tablet:rounded-tr-none mobile-tablet:rounded-bl-xl"
				>
					<div class="detail-people w-full bg-white px-3 py-2">
						<div class="text-detail hidden lg:block">
							<h1 class="detail-name text-3xl font-bold text-primary text-center">
								{{ people.nome }}
							</h1>
							<h2 class="detail-importants text-center text-cian text-lg font-bold">
								{{ people.idade }} anos - {{ people.sexo == 'MASCULINO' ? 'Masculino' : 'Feminino' }}
							</h2>
						</div>
						<div class="info-details mt-6">
							<div class="info-detail">
								<h3 class="info-title font-bold border-b-2 border-solid text-xl">
									{{
										people?.ultimaOcorrencia?.dataLocalizacao == null
											? 'Mais informações'
											: 'Informações sobre a localização'
									}}
								</h3>
								<div class="info-date mt-3">
									<p class="date-info-details text-lg">
										<span class="font-bold">Data:</span>
										{{ formatDate(people.ultimaOcorrencia.dtDesaparecimento) }}
									</p>
								</div>
								<div
									v-if="people?.ultimaOcorrencia?.dataLocalizacao == null"
									class="info-locate mt-1"
								>
									<p class="locate-info-details text-lg">
										<span class="font-bold">Local:</span>
										{{ people.ultimaOcorrencia.localDesaparecimentoConcat }}
									</p>
								</div>
								<div
									v-if="people?.ultimaOcorrencia?.dataLocalizacao == null"
									class="info-clothing mt-1"
								>
									<p class="clothing-info-details text-lg">
										<span class="font-bold">Vestimentas:</span>
										{{
											people.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
												.vestimentasDesaparecido
										}}
									</p>
								</div>
								<div
									v-if="
										people?.ultimaOcorrencia?.dataLocalizacao == null &&
										people?.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO
											?.informacao &&
										!['N/I', '', 'Não informado', 'NÃO INFORMADO'].includes(
											people?.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO
												?.informacao
										)
									"
									class="info-additional mt-1"
								>
									<p class="vest-info-details text-lg">
										<span class="font-bold">Informações adicionais:</span>
										{{
											people.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
												.informacao
										}}
									</p>
								</div>
								<div
									v-if="people?.ultimaOcorrencia?.dataLocalizacao == null"
									class="info-days-difference mt-1"
								>
									<h2
										class="days-difference-details text-lg bg-red-600 text-white p-3 rounded-md flex flex-row justify-center items-center gap-1 w-content flex-wrap text-center"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 640 640"
										>
											<path
												d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 384C302.3 384 288 398.3 288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416C352 398.3 337.7 384 320 384zM320 192C301.8 192 287.3 207.5 288.6 225.7L296 329.7C296.9 342.3 307.4 352 319.9 352C332.5 352 342.9 342.3 343.8 329.7L351.2 225.7C352.5 207.5 338.1 192 319.8 192z"
											/></svg
										>Faz
										<strong class="text-xl">{{ dayDifference }}</strong> dias
										desde o desaparecimento
									</h2>
								</div>
								<div
									v-if="people?.ultimaOcorrencia?.dataLocalizacao != null"
									class="location-safe"
								>
									<p class="location-safe-details text-lg">
										<strong>Encontrado vivo:</strong>
										{{ people.ultimaOcorrencia.encontradoVivo ? 'Sim' : 'Não' }}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-else class="else-div-details w-full h-full d-flex justify-center align-center">
				<span class="loader"></span>
			</div>
		</div>
	</div>
</template>

<style scoped>
.image-content {
	border: 3px solid var(--locate);
	border-bottom-left-radius: 0px;
	height: auto;
}

.people-detail-img {
	border-bottom-left-radius: 0px;
}

.text-status {
	background-color: var(--locate);
	width: fit-content;
	border-top-left-radius: 0;
}

.where {
	background-color: var(--red);
}

.whereBorder {
	border: 3px solid var(--red);
}

.detail-name::after {
	content: '';
	height: 3px;
	background-color: var(--cian);
	display: flex;
	position: relative;
	transform: scaleX(0.5);
}

.days-difference-details {
	width: fit-content;
}

.days-difference-details path {
	fill: var(--light);
}

.loader {
	width: 48px;
	height: 48px;
	border: 5px solid #fff;
	border-bottom-color: var(--cian);
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;
}

@keyframes rotation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

</style>
