import PdfPrinter from "pdfmake"
import ImageDataURI  from 'image-data-uri'
import htmlToPdfmake from "html-to-pdfmake"
import jsdom from 'jsdom'




const OneHealthLogo = process.env.OH_Logo

const fonts = {
    Roboto: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
    },
}

const convertImageURL = async (imageUrl) => {
    const encodedUrl = await ImageDataURI.encodeFromURL(imageUrl) 
    return encodedUrl
}


// need to pass the window
const { JSDOM } = jsdom;
const { window } = new JSDOM("");




export const createPDFReadableStream = async (user, request) => {
    try {
        const printer = new PdfPrinter(fonts)
        let encondedImage = await convertImageURL(OneHealthLogo)

        const docDefinition = {
            pageSize: 'A4',
            pageMargins: [40, 60, 40, 60],
            // header : `${pdfData.title}`, just playing around
            content: [
                { //styling
                    text: `Confirmation protocol: ${request._id}`,
                    alignment: 'center',
                    // margin: [left, top, right, bottom]
                    margin: [ 0, 0, 0, 24 ],
                    fontSize: 24, 
                    bold: true
                },
                {
                    image: encondedImage,
                    fit: [515, 900]
                },
                {
                    //convert html into text for pdf maker needs to pass the window to the htmlToPdfmaker when using node
                    text: 'htmlToPdfmake(pdfData.content, {window:window}',
                    margin: [ 0, 24, 0, 0 ],
                    fontSize: 16,
                    lineHeight: 1.4 
                }
            ]
        }
        const options = {}
        const pdfReadableStream = printer.createPdfKitDocument(docDefinition, options)

        pdfReadableStream.end()
        return pdfReadableStream
    } catch (error) {
        console.log(error)
    }
}