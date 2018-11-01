<template>
    <div id="app">
        <form v-on:submit.prevent="formSubmit()">
            <site-input v-for="(input, key) in inputs"
                        :key="'input_' + key"
                        :placeholder="input.placeholder"
                        :mask="input.mask"
                        :tooltip="input.tooltip"
                        :error="input.error"
                        :approve="input.approve"
                        :complete="input.complete"
                        :name="input.name"
                        :regEx="input.regEx"
                        :errorMessage="input.errorMessage"
                        @getInputError="setInputError($event)"
                        @getInputComplete="setInputComplete($event)"
                        @getInputReset="setInputReset($event)"
                        :help="input.help">
            </site-input>

            <site-checkbox v-for="(checkbox, key) in checkboxes"
                           :key="'checkbox_' + key"
                           :placeholder="checkbox.placeholder"
                           :name="checkbox.name"
                           :inputSync="checkbox.inputSync"
                           @checkboxOn="inputEnable($event)"
                           @checkboxOff="inputDisable($event)"
                           :help="checkbox.help">
            </site-checkbox>

            <site-button :loading="formState.loading">

            </site-button>

            <div v-if="formState.errors && formState.submitted" class="errors">
                <p>Произошла ошибка, пожалуйста проверьте поля на валидность!</p>
            </div>

            <div v-if="!formState.errors && formState.submitted" class="results">
                <img v-if="formState.loading" src="/src/assets/loading.gif" alt="">

                <h3>Результаты поиска:</h3>
                <div v-if="!formState.loading">
                    <p v-if="formState.founded.length === 0">К сожалению ничего не найдено :(</p>
                    <div v-else class="founds">

                        <div class="item" v-for="item in formState.founded">
                            <p class="name">{{ item.name }}</p>
                            <p class="phone">Номер телефона: <b>{{ item.phone }}</b></p>
                            <p class="email">E-mail: <b>{{ item.email }}</b></p>
                        </div>

                    </div>
                </div>
            </div>
        </form>

    </div>
</template>

<script>
    export default {
        name: 'app',

        data() {
            return {
                formState: {
                    loading: false,
                    founded: [],
                    submitted: false,
                    errors: false,
                },
                checkboxes: [
                    {
                        placeholder: 'Искать по телефону',
                        name: 'phone-checkbox',
                        help: 'Искать пользователей в базе по телефону',
                        inputSync: 'phone',
                    },
                    {
                        placeholder: 'Искать по имени',
                        name: 'name-checkbox',
                        help: 'Искать пользователей в базе по имени',
                        inputSync: 'name',
                    },
                    {
                        placeholder: 'Искать по E-mail',
                        name: 'email-checkbox',
                        help: 'Искать пользователей в базе по E-mail',
                        inputSync: 'email',
                    },
                ],
                inputs: [
                    {
                        placeholder: 'Мобильный телефон',
                        name: 'phone',
                        help: 'Введите телефон пользователя',
                        mask: '+7(###)###-##-##',
                        regEx: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
                        tooltip: 'Здесь вам следует ввести мобильный телефон пользователя которого вы ищите',
                        error: null,
                        errorMessage: 'Телефон введен некорректно',
                        approve: false,
                        complete: null,
                        value: '',
                    },
                    {
                        placeholder: 'Введите имя',
                        name: 'name',
                        help: 'Введите имя пользователя',
                        mask: null,
                        regEx: null,
                        tooltip: 'Здесь вам следует ввести имя пользователя',
                        error: null,
                        errorMessage: '',
                        approve: false,
                        complete: null,
                        value: '',
                    },
                    {
                        placeholder: 'Введите E-mail',
                        name: 'email',
                        help: 'Введите E-mail пользователя',
                        mask: null,
                        regEx: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        tooltip: 'Здесь вам следует ввести E-mail пользователя',
                        error: null,
                        errorMessage: 'E-mail введен некорректно',
                        approve: false,
                        complete: null,
                        value: '',
                    },
                ],
                users:[
                    {
                        name:'John Doe',
                        email: 'johndoe@gmail.com',
                        phone: '+7(532)342-52-73'
                    },
                    {
                        name:'John Doe',
                        email: 'johndoe@gmail.com',
                        phone: '+7(532)342-52-73'
                    },
                    {
                        name: 'Sam',
                        email: 'sam@mail.com',
                        phone: '+7(777)777-77-77'
                    }
                ],
            }
        },
        methods: {
            setInputError(inputData){
                let selectedInput = this.inputs.filter(input => {
                    return input.name === inputData.inputName;
                })[0];
                selectedInput.error = inputData.errorMessage;
                selectedInput.complete = false;
                selectedInput.value = inputData.inputValue;
                this.checkForm();
            },
            setInputComplete(inputData){
                let selectedInput = this.inputs.filter(input => {
                    return input.name === inputData.inputName;
                })[0];
                selectedInput.error = null;
                selectedInput.complete = true;
                selectedInput.value = inputData.inputValue;
                this.checkForm();
            },
            setInputReset(inputData){
                let selectedInput = this.inputs.filter(input => {
                    return input.name === inputData.inputName;
                })[0];
                selectedInput.error = null;
                selectedInput.complete = null;
                selectedInput.value = inputData.inputValue;
                this.checkForm();
            },
            inputEnable(checkboxData){
                let selectedInput = this.inputs.filter(input => {
                    return input.name === checkboxData.inputName;
                })[0];
                selectedInput.approve = true;
                this.checkForm();
            },
            inputDisable(checkboxData){
                let selectedInput = this.inputs.filter(input => {
                    return input.name === checkboxData.inputName;
                })[0];
                selectedInput.approve = false;
                this.checkForm();
            },
            checkForm(formSubmit){
                let itemCount = 0;
                let errors = 0;
                this.inputs.forEach(function(item){
                    if(!item.approve){
                        if(formSubmit && item.value === ''){
                            item.error = 'Вы оставили поле пустым';
                        }
                        if(!item.error && item.value !== ''){
                            itemCount++
                        } else {
                            errors++
                        }
                    }
                });
                if(itemCount > 0 && errors === 0){
                    return true
                } else {
                    return false
                }
            },
            formSubmit(){
                this.formState.submitted = true;

                if(this.checkForm(true)){
                    this.formState.errors = false;

                    let founds = this.users;
                    this.formState.loading = true;


                    this.inputs.forEach(function(input){
                        if(!input.approve){
                            founds = founds.filter(user => {
                                return user[input.name] === input.value;
                            })
                        }
                    });

                    this.formState.founded = founds;

                    this.formState.loading = false;
                } else {
                    this.formState.errors = true;
                }
            }
        },
        mounted(){
            this.checkForm();
        }
    }
</script>
