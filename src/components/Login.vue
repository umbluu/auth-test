<template>
    <div id="login">
        <transition name="fade">
            <div v-if="performingRequest" class="loading">
                <p>Loading...</p>
            </div>
        </transition>
        <section>
            <div class="col1">
                <h1>Vuegram</h1>
                <p>Welcome to the <a href="https://savvyapps.com/" target="_blank">Savvy Apps</a> sample social media web app powered by Vue.js and Firebase.
                    Build this project by checking out The Definitive Guide to Getting Started with Vue.js</p>
            </div>
            <div class="col2" :class="{ 'signup-form': !showLoginForm }">
                <form v-if="showLoginForm" @submit.prevent>
                    <h1>Welcome Back!</h1>

                    <label for="email1">Email</label>
                    <input v-model.trim="loginForm.email" type="text" placeholder="name@domain.com" id="email1" />

                    <label for="password1">Password</label>
                    <input v-model.trim="loginForm.password" type="password" placeholder="Password" id="password1" />

                    <button @click="login" class="button">Login</button>

                    <div class="extras">
                        <a>Forgot password?</a>
                        <a @click="toggleForm">Create new account</a>
                    </div>
                </form>
                <form v-else @submit.prevent>
                    <h1>Get Started</h1>

                    <label for="name">Name</label>
                    <input v-model.trim="signupForm.name" type="text" placeholder="John" id="name" />

                    <label for="title">Title</label>
                    <input v-model.trim="signupForm.title" type="text" placeholder="Company" id="title" />

                    <label for="email2">Email</label>
                    <input v-model.trim="signupForm.email" type="text" placeholder="name@domain.com" id="email2" />

                    <label for="password2">Password</label>
                    <input v-model.trim="signupForm.password" type="password" placeholder="Password" id="password2" />

                    <button @click="signup" class="button">Sign Up</button>

                    <div class="extras">
                        <a @click="toggleForm">Back to Login</a>
                    </div>
                    <br>
                    <br>
                    <button @click="socialLogin" class="button">Auth Gmail</button>
                </form>
                <transition name="fade">
                    <div v-if="errorMsg !== ''" class="error-msg">
                        <p>{{ errorMsg }}</p>
                    </div>
                </transition>
            </div>
        </section>
    </div>
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
    data() {
        return {
            loginForm: {
                email: '',
                password: ''
            },
            signupForm: {
                name: '',
                title: '',
                email: '',
                password: ''
            },
            user: {
                name: '',
            },
            showLoginForm: true,
            performingRequest: false,
            errorMsg: ''
        }
    },
    methods: {
        toggleForm() {
            this.errorMsg = ''
            this.showLoginForm = !this.showLoginForm
        },
        login() {
            this.performingRequest = true

            fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(credential => {
                this.$store.commit('setCurrentUser', credential.user)
                this.$store.dispatch('fetchUserProfile')
                this.performingRequest = false
                this.$router.push('/dashboard')
            }).catch(err => {
                console.log(err)
                this.performingRequest = false
                this.errorMsg = err.message
            })
        },
        socialLogin() {
            this.performingRequest = true

            fb.auth
            .signInWithPopup(fb.provider)
            .then(credential => {
                this.$store.commit('setCurrentUser', credential.user)
                // console.log(credential.user.displayName);
                // create user object
                fb.usersCollection.doc(credential.user.uid).set({
                    // name: this.credential.user.displayName
        
                }).then(() => {
                    this.$store.dispatch('fetchUserProfile')
                    console.log(credential.user.displayName)
                    this.performingRequest = false
                    this.$router.push('/dashboard')
                }).catch(err => {
                    console.log(err);
                    this.performingRequest = false
                    this.errorMsg = err.message
                })
            }).catch(err => {
            console.log(err);
            });
        },
        signup() {
            this.performingRequest = true

            fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(credential => {
                this.$store.commit('setCurrentUser', credential.user)

                // Create user object
                fb.usersCollection.doc(credential.user.uid).set({
                    name: this.signupForm.name,
                    title: this.signupForm.title
                }).then(() => {
                    this.$store.dispatch('fetchUserProfile')
                    this.performingRequest = false
                    this.$router.push('/dashboard')
                }).catch(err => {
                    console.log(err);
                    this.performingRequest = false
                    this.errorMsg = err.message
                })
            }).catch(err => {
                console.log(err);
                this.performingRequest = false
                this.errorMsg = err.message
            })
        }
    }
}
</script>
