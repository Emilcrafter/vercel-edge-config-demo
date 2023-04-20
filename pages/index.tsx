import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ReCAPTCHA from "react-google-recaptcha";
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

function onChange(value : any) {
  console.log("Captcha value:", value);
  document.cookie = "captcha=true";
  location.reload()
}

export const getServerSideProps : GetServerSideProps = async ({req}) => {
  const requireCaptcha = req.headers['require-captcha'];
  
  return {
    props:{
       requireCaptcha: requireCaptcha === "true"
    }
  }
}


export default function Home({requireCaptcha} : {requireCaptcha: boolean}) {
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

        <div className='flex items-center flex-row w-screen px-60 h-14 mt-20 justify-around'>
          <Link className='flex flex-row items-center justify-center bg-green-300 hover:bg-green-800 hover:text-white h-full w-60 rounded-3xl text-black' href={"secret/1"}> Go to Page 1</Link>
          <Link className='flex flex-row items-center justify-center bg-blue-300 hover:bg-blue-800 hover:text-white h-full w-60 rounded-3xl text-black'  href={'secret/2'}> Go to Page 2</Link>
          <Link className='flex flex-row items-center justify-center bg-red-300 hover:bg-red-800 hover:text-white h-full w-60 rounded-3xl text-black' href={'secret/3'}> Go to Page 3</Link>
        </div>
        
      </main>
    
    </div>
  )
}
