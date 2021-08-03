import reducers from '.'
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM} from '../actions/types'

const initialState = {something:"something"}

export default function(state = initialState, action){
    switch(action.type){
        case "This":
            return state
        default:
            return state
    }
}