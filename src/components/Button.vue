<template>
    <div>
        <div class="button-field">
            <input type="submit" :class="['button', {'loading': loading}]" value="Найти пользователей">
        </div>

    </div>
</template>

<script>
    export default {
        props: [
            'loading',
        ],
        data(){
            return {
                inputValue: '',
            }
        },
    }
</script>