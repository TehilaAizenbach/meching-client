import { fetchData } from "./api";
const  resetProjectPoints=async(code)=>{
 try{
    const result =fetchData("/project/resetPoints","POST",{code:code})
    return result;
 }catch(error){

 }
}
export default external;
