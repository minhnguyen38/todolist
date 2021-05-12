import React from 'react'; 
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import todoListComponent from './components/todoList';
import testComponent from './components/test'

class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={todoListComponent} />
                    <Route exact path='/test' component={testComponent} />
                </Switch>
            </BrowserRouter>
        )
    }
}
export default Routes; 