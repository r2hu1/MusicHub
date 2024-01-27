import Search from "../_components/Search";

export const generateMetadata = ({ params }) => {
    return {
        title: `Search Results for ${decodeURI(params.id)}`,
        description: `Viewing search results for ${decodeURI(params.id)}`,
    };
};
export default function Page({ params }) {
    return(
        <Search params={params}/>
    )
}