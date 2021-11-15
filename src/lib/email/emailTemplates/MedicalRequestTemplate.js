const medicalRequestHTMLTemplate = (requestNumber, name, surname)=>`<html>

<head>
    <title></title>
</head>

<body>
    <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe"
        style="color:#444444; line-height:20px; padding:16px 16px 16px 16px; text-align:Center; width:100%"
        data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
        <div>
            <div>
                <img src="https://res.cloudinary.com/koulin/image/upload/v1634748909/OneHealth/logo_2_jzpunf.png"
                    alt="" />
                <h1 style="font-size: 32px;">OneHealth</h1>
                <h6 style="font-size: 18px;">Hello ${name} ${surname}, we got your request</h6>
                <div style="background-color: #b3e9ff; border-radius: 20px; margin: auto; height: 80px; display: flex; justify-content: center; align-items: center; max-width: 328px;">
                <h4 style="font-size: 20px; text-align: center; width:328px">${requestNumber}</h4>
                </div>
                <h3 style="text-align: center; font-size: 24px;"><a href="https://capstone-oh-front.vercel.app">Go to profile</a></h3>
                <p style="font-size: 16px;">In 2 workings days we will get in touch to confirm the details, meanwhile you can reach us out on 55487-9964 or through our chat</p>
            </div>
        </div>


    </div>
</body>

</html>`


export default medicalRequestHTMLTemplate