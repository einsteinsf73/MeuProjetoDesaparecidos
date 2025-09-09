<script setup lang="ts">
import { ref } from 'vue'
import { usePostPeopleDetail } from '../composebles/usePostPeopleDetail'
import Swal, { SweetAlertResult } from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const { postPeoples } = usePostPeopleDetail()

const props = defineProps({ocoId: {type: Number, required: true}})

const isModalOpen = ref(false)

const infoText = ref('')
const infoDate = ref('')
const descText = ref('')
const infoImage = ref<File | null>(null)
const ocoId = ref(props.ocoId)

const openModal = () => {
	isModalOpen.value = true
}
const closeModal = () => {
	isModalOpen.value = false
}

const handleImageUpload = (event: Event) => {
	const target = event.target as HTMLInputElement
	if (target.files && target.files.length > 0) {
		infoImage.value = target.files[0]
	}
}

const submitForm = async () => {
	if (!infoText.value || !infoDate.value || !descText.value) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Preencha todos os campos obrigatórios!',
		})
		return
	}

	const params: any = {
		informacao: infoText.value,
		descricao: descText.value,
		data: infoDate.value,
		ocoId: ocoId.value,
		files: infoImage.value ? [infoImage.value] : [],
	}

	try {
		const res = await postPeoples(params)
		Swal.fire({
			icon: 'success',
			title: 'Informação enviada com sucesso!',
			showConfirmButton: false,
			timer: 1500,
		})
		descText.value = ''
		infoText.value = ''
		infoDate.value = ''
		infoImage.value = null
		closeModal()
	} catch (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Ocorreu um erro ao enviar a informação!',
		})
	}
}
</script>

<template>
	<button
		id="btn-help"
		@click="openModal"
		class="bg-primary text-white font-bold rounded px-5 py-2"
	>
		Ajude a Encontrar
	</button>

	<div
		v-if="isModalOpen"
		class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
		@click.self="closeModal"
	>
		<div class="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative flex flex-col gap-4">
			<button
				@click="closeModal"
				class="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold text-lg"
			>
				×
			</button>

			<h2 class="text-xl font-bold text-center">Informações do Desaparecimento</h2>

			<div class="flex flex-col gap-3">
				<label class="font-semibold">Informação<span class="text-red-500">*</span>:</label>
				<input
					type="text"
					v-model="infoText"
					placeholder="Digite alguma informação"
					class="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-solid border-gray-300"
				/>
				<label class="font-semibold">Descrição<span class="text-red-500">*</span>:</label>
				<input
					type="text"
					v-model="descText"
					placeholder="Detalhe mais sua informação"
					class="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-solid border-gray-300"
				/>

				<label class="font-semibold">Data<span class="text-red-500">*</span>:</label>
				<input
					type="date"
					v-model="infoDate"
					class="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-solid border-gray-300"
				/>

				<label class="font-semibold">Imagem:</label>
				<input
					type="file"
					@change="handleImageUpload"
					accept="image/*"
					class="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-solid border-gray-400"
				/>
			</div>

			<button
				@click="submitForm"
				class="bg-primary text-white font-bold rounded px-4 py-2 mt-2"
			>
				Salvar
			</button>
		</div>
	</div>
</template>
