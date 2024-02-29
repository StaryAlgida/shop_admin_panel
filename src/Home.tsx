import useGetAllData from "./hooks/useGetAllData.tsx";
import HomeAdvert from "./components/HomeAdvert.tsx";
import {Table} from "react-bootstrap";
import useCategory from "./hooks/useCategory.tsx";
import HomeSkeleton from "./skeletons/HomeSkeleton.tsx";

export default function Home() {
    const [data, isLoading] = useGetAllData()
    const [categories, isLoadingCategories] = useCategory()
    console.log(categories.length)
    console.log(categories)
    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>id</th>
                    <th>User</th>
                    <th>Title</th>
                    <th>Created on</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                {
                    isLoading && isLoadingCategories ? <HomeSkeleton/> :
                        data.map(item => (
                            <HomeAdvert key={item.id} data={item} categories={categories}/>
                        ))
                }
                </tbody>
            </Table>
        </>
    )
}