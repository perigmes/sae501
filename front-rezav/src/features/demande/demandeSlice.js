import { createSlice } from '@reduxjs/toolkit';
import { loadMateriel } from './reservationsAsyncAction';

const demandeSlice = createSlice({
    name: 'demande',
    initialState: {
        objects: [],
        objIsSelectable: false,
        dataForm: {
            idSelectedObjects: [],
        },
        objInfos: {},
        userId:'',
    },
    reducers: {

        setObjects: (state, action) => {
            state.objects = action.payload;
        },
        setObjIsSelectable: (state) => {
            state.objIsSelectable = !state.objIsSelectable;
        },
        setIdSelectedObjects: (state, action) => {
            state.dataForm.idSelectedObjects = action.payload;
        },
        selectObject: (state, action) => {
            const id = action.payload;
            if (!state.dataForm.idSelectedObjects.includes(id)) {
                state.dataForm.idSelectedObjects.push(id);
            }
        },
        deselectObject: (state, action) => {
            const id = action.payload;
            state.dataForm.idSelectedObjects = state.dataForm.idSelectedObjects.filter(selectedId => selectedId !== id);
        },
        setInfoObject: (state, action) => {
            state.objInfos =  action.payload;
        },
        clearObjectSelections: (state) => {
            state.dataForm.idSelectedObjects = [];
        }
        
    },
    extraReducers: (builder) => {
            builder
            .addCase(loadMateriel.pending, (state) => {
                state.loading = true;
                state.errors.apiErrorLoad = null;
            })
            .addCase(loadMateriel.fulfilled, (state, action) => {
                state.objects = action.payload;
                state.loading = false;
                state.errors.apiErrorLoad = null;
            })
            .addCase(loadMateriel.rejected, (state, action) => {
                state.loading = false;
                state.errors.apiErrorLoad = action.payload;
            })
            
    }
});
export const { setObjects, setObjIsSelectable, setIdSelectedObjects, selectObject, deselectObject, setInfoObject, clearObjectSelections } = demandeSlice.actions;

export default demandeSlice.reducer;
