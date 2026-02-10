const pdfmake = require('pdfmake');

const creatPdf = () => {
    try {
        // Define font files
        const fonts = {
            Roboto: {
                normal: './public/fonts/Roboto-Regular.ttf',
                bold: './public/fonts/Roboto-Medium.ttf',
                italics: './public/fonts/Roboto-Italic.ttf',
                bolditalics: './public/fonts/Roboto-MediumItalic.ttf'
            }
        };

        pdfmake.addFonts(fonts);

        const docDefinition = {
            content: [
                {
                    columns: [
                        {
                            stack: [
                                {
                                    image: './public/Images/Amazon_logo.png',
                                    width: 164,
                                    height: 50,
                                },
                            ]
                        },
                        {   
                            width: 'auto',
                            stack: [
                                { text: 'Tax Invoice/Bill of Supply/Cash Memo', style: 'normalText',bold: true, alignment: 'right' },
                                { text: `(Original for Recipient)`, style: 'normalText', alignment: 'right' }
                            ]
                        }
                    ],
                    margin: [0, 0, 0, 20]
                },

                {
                    columns: [
                        {
                            width: '50%',
                            stack: [
                                { text: 'Sold By:', bold: true, style: 'normalText' },
                                { text: "harsh", style: 'normalText' },
                                { text: "c-604 Saral Green Velly", style: 'normalText' },
                                { text: "Surat", style: 'normalText' },
                                { text: 'India', style: 'normalText', margin: [0, 5, 0, 0] }
                            ]
                        },
                        {
                            width: '50%',
                            stack: [
                                { text: 'Billing Address:', bold: true, style: 'normalText', alignment: 'right' },
                                { text: "harsh", style: 'normalText', alignment: 'right' },
                                { text: "c-604 Saral Green Velly", style: 'normalText', alignment: 'right' },
                                { text: "Surat", style: 'normalText', alignment: 'right' }
                            ]
                        }
                    ],
                    margin: [0, 0, 0, 15]
                },

                // Shipping Address
                {
                    columns: [
                        {
                            width: '50%',
                            stack: [
                                { text: 'PAN NO : EPcfe02465', style: 'normalText' },
                                { text: 'GST Registration NO : 27AABCCDDEEFFGGH', style: 'normalText' },
                                { text: 'Order Number: 405-0419869-0333924', style: 'normalText' },
                                { text: "Order Date: 28.01.2025", style: 'normalText', margin: [0, 0, 0, 5] },

                            ]
                        },
                        {
                            width: '50%',
                            stack: [
                                { text: 'Shipping Address:', style: 'normalText',bold: true, alignment: 'right' },
                                { text: "harsh", style: 'normalText', alignment: 'right' },
                                { text: "c-604 Saral Green Velly", style: 'normalText', alignment: 'right' },
                                { text: "Surat", style: 'normalText', alignment: 'right' },
                                { text: 'Invoice Number: IN-803 ', style: 'normalText' , alignment: 'right' },
                                { text: 'Invoice Date: 28.01.2025', style: 'normalText' , alignment: 'right' },
                            ],
                            margin: [0, 0, 0, 20]
                        },
                    ],
                    margin: [0, 0, 0, 20]
                },

            ]
        };



        const pdf = pdfmake.createPdf(docDefinition);


        pdf.write('bill.pdf').then(() => {
            // success event
        }, err => {
            // error event
            console.error(err);
        });


    } catch (error) {
        console.log(error);

    }
}


module.exports = creatPdf;