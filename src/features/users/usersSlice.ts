import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllUsers,
  fetchUserById,
  fetchUserByUvcCode,
  verifyUser,
  changePassword,
  updatePhoneNumber,
  updateEmail,
  updateUvcCode,
  updateBio,
  updateSkills,
  unverifyUser,
  blockUser,
  unblockUser,
  blacklistUser,
  unblacklistUser,
  deleteUser,
  getBlacklistReasons
} from './usersAPI';

const initialState = {
  users: [],
  currentUser: null,
  userByUvc: null,
  blacklistReasons: [],
  
  // Loading states
  loading: false,
  loadingById: false,
  loadingByUvc: false,
  loadingVerify: false,
  loadingPassword: false,
  loadingPhone: false,
  loadingEmail: false,
  loadingUvc: false,
  loadingBio: false,
  loadingSkills: false,
  loadingAdminAction: false,
  loadingDelete: false,
  loadingBlacklistReasons: false,
  
  // Error states
  error: null,
  errorById: null,
  errorByUvc: null,
  errorVerify: null,
  errorPassword: null,
  errorPhone: null,
  errorEmail: null,
  errorUvc: null,
  errorBio: null,
  errorSkills: null,
  errorAdminAction: null,
  errorDelete: null,
  errorBlacklistReasons: null,
  
  // Success states
  success: false,
  successPassword: false,
  successPhone: false,
  successEmail: false,
  successUvc: false,
  successBio: false,
  successSkills: false,
  successAdminAction: false,
  successDelete: false,
  
  // Pagination and filters
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalUsers: 0
  },
  filters: {
    search: '',
    status: '',
    verificationStatus: '',
    blacklistStatus: '',
    blockedStatus: '',
    userType: '',
    occupation: '',
    sex: ''
  },
  
  // Statistics
  statistics: {
    totalUsers: 0,
    verifiedUsers: 0,
    unverifiedUsers: 0,
    blockedUsers: 0,
    blacklistedUsers: 0,
    activeUsers: 0,
    maleUsers: 0,
    femaleUsers: 0,
    otherUsers: 0
  }
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearErrors: (state: any) => {
      state.error = null;
      state.errorById = null;
      state.errorByUvc = null;
      state.errorVerify = null;
      state.errorPassword = null;
      state.errorPhone = null;
      state.errorEmail = null;
      state.errorUvc = null;
      state.errorBio = null;
      state.errorSkills = null;
      state.errorAdminAction = null;
      state.errorDelete = null;
      state.errorBlacklistReasons = null;
    },
    
    clearSuccess: (state: any) => {
      state.success = false;
      state.successPassword = false;
      state.successPhone = false;
      state.successEmail = false;
      state.successUvc = false;
      state.successBio = false;
      state.successSkills = false;
      state.successAdminAction = false;
      state.successDelete = false;
    },
    
    setFilters: (state: any, action: any) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    clearFilters: (state: any) => {
      state.filters = {
        search: '',
        status: '',
        verificationStatus: '',
        blacklistStatus: '',
        blockedStatus: '',
        userType: '',
        occupation: '',
        sex: ''
      };
    },
    
    setPagination: (state: any, action: any) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    
    setCurrentUser: (state: any, action: any) => {
      state.currentUser = action.payload;
    },
    
    clearCurrentUser: (state: any) => {
      state.currentUser = null;
    },
    
    updateUserInList: (state: any, action: any) => {
      const { userId, updates } = action.payload;
      const userIndex = state.users.findIndex((user: any) => user._id === userId);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...updates };
      }
      
      // Update current user if it's the same
      if (state.currentUser && state.currentUser._id === userId) {
        state.currentUser = { ...state.currentUser, ...updates };
      }
      
      // Update user by UVC if it's the same
      if (state.userByUvc && state.userByUvc._id === userId) {
        state.userByUvc = { ...state.userByUvc, ...updates };
      }
    },
    
    removeUserFromList: (state: any, action: any) => {
      const userId = action.payload;
      state.users = state.users.filter((user: any) => user._id !== userId);
      
      // Clear current user if it's the same
      if (state.currentUser && state.currentUser._id === userId) {
        state.currentUser = null;
      }
      
      // Clear user by UVC if it's the same
      if (state.userByUvc && state.userByUvc._id === userId) {
        state.userByUvc = null;
      }
    },
    
    resetPasswordAction: (state: any) => {
      state.loadingPassword = false;
      state.errorPassword = null;
      state.successPassword = false;
    },
    
    resetPhoneAction: (state: any) => {
      state.loadingPhone = false;
      state.errorPhone = null;
      state.successPhone = false;
    },
    
    resetEmailAction: (state: any) => {
      state.loadingEmail = false;
      state.errorEmail = null;
      state.successEmail = false;
    },
    
    resetUvcAction: (state: any) => {
      state.loadingUvc = false;
      state.errorUvc = null;
      state.successUvc = false;
    },
    
    resetBioAction: (state: any) => {
      state.loadingBio = false;
      state.errorBio = null;
      state.successBio = false;
    },
    
    resetSkillsAction: (state: any) => {
      state.loadingSkills = false;
      state.errorSkills = null;
      state.successSkills = false;
    },
    
    resetAdminAction: (state: any) => {
      state.loadingAdminAction = false;
      state.errorAdminAction = null;
      state.successAdminAction = false;
    },
    
    resetDeleteAction: (state: any) => {
      state.loadingDelete = false;
      state.errorDelete = null;
      state.successDelete = false;
    },
  },
  extraReducers: (builder: any) => {
    // Fetch Users
    builder
      .addCase(fetchAllUsers.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.users = action.payload.data || action.payload || [];
        if (action.payload.pagination) {
          state.pagination = {
            page: action.payload.pagination.page,
            limit: action.payload.pagination.limit,
            totalPages: action.payload.pagination.totalPages,
            totalUsers: action.payload.pagination.totalUsers
          };
        }
        if (action.payload.statistics) {
          state.statistics = action.payload.statistics;
        }
      })
      .addCase(fetchAllUsers.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch User By ID
    builder
      .addCase(fetchUserById.pending, (state: any) => {
        state.loadingById = true;
        state.errorById = null;
      })
      .addCase(fetchUserById.fulfilled, (state: any, action: any) => {
        state.loadingById = false;
        state.currentUser = action.payload.data || action.payload;
      })
      .addCase(fetchUserById.rejected, (state: any, action: any) => {
        state.loadingById = false;
        state.errorById = action.payload;
      });

    // Fetch User By UVC
    builder
      .addCase(fetchUserByUvcCode.pending, (state: any) => {
        state.loadingByUvc = true;
        state.errorByUvc = null;
      })
      .addCase(fetchUserByUvcCode.fulfilled, (state: any, action: any) => {
        state.loadingByUvc = false;
        state.userByUvc = action.payload.data || action.payload;
      })
      .addCase(fetchUserByUvcCode.rejected, (state: any, action: any) => {
        state.loadingByUvc = false;
        state.errorByUvc = action.payload;
      });

    // Verify User
    builder
      .addCase(verifyUser.pending, (state: any) => {
        state.loadingVerify = true;
        state.errorVerify = null;
      })
      .addCase(verifyUser.fulfilled, (state: any, action: any) => {
        state.loadingVerify = false;
        const updatedUser = action.payload.data || action.payload;
        if (updatedUser) {
          // Update in users list
          const userIndex = state.users.findIndex((user: any) => user._id === updatedUser._id);
          if (userIndex !== -1) {
            state.users[userIndex] = updatedUser;
          }
          
          // Update current user if it's the same
          if (state.currentUser && state.currentUser._id === updatedUser._id) {
            state.currentUser = updatedUser;
          }
          
          // Update user by UVC if it's the same
          if (state.userByUvc && state.userByUvc._id === updatedUser._id) {
            state.userByUvc = updatedUser;
          }
        }
      })
      .addCase(verifyUser.rejected, (state: any, action: any) => {
        state.loadingVerify = false;
        state.errorVerify = action.payload;
      });

    // Change Password
    builder
      .addCase(changePassword.pending, (state: any) => {
        state.loadingPassword = true;
        state.errorPassword = null;
        state.successPassword = false;
      })
      .addCase(changePassword.fulfilled, (state: any, action: any) => {
        state.loadingPassword = false;
        state.successPassword = true;
      })
      .addCase(changePassword.rejected, (state: any, action: any) => {
        state.loadingPassword = false;
        state.errorPassword = action.payload;
      });

    // Change Phone
    builder
      .addCase(updatePhoneNumber.pending, (state: any) => {
        state.loadingPhone = true;
        state.errorPhone = null;
        state.successPhone = false;
      })
      .addCase(updatePhoneNumber.fulfilled, (state: any, action: any) => {
        state.loadingPhone = false;
        state.successPhone = true;
        const updatedUser = action.payload.data || action.payload;
        if (updatedUser) {
          // Update in users list
          const userIndex = state.users.findIndex((user: any) => user._id === updatedUser._id);
          if (userIndex !== -1) {
            state.users[userIndex] = updatedUser;
          }
          
          // Update current user if it's the same
          if (state.currentUser && state.currentUser._id === updatedUser._id) {
            state.currentUser = updatedUser;
          }
          
          // Update user by UVC if it's the same
          if (state.userByUvc && state.userByUvc._id === updatedUser._id) {
            state.userByUvc = updatedUser;
          }
        }
      })
      .addCase(updatePhoneNumber.rejected, (state: any, action: any) => {
        state.loadingPhone = false;
        state.errorPhone = action.payload;
      });

    // Change Email
    builder
      .addCase(updateEmail.pending, (state: any) => {
        state.loadingEmail = true;
        state.errorEmail = null;
        state.successEmail = false;
      })
      .addCase(updateEmail.fulfilled, (state: any, action: any) => {
        state.loadingEmail = false;
        state.successEmail = true;
        const updatedUser = action.payload.data || action.payload;
        if (updatedUser) {
          // Update in users list
          const userIndex = state.users.findIndex((user: any) => user._id === updatedUser._id);
          if (userIndex !== -1) {
            state.users[userIndex] = updatedUser;
          }
          
          // Update current user if it's the same
          if (state.currentUser && state.currentUser._id === updatedUser._id) {
            state.currentUser = updatedUser;
          }
          
          // Update user by UVC if it's the same
          if (state.userByUvc && state.userByUvc._id === updatedUser._id) {
            state.userByUvc = updatedUser;
          }
        }
      })
      .addCase(updateEmail.rejected, (state: any, action: any) => {
        state.loadingEmail = false;
        state.errorEmail = action.payload;
      });

    // Change UVC
    builder
      .addCase(updateUvcCode.pending, (state: any) => {
        state.loadingUvc = true;
        state.errorUvc = null;
        state.successUvc = false;
      })
      .addCase(updateUvcCode.fulfilled, (state: any, action: any) => {
        state.loadingUvc = false;
        state.successUvc = true;
        const updatedUser = action.payload.data || action.payload;
        if (updatedUser) {
          // Update in users list
          const userIndex = state.users.findIndex((user: any) => user._id === updatedUser._id);
          if (userIndex !== -1) {
            state.users[userIndex] = updatedUser;
          }
          
          // Update current user if it's the same
          if (state.currentUser && state.currentUser._id === updatedUser._id) {
            state.currentUser = updatedUser;
          }
          
          // Update user by UVC if it's the same
          if (state.userByUvc && state.userByUvc._id === updatedUser._id) {
            state.userByUvc = updatedUser;
          }
        }
      })
      .addCase(updateUvcCode.rejected, (state: any, action: any) => {
        state.loadingUvc = false;
        state.errorUvc = action.payload;
      });

    // Change Bio
    builder
      .addCase(updateBio.pending, (state: any) => {
        state.loadingBio = true;
        state.errorBio = null;
        state.successBio = false;
      })
      .addCase(updateBio.fulfilled, (state: any, action: any) => {
        state.loadingBio = false;
        state.successBio = true;
        const updatedUser = action.payload.data || action.payload;
        if (updatedUser) {
          // Update in users list
          const userIndex = state.users.findIndex((user: any) => user._id === updatedUser._id);
          if (userIndex !== -1) {
            state.users[userIndex] = updatedUser;
          }
          
          // Update current user if it's the same
          if (state.currentUser && state.currentUser._id === updatedUser._id) {
            state.currentUser = updatedUser;
          }
          
          // Update user by UVC if it's the same
          if (state.userByUvc && state.userByUvc._id === updatedUser._id) {
            state.userByUvc = updatedUser;
          }
        }
      })
      .addCase(updateBio.rejected, (state: any, action: any) => {
        state.loadingBio = false;
        state.errorBio = action.payload;
      });

    // Change Skills
    builder
      .addCase(updateSkills.pending, (state: any) => {
        state.loadingSkills = true;
        state.errorSkills = null;
        state.successSkills = false;
      })
      .addCase(updateSkills.fulfilled, (state: any, action: any) => {
        state.loadingSkills = false;
        state.successSkills = true;
        const updatedUser = action.payload.data || action.payload;
        if (updatedUser) {
          // Update in users list
          const userIndex = state.users.findIndex((user: any) => user._id === updatedUser._id);
          if (userIndex !== -1) {
            state.users[userIndex] = updatedUser;
          }
          
          // Update current user if it's the same
          if (state.currentUser && state.currentUser._id === updatedUser._id) {
            state.currentUser = updatedUser;
          }
          
          // Update user by UVC if it's the same
          if (state.userByUvc && state.userByUvc._id === updatedUser._id) {
            state.userByUvc = updatedUser;
          }
        }
      })
      .addCase(updateSkills.rejected, (state: any, action: any) => {
        state.loadingSkills = false;
        state.errorSkills = action.payload;
      });

    // Admin Actions - Unverify User
    builder
      .addCase(unverifyUser.pending, (state: any) => {
        state.loadingAdminAction = true;
        state.errorAdminAction = null;
        state.successAdminAction = false;
      })
      .addCase(unverifyUser.fulfilled, (state: any, action: any) => {
        state.loadingAdminAction = false;
        state.successAdminAction = true;
        const updatedUser = action.payload.data || action.payload;
        if (updatedUser) {
          // Update in users list
          const userIndex = state.users.findIndex((user: any) => user._id === updatedUser._id);
          if (userIndex !== -1) {
            state.users[userIndex] = updatedUser;
          }
          
          // Update current user if it's the same
          if (state.currentUser && state.currentUser._id === updatedUser._id) {
            state.currentUser = updatedUser;
          }
          
          // Update user by UVC if it's the same
          if (state.userByUvc && state.userByUvc._id === updatedUser._id) {
            state.userByUvc = updatedUser;
          }
        }
      })
      .addCase(unverifyUser.rejected, (state: any, action: any) => {
        state.loadingAdminAction = false;
        state.errorAdminAction = action.payload;
      });

    // Admin Actions - Block User
    builder
      .addCase(blockUser.pending, (state: any) => {
        state.loadingAdminAction = true;
        state.errorAdminAction = null;
        state.successAdminAction = false;
      })
      .addCase(blockUser.fulfilled, (state: any, action: any) => {
        state.loadingAdminAction = false;
        state.successAdminAction = true;
        const updatedUser = action.payload.data || action.payload;
        if (updatedUser) {
          // Update in users list
          const userIndex = state.users.findIndex((user: any) => user._id === updatedUser._id);
          if (userIndex !== -1) {
            state.users[userIndex] = updatedUser;
          }
          
          // Update current user if it's the same
          if (state.currentUser && state.currentUser._id === updatedUser._id) {
            state.currentUser = updatedUser;
          }
          
          // Update user by UVC if it's the same
          if (state.userByUvc && state.userByUvc._id === updatedUser._id) {
            state.userByUvc = updatedUser;
          }
        }
      })
      .addCase(blockUser.rejected, (state: any, action: any) => {
        state.loadingAdminAction = false;
        state.errorAdminAction = action.payload;
      });

    // Admin Actions - Unblock User
    builder
      .addCase(unblockUser.pending, (state: any) => {
        state.loadingAdminAction = true;
        state.errorAdminAction = null;
        state.successAdminAction = false;
      })
      .addCase(unblockUser.fulfilled, (state: any, action: any) => {
        state.loadingAdminAction = false;
        state.successAdminAction = true;
        const updatedUser = action.payload.data || action.payload;
        if (updatedUser) {
          // Update in users list
          const userIndex = state.users.findIndex((user: any) => user._id === updatedUser._id);
          if (userIndex !== -1) {
            state.users[userIndex] = updatedUser;
          }
          
          // Update current user if it's the same
          if (state.currentUser && state.currentUser._id === updatedUser._id) {
            state.currentUser = updatedUser;
          }
          
          // Update user by UVC if it's the same
          if (state.userByUvc && state.userByUvc._id === updatedUser._id) {
            state.userByUvc = updatedUser;
          }
        }
      })
      .addCase(unblockUser.rejected, (state: any, action: any) => {
        state.loadingAdminAction = false;
        state.errorAdminAction = action.payload;
      });

    // Admin Actions - Blacklist User
    builder
      .addCase(blacklistUser.pending, (state: any) => {
        state.loadingAdminAction = true;
        state.errorAdminAction = null;
        state.successAdminAction = false;
      })
      .addCase(blacklistUser.fulfilled, (state: any, action: any) => {
        state.loadingAdminAction = false;
        state.successAdminAction = true;
        const updatedUser = action.payload.data || action.payload;
        if (updatedUser) {
          // Update in users list
          const userIndex = state.users.findIndex((user: any) => user._id === updatedUser._id);
          if (userIndex !== -1) {
            state.users[userIndex] = updatedUser;
          }
          
          // Update current user if it's the same
          if (state.currentUser && state.currentUser._id === updatedUser._id) {
            state.currentUser = updatedUser;
          }
          
          // Update user by UVC if it's the same
          if (state.userByUvc && state.userByUvc._id === updatedUser._id) {
            state.userByUvc = updatedUser;
          }
        }
      })
      .addCase(blacklistUser.rejected, (state: any, action: any) => {
        state.loadingAdminAction = false;
        state.errorAdminAction = action.payload;
      });

    // Admin Actions - Unblacklist User
    builder
      .addCase(unblacklistUser.pending, (state: any) => {
        state.loadingAdminAction = true;
        state.errorAdminAction = null;
        state.successAdminAction = false;
      })
      .addCase(unblacklistUser.fulfilled, (state: any, action: any) => {
        state.loadingAdminAction = false;
        state.successAdminAction = true;
        const updatedUser = action.payload.data || action.payload;
        if (updatedUser) {
          // Update in users list
          const userIndex = state.users.findIndex((user: any) => user._id === updatedUser._id);
          if (userIndex !== -1) {
            state.users[userIndex] = updatedUser;
          }
          
          // Update current user if it's the same
          if (state.currentUser && state.currentUser._id === updatedUser._id) {
            state.currentUser = updatedUser;
          }
          
          // Update user by UVC if it's the same
          if (state.userByUvc && state.userByUvc._id === updatedUser._id) {
            state.userByUvc = updatedUser;
          }
        }
      })
      .addCase(unblacklistUser.rejected, (state: any, action: any) => {
        state.loadingAdminAction = false;
        state.errorAdminAction = action.payload;
      });

    // Delete User
    builder
      .addCase(deleteUser.pending, (state: any) => {
        state.loadingDelete = true;
        state.errorDelete = null;
        state.successDelete = false;
      })
      .addCase(deleteUser.fulfilled, (state: any, action: any) => {
        state.loadingDelete = false;
        state.successDelete = true;
        const userId = action.payload.userId;
        
        // Remove from users list
        state.users = state.users.filter((user: any) => user._id !== userId);
        
        // Clear current user if it's the same
        if (state.currentUser && state.currentUser._id === userId) {
          state.currentUser = null;
        }
        
        // Clear user by UVC if it's the same
        if (state.userByUvc && state.userByUvc._id === userId) {
          state.userByUvc = null;
        }
      })
      .addCase(deleteUser.rejected, (state: any, action: any) => {
        state.loadingDelete = false;
        state.errorDelete = action.payload;
      });

    // Fetch Blacklist Reasons
    builder
      .addCase(getBlacklistReasons.pending, (state: any) => {
        state.loadingBlacklistReasons = true;
        state.errorBlacklistReasons = null;
      })
      .addCase(getBlacklistReasons.fulfilled, (state: any, action: any) => {
        state.loadingBlacklistReasons = false;
        state.blacklistReasons = action.payload.data || action.payload || [];
      })
      .addCase(getBlacklistReasons.rejected, (state: any, action: any) => {
        state.loadingBlacklistReasons = false;
        state.errorBlacklistReasons = action.payload;
      });
  },
});

export const {
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
  resetDeleteAction,
} = usersSlice.actions;

export default usersSlice.reducer; 