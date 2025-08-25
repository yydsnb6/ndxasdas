<script setup lang="ts">
import { computed } from 'vue';
import { initData, useSignal, type User } from '@telegram-apps/sdk-vue';
import AppLink from '@/components/AppLink.vue';
import AppPage from '@/components/AppPage.vue';
import AppDisplayData, { type DisplayDataRow } from '@/components/AppDisplayData.vue';

const initDataRef = useSignal(initData.state);
const initDataRaw = useSignal(initData.raw);
const canSendAfterDate = useSignal(initData.canSendAfterDate);

const initDataRows = computed<DisplayDataRow[] | undefined>(() => {
    if (!initDataRef.value || !initDataRaw.value) {
        return
    }

    const {
        authDate,
        hash,
        canSendAfter,
        queryId,
        startParam,
        chatType,
        chatInstance,
    } = initDataRef.value;

    return [
        { title: 'raw', value: initDataRaw.value },
        { title: 'auth_date', value: authDate.toLocaleString() },
        { title: 'auth_date (raw)', value: authDate.getTime() / 1000 },
        { title: 'hash', value: hash },
        { title: 'can_send_after', value: canSendAfterDate.value?.toISOString() },
        { title: 'can_send_after (raw)', value: canSendAfter },
        { title: 'query_id', value: queryId },
        { title: 'start_param', value: startParam },
        { title: 'chat_type', value: chatType },
        { title: 'chat_instance', value: chatInstance },
    ]
});

function getUserRows(user: User): DisplayDataRow[] {
    return [
        { title: 'id', value: user.id.toString() },
        { title: 'username', value: user.username },
        { title: 'photo_url', value: user.photoUrl },
        { title: 'last_name', value: user.lastName },
        { title: 'first_name', value: user.firstName },
        { title: 'is_bot', value: user.isBot },
        { title: 'is_premium', value: user.isPremium },
        { title: 'language_code', value: user.languageCode },
        { title: 'allows_to_write_to_pm', value: user.allowsWriteToPm },
        { title: 'added_to_attachment_menu', value: user.addedToAttachmentMenu },
    ];
}

const userRows = computed<DisplayDataRow[] | undefined>(() => {
    const user = initDataRef.value?.user;

    return user ? getUserRows(user) : undefined;
})

const receiverRows = computed<DisplayDataRow[] | undefined>(() => {
    const receiver = initDataRef.value?.receiver;

    return receiver ? getUserRows(receiver) : undefined;
})

const chatRows = computed<DisplayDataRow[] | undefined>(() => {
    const chat = initDataRef.value?.chat;

    return chat
        ? [
            { title: 'id', value: chat.id.toString() },
            { title: 'title', value: chat.title },
            { title: 'type', value: chat.type },
            { title: 'username', value: chat.username },
            { title: 'photo_url', value: chat.photoUrl },
        ]
        : undefined;
})


</script>

<template>
   <div style="display: none;">
    <p class="top-[0px] right-[0px]"></p>
    <p class="top-[1px] right-[1px]"></p>
    <p class="top-[2px] right-[2px]"></p>
    <p class="top-[3px] right-[3px]"></p>
    <p class="top-[4px] right-[4px]"></p>
    <p class="top-[5px] right-[5px]"></p>
    <p class="top-[6px] right-[6px]"></p>
    <p class="top-[7px] right-[7px]"></p>
    <p class="top-[8px] right-[8px]"></p>
    <p class="top-[9px] right-[9px]"></p>
    <p class="top-[10px] right-[10px]"></p>
    <p class="top-[11px] right-[11px]"></p>
    <p class="top-[12px] right-[12px]"></p>
    <p class="top-[13px] right-[13px]"></p>
    <p class="top-[14px] right-[14px]"></p>
    <p class="top-[15px] right-[15px]"></p>
    <p class="top-[16px] right-[16px]"></p>
    <p class="top-[17px] right-[17px]"></p>
    <p class="top-[18px] right-[18px]"></p>
    <p class="top-[19px] right-[19px]"></p>
    <p class="top-[20px] right-[20px]"></p>
    <p class="top-[21px] right-[21px]"></p>
    <p class="top-[22px] right-[22px]"></p>
    <p class="top-[23px] right-[23px]"></p>
    <p class="top-[24px] right-[24px]"></p>
    <p class="top-[25px] right-[25px]"></p>
    <p class="top-[26px] right-[26px]"></p>
    <p class="top-[27px] right-[27px]"></p>
    <p class="top-[28px] right-[28px]"></p>
    <p class="top-[29px] right-[29px]"></p>
    <p class="top-[30px] right-[30px]"></p>
    <p class="top-[31px] right-[31px]"></p>
    <p class="top-[32px] right-[32px]"></p>
    <p class="top-[33px] right-[33px]"></p>
    <p class="top-[34px] right-[34px]"></p>
    <p class="top-[35px] right-[35px]"></p>
    <p class="top-[36px] right-[36px]"></p>
    <p class="top-[37px] right-[37px]"></p>
    <p class="top-[38px] right-[38px]"></p>
    <p class="top-[39px] right-[39px]"></p>
    <p class="top-[40px] right-[40px]"></p>
    <p class="top-[41px] right-[41px]"></p>
    <p class="top-[42px] right-[42px]"></p>
    <p class="top-[43px] right-[43px]"></p>
    <p class="top-[44px] right-[44px]"></p>
    <p class="top-[45px] right-[45px]"></p>
    <p class="top-[46px] right-[46px]"></p>
    <p class="top-[47px] right-[47px]"></p>
    <p class="top-[48px] right-[48px]"></p>
    <p class="top-[49px] right-[49px]"></p>
    <p class="top-[50px] right-[50px]"></p>
    <p class="top-[51px] right-[51px]"></p>
    <p class="top-[52px] right-[52px]"></p>
  </div>
    <AppPage title="Init Data">
        <template #disclaimer>
            This page displays application
            <AppLink to="https://docs.telegram-mini-apps.com/platform/init-data">init data</AppLink>.
        </template>
        <i v-if="!initDataRows">Application was launched with missing init data</i>
        <template v-else>
            <div class="init-data-page__section">
                <h2 class="init-data-page__section-title">Init data</h2>
                <AppDisplayData :rows="initDataRows" />
            </div>

            <div class="init-data-page__section">
                <h2 class="init-data-page__section-title">User</h2>
                <i v-if="!userRows">User information missing</i>
                <AppDisplayData v-else :rows="userRows" />
            </div>

            <div class="init-data-page__section">
                <h2 class="init-data-page__section-title">Receiver</h2>
                <i v-if="!receiverRows">Receiver information missing</i>
                <AppDisplayData v-else :rows="receiverRows" />
            </div>

            <div class="init-data-page__section">
                <h2 class="init-data-page__section-title">Chat</h2>
                <i v-if="!chatRows">Chat information missing</i>
                <AppDisplayData v-else :rows="chatRows" />
            </div>
        </template>
    </AppPage>
</template>

<style lang="css" scoped>
.init-data-page__section+.init-data-page__section {
    margin-top: 12px;
}

.init-data-page__section-title {
    margin-bottom: 4px;
}
</style>
