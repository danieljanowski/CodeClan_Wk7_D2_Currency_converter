import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
    new Vue({
        el: "#app",
        data: {
            currencies: [],
            amountEUR: 1,
            selectedCurrencyFromEUR: "GBP",
            amountCurrency: 1,
            selectedCurrencyToEUR: "GBP",
            selectedFirstCurrency: "GBP",
            selectedSecondCurrency: "GBP",
            amountAnyCurrency: 1,
        },
        mounted(){
            this.getCurrencies()
        },

        computed: {
            convertedFromEUR: function(){
                return `${parseFloat(this.amountEUR * this.currencies.rates[this.selectedCurrencyFromEUR]).toFixed(2)} ${this.selectedCurrencyFromEUR}`
            },

            convertedToEUR: function(){
                return `${parseFloat(this.amountCurrency / this.currencies.rates[this.selectedCurrencyToEUR]).toFixed(2)} EUR`
            },
            
            converted: function(){
                return `${parseFloat((this.amountAnyCurrency * this.currencies.rates[this.selectedFirstCurrency]) / this.currencies.rates[this.selectedSecondCurrency]).toFixed(2)} ${this.selectedSecondCurrency}`
            },
        },

        methods: {
            getCurrencies: function(){
                fetch("https://api.exchangeratesapi.io/latest")
                .then(cur => cur.json())
                .then(data => this.currencies = data)
            }
        },
    }
    )
})