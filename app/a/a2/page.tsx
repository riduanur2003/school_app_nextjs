import { neon } from "@neondatabase/serverless";
import {z} from "zod";


// zod schema

const StudentSchema = z.object(

    {

        name: z.string().min(2).max(50),
        email: z.string(),
        email: z.string()
        
    }



    
)