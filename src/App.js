import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styles from './app.module.css';

import DirectDepositForm from './components/direct-deposit-form/direct-deposit-form';

class App extends Component {
  render() {
    return (
      <Router>
        <div className={styles.body}>
          <main className={styles.main__container}>
            <DirectDepositForm />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
