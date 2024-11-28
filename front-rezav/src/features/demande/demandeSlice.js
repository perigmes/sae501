import { createSlice } from '@reduxjs/toolkit';
import { addReservation, loadMateriel } from './reservationsAsyncAction';

const demandeSlice = createSlice({
    name: 'demande',
    initialState: {
        objects: [],
        objIsSelectable: false,

        dataDemande: {
            id: "",
            userId: "",
            startDT: {
                date: "",
                time: ""
            },
            returnDT: {
                date: "",
                time: ""
            },
            name: "",
            desc: "",
            justif: "",
            plan: "",
            userId: "",
            group: [],
            objects: [],
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
        setSelectedObjects: (state, action) => {
            state.dataDemande.objects = action.payload;
        },
        selectObject: (state, action) => {
            const id = action.payload;
            if (!state.dataDemande.objects.includes(id)) {
                state.dataDemande.objects.push(id);
            }
        },
        deselectObject: (state, action) => {
            const id = action.payload;
            state.dataDemande.objects = state.dataDemande.objects.filter(selectedId => selectedId !== id);
        },
        setInfoObject: (state, action) => {
            state.objInfos =  action.payload;
        },
        clearDataDemande: (state) => {
            state.dataDemande = initialState.dataDemande;
        },
        setStartDate: (state, action) => {
            state.dataDemande.startDate = action.payload;
        },
        setReturnDate: (state, action) => {
            state.dataDemande.returnDate = action.payload;
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
export const { setObjects, setObjIsSelectable, setobjects, selectObject, deselectObject, setInfoObject, clearDataDemande, setStartDate, setReturnDate } = demandeSlice.actions;

export default demandeSlice.reducer;
