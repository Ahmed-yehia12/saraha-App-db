import multer , {diskStorage} from 'multer'; 
import { nanoid } from 'nanoid';


export const fileValidation ={
    images:["image/png","image/jpeg"],
    file: ["application/pdf"]
}


export function uploadFile({file,filter}){
    const storage = diskStorage({destination:`uploads/${file}`,
filename:(req,file,cb)=>{
    cb(null ,nanoid()+"__"+ file.originalname)
}});


const fileFilter = (req,file , cb)=>{

    if (!filter.includes(file.mimetype)){
        return cb(new Error('invalid format', false))
    }
    return cb(null ,true)
}

 const multerUp = multer({storage , fileFilter});
 return multerUp
}


