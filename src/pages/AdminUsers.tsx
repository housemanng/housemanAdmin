import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../features/users";
import {
  selectUsersLoading,
  selectUsersError,
  selectTotalUsers,
  selectVerifiedUsers,
  selectBlacklistedUsers,
} from "../features/users";
import type { AppDispatch } from "../app/store";

const AdminUsers = () => {
  const dispatch = useDispatch<AppDispatch>();

  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);
  const totalUsers = useSelector(selectTotalUsers);
  const verifiedUsers = useSelector(selectVerifiedUsers);
  const blacklistedUsers = useSelector(selectBlacklistedUsers);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="content p-0">
      <div className="Details-Cont-Display">
        <div className="main-container-Heading">
          <div>Analytic Dashboard</div>
          <div>Fund Wallet</div>
        </div>
        <div className="container p-0">
          <div className="row g-2">
            <div className="col-md-4">
              <div className="Dashboard-Display-Digits">
                <div>Users</div>
                <div>{loading ? "Loading..." : totalUsers || 0}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="Dashboard-Display-Digits">
                <div>Verified Users</div>
                <div>{loading ? "Loading..." : verifiedUsers || 0}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="Dashboard-Display-Digits">
                <div>Blacklisted Users</div>
                <div>{loading ? "Loading..." : blacklistedUsers || 0}</div>
              </div>
            </div>
          </div>
          {error && (
            <div className="error-message" style={{ marginTop: 12 }}>Error: {error}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
