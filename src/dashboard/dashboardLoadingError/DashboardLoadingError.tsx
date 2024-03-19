import {Col, Spinner, Table} from "react-bootstrap";
import {FC} from "react";
import {StatesProps} from "../../interfaces/dashboardPropsInterfaces.ts";

const DashboardLoadingError: FC<StatesProps> = ({isLoading = false, isError = false}) => {
    return (
        <>
            <Col xs={12} lg={6}>
                <Table striped="columns">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>User</th>
                        <th>Title</th>
                        <th>Price $</th>
                        <th>Category</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colSpan={5} className='text-center cursor-not-allowed'>
                            {isLoading && <Spinner animation="border"/>}
                            {isError && "No data"}
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Col>
            <Col xs={12} lg={6} className='text-center'>
                {isLoading && <Spinner animation="border"/>}
                {isError && "No data"}
            </Col>
        </>
    )
}

export default DashboardLoadingError