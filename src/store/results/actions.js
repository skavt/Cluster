import {
  HIDE_CONTACT_MODAL,
  HIDE_RESULTS_MODAL,
  SET_FAQ_DATA,
  SET_FEEDBACK_DATA,
  SET_PROVIDERS,
  SET_SCROLL_POSITION,
  SET_SELECTED_VALUES,
  SHOW_CONTACT_MODAL,
  SHOW_RESULTS_MODAL
} from "./mutation-types";
import httpService from "../../core/services/httpService";

export async function getAllProvider({commit}) {
  const {success, body} = await httpService.get(`/v1/insurance/providers`)
  if (success) {
    commit(SET_PROVIDERS, body)
  }
  return body
}

export async function getFeedbackData({commit}) {
  const {success, body} = await httpService.get(`/v1/feedback`)
  if (success) {
    commit(SET_FEEDBACK_DATA, body)
  }
  return body
}

export async function getFaqData({commit}) {
  const {success, body} = await httpService.get(`/v1/faq`)
  if (success) {
    commit(SET_FAQ_DATA, body)
  }
  return body
}

export async function showResultsModal({commit}, {data, param}) {
  commit(SET_SCROLL_POSITION, param)
  commit(SET_SELECTED_VALUES, data)
  const packageData = await httpService.get(`/v1/insurance/packages?insurance_type=${data.insurance}&package_type=${data.package}`)
  const statisticData = await httpService.get(`/v1/customers/stats?insurance_type=${data.insurance}&package_type=${data.package}`)
  if (packageData.success && statisticData.success) {
    const data = {
      packageData: packageData.body,
      statisticData: statisticData.body
    }
    commit(SHOW_RESULTS_MODAL, data)

  }
}

export async function hideResultsModal({commit}) {
  commit(HIDE_RESULTS_MODAL)
}

export async function showContactModal({commit}, param) {
  commit(SET_SCROLL_POSITION, param)
  commit(SHOW_CONTACT_MODAL)
}

export async function hideContactModal({commit}) {
  commit(HIDE_CONTACT_MODAL)
}