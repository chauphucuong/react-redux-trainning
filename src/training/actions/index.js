import * as types from './../contants/ActionTypes';

export const status = () =>{
    return {
        type : types.TOGGLE_STATUS,

    }
}

export const sort = (sort) => {
    return {
        type : types.SORT,
        sort // giống với  sort : sort
    }
}