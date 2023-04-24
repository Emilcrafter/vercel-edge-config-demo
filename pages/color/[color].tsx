import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
    const colors = ["red", "green", "blue", "yellow"];

    const paths = colors.map((color) => ({
        params: { color },
    }));

    return { paths, fallback: false };
};

export const getStaticProps : GetStaticProps = async ({ params }) => {
    const { color } = params as { color: string };

    return { props: { color } };
}

export default function Color({ color } : { color: string }) {
    return (
        <div className={" w-screen h-screen flex items-center justify-center"} style={{backgroundColor: color}} >
            <p className="p-6 bg-black text-white text-6xl font-bold">{color}</p>
        </div>
    );
}