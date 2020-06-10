import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './app.module.css';

import Header from './components/header/header';
import DirectDepositForm from './components/direct-deposit-form/direct-deposit-form';
import DirectDepositPersonalInfo from './components/direct-deposit-personal-info/direct-deposit-personal-info';
import DirectDepositConfirmation from './components/direct-deposit-confirmation/direct-deposit-confirmation';
import Footer from './components/footer/footer';

class App extends Component {
  render() {
    return (
      <Router>
        <div className={styles.body}>
          <Header />
          <main className={styles.main__container}>
            <Switch>
              <Route exact path='/' component={DirectDepositForm} />
              <Route path='/personal-info/:id' component={DirectDepositPersonalInfo} />
              <Route path='/payment-confirmation/:id' component={DirectDepositConfirmation} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
