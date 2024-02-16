import { createSlice } from '@reduxjs/toolkit';

// Get initial count from localStorage if available
const initialCount = parseInt(localStorage.getItem('badgeCount')) || 0;

const initialState = {
    count: initialCount,
};

const badgeCountSlice = createSlice({
    name: 'badgeCount',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
            localStorage.setItem('badgeCount', state.count); // Update localStorage
        },
        decrement: (state) => {
            state.count -= 1;
            localStorage.setItem('badgeCount', state.count); // Update localStorage
        },
        reset: (state) => {
            state.count = 0;
            localStorage.setItem('badgeCount', state.count); // Update localStorage
        },
    },
});

export const { increment, decrement, reset } = badgeCountSlice.actions;

export default badgeCountSlice.reducer;