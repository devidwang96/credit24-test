<template>
    <div>
        <div :class="['checkbox-field', {'checked': inputValue === true}]">

            <input v-model="inputValue"
                   type="checkbox"
                   @change="inputChange()"
                   :name="name"
                   :id="name">
            <label :for="name">
                <span class="checkbox-field__placeholder">{{ placeholder }}</span>
                <span class="checkbox-field__help">{{ help }}</span>
            </label>
        </div>

    </div>
</template>

<script>
    export default {
        props: [
            'help',
            'name',
            'placeholder',
            'inputSync'
        ],
        data(){
            return {
                inputValue: true,
            }
        },
        methods: {
            inputChange(){
                if(this.inputValue){
                    this.$emit('checkboxOff', {
                        inputName: this.inputSync
                    });
                } else {
                    this.$emit('checkboxOn', {
                        inputName: this.inputSync
                    });
                }
            }
        }
    }
</script>