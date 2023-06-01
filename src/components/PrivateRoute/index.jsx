import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const { children } = props;

    return(
        <>
            {isAuthenticated === true ?
                <>{children}</>
                :
                <Navigate to={"/login"} replace />
            }
        </>
    )
}

export default PrivateRoute;