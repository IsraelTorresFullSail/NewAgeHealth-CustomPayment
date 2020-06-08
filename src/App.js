import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './app.module.css';

import DirectDepositForm from './components/direct-deposit-form/direct-deposit-form';
import DirectDepositPersonalInfo from './components/direct-deposit-personal-info/direct-deposit-personal-info';
import DirectDepositUserPayment from './components/direct-deposit-user-payment/direct-deposit-user-payment';

class App extends Component {
  render() {
    return (
      <Router>
        <div className={styles.body}>
          <main className={styles.main__container}>
            <Switch>
              <Route exact path='/' component={DirectDepositForm} />
              <Route path='/personal-info/:id' component={DirectDepositPersonalInfo} />
              <Route path='/payment-info' component={DirectDepositUserPayment} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
