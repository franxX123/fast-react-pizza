import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

// NOTE: This is for getting the user geolocation data
function getPosition() {


  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// NOTE: gets the address in latitude and longitude coordinates
export const fetchAddress = createAsyncThunk("user/fetchAddress", async function() {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();

    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };

})

const initialState = {
  userName: "",
  status: "idle",
  position: {},
  address: "",
  error: ""
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserName(state, action) {
      state.userName = action.payload;
    }
  },
  extraReducers: (builder) => {
    return builder.addCase(fetchAddress.pending, (state) => {
      state.status = "loading";
    }).addCase(fetchAddress.fulfilled, (state, action) => {
      state.status = "idle";
      state.position = action.payload.position;
      state.address = action.payload.address;
    }).addCase(fetchAddress.rejected, (state, action) => {
      state.status = "error";
      // state.error = action.error.message;
      state.error = "There was a problem getting your address."
    })}
})

// NOTE: this is for dispatching the reducer.
// NOTE: we can access the reducer/action through the actions object in the slice.
export const { updateUserName } = userSlice.actions;

// NOTE: userSlice.reducer let's us get a single reducer that combines all the other
// reducers.
export default userSlice.reducer;