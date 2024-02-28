import nodemailer from 'nodemailer';


export async function sendEmail({to ,subject ,html }){
    const transporter = nodemailer.createTransport({
        host:"localhost",
        port: 465 , 
        secure:true,
        service:"gmail",
        tls: { 
            rejectUnauthorized: false
          },
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASS
        },
    });
    
    const info = await transporter.sendMail({
        from:`"Saraha App👻" <${process.env.EMAIL}>`, 
        to,
        subject, 
        html,
    });
    console.log(info);
    if(info.accepted.length > 0) return true;
    return false;
}

