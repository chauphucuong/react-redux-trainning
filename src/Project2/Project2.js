import React, { Component } from 'react';
import './App.css';
import TaskForm from './TaskForm';
import Control from './Control';
import TaskList from './TaskList';
import _ from 'lodash';
// import {findIndex,filter} from 'lodash';
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks : [],  //id : unique(không trùng),name,status
            isDisplayForm : false,          //biến điều khiển đóng mở cho form thêm công việc
            taskEditing : null,             //biến điều khiển chỉnh sửa from thêm công việc thành câp nhật công việc
            filter : {                      //biến lọc giá trị input và select
                name : '',
                status : -1
            },              //Không nên dùng object sort  : [ by : name ,value : 1 ]  nhận sai dữ liệu
            sortBy: 'name',
            sortValue : 1
        }
    }
    //phương thức được gọi đầu tiên khi reset lại và chỉ gọi 1 lần
    //lưu giá trị vào lo
    componentWillMount() {
        // localStorage tồn tại và có nhật được item không
        if(localStorage && localStorage.getItem('tasks')){
            //các giá trị trong loacalStorage được lưu sẽ được gán vào tasks
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            })
        }
    }
    
    //Tạo dữ liệu 
    onGeneraData = () =>{
        var tasks =[
            { //Tìm generate string reactjs để lấy hàm randomstring
                id: this.generateID(),
                name : 'Học lập trình',
                status : true
            },
            {
                id: this.generateID(),
                name : 'Học tiếng anh',
                status : false
            },
            {
                id: this.generateID(),
                name : 'Ngủ',
                status : true
            },
        ];
        this.setState({
            tasks:tasks
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));    //Lưu các tasks vào localStorage với đoạn mã JSON
    }
    // Tính toán 1 dãy chữ số bất kì
    s4(){
        return Math.floor((1+Math.random()) * 0x100000).toString(16).substring(1);
    }
    // xử lý thành 1 dãy chuỗi id bất kì "91331890e3-521a9-3132f-00f47-0243b05ee0aa85f"
    generateID(){
        return this.s4()+this.s4() + '-'+ this.s4() + '-'+this.s4() +'-'+this.s4()+ '-'+this.s4()+this.s4()+this.s4();
    }
    //Nhấn Thêm công việc thì hiện ra bảng thêm còn không thì bảng table full 12 cột
    onToggleForm = () =>{
        this.setState({
            isDisplayForm : !this.state.isDisplayForm
        });
    }
    //nút đóng form thêm công việc
    onCloseForm = ()=>{
        this.setState({
            isDisplayForm : false
        });
    }
    //nút mở form thêm công việc
    onShowForm =()=>{
        this.setState({
            isDisplayForm:true
        });
    }
    //onSubmit sẽ kiểm tra dữ liệu được thêm mới hay chỉnh sửa dữ liệu 
    //Sử dụng biến data để còn edit dữ liệu => không nên xãi nhiều biến 
    onSubmit = (data) =>{
        var { tasks} = this.state;  //var tasks = this.state.task gán giá trị cho tasks
        if(data.id ===''){          //kiểm tra giá trị id khi mình edit một dữ liệu nếu id bằng rỗng 
            data.id = this.generateID();        //thì tạo id mới và thêm dữ liệu vào task
            tasks.push(data);
        }//Ngược lại sẽ khi dữ liệu khác rỗng thì tìm mã id và lưu giá trị thay đổi vào id đó
        else{
            //editing
            var index = this.findIndex(data.id);
            tasks[index] = data;    //lưu giá trị thay đổi
        }
        //Tiến hành setState lại toàn bộ dữ liệu
        this.setState({
            tasks : tasks,
            taskEditing:null// Sẽ trả cái taskEditing quay trở lại bình thường thành Thêm công việc
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
        // console.log(typeof status);
        // console.log(data);
    }

    onUpdateStatus = (id)=>{
        var {tasks} = this.state;
        // var index = this.findIndex(id);
        //  nếu chỉ sử dụng findIndex thì chỉ cần import findex truy xuất như sau var
        // index = findIndex(tasks,(task).....
        var index = _.findIndex(tasks,(task)=>{
            return task.id ===id;
        })
        if(index !== -1){   //Kiểm tra index có phải là dữ liệu trong list không
            tasks[index].status = !tasks[index].status; //Thay đổi status thành trạng thái ngược lại do chỉ có 2 status
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
    }
    onDelete = (id) =>{
        var {tasks} = this.state;
        var index = this.findIndex(id);
        if(index !== -1){
            //truyền vào phần tử muốn xóa tham số thứ 2 là 1 index là vị trí cần xóa 
            tasks.splice(index,1); 
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks',JSON.stringify(tasks));
            this.onCloseForm();
        }
    }

    // findIndex =(id)=>{
    //     var {tasks } = this.state;
    //     var result = -1;
    //     tasks.forEach((task,index)=>{//mỗi lần duyệt qua nhận được cái task và 1 biến là index
    //         if(task.id === id){
    //             result = index;
    //         }
    //     });
    //     return result;
    // }
    onFilter= (filterName,filterStatus)=>{
        filterStatus = parseInt(filterStatus,10); //ép kiểu dữ liệu chuổi string thành int
        this.setState({
            filter:{
                name: filterName.toLowerCase(),
                status : filterStatus
            }
        });
    }
    onUpdate = (id)=>{
        var {tasks} = this.state;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing : taskEditing
        });
        this.onShowForm();
    }

    onSearch = (keyword) =>{
        // console.log(keyword);
        this.setState({
            keyword : keyword
        });
    }
    onSort = (sortBy , sortValue) =>{
        
        this.setState({
            sortBy : sortBy,
            sortValue : sortValue       //nhận không đúng dữ liệu nến sẽ truyền 2 biến sang control 
        })
        // console.log(this.state.sortBy,this.state.sortValue );
    }
    render() {
        var { tasks , isDisplayForm,taskEditing ,filter,keyword,sortBy,sortValue } = this.state;  //var tasks = this.state.tasks
        // 3 hàng dưới so sánh với phương thức trong lodash
        // tasks=tasks.filter((task)=>{
        //     return task.name.toLowerCase().indexOf(filter.name) !== -1;
        // });
       
        
        if(filter){
            if(filter.name){
                tasks=tasks.filter((task)=>{
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                });
            }
            // if(filter.status){ //Kiểm tra khác null, undefine ,!0 mà 0 là Ẩn nên không lấy được
                tasks=tasks.filter((task)=>{
                    if(filter.status === -1){
                        return task;
                    }else{
                        return task.status === (filter.status === 1 ? true:false)
                    }
                });
            // }
        }
        if(keyword){
            // tasks=tasks.filter((task)=>{
            //     return task.name.toLowerCase().indexOf(keyword) !== -1;
            // });
            tasks = _.filter(tasks, (task)=>{
                return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            });
        }
        console.log(sortValue);
        if(sortBy === 'name'){
            tasks.sort((a,b)=>{
                if(a.name > b.name) return sortValue;   //trả 1
                else if(a.name < b.name) return -sortValue;
                else return 0;
            });
        }
        else{
            tasks.sort((a,b)=>{
                if(a.status > b.status) return -sortValue;
                else if(a.status < b.status) return sortValue;
                else return 0;
            });
        }
        var elmTaskForm = isDisplayForm ? 
        <TaskForm 
        onSubmit={this.onSubmit} 
        onCloseForm={this.onCloseForm}
        task = {taskEditing}    //Truyền vào task
        /> :'';
        return (
            <div className="container">
            <div className="text-center">
                <h1>Quản Lý Công Việc</h1>
                <hr/>
            </div>
            <div className="row">
                <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : 'col-xs-0 col-sm-0 col-md-0 col-lg-0'}>
                    {elmTaskForm}
                </div>
                <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                    <button type="button"
                     className="btn btn-primary" onClick={this.onToggleForm}>
                        <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                    </button>
                    <button 
                    type="button"
                    className="btn btn-danger ml-5"
                    onClick ={this.onGeneraData}>
                        Generate data
                    </button>
                    {/* Search - Sort */}
                    <Control onSearch={this.onSearch}
                        onSort ={this.onSort}
                        sortBy={sortBy}
                        sortValue={sortValue}
                    />
                    {/* List*/}
                    <TaskList tasks = { tasks} onUpdateStatus={this.onUpdateStatus}
                        onDelete ={this.onDelete}
                        onUpdate ={this.onUpdate}
                        onFilter={this.onFilter}
                    />
                    </div>
                </div>
            </div>
            );
        }
    }

export default App;
