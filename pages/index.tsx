import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ReCAPTCHA from "react-google-recaptcha";
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { get } from '@vercel/edge-config';
import QRCode from 'react-qr-code';

function onChange(value : any) {
  console.log("Captcha value:", value);
  document.cookie = "captcha=true";
  location.reload()
}

export const getServerSideProps : GetServerSideProps = async ({req}) => {
  const requireCaptcha = req.headers['require-captcha'];
  console.log(req.headers)
  const baseUrl = req.headers.host && `https://${req.headers.host}` || "";
  console.time("Get Config for QR Code");
  const {qrcode} = await get("demo") as {qrcode: string};
  const hasUrl = qrcode.match(/https?:\/\//) !== null;
  console.timeEnd("Get Config for QR Code")
  return {
    props:{
       requireCaptcha: requireCaptcha === "true",
       qrCodeContents: hasUrl ? qrcode : baseUrl + qrcode
    }
  }
}


export default function Home({
  requireCaptcha,
  qrCodeContents
} : {
  requireCaptcha: boolean,
  qrCodeContents: string
}) {
  return(
    <div>
      <Head>
        <title>Edge Config Demo</title>
        <meta name="description" content="Our demo for Vercel Edge config" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main + ' flex flex-col items-center bg-black'}>
        <div>
          <h1 className='text-5xl font-extrabold'>Vercel Edge Config Demo</h1>
          
        </div>
        <QRCode 
        value={qrCodeContents}
        size={256}
        />
        <div className='flex justify-center'>
          <p className='text-white text-2xl py-10 font-bold'> {requireCaptcha ? "Please verify yourself:" : "Welcome to our fine website!"}</p>
        </div>

        <div >
          {requireCaptcha && <ReCAPTCHA 
            className='bg-black'
            sitekey="6LdeiaIlAAAAACF7MRV7Fl6QFiTM_A-XGZ-sgH4C"
            onChange={onChange}
            theme='light'
          />}
        </div>

        <div className='flex items-center flex-col pt-6 md:pt-0 gap-y-6 md:gap-y-0 md:flex-row w-screen md:px-60 h-14 mt-20 justify-around'>
          <Link className='flex flex-row py-5 md:py-0 items-center justify-center bg-green-300 hover:bg-green-800 hover:text-white h-full w-60 rounded-3xl text-black' href={"secret/1"}> {requireCaptcha ? "This page is locked" : "Go to Page 1"}</Link>
          <Link className='flex flex-row py-5 md:py-0 items-center justify-center bg-blue-300 hover:bg-blue-800 hover:text-white h-full w-60 rounded-3xl text-black'  href={'secret/2'}> {requireCaptcha ? "This page is locked" : "Go to Page 2"}</Link>
          <Link className='flex flex-row py-5 md:py-0 items-center justify-center bg-red-300 hover:bg-red-800 hover:text-white h-full w-60 rounded-3xl text-black' href={'secret/3'}> {requireCaptcha ? "This page is locked" : "Go to Page 3"}</Link>
        </div>
        
      </main>
    
    </div>
  )
}
