import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);

    return(
        <div>
            {isAuthenticated === true ?
                <>{props.children}</>
                :
                <Navigate to="/login" replace />
            }
            
            {/* {
                isAuthenticated === true ? alert('Hello') : alert('No')
            } */}
        </div>
    )
}

export default PrivateRoute;