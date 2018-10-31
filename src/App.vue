<template>
    <div id="app">

        <h1>
            Кнопка:

            <button></button>
        </h1>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {}
        },
        components: {
            'button' : Button,
            'checkbox' : Checkbox,
            'input' : Input,
        }
    }
</script>
