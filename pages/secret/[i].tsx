import { GetServerSideProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"


export const getServerSideProps : GetServerSideProps = async ({req, query}) => {
    const {i} = query

    return {
        props: {
            i
        }
    }
}


export default function page({i} : {i?: number}){



    return( 
    <div className="h-screen flex justify-center items-center">
        <div className="flex-col justify-center items-center">
            <p className="text-7xl text-white pb-32 font-bold">Welcome to page {i}!</p>
            <div className="justify-center items-center flex">
                <Link href={"/"} className="flex justify-center items-center p-10 px-12 bg-gray-400 hover:bg-gray-800 hover:text-white text-black rounded-3xl text-3xl">Take me back</Link>
            </div>
        </div>
    </div>
    )
}