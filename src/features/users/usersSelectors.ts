import { createSelector } from '@reduxjs/toolkit';

// Base selectors
export const selectUsersState = (state: any) => state.users;

// Data selectors
export const selectUsers = (state: any) => state.users.users;
export const selectCurrentUser = (state: any) => state.users.currentUser;
export const selectUserByUvc = (state: any) => state.users.userByUvc;
export const selectBlacklistReasons = (state: any) => state.users.blacklistReasons;

// Loading selectors
export const selectUsersLoading = (state: any) => state.users.loading;
export const selectUserByIdLoading = (state: any) => state.users.loadingById;
export const selectUserByUvcLoading = (state: any) => state.users.loadingByUvc;
export const selectVerifyLoading = (state: any) => state.users.loadingVerify;
export const selectPasswordLoading = (state: any) => state.users.loadingPassword;
export const selectPhoneLoading = (state: any) => state.users.loadingPhone;
export const selectEmailLoading = (state: any) => state.users.loadingEmail;
export const selectUvcLoading = (state: any) => state.users.loadingUvc;
export const selectBioLoading = (state: any) => state.users.loadingBio;
export const selectSkillsLoading = (state: any) => state.users.loadingSkills;
export const selectAdminActionLoading = (state: any) => state.users.loadingAdminAction;
export const selectDeleteLoading = (state: any) => state.users.loadingDelete;
export const selectBlacklistReasonsLoading = (state: any) => state.users.loadingBlacklistReasons;

// Error selectors
export const selectUsersError = (state: any) => state.users.error;
export const selectUserByIdError = (state: any) => state.users.errorById;
export const selectUserByUvcError = (state: any) => state.users.errorByUvc;
export const selectVerifyError = (state: any) => state.users.errorVerify;
export const selectPasswordError = (state: any) => state.users.errorPassword;
export const selectPhoneError = (state: any) => state.users.errorPhone;
export const selectEmailError = (state: any) => state.users.errorEmail;
export const selectUvcError = (state: any) => state.users.errorUvc;
export const selectBioError = (state: any) => state.users.errorBio;
export const selectSkillsError = (state: any) => state.users.errorSkills;
export const selectAdminActionError = (state: any) => state.users.errorAdminAction;
export const selectDeleteError = (state: any) => state.users.errorDelete;
export const selectBlacklistReasonsError = (state: any) => state.users.errorBlacklistReasons;

// Success selectors
export const selectUsersSuccess = (state: any) => state.users.success;
export const selectPasswordSuccess = (state: any) => state.users.successPassword;
export const selectPhoneSuccess = (state: any) => state.users.successPhone;
export const selectEmailSuccess = (state: any) => state.users.successEmail;
export const selectUvcSuccess = (state: any) => state.users.successUvc;
export const selectBioSuccess = (state: any) => state.users.successBio;
export const selectSkillsSuccess = (state: any) => state.users.successSkills;
export const selectAdminActionSuccess = (state: any) => state.users.successAdminAction;
export const selectDeleteSuccess = (state: any) => state.users.successDelete;

// Pagination and filters selectors
export const selectPagination = (state: any) => state.users.pagination;
export const selectFilters = (state: any) => state.users.filters;

// Statistics selectors
export const selectStatistics = (state: any) => state.users.statistics;
export const selectTotalUsers = (state: any) => state.users.statistics.totalUsers;
export const selectVerifiedUsers = (state: any) => state.users.statistics.verifiedUsers;
export const selectUnverifiedUsers = (state: any) => state.users.statistics.unverifiedUsers;
export const selectBlockedUsers = (state: any) => state.users.statistics.blockedUsers;
export const selectBlacklistedUsers = (state: any) => state.users.statistics.blacklistedUsers;
export const selectActiveUsers = (state: any) => state.users.statistics.activeUsers;
export const selectMaleUsers = (state: any) => state.users.statistics.maleUsers;
export const selectFemaleUsers = (state: any) => state.users.statistics.femaleUsers;
export const selectOtherUsers = (state: any) => state.users.statistics.otherUsers;

// Computed selectors
export const selectUserById = createSelector(
  [selectUsers, (state: any, userId: string) => userId],
  (users: any[], userId: string) => users.find((user: any) => user._id === userId)
);

export const selectUserByEmail = createSelector(
  [selectUsers, (state: any, email: string) => email],
  (users: any[], email: string) => users.find((user: any) => user.email === email)
);

export const selectUserByPhone = createSelector(
  [selectUsers, (state: any, phone: string) => phone],
  (users: any[], phone: string) => users.find((user: any) => user.phone_number === phone)
);

export const selectUserByUvcCode = createSelector(
  [selectUsers, (state: any, uvcCode: string) => uvcCode],
  (users: any[], uvcCode: string) => users.find((user: any) => user.uvcCode === uvcCode)
);

// Filtering selectors
export const selectFilteredUsers = createSelector(
  [selectUsers, selectFilters],
  (users: any[], filters: any) => {
    let filtered = [...users];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter((user: any) =>
        user.name?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        user.phone_number?.includes(searchLower) ||
        user.uvcCode?.toLowerCase().includes(searchLower) ||
        user.occupation?.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (filters.status) {
      switch (filters.status) {
        case 'active':
          filtered = filtered.filter((user: any) => !user.isBlocked?.status && !user.isBlacklist);
          break;
        case 'blocked':
          filtered = filtered.filter((user: any) => user.isBlocked?.status);
          break;
        case 'blacklisted':
          filtered = filtered.filter((user: any) => user.isBlacklist);
          break;
        default:
          break;
      }
    }

    // Verification status filter
    if (filters.verificationStatus) {
      switch (filters.verificationStatus) {
        case 'verified':
          filtered = filtered.filter((user: any) => user.isVerified);
          break;
        case 'unverified':
          filtered = filtered.filter((user: any) => !user.isVerified);
          break;
        default:
          break;
      }
    }

    // Blacklist status filter
    if (filters.blacklistStatus) {
      switch (filters.blacklistStatus) {
        case 'blacklisted':
          filtered = filtered.filter((user: any) => user.isBlacklist);
          break;
        case 'not_blacklisted':
          filtered = filtered.filter((user: any) => !user.isBlacklist);
          break;
        default:
          break;
      }
    }

    // Blocked status filter
    if (filters.blockedStatus) {
      switch (filters.blockedStatus) {
        case 'blocked':
          filtered = filtered.filter((user: any) => user.isBlocked?.status);
          break;
        case 'not_blocked':
          filtered = filtered.filter((user: any) => !user.isBlocked?.status);
          break;
        default:
          break;
      }
    }

    // User type filter
    if (filters.userType) {
      filtered = filtered.filter((user: any) => user.userType === filters.userType);
    }

    // Occupation filter
    if (filters.occupation) {
      filtered = filtered.filter((user: any) => user.occupation === filters.occupation);
    }

    // Sex filter
    if (filters.sex) {
      filtered = filtered.filter((user: any) => user.sex === filters.sex);
    }

    return filtered;
  }
);

// Pagination selectors
export const selectPaginatedUsers = createSelector(
  [selectFilteredUsers, selectPagination],
  (filteredUsers: any[], pagination: any) => {
    const { page, limit } = pagination;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredUsers.slice(startIndex, endIndex);
  }
);

// Statistics selectors
export const selectUserStatistics = createSelector(
  [selectFilteredUsers],
  (filteredUsers: any[]) => ({
    totalUsers: filteredUsers.length,
    verifiedUsers: filteredUsers.filter((user: any) => user.isVerified).length,
    unverifiedUsers: filteredUsers.filter((user: any) => !user.isVerified).length,
    blockedUsers: filteredUsers.filter((user: any) => user.isBlocked?.status).length,
    blacklistedUsers: filteredUsers.filter((user: any) => user.isBlacklist).length,
    activeUsers: filteredUsers.filter((user: any) => !user.isBlocked?.status && !user.isBlacklist).length,
    maleUsers: filteredUsers.filter((user: any) => user.sex === 'male').length,
    femaleUsers: filteredUsers.filter((user: any) => user.sex === 'female').length,
    otherUsers: filteredUsers.filter((user: any) => user.sex === 'other').length
  })
);

// User details selectors
export const selectUserDetails = createSelector(
  [selectCurrentUser],
  (currentUser: any) => {
    if (!currentUser) return null;
    
    return {
      basicInfo: {
        id: currentUser._id,
        name: `${currentUser.ninDetails?.firstName || ''} ${currentUser.ninDetails?.lastName || ''}`.trim(),
        email: currentUser.email,
        phone: currentUser.phone_number,
        uvcCode: currentUser.uvcCode,
        occupation: currentUser.occupation,
        sex: currentUser.sex,
        bio: currentUser.bio,
        skills: currentUser.skills || []
      },
      verification: {
        isVerified: currentUser.isVerified,
        nin: currentUser.nin,
        bvn: currentUser.bvn,
        driverLicense: currentUser.driverLicense,
        internationalPassport: currentUser.internationalPassport,
        address: currentUser.addressverification
      },
      status: {
        isBlocked: currentUser.isBlocked,
        isBlacklist: currentUser.isBlacklist,
        blacklistReason: currentUser.blacklistReason,
        blacklistedAt: currentUser.blacklistedAt
      },
      wallet: currentUser.wallet,
      subscription: {
        status: currentUser.subscriptionStatus,
        lastRenewalDate: currentUser.lastRenewalDate,
        nextRenewalDate: currentUser.nextRenewalDate
      },
      reviews: currentUser.reviewStats,
      addresses: {
        current: currentUser.currentAddress,
        history: currentUser.addressHistory,
        housemateHistory: currentUser.housemateHistory
      },
      createdAt: currentUser.createdAt,
      lastLogin: currentUser.lastLogin
    };
  }
);

// User verification status selectors
export const selectUserVerificationStatus = createSelector(
  [selectCurrentUser],
  (currentUser: any) => {
    if (!currentUser) return null;
    
    return {
      overall: currentUser.isVerified,
      nin: currentUser.nin?.verified || false,
      bvn: currentUser.bvn?.verified || false,
      driverLicense: currentUser.driverLicense?.verified || false,
      internationalPassport: currentUser.internationalPassport?.verified || false,
      address: currentUser.addressverification?.verified || false
    };
  }
);

// User status selectors
export const selectUserStatus = createSelector(
  [selectCurrentUser],
  (currentUser: any) => {
    if (!currentUser) return null;
    
    return {
      isActive: !currentUser.isBlocked?.status && !currentUser.isBlacklist,
      isBlocked: currentUser.isBlocked?.status || false,
      isBlacklisted: currentUser.isBlacklist || false,
      blockReason: currentUser.isBlocked?.reason,
      blacklistReason: currentUser.blacklistReason,
      blockedAt: currentUser.isBlocked?.blockedAt,
      blacklistedAt: currentUser.blacklistedAt
    };
  }
);

// User wallet selectors
export const selectUserWallet = createSelector(
  [selectCurrentUser],
  (currentUser: any) => currentUser?.wallet || null
);

export const selectUserWalletBalance = createSelector(
  [selectUserWallet],
  (wallet: any) => wallet?.balance || 0
);

// User subscription selectors
export const selectUserSubscription = createSelector(
  [selectCurrentUser],
  (currentUser: any) => {
    if (!currentUser) return null;
    
    return {
      isActive: currentUser.subscriptionStatus,
      lastRenewalDate: currentUser.lastRenewalDate,
      nextRenewalDate: currentUser.nextRenewalDate,
      status: currentUser.subscriptionStatus ? 'Active' : 'Expired'
    };
  }
);

// User review statistics selectors
export const selectUserReviewStats = createSelector(
  [selectCurrentUser],
  (currentUser: any) => currentUser?.reviewStats || null
);

// User address selectors
export const selectUserAddresses = createSelector(
  [selectCurrentUser],
  (currentUser: any) => {
    if (!currentUser) return null;
    
    return {
      current: currentUser.currentAddress,
      history: currentUser.addressHistory,
      housemateHistory: currentUser.housemateHistory
    };
  }
);

// Loading state selectors
export const selectAnyLoading = createSelector(
  [
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
    selectBlacklistReasonsLoading
  ],
  (...loadingStates: boolean[]) => loadingStates.some((loading: boolean) => loading)
);

// Error state selectors
export const selectAnyError = createSelector(
  [
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
    selectBlacklistReasonsError
  ],
  (...errors: any[]) => errors.find((error: any) => error !== null)
);

// Success state selectors
export const selectAnySuccess = createSelector(
  [
    selectUsersSuccess,
    selectPasswordSuccess,
    selectPhoneSuccess,
    selectEmailSuccess,
    selectUvcSuccess,
    selectBioSuccess,
    selectSkillsSuccess,
    selectAdminActionSuccess,
    selectDeleteSuccess
  ],
  (...successes: any[]) => successes.find((success: any) => success !== null)
); 