import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Person } from "../../types";

const initialState: PersonsState = {
    // динамическая подгрузка данных
    currentPage: 1,
    totalPages: 1,

    //фильтры
    name: "",
    gender: "",
    status: "",
    species: "",

    //подгруженные данные
    persons: [],
    isLoading: false,
    error: null,
};

interface PersonsState {
    currentPage: number;
    totalPages: number;

    name: string;
    gender: string;
    status: string;
    species: string;

    persons: Person[];
    isLoading: boolean;
    error: any;
}

// санка на подгрузку данных с API исходя
export const fetchFirstData = createAsyncThunk(
    "persons/fetchFirstData",
    async function (url: string, { rejectWithValue }) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Server Error");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// санка на подгрузку данных с API исходя
export const fetchPersons = createAsyncThunk(
    "persons/fetchPersons",
    async function (url: string, { rejectWithValue }) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Server Error");
            }
            const data = await response.json();
            console.log(data);

            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const personsSlice = createSlice({
    name: "persons",
    initialState,
    reducers: {
        incrementCurrentPage(state) {
            state.currentPage = state.currentPage + 1;
        },

        changeName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        changeStatus(state, action: PayloadAction<string>) {
            state.status = action.payload;
        },
        changeGender(state, action: PayloadAction<string>) {
            state.gender = action.payload;
        },
        changeSpecies(state, action: PayloadAction<string>) {
            state.species = action.payload;
        },

        resetFilters(state) {
            state.name = "";
            state.status = "";
            state.gender = "";
            state.species = "";
        },
        resetData(state) {
            state.currentPage = 1;
            state.totalPages = 1;
            state.persons = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPersons.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPersons.fulfilled, (state, action) => {
            state.totalPages = action.payload.info.pages;
            state.persons = [...state.persons, ...action.payload.results].sort(
                (a: Person, b: Person) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                }
            );
            state.isLoading = false;
        });
        builder.addCase(fetchPersons.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(fetchFirstData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchFirstData.fulfilled, (state, action) => {
            state.totalPages = action.payload.info.pages;
            state.persons = [...action.payload.results].sort(
                (a: Person, b: Person) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                }
            );
            state.isLoading = false;
        });
        builder.addCase(fetchFirstData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export default personsSlice.reducer;
export const {
    resetData,
    incrementCurrentPage,
    changeName,
    changeGender,
    changeStatus,
    changeSpecies,
    resetFilters,
} = personsSlice.actions;
