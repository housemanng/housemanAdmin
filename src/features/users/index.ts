// API exports
export {
  fetchAllUsers,
  fetchUserById,
  fetchUserByUvcCode,
  verifyNIN,
  changePassword,
  updatePhoneNumber,
  updateEmail,
  updateUvcCode,
  updateBio,
  updateSkills,
  verifyUser,
  unverifyUser,
  blockUser,
  unblockUser,
  blacklistUser,
  unblacklistUser,
  deleteUser,
  getBlacklistReasons
} from './usersAPI';

// Slice exports
export {
  clearErrors,
  clearSuccess,
  setFilters,
  clearFilters,
  setPagination,
  setCurrentUser,
  clearCurrentUser,
  updateUserInList,
  removeUserFromList,
  resetPasswordAction,
  resetPhoneAction,
  resetEmailAction,
  resetUvcAction,
  resetBioAction,
  resetSkillsAction,
  resetAdminAction,
  resetDeleteAction
} from './usersSlice';

// Selector exports
export {
  // Base selectors
  selectUsersState,
  
  // Data selectors
  selectUsers,
  selectCurrentUser,
  selectUserByUvc,
  selectBlacklistReasons,
  
  // Loading selectors
  selectUsersLoading,
  selectUserByIdLoading,
  selectUserByUvcLoading,
  selectVerifyLoading,
  selectPasswordLoading,
  selectPhoneLoading,
  selectEmailLoading,
  selectUvcLoading,
  selectBioLoading,
  selectSkillsLoading,
  selectAdminActionLoading,
  selectDeleteLoading,
  selectBlacklistReasonsLoading,
  
  // Error selectors
  selectUsersError,
  selectUserByIdError,
  selectUserByUvcError,
  selectVerifyError,
  selectPasswordError,
  selectPhoneError,
  selectEmailError,
  selectUvcError,
  selectBioError,
  selectSkillsError,
  selectAdminActionError,
  selectDeleteError,
  selectBlacklistReasonsError,
  
  // Success selectors
  selectUsersSuccess,
  selectPasswordSuccess,
  selectPhoneSuccess,
  selectEmailSuccess,
  selectUvcSuccess,
  selectBioSuccess,
  selectSkillsSuccess,
  selectAdminActionSuccess,
  selectDeleteSuccess,
  
  // Pagination and filters selectors
  selectPagination,
  selectFilters,
  
  // Statistics selectors
  selectStatistics,
  selectTotalUsers,
  selectVerifiedUsers,
  selectUnverifiedUsers,
  selectBlockedUsers,
  selectBlacklistedUsers,
  selectActiveUsers,
  selectMaleUsers,
  selectFemaleUsers,
  selectOtherUsers,
  
  // Computed selectors
  selectUserById,
  selectUserByEmail,
  selectUserByPhone,
  selectUserByUvcCode,
  
  // Filtering selectors
  selectFilteredUsers,
  selectPaginatedUsers,
  selectUserStatistics,
  
  // User details selectors
  selectUserDetails,
  selectUserVerificationStatus,
  selectUserStatus,
  selectUserWallet,
  selectUserWalletBalance,
  selectUserSubscription,
  selectUserReviewStats,
  selectUserAddresses,
  
  // State selectors
  selectAnyLoading,
  selectAnyError,
  selectAnySuccess
} from './usersSelectors';

// Default slice export
export { default as usersReducer } from './usersSlice'; 