import { createSlice } from '@reduxjs/toolkit';

const demandeSlice = createSlice({
    name: 'demande',
    initialState: {
        objects: [],
        objIsSelectable: true,
        dataForm: {
            idSelectedObjects: [],
        }
    },
    reducers: {
        setObjects: (state, action) => {
            state.objects = action.payload;
        },
        setObjIsSelectable: (state) => {
            state.objIsSelectable = !state.objIsSelectable;
        },
        
    }
    // extraReducers: (builder) => {
    // }
});
export const { setObjects, setObjIsSelectable } = demandeSlice.actions;

export default demandeSlice.reducer;
