import { createStore} from 'redux';
import { status , sort } from './actions/index';
import myReducer from './reducers/index';



const store = createStore(myReducer);
console.log(store); // sẽ hiển thị các thuộc tính của store như dispatch , getState,replaceReducer,subscribe
console.log('Default: ',store.getState());

// var action ={ type : 'TOGGLE_STATUS'};
//dispatch sẽ truyển action vào reduces phân tích nên store sẽ gọi dispatch
// store.dispatch( action);

store.dispatch(status());

console.log('TOGGLE_STATUS',store.getState());

// var sortAction = {
//     type : 'SORT',
//     sort : {
//         by : 'name',
//         value : -1
//     }
// }
// store.dispatch(sortAction);
store.dispatch(sort({
    by : 'name',
    value : -1
}));
console.log('SORT',store.getState());