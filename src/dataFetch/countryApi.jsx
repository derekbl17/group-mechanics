import axios from "axios";

const API_URL="https://restcountries.com/v3.1/all"

const allCountries=async()=>{
    try{
        const res=await axios.get(API_URL);
        if(res.data!==undefined){
            return res.data
        }
    }catch(error){
        console.log(error)
    }
}
export default allCountries