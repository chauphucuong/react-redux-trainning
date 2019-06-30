import status from './status';      //reducer status
import sort from './sort';          //reducer sort
import {combineReducers} from 'redux';
//Tìm hiểu combineReducers

const myReducer = combineReducers({
    status,     //status : status       //status thứ 2 là status import từ reducer sort
    sort        //sort : sort   //Trang reducer sort truyền qua sort { by : by,sort : sort/}
})

export default myReducer;