import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ContactFormData {
  name: string
  email: string
  type: string
  message: string
}

interface ShowcaseState {
  contactForm: ContactFormData
  isSubmittingContact: boolean
  contactSubmitError: string | null
  contactSubmitSuccess: boolean
}

const initialState: ShowcaseState = {
  contactForm: {
    name: '',
    email: '',
    type: '',
    message: ''
  },
  isSubmittingContact: false,
  contactSubmitError: null,
  contactSubmitSuccess: false
}

const showcaseSlice = createSlice({
  name: 'showcase',
  initialState,
  reducers: {
    updateContactForm: (state, action: PayloadAction<Partial<ContactFormData>>) => {
      state.contactForm = { ...state.contactForm, ...action.payload }
    },
    resetContactForm: (state) => {
      state.contactForm = initialState.contactForm
    },
    submitContactStart: (state, _action: PayloadAction<ContactFormData>) => {
      state.isSubmittingContact = true
      state.contactSubmitError = null
      state.contactSubmitSuccess = false
    },
    submitContactSuccess: (state) => {
      state.isSubmittingContact = false
      state.contactForm = initialState.contactForm
      state.contactSubmitError = null
      state.contactSubmitSuccess = true
    },
    submitContactFailure: (state, action: PayloadAction<string>) => {
      state.isSubmittingContact = false
      state.contactSubmitError = action.payload
      state.contactSubmitSuccess = false
    },
    clearContactSubmitSuccess: (state) => {
      state.contactSubmitSuccess = false
    }
  }
})

export const {
  updateContactForm,
  resetContactForm,
  submitContactStart,
  submitContactSuccess,
  submitContactFailure,
  clearContactSubmitSuccess
} = showcaseSlice.actions

export default showcaseSlice.reducer