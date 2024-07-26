const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const { OAuth2 } = google.auth
const oauth_link = "https://developer.google.com/oauthplayground"
const {EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH} = process.env

const auth = new OAuth2(
     MAILING_ID,
     MAILING_SECRET, 
     MAILING_REFRESH,
     oauth_link
)

exports.sendVerifiedEmail = (email,name,url)=>{
    auth.setCredentials(
        {
            refresh_token : MAILING_REFRESH
        }
    )
    const accessToken = auth.getAccessToken()
    const stmp = nodemailer.createTransport({
        service: "gmail",
        auth:{
            type:"OAuth2",
            user:EMAIL,
            clientId: MAILING_ID,
            clientSecret: MAILING_SECRET,
            refreshToken: MAILING_REFRESH,
            accessToken
        }
    })
    const mailOptions = {
        from : EMAIL,
        to : email,
        subject : "Social App Verification",
        html : ` <div style="padding: 20px; border: 1px solid #ddd; border-radius: 5px; text-align: center;"> <h1 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"> hii, I am ${name} </h1> <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; font-size: 16px;">Please confirm your verification email to start journey with us</p> <a style="border: 1px solid #666; padding: 8px 15px ; border-radius: 5px; display: inline-block;text-decoration: none; color: #333; margin-top: 20px;" href=${url} onmouseover="this.style.background='red'" onmouseleave="this.style.background-'transparent'">Verify email</a> </div>`
    }
    stmp.sendMail(mailOptions,(err,res)=>{
        if(err) return err;
        return res
    })
}

// send reset code

exports.sendResetCode = (email,name,code)=>{
    auth.setCredentials(
        {
            refresh_token : MAILING_REFRESH
        }
    )
    const accessToken = auth.getAccessToken()
    const stmp = nodemailer.createTransport({
        service: "gmail",
        auth:{
            type:"OAuth2",
            user:EMAIL,
            clientId: MAILING_ID,
            clientSecret: MAILING_SECRET,
            refreshToken: MAILING_REFRESH,
            accessToken
        }
    })
    const mailOptions = {
        from : EMAIL,
        to : email,
        subject : "Reset Application Password",
        html : ` <div style="padding: 20px; border: 1px solid #ddd; border-radius: 5px; text-align: center;"> <h1 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"> hii, I am ${name} </h1> <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; font-size: 16px;">Please confirm your verification email to start journey with us</p> <a style="border: 1px solid #666; padding: 8px 15px ; border-radius: 5px; display: inline-block;text-decoration: none; color: #333; margin-top: 20px; font-size : 22px " onmouseover="this.style.background='red'" onmouseleave="this.style.background-'transparent'">${code}</a> </div>`
    }
    stmp.sendMail(mailOptions,(err,res)=>{
        if(err) return err;
        return res
    })
}