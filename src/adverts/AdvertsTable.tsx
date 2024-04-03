import useGetAllData from "../hooks/useGetAllData.tsx";
import AdvertsTableItem from "./AdvertsTableItem.tsx";
import {Table} from "react-bootstrap";
import useCategory from "../hooks/useCategory.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {useToaster} from "../hooks/useToaster.tsx";
import AdvertsLoadingError from "./advertsTableLoadingError/AdvertsLoadingError.tsx";
import PaginationContainer from "../pagination/PaginationContainer.tsx";
import {ParamContext} from "../context/ParamContext.tsx";

export default function AdvertsTable() {
    const [data, isLoading, isError] = useGetAllData()
    const [categories, isLoadingCategories, isCategoryError] = useCategory()
    const {show} = useToaster()
    const {getPage, updatePage} = useContext(ParamContext)

    const nav = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const checkCategory = () => {
            const queryParams = new URLSearchParams(location.search)
            const paramCategory = queryParams.get("category")
            if (paramCategory !== null) {
                const findCategory = categories.find(obj => obj.id === paramCategory)
                if (!findCategory) {
                    show({title: "404", description: `Category with id:${paramCategory} not found!`, bg: "danger"})
                }
            }
        }
        if (categories[0].id !== "") {
            void checkCategory()
        }
    }, [categories, show, nav, location.search]);

    useEffect(() => {
        const checkPage = () => {
            const currentPage = getPage()
            if (parseInt(currentPage) < 1 || isNaN(Number(currentPage))) {
                updatePage('1')
            }
        }
        void checkPage()
    }, [getPage, updatePage]);

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