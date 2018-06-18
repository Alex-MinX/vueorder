$(document).ready(function(){
    // -------------------------- global registered Vue components ----------------------------------
    /* Globally registered components can be used in the template of any 
    root Vue instance (new Vue) created afterwards – and even inside all
    subcomponents of that Vue instance’s component tree.*/

    /* becareful with the name, some of the names may cause the error: not registered */

    Vue.component('login-time', {
        data: function(){
            return {
                date: new Date().toString()
            }
        },
        template: '<p>You loaded this page on {{ date }}</p>'
    });
    // --------------------------- Content Component ---------------------------
    Vue.component('content-button', {
        props: ['content'],
        data: function() {
            return {
                number: 0,
            }
        },
        methods: {
            addOrder: function() {
                this.number++;
            },
            minusOrder: function() {
                this.number--;
            }
        },
        template: '<div><button @click="addOrder">' + '+' + '</button><button disabled=true>{{ content.value }}</button><button @click="minusOrder">' + '-' + '</button></div>'
    });

    // --------------------------- Root Vue instance --------------------------------------------------
    var main = new Vue({
        el: '#main',
        data: {
            // ------------------------------- language related -------------------------------
            languageOptions: [
                { text: "中文", value: "CN" },
                { text: "Deutsch", value: "DE" },
                { text: "English", value: "EN" }
            ],
            //language: 'CN', // only for the old way in language selection to save the selected language. See languageSelection
            languageSelected: '',
            title: '点餐系统', // reserved variable for title, init: CN
            title_lang: {
                CN: '点餐系统',
                DE: 'Bestellungssystem',
                EN: 'Order system'
            },
            login_title: '登录',
            login_title_lang: {
                CN: '登录',
                DE: 'Einloggen',
                EN: 'Log in'
            },
            login_btn: '登录',
            login_btn_lang: {
                CN: '登录',
                DE: 'Einloggen',
                EN: 'Log in'
            },
            loggedin_info: '您已成功登录',
            loggedin_info_lang: {
                CN: '您已成功登录',
                DE: 'Sie haben sich erfolgreich angemeldet',
                EN: 'You have successfully logged in'
            },
            loggedin_welcome: '欢迎',
            loggedin_welcome_lang: {
                CN: '欢迎',
                DE: 'Willkommen',
                EN: 'Welcome'
            },
            logout_btn: '退出',
            logout_btn_lang: {
                CN: '退出',
                DE: 'Abmelden',
                EN: 'Log out'
            },
            //websiteTitle: "点餐系统",
            websiteTitle_lang: {
                CN: "点餐系统",
                DE: "Bestellungssystem",
                EN: "Order system"
            },
            submit_order: '提交订单',
            submit_order_lang: {
                CN: "提交订单",
                DE: "Kaufen",
                EN: "Comfirm order"
            },
            // ------------------------------- Order related -------------------------------
            order_object: { // for test only
                counter: 0,
                name: 'GuangShiXiangChang',
                amount: '300',
                user_email: 'xiemin.alex@gmail.com',
                price: 15,
            },

            // ------------------------------- content related -------------------------------
            contentObject: [
                {
                    id: 0,
                    name: 'TestName1',
                    value: 0,
                },
                {
                    id: 1,
                    name: 'TestName2',
                    value: 0
                },
                {
                    id: 2,
                    name: 'TestName2',
                    value: 0
                },
                {
                    id: 3,
                    name: 'TestName2',
                    value: 0
                },
                {
                    id: 4,
                    name: 'TestName2',
                    value: 0
                },
                {
                    id: 5,
                    name: 'TestName2',
                    value: 0
                },
                {
                    id: 6,
                    name: 'TestName2',
                    value: 0
                },
                {
                    id: 7,
                    name: 'TestName2',
                    value: 0
                },
            ],


            // ------------------------------- Login related -------------------------------
            loginEmail: '',
            loginPW: '',
            login_div_style: {display: 'none'},
            user_div_style: {display: 'none'},
            login_wrong_message_style: {display: 'none', color: 'red'},
            current_user_email: '',
            current_user_id: '',
            footer_info: 'powered by VueJS and firebase. Designed by Min Xie',
            version: 'v0.2',
        },
        methods: {
            languageSelection: function () { // for the old way, need to pass "event" to the function
                // ---------- The old way with plain JavaScript -------------------------------
                /*
                var count = event.target.length // 3 options: CN/DE/EN
                for (var i = 0; i < count; i++) {
                    if (event.target[i].selected) {
                        // `this` inside methods points to the Vue instance
                        this.language = event.target[i].value;
                        this.title_lang = this.title[this.language];
                    }
                }
                */
                
                // ----------- The new way with Vue JS v-model (two way data binding) ---------
                //console.log("languageSelected: ", this.languageSelected);
                this.title = this.title_lang[this.languageSelected];
                this.login_title = this.login_title_lang[this.languageSelected];
                this.login_btn = this.login_btn_lang[this.languageSelected];
                this.loggedin_info = this.loggedin_info_lang[this.languageSelected];
                this.loggedin_welcome = this.loggedin_welcome_lang[this.languageSelected];
                this.logout_btn = this.logout_btn_lang[this.languageSelected];
                this.submit_order = this.submit_order_lang[this.languageSelected];


                document.title = this.websiteTitle_lang[this.languageSelected]; // be aware of this: the website title is not in the Vue instance div
            },
            login: function() {
                console.log("login works!");
                var Email = this.loginEmail;
                var PW = this.loginPW;
                console.log('Email: ', Email, ', PW: ', PW);

                // firebase sign-in funcion
                firebase.auth().signInWithEmailAndPassword(Email, PW).catch(function(error) {
                    // Handle Errors here.
                    console.log("go through firebase auth function");
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    // display a error message to tell the user the email or password is wrong
                    main.login_wrong_message_style = {display: 'block', color: 'red'};

                    console.log('Error code: ', error.code, ', Error message: ', error.message);
                    //window.alert('Error code: ', error.code, ', Error message: ', error.message);
                });
            },
            logout: function() {
                firebase.auth().signOut().then(function() {
                    // Sign-out successful.
                    console.log('successful logout');
                  }).catch(function(error) {
                    // An error happened.
                });
            },
            submitOrder: function() {
                var email = main.current_user_email;
                var userId = main.current_user_id;
                console.log('userId: ', userId);
                var counter = main.order_object.counter;
                firebase.database().ref('orders/' + userId + '/' + counter).set(main.order_object, function(error) {
                    if(error) {
                        // The write failed...
                        console.log('提交订单失败');
                    } else {
                        // Data saved successfully!
                        console.log('提交订单成功');
                    }
                });
                main.order_object.counter = main.order_object.counter + 1;
            },
        },
        // methods ends here

        created() {
            console.log("created");
            // ----------------- Get a reference to the database service -------------------
            // https://firebase.google.com/docs/database/web/read-and-write?authuser=0
            var database = firebase.database();

            // ---------------------------- Authentication related -------------------------
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    var userId = user.uid;
                    console.log('User is signed in.');
                    // User is signed in.
                    main.login_div_style = {display: 'none'};
                    main.user_div_style = {display: 'block'};
                    // get the user information
                    var user = firebase.auth().currentUser;
                    if(user != null) {
                        main.current_user_email = user.email;
                        main.current_user_id = user.uid;
                    }

                    // get/check the number of the exists orders of this user
                    // to get the data at a specific path, user data.val()
                    // read the data only once here
                    firebase.database().ref('orders/' + userId + '/').once('value', function(data) {
                        if(data.val() == null) {
                            var number_of_orders = 0;
                        } else if (data.val() != null) {
                            var number_of_orders = data.val().length;
                        }
                        main.order_object.counter = number_of_orders;

                        console.log('data.val(): ', data.val());
                        console.log('number_of_orders: ', number_of_orders);
                    });

                } else {
                    console.log('No user is signed in.')
                    // No user is signed in.
                    main.login_div_style = {display: 'block'};
                    main.user_div_style = {display: 'none'};
                }
            });
            
        },
        beforeCreate() {
            console.log("beforeCreate");
        }

    });
})


