import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '~/firebaseConfig'
import PackageType from '~/types/PackageType'

interface Types {
  editItem: PackageType | null
  isOpenAddAndUpdate: boolean
}

const initialState: Types = {
  editItem: null,
  isOpenAddAndUpdate: false
}

export const addPackage = createAsyncThunk('package/addPackage', async (formAdd: PackageType) => {
  const ref = doc(db, 'packages', formAdd.id.toString())
  await setDoc(ref, formAdd)
})

export const editPackage = createAsyncThunk(
  'package/editPackage',
  async (formUpdate: PackageType) => {
    const ref = doc(db, 'packages', formUpdate.id.toString())
    await updateDoc(ref, {
      ...formUpdate
    })
  }
)

const packageSlice = createSlice({
  initialState,
  name: 'package',
  reducers: {
    startAdd: (state) => {
      state.isOpenAddAndUpdate = true
    },
    closeAdd: (state) => {
      state.isOpenAddAndUpdate = false
    },
    startEdit: (state, actions: PayloadAction<PackageType>) => {
      state.editItem = actions.payload
    },
    cancelEdit: (state) => {
      state.editItem = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPackage.fulfilled, () => {
        console.log('success')
      })
      .addCase(editPackage.fulfilled, () => {
        console.log('success')
      })
  }
})

const { actions, reducer } = packageSlice
export const { closeAdd, startAdd, cancelEdit, startEdit } = actions
export default reducer
