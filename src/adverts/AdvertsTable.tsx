import useGetAllData from "../hooks/useGetAllData.tsx";
import AdvertsTableItem from "./AdvertsTableItem.tsx";
import {Table} from "react-bootstrap";
import useCategory from "../hooks/useCategory.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {PaginationContext} from "../context/PaginationContext.tsx";
import {useToaster} from "../hooks/useToaster.tsx";
import PaginationContainer from "../pagination/PaginationContainer.tsx";
import AdvertsLoadingError from "./advertsLoadingError/AdvertsLoadingError.tsx";

export default function AdvertsTable() {
    const [data, isLoading, isError] = useGetAllData()
    const [categories, isLoadingCategories, isCategoryError] = useCategory()

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
                    isLoading || isLoadingCategories ? <AdvertsLoadingError isLoading={true}/> :
                        isCategoryError || isError || data === undefined ? <AdvertsLoadingError isError={true}/> :
                            data.map(item => (
                                <AdvertsTableItem key={item.id} data={item} categories={categories}/>
                            ))
                }
                </tbody>
            </Table>
            <PaginationContainer/>
        </>
    )
}