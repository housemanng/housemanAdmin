import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../config/apiConfig';

// Fetch all users (admin only)
export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

// Fetch user by ID
export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

// Fetch user by UVC code
export const fetchUserByUvcCode = createAsyncThunk(
  'users/fetchUserByUvcCode',
  async (uvcCode: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/users/uvc/${uvcCode}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user by UVC code');
    }
  }
);

// Verify NIN by user ID
export const verifyNIN = createAsyncThunk(
  'users/verifyNIN',
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(`${API_URL}/users/verify/nin/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to verify NIN');
    }
  }
);

// Change password
export const changePassword = createAsyncThunk(
  'users/changePassword',
  async ({ userId, currentPassword, newPassword, confirmPassword }: { userId: string; currentPassword: string; newPassword: string; confirmPassword: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(`${API_URL}/users/${userId}/change-password`, {
        currentPassword,
        newPassword,
        confirmPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to change password');
    }
  }
);

// Update phone number
export const updatePhoneNumber = createAsyncThunk(
  'users/updatePhoneNumber',
  async ({ userId, phone_number }: { userId: string; phone_number: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(`${API_URL}/users/${userId}/phone`, { phone_number }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update phone number');
    }
  }
);

// Update email
export const updateEmail = createAsyncThunk(
  'users/updateEmail',
  async ({ userId, email }: { userId: string; email: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(`${API_URL}/users/${userId}/email`, { email }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update email');
    }
  }
);

// Update UVC code
export const updateUvcCode = createAsyncThunk(
  'users/updateUvcCode',
  async ({ userId, uvcCode }: { userId: string; uvcCode: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(`${API_URL}/users/${userId}/uvc`, { uvcCode }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update UVC code');
    }
  }
);

// Update bio
export const updateBio = createAsyncThunk(
  'users/updateBio',
  async ({ userId, bio }: { userId: string; bio: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.patch(`${API_URL}/users/${userId}/bio`, { bio }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update bio');
    }
  }
);

// Update skills
export const updateSkills = createAsyncThunk(
  'users/updateSkills',
  async ({ userId, skills }: { userId: string; skills: string[] }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.patch(`${API_URL}/users/${userId}/skills`, { skills }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update skills');
    }
  }
);

// Verify user (admin only)
export const verifyUser = createAsyncThunk(
  'users/verifyUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(`${API_URL}/users/${userId}/verify`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to verify user');
    }
  }
);

// Unverify user (admin only)
export const unverifyUser = createAsyncThunk(
  'users/unverifyUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(`${API_URL}/users/${userId}/unverify`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to unverify user');
    }
  }
);

// Block user (admin only)
export const blockUser = createAsyncThunk(
  'users/blockUser',
  async ({ userId, reason }: { userId: string; reason: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(`${API_URL}/users/${userId}/block`, { reason }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to block user');
    }
  }
);

// Unblock user (admin only)
export const unblockUser = createAsyncThunk(
  'users/unblockUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(`${API_URL}/users/${userId}/unblock`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to unblock user');
    }
  }
);

// Blacklist user (admin only)
export const blacklistUser = createAsyncThunk(
  'users/blacklistUser',
  async ({ userId, reason }: { userId: string; reason: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(`${API_URL}/users/${userId}/blacklist`, { reason }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to blacklist user');
    }
  }
);

// Unblacklist user (admin only)
export const unblacklistUser = createAsyncThunk(
  'users/unblacklistUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(`${API_URL}/users/${userId}/unblacklist`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to unblacklist user');
    }
  }
);

// Delete user (admin only)
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.delete(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return { userId, ...response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
    }
  }
);

// Get blacklist reasons (admin only)
export const getBlacklistReasons = createAsyncThunk(
  'users/getBlacklistReasons',
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/users/${userId}/blacklist-reasons`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get blacklist reasons');
    }
  }
); 