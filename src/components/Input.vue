<template>
    <div>
        <div :class="['input-field', {'approve': approve}, {'complete': complete}, {'error': error}, {'filled': inputValue !== ''}]">
            <label :for="name">
                <the-mask v-if="mask"
                          masked
                          v-model="inputValue"
                          @blur.native="validate()"
                          :type="type"
                          :name="name"
                          :id="name"
                          :disabled="approve"
                          :mask="mask" />
                <input v-else
                       v-model="inputValue"
                       @blur="validate()"
                       type="text"
                       :name="name"
                       :id="name"
                       :disabled="approve">
                <span class="input-field__placeholder">{{ placeholder }}</span>
                <span v-if="!approve" class="input-field__additions">{{ error ? error : help }}</span>
                <div class="input-field__tooltip" :class="['input-field__tooltip', {'show': (error && !empty && !approve)}]">
                    {{ tooltip }}
                </div>
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
            'complete',
            'approve',
            'mask',
            'type',
            'tooltip',
            'error',
            'regEx',
            'errorMessage',
            'empty'
        ],
        data(){
            return {
                inputValue: '',
            }
        },
        methods: {
            validate(){
                if(this.inputValue !== ''){
                    if(this.regEx){
                        if(!this.regEx.test(this.inputValue)){
                            this.$emit('getInputError', {
                                errorMessage: this.errorMessage,
                                inputValue: this.inputValue,
                                inputName: this.name
                            });
                        } else {
                            this.$emit('getInputComplete', {
                                inputName: this.name,
                                inputValue: this.inputValue,
                            });
                        }
                    } else {
                        this.$emit('getInputComplete', {
                            inputName: this.name,
                            inputValue: this.inputValue,
                        });
                    }
                } else {
                    this.$emit('getInputReset', {
                        inputName: this.name,
                        inputValue: this.inputValue,
                    });
                }
            }
        }
    }
</script>