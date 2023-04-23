/* eslint-disable @next/next/no-img-element */
import Image from "next/image"




export default function page(){

    function Fire({className} : {className : string}){return (<img
    className={className}
    src={"/Fire.webp"}
    alt="FIRE"
    ></img>)}

    return <div className="w-screen h-screen bg-red-600 flex items-center flex-col justify-end relative overflow-clip -space-y-5">
        <div className=" absolute w-full flex items-center justify-start flex-col top-0">
        <img className=" w-56" src="/chicken.webp" alt="CHICKEN"></img>
        <img src="/egg.webp" alt="egg"></img>
        <img src="/egg.webp" alt="egg"></img>
        <img src="/egg.webp" alt="egg"></img>
        <img src="/egg.webp" alt="egg"></img>
        <img src="/egg.webp" alt="egg"></img>
        <img src="/egg.webp" alt="egg"></img>
        <img src="/egg.webp" alt="egg"></img>
        <img src="/egg.webp" alt="egg"></img>
        <img src="/egg.webp" alt="egg"></img>
        </div>
        <div className="absolute w-full flex items-center justify-center -bottom-32 -space-x-20">
            <Fire className=""></Fire>
            <Fire className=""></Fire>
            <Fire className=""></Fire>
            <Fire className=""></Fire>
            <Fire className=""></Fire>
            <Fire className=""></Fire>
            <Fire className=""></Fire>
            <Fire className=""></Fire>
            <Fire className=""></Fire>
            <Fire className=""></Fire>
            <Fire className=""></Fire>
            <Fire className=""></Fire>
            <Fire className=""></Fire>
            <Fire className=""></Fire>
        </div>
    </div>
}