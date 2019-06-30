import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id : '',
            name : '',
            status : false
        }
    }

    
    componentWillMount() {
        // Nếu tasks tồn tại lưu ý truyền vào key gì thì nhận key đó vd task={taskEditing}
        if(this.props.task){
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status,
            })
        }
    }
    

    onCloseForm = () =>{
        this.props.onCloseForm();
    }   

    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.type ==='status' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    }
    onSubmit = (event) =>{
        event.preventDefault();
        //ép kiểu status từ chuỗi string sang boolean
        // this.props.onSubmit(this.state.name,this.state.status ==='true' ? true : false);
        this.props.onSubmit(this.state)
        //Cancel and close form
        this.onClear();
        this.onCloseForm();
    }
    onClear = ()=>{
        this.setState({
            name : '',
            status : false
        })
    }
  render() {
    var {id} = this.state;
    return (
        <div className="panel panel-warning">
        <div className="panel-heading">
            <h3 className="panel-title" > 
            {id !== '' ? 'Cập nhật công việt' : 'Thêm công việc'}
                <span className="fa fa-times-circle text-right"
                onClick={this.onCloseForm}></span>
            </h3>
        </div>
        <div className="panel-body">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Tên :</label>
                    <input type="text" className="form-control" name="name" value={this.state.name}
                        onChange={this.onChange}
                    />
                </div>
                <label>Trạng Thái :</label>
                <select className="form-control" required="required" name="status" value={this.state.status}
                        onChange={this.onChange}>
                    <option value="{true}">Kích Hoạt</option>
                    <option value="{false}">Ẩn</option>
                </select>
                <br/>
                <div className="text-center">
                    <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                    <button type="button" className="btn btn-danger"
                    onClick={this.onClear}
                    >Hủy Bỏ</button>
                </div>
            </form>
        </div>
    </div> 
    );
  }
}

export default TaskForm;
