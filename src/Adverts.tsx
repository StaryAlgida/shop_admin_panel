import useGetAllData from "./hooks/useGetAllData.tsx";
import HomeAdvert from "./components/HomeAdvert.tsx";
import {Table} from "react-bootstrap";
import useCategory from "./hooks/useCategory.tsx";
import HomeSkeleton from "./skeletons/HomeSkeleton.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {PaginationContext} from "./context/PaginationContext.tsx";
import {useToaster} from "./hooks/useToaster.tsx";
import PaginationContainer from "./pagination/PaginationContainer.tsx";

export default function Adverts() {
    const [data, isLoading] = useGetAllData()
    const [categories, isLoadingCategories] = useCategory()

    const {category} = useParams()

    const {updateCategory} = useContext(PaginationContext)
    const {show} = useToaster()

    const nav = useNavigate()

    useEffect(() => {
        const checkCategory = () => {
            const findCategory = categories.find(obj => obj.title.toLowerCase() === category)
            if (findCategory) {
                updateCategory(findCategory.id)
            } else if (category === undefined) {
                updateCategory('')
            } else {
                show({title: "404", description: `Category ${category} not found!`, bg: "danger"})
                nav('/')
            }
        }
        if (categories[0].id !== "") {
            void checkCategory()
        }
    }, [categories, category, updateCategory, show, nav]);


    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>id</th>
                    <th>User</th>
                    <th>Title</th>
                    <th>Price $</th>
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
            <PaginationContainer/>
        </>
    )
}