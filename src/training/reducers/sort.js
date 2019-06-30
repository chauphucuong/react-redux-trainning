//Giá trị mặc định
// var initialState = {
//     status : false ,
//     sort: {
//         by: 'name',
//         value : 1
//     }
// }
var initialState = {
    by: 'status',
    value : 1
}
//state ở đây là 1 object
var myReducer = (state = initialState,action) =>{
    if(action.type === 'SORT'){
        var {by , value } = action.sort; //by =action.sort.by
        //var {status } = state; =>object = object status = state
        // var status  = state;       
        // return {
        //     status : status,    //old state
        //     sort : {            //new state
        //         by: by,
        //         value : value
        //     }
        // };
        return {by,value};
    }
    return state;
}

export default myReducer;