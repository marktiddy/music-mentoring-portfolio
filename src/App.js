import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { MainProvider } from './Context/MainContext';

//Import components
import Welcome from './screens/Welcome';
import StudentLogin from './screens/StudentLogIn';
import MentorLogin from './screens/MentorLogIn';
import SignOut from './screens/SignOut';
import ErrorPage from './screens/ErrorPage';

//Admin Routes
import Dashboard from './screens/Dashboard';
import AddStudent from './screens/AdminScreens/AddStudent';
import UpdateStudent from './screens/AdminScreens/UpdateStudent';
import ViewStudentPortfolio from './screens/AdminScreens/ViewStudentPortfolio';
import DeleteStudent from './screens/AdminScreens/DeleteStudent';

//Student Route
import StudentDashboard from './screens/StudentDashboard';
import PortfolioEdit from './screens/PortfolioEdit/PortfolioEdit';

//Other Views
import ViewPortfolio from './screens/ViewPortfolio';

function App() {
  return (
    <MainProvider>
      <Router>
        <Switch>
          <Route path="/student-sign-in">
            <StudentLogin />
          </Route>
          <Route path="/mentor-sign-in">
            <MentorLogin />
          </Route>
          <Route path="/signout">
            <SignOut />
          </Route>
          <PrivateAdminRoute exact path="/dashboard" component={Dashboard} />
          <PrivateAdminRoute
            exact
            path="/dashboard/add"
            component={AddStudent}
          />
          <PrivateAdminRoute
            exact
            path="/dashboard/update"
            component={UpdateStudent}
          />
          <PrivateAdminRoute
            exact
            path="/dashboard/view"
            component={ViewStudentPortfolio}
          />
          <PrivateAdminRoute
            exact
            path="/dashboard/view/portfolio"
            component={ViewPortfolio}
          />
          <PrivateAdminRoute
            exact
            path="/dashboard/delete"
            component={DeleteStudent}
          />
          <PrivateStudentRoute
            exact
            path="/student-dashboard"
            component={StudentDashboard}
          />
          <PrivateStudentRoute
            exact
            path="/student-dashboard/edit-portfolio"
            component={PortfolioEdit}
          />
          <PrivateStudentRoute
            exact
            path="/student-dashboard/view-portfolio"
            component={ViewPortfolio}
          />

          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
    </MainProvider>
  );
}

export default App;

//Private route for admin
const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const userType = localStorage.getItem('userType');
  return (
    <Route
      {...rest}
      render={(props) =>
        userType === 'admin' ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

//Private route for admin
const PrivateStudentRoute = ({ component: Component, ...rest }) => {
  const userType = localStorage.getItem('userType');
  return (
    <Route
      {...rest}
      render={(props) =>
        userType === 'student' ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
