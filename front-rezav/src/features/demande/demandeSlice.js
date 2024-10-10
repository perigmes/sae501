import { createSlice } from '@reduxjs/toolkit';

const demandeSlice = createSlice({
    name: 'demande',
    initialState: {
        objects: [],
        objIsSelectable: false
    },
    reducers: {
        setObjects: (state, action) => {
            state.objects = action.payload;
        },
    }
    // extraReducers: (builder) => {
    // }
});
export const { setObjects } = demandeSlice.actions;

export default demandeSlice.reducer;
