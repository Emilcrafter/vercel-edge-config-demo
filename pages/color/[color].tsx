import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
    const colors = ["red", "green", "blue", "yellow", "pink"];

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
        <div className=" w-full h-full" style={{ backgroundColor: color }}>
            <h1>{color}</h1>
        </div>
    );
}