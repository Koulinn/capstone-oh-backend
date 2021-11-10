import sgMail from '@sendgrid/mail'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { pipeline } from 'stream'
import fs from "fs-extra"
import { createPDFReadableStream } from './pdf-utils.js'
import { promisify } from "util"
import pkg from 'base64topdf'
import imageToBase64 from 'image-to-base64'
import fileExtension from 'file-extension'




const emailBaseText = 'OneHealth Received your request, our assistants will get in touch in 2 working days to confirm the protocol '

const apiKey = `SG.${process.env.SENDGRID_API_KEY}`
sgMail.setApiKey(apiKey)

export const createPDFOnDisk = async (user, request) => {
    const createSyncPipeline = promisify(pipeline)
    const path = join(dirname(fileURLToPath(import.meta.url)), `./pdfs/${request._id}.pdf`)
    const pdfStream = await createPDFReadableStream(user, request)
    await createSyncPipeline(pdfStream, fs.createWriteStream(path))
    return path
}



const createRequestAttachments = async (requests) => {

    if (!requests.user_tests_requested.hasOwnProperty('userFilesURL')) {
        return []
    } else {
        return requests.user_tests_requested.userFilesURL.map( async (request, i) => {
            let emailContent = await imageToBase64(request)
            let requestExtension = await fileExtension(request)
            return {
                content: emailContent.toString('base64'),
                filename: `Image ${i}`,
                type: `image/${requestExtension}`,
                disposition: 'attachment',
                content_id: `${i}`,
            }
        })
    }
}


export const sendMedicalRequestEmail = async (user, request) => {
    try {
        const requestID = request._id
        const emailText = `${emailBaseText} ${requestID}`
        const pdfPath = await createPDFOnDisk(user, request)
        const data = await pkg.base64Encode(pdfPath)


        const medicalRequestAttachment = await createRequestAttachments(request)
        const test = await Promise.all(medicalRequestAttachment)
    
        const msg = {
            to: user.email,
            from: process.env.SENDGRID_EMAIL,
            subject: `New Medical request protocol: ${requestID}`,
            text: emailText,
            html: emailText,
            attachments: [
                {
                    content: data.toString('base64'),
                    filename: `MedicalRequestConfirmation.pdf`,
                    type: 'application/pdf',
                    disposition: 'attachment',
                    content_id: `${user._id}`,
                },
                ...test
            ]
        }
        await sgMail.send(msg)
    } catch (error) {
        console.log(error)
    }
}

