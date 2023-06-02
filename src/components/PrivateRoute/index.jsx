import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import NotPermitted from '../../pages/NotPermitted';

const RoleBaseRoute = (props) => {
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const user = useSelector(state => state.account.user);
    const userRole = user.role;

    if(isAdminRoute && userRole === 'ADMIN'){
        return <>{props.children}</>
    } else{
        return <><NotPermitted /></>
    }
}

const PrivateRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);

    return(
        <div>
            {isAuthenticated === true ?
                <RoleBaseRoute>
                    <>{props.children}</>
                </RoleBaseRoute>
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