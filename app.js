require("dotenv").config();
const { ethers } = require("ethers");
const abi =require('./abi.json');


const providerUrl = process.env.RPC_URL;
const contractAddress='0xdAC17F958D2ee523a2206206994597C13D831ec7'
const userAddress ="0xA72Ac7b7a768fe951803bfAc765A8b774a7B9006";

const provider = new ethers.providers.JsonRpcProvider(providerUrl)
const tokenContract = new ethers.Contract(contractAddress,abi, provider)
loading = true

const convertToEther = (value) => {
    return ethers.utils.formatEther(value);
}

async function main(){

    try {

        // const tokenDecimal = await tokenContract.name()
        // const data = tokenDecimal.toLowerCase();

        // console.log("Token Name is", data);

        // const totalSupply = await tokenContract.totalSupply();
        // const result = totalSupply.toString();
        // console.log("totalsupply is:", result);

        // const balance = await tokenContract.balances(userAddress);    
        // console.log("User balance is", balance.toString());


        const [name, totalSupply, balance] = await Promise.all([
            tokenContract.name(), 
            tokenContract.totalSupply(), 
            tokenContract.balances(userAddress)
        ]);

        const _totalSupply = convertToEther(totalSupply);

        console.log(
            "Token Name is: ", name, "\n",
            "With totalSupply of", _totalSupply, "\n",
            "User Balance is:", convertToEther(balance)
        )

        
    } catch (error) {
        console.error(error);
    }
}

main();
