import Search from "../_components/Search";

export const generateMetadata = ({ params }) => {
    return {
        title: `Search Results - ${decodeURI(params.id).toLocaleUpperCase()}`,
        description: `Viewing search results for ${decodeURI(params.id)}`,
    };
};
export default function Page({ params }) {
    return(
        <Search params={params}/>
    )
}