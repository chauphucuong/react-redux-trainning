//Giá trị mặc định
// var initialState = {
//     status : false ,
//     sort: {
//         by: 'name',
//         value : 1
//     }
// }
var initialState = false;

//do state ở đây chỉ có true hoặc false
var myReducer = (state = initialState,action) =>{
    if(action.type === 'TOGGLE_STATUS'){
        // state.status = !state.status;
        state = !state;
        return state;
    }
    return state;
}

export default myReducer;