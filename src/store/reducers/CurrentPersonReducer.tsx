import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: PersonsState = {
    currentPerson: "",

    locationUrl: "",
    dimension: "",

    epidoseNumber: "",
    eposodeName: "",
    episodeDate: "",

    isLoading: false,
    error: null,
};

interface PersonsState {
    currentPerson: string; //имя персонажа в сайдбаре

    locationUrl: string; //юрл последней локации
    dimension: string; // измерение последней локации, где был персонаж

    epidoseNumber: string; //эпизодная информация о персонаже
    eposodeName: string;
    episodeDate: string;

    isLoading: boolean;
    error: any;
}

// подгружаем с API информацию по локации, на которой последний раз видели персонажа
export const fetchLastLocationInfo = createAsyncThunk(
    "persons/fetchLastLocationInfo",
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

// подгрузка с API информации о эпизоде, где участвовал персонаж
export const fetchEpisodeInfo = createAsyncThunk(
    "persons/fetchEpisodeInfo",
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

export const currentPersonSlice = createSlice({
    name: "currentPerson",
    initialState,
    reducers: {
        changeSelectedPerson(state, action: PayloadAction<string>) {
            state.currentPerson = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEpisodeInfo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchEpisodeInfo.fulfilled, (state, action) => {
            state.eposodeName = action.payload.name;
            state.epidoseNumber = action.payload.episode;
            state.episodeDate = action.payload.air_date;
            state.locationUrl = action.payload.url;
            state.isLoading = false;
        });
        builder.addCase(fetchEpisodeInfo.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(fetchLastLocationInfo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchLastLocationInfo.fulfilled, (state, action) => {
            state.dimension = action.payload.dimension;
        });
        builder.addCase(fetchLastLocationInfo.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export default currentPersonSlice.reducer;
export const { changeSelectedPerson } = currentPersonSlice.actions;
