import React/* , { useEffect } */ from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import GroupAdd from '../view/Group/groupAdd';
import GroupEdit from '../view/Group/groupEdit';
import Groups from '../view/Group/groupList';

import StudentList from '../view/Student/studentList';
import StudentAdd from '../view/Student/studentAdd';
import StudentEdit from '../view/Student/studentEdit';
import StudentGroupDetails from '../view/Student/studentGroupDetails';
import GroupStudentsDetails from '../view/Group/groupStudentsDetails';


function Router() {

    return (
        <BrowserRouter>
            <Switch>
                {/* RUTAS GROUP*/}
                <Route exact path="/groups" component={Groups} />
                <Route exact path="/groups/add" component={GroupAdd} />
                <Route exact path="/groups/edit/:id" component={GroupEdit} />
                <Route exact path="/groups/:id/students/details" component={GroupStudentsDetails} />

                {/* RUTAS STUDENT*/}
                <Route exact path="/students" component={StudentList} />
                <Route exact path="/students/add" component={StudentAdd} />
                <Route exact path="/students/edit/:id" component={StudentEdit} />
                <Route exact path="/students/:id/group/details" component={StudentGroupDetails} />

                <Redirect to="/groups" />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;