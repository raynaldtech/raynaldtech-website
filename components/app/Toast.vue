<template>
    <Teleport to="body">
        <Transition name="toast">
            <div v-if="isVisible" class="fixed bottom-4 right-4 z-50">
                <div :class="['p-4 rounded-lg shadow-lg text-white min-w-[300px]', typeClasses]">
                    <div class="flex items-start gap-3">
                        <div class="flex-1">
                            <h3 class="font-semibold">{{ title }}</h3>
                            <p class="text-sm mt-1">{{ message }}</p>
                        </div>
                        <button @click="isVisible = false" class="hover:opacity-75">
                            <XMarkIcon class="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
    title: String,
    message: String,
    type: {
        type: String,
        default: 'success',
        validator: (value: string) => ['success', 'error'].includes(value)
    }
})

const isVisible = ref(true)

const typeClasses = computed(() => ({
    'success': 'bg-primary',
    'error': 'bg-secondary'
})[props.type])

onMounted(() => {
    setTimeout(() => {
        isVisible.value = false
    }, 5000)
})
</script>

<style>
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>