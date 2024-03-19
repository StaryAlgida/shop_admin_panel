import {StatesProps} from "../../interfaces/dashboardPropsInterfaces.ts";
import {FC} from "react";
import {Spinner} from "react-bootstrap";

const AdvertsLoadingError: FC<StatesProps> = ({isLoading = false, isError = false}) => {
    return (
        <tr>
            <td colSpan={6} className="text-center">
                {isLoading && <Spinner animation="border"/>}
                {isError && "No data"}
            </td>
        </tr>
    )
}

export default AdvertsLoadingError