import { createSlice } from '@reduxjs/toolkit';
import { addReservation, loadMateriel, loadReservation, loadReservations } from './reservationsAsyncAction';
import { getDatePlusDays } from '../../utils/tools';

const demandeSlice = createSlice({
    name: 'demande',
    initialState: {
        objects: [],
        reservations: [],
        objIsSelectable: false,
        searchBarre: "",
        loading: false,
        filter: "category",
        dataDemande: {
            id: "",
            userId: "", 
            startDT: getDatePlusDays(2),
            returnDT: "",
            name: "",
            desc: "",
            justif: "",
            plan: "",
            userId: "",
            group: [],
            objects: [],
        },
        objInfos: {},
        errors: {
            apiErrorObjectsLoad: null,
            apiErrorReservationLoad: null,
            apiErrorAdd: null,
            errorFormDemande: false,
        }
    },
    reducers: {
        setObjects: (state, action) => {
            state.objects = action.payload;
        },
        setSearchBarre: (state, action) => {
            state.searchBarre = action.payload;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setErrorFormDemande: (state, action) => {
            state.errors.errorFormDemande = action.payload;
        },
        setObjIsSelectable: (state, action) => {
            state.objIsSelectable = action.payload;
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
            state.dataDemande = demandeSlice.getInitialState().dataDemande;
        },
        setStartDT: (state, action) => {
            state.dataDemande.startDT = action.payload;
        },
        setReturnDT: (state, action) => {
            state.dataDemande.returnDT = action.payload;
        },
        
    },
    extraReducers: (builder) => {
            builder
            .addCase(loadMateriel.pending, (state) => {
                state.loading = true;
                state.errors.apiErrorObjectsLoad = null;
            })
            .addCase(loadMateriel.fulfilled, (state, action) => {
                state.objects = action.payload;
                state.loading = false;
                state.errors.apiErrorObjectsLoad = null;
            })
            .addCase(loadMateriel.rejected, (state, action) => {
                state.loading = false;
                state.errors.apiErrorObjectsLoad = action.payload;
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
export const { setObjects, setSearchBarre, setFilter, setErrorFormDemande, setObjIsSelectable, setobjects, selectObject, deselectObject, setInfoObject, clearDataDemande, setStartDT, setReturnDT } = demandeSlice.actions;

export default demandeSlice.reducer;
