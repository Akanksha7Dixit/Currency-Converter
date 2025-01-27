import https from "https";
import readline from "readline";
import chalk from "chalk";

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const apikey = '25a3ec75cc7499a3283972d7';
const url=`https://v6.exchangerate-api.com/v6/${apikey}/latest/USD`;

const convertCurrency=(amount,rate)=>{
    return (amount*rate).toFixed(2);

}

https.get(url,(response)=>{
    let data ="";
    response.on('data',(chunk)=>{
        data+=chunk;
    })
    //Server ne response deke khtm kr dia.
    response.on('end',()=>{
        const rates=JSON.parse(data).conversion_rates;

        rl.question('Enter the amount in USD:',(amount)=>{
            rl.question("Enter the target Currency(e.g.-INR, EUR, NPR):",(currency)=>{
                const rate=rates[currency.toUpperCase()];      //We can write here as rate=rates.currncy
                if(rate){
                    console.log(`${amount} USD is approximately equals to ${convertCurrency(amount,rate)} ${currency}`);
                }
                else{
                    console.log("Invalid Currency Code");
                }
                rl.close;
            })
        })
    })
})
