import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '~/firebaseConfig'
import TicketType from '~/types/TicketType'

interface Types {
  updateItem: TicketType | null
  isAddTicket: boolean
}

const initialState: Types = {
  updateItem: null,
  isAddTicket: false
}

export const addTicket = createAsyncThunk('ticket/addTicket', async (formAdd: TicketType) => {
  const ref = doc(db, 'tickets', formAdd.id)
  await setDoc(ref, formAdd)
})

export const updateDateTicket = createAsyncThunk(
  'ticket/updateTicket',
  async (formUpdate: { id: string; updateDate: number }) => {
    const ref = doc(db, 'tickets', formUpdate.id)
    await updateDoc(ref, {
      useDate: formUpdate.updateDate
    })
  }
)

const manageTicketSlice = createSlice({
  initialState,
  name: 'manage_ticket',
  reducers: {
    startAdd: (state) => {
      state.isAddTicket = true
    },
    cancelAdd: (state) => {
      state.isAddTicket = false
    },
    startUpdate: (state, actions: PayloadAction<TicketType>) => {
      state.updateItem = actions.payload
    },
    cancelUpdate: (state) => {
      state.updateItem = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateDateTicket.fulfilled, () => {
        console.log('success')
      })
      .addCase(addTicket.fulfilled, () => {
        console.log('success')
      })
  }
})

const { actions, reducer } = manageTicketSlice
export const { startAdd, cancelAdd, startUpdate, cancelUpdate } = actions
export default reducer
