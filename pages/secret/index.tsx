import { GetServerSideProps } from "next"


export const getServerSideProps : GetServerSideProps = async ({req}) => {
    const demoHeader = req.headers["edge-config"]

    return {
        props: {
            demoHeader
        }
    }
}

export default function page({demoHeader} : {demoHeader?: string }){
    return <div>hej, {demoHeader}</div>
}