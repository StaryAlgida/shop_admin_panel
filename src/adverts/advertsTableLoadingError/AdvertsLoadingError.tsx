import {FC} from "react";
import {Spinner} from "react-bootstrap";

interface StatesProps {
  isLoading: boolean;
  isError: boolean;
}

const AdvertsLoadingError: FC<StatesProps> = ({isLoading = false, isError = false}) => {
  return (
      <>
        {
          isLoading || isError ?
              <tr>
                <td colSpan={6} className="text-center">
                  {isLoading && <Spinner animation="border"/>}
                  {isError && !isLoading && "No data"}
                </td>
              </tr> : ''
        }</>

  )
}

export default AdvertsLoadingError