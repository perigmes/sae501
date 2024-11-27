import { createSlice } from '@reduxjs/toolkit';
import { addReservation, loadMateriel } from './reservationsAsyncAction';

const demandeSlice = createSlice({
    name: 'demande',
    initialState: {
        objects: [],
        objIsSelectable: false,
        dataForm: {
            startDate: "", 
            returnDate: "",
            idSelectedObjects: [],
        },
        objInfos: {},
        userId:'',
        reservations:[],
        errors:{
            apiErrorLoad: null,
            apiErrorAdd: null,
        }
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
        },
        setStartDate: (state, action) => {
            state.dataForm.startDate = action.payload;
        },
        setReturnDate: (state, action) => {
            state.dataForm.returnDate = action.payload;
        },
        
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
            .addCase(addReservation.pending, (state,action) => {
                state.errors.apiErrorAdd = null;
            })
            .addCase(addReservation.fulfilled, (state, action) => {
                state.reservations.push(action.payload);
            })
            .addCase(addReservation.rejected, (state, action) => {
                state.errors.apiErrorAdd = action.payload;
            })

    }
});
export const { setObjects, setObjIsSelectable, setIdSelectedObjects, selectObject, deselectObject, setInfoObject, clearObjectSelections, setStartDate, setReturnDate } = demandeSlice.actions;

export default demandeSlice.reducer;
