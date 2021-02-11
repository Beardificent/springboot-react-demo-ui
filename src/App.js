import {getAllStudents} from './client'
import './App.css';
import React, {Component} from "react";
//antd is a UI framework
import { Table, Avatar, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Container from './Container';

const getIndicatorIcon = () => {
    return <LoadingOutlined style={{ fontSize: 24 }} spin/>;
}
class App extends Component {

    //state contains an object which is an emty array called students.
    state = {
        students: [],
        isFetching: false
    }

    componentDidMount() {
        this.fetchStudents();

    }

    fetchStudents = () => {
         this.setState({ isFetching: true });
        getAllStudents().then(response => response.json().then(students => {
            console.log(students);
            this.setState({students, isFetching: false});
        }));
    }

    render() {


        //set object with const and this.state (state can be found above)
        const {students, isFetching} = this.state;

        if (isFetching) {
            return (
                <Container>
                    <Spin indicator={getIndicatorIcon()}/>
                </Container>
            );
        }
        if (students && students.length) {

            const columns = [
                {
                    title: '',
                    key: 'avatar',
                    //render takes text and studentobject
                    render: (text, student) => (
                        <Avatar size="large">{`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}</Avatar>
                    )
                },
                {
                    title: 'student ID',
                    dataIndex: 'studentId',
                    key: 'studentId',
                },
                {
                    title: 'First Name',
                    dataIndex: 'firstName',
                    key: 'firstName',
                },
                {
                    title: 'Last Name',
                    dataIndex: 'lastName',
                    key: 'lastName',
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email',
                },
                {
                    title: 'Gender',
                    dataIndex: 'gender',
                    key: 'gender',
                }
            ];

            return (
                <Container>
                    <Table dataSource={students}
                           columns={columns} pagination={false}
                           rowKey="studentId"/>
                </Container>
            );

        }
        return <h1>No students</h1>

    }
}

export default App;
