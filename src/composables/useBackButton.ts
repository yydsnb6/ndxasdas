import { backButton } from '@telegram-apps/sdk-vue'
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useBackButton() {
    let offClick: () => void = () => {}
    const route = useRoute()
    const router = useRouter()

    watch(() => route.name, () => {
        if (route.name === 'index' || route.name === 'home') {
            backButton.hide()
            offClick()
        } else if (!backButton.isVisible()) {
            backButton.show()
            offClick = backButton.onClick(onBackButtonClick)
        }
    })

    async function onBackButtonClick(): Promise<void> {
        await router.go(-1)
    }
}
