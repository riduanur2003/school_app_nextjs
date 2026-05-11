import { neon } from "@neondatabase/serverless";


export default function Page(){

    // server action 
    async function submitData(formData:FormData) {
        "use server"
       const sql = neon(`${process.env.DATABASE_URL}`); 
       const studentName= formData.get("name")
       console.log(studentName)
    }

return <>

<form action={submitData}>

    <input type="text"  name = "name" placeholder="is this happening "/>
    <input type="submit"  />
</form>

</>

}