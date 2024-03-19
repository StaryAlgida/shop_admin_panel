import {Col, Spinner, Table} from "react-bootstrap";

export default function DashboardLoading() {
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
                        <td colSpan={5} className='text-center'><Spinner animation="border" /></td>
                    </tr>
                    </tbody>
                </Table>
            </Col>
            <Col xs={12} lg={6} className='text-center'>
                <Spinner animation="border"/>
            </Col>
        </>
    )
}