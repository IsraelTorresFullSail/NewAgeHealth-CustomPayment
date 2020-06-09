import React from 'react';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import { FaUser, FaHashtag, FaSignature } from 'react-icons/fa';
import { TiLocation } from 'react-icons/ti';
import { AiFillBank } from 'react-icons/ai';
import { BsCalendar } from 'react-icons/bs';

import './direct-deposit-personal-info.scss';

import firebase from '../../firebase/firebase.utils';

class DirectDepositPersonalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            directDeposit: {},
            key: '',
            name: '',
            amount: '',
            day: '',
            month: '',
            therapy: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            email: '',
            phone: '',
            accountType: '',
            nameOnAccount: '',
            accountNumber: '',
            bankRouting: '',
            bankName: '',
            bankCityState: '',
            signature: '',
            date: '',
            termsConditionsAgreement: '',
            termsConditionsSignature: '',
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('direct-deposit').doc(this.props.match.params.id);
        ref.get().then((doc) => {
          if (doc.exists) {
            const directDeposit = doc.data();
            this.setState({
              directDeposit: doc.data(),
              key: doc.id,
              isLoading: false,
              name: directDeposit.name,
              amount: directDeposit.amount,
              day: directDeposit.day,
              month: directDeposit.month,
              therapy: directDeposit.therapy,
              address: directDeposit.address,
              city: directDeposit.city,
              state: directDeposit.state,
              zip: directDeposit.zip,
              email: directDeposit.email,
              phone: directDeposit.phone,
            });
          } else {
            console.log("No such document!");
          }
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { 
            name, amount, day, month, therapy, address, city, state, zip, email, phone,
            accountType, nameOnAccount, accountNumber, bankRouting, bankName, bankCityState, signature, date, termsConditionsAgreement, termsConditionsSignature
        } = this.state;
        
        const updateRef = firebase.firestore().collection('direct-deposit').doc(this.state.key);
        updateRef.set({
            name, amount, day, month, therapy, address, city, state, zip, email, phone,
            accountType, nameOnAccount, accountNumber, bankRouting, bankName, bankCityState, signature, date, termsConditionsAgreement, termsConditionsSignature
        }).then((docRef) => {
        this.setState({
            key: '',
            name: '',
            amount: '',
            day: '',
            month: '',
            therapy: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            email: '',
            phone: '',
            accountType: '',
            nameOnAccount: '',
            accountNumber: '',
            bankRouting: '',
            bankName: '',
            bankCityState: '',
            signature: '',
            date: '',
            termsConditionsAgreement: '',
            termsConditionsSignature: '',
        });
            this.props.history.push("https://www.nahaw.com/thank-you");
        })
            .catch((error) => {
            console.error("Error adding document: ", error);
        });
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { accountType, nameOnAccount, accountNumber, bankRouting, bankName, bankCityState, signature, date, termsConditionsAgreement, termsConditionsSignature } = this.state;
        return (
            <>
                <h1>New Age Health And Wellness</h1>
                <h2>12785 West Forest Hill Blvd, Wellington, Florida 33414</h2>
                <h2>866-921-8779</h2>
                <h1>Recurring Payment Authorization Form</h1>
                <p>Schedule your payment to be automatically deducted from your bank account. Just complete and sign this form to get started!</p>
                <h3>Here’s How Recurring Payments Work:</h3>
                <p>You authorize regularly scheduled charges to your checking/savings account. You will be charged the amount indicated below each billing period. The charge will appear on your bank statement as an “ACH Debit.” You agree that no prior-notification will be provided unless the date or amount changes.</p>
                <h3 className='red'>Address changes must be reported right away, if not and shipment goes out the patient is responsible for all loss of medications and shipping expenses.</h3>
                <p>
                    I <strong>{this.state.directDeposit.name}</strong> authorize New Age Health And Wellness to charge my checking/savings account indicated below 
                    for <strong>${this.state.directDeposit.amount}</strong> on the <strong>{this.state.directDeposit.day}</strong> of each <strong>{this.state.directDeposit.month}</strong> for (day or date)
                    payment of my <strong>{this.state.directDeposit.therapy}</strong>.
                </p>

                <form method="POST" className='form' onSubmit={this.handleSubmit}>
                    <div className='input-wrapper-48'>
                        <label className='form__label' htmlFor="checking">
                        <span className='form__labelInline'>Account Type *</span>
                            <label className='form__labelInline' htmlFor="checking">
                                <input
                                    type="radio"
                                    name="accountType"
                                    value="checking"
                                    checked={accountType === 'checking'}
                                    className='form__input__radio'
                                    id="checking"
                                    onChange={this.handleChange}
                                />
                                <span> Checking</span>
                            </label>
                            <label className='form__labelInline' htmlFor="savings">
                                <input
                                    type="radio"
                                    name="accountType"
                                    value="savings"
                                    checked={accountType === 'savings'}
                                    className='form__input__radio'
                                    id="savings"
                                    onChange={this.handleChange}
                                />
                                <span> Savings</span>
                            </label>
                        </label>
                    </div>
                    <div className='input-wrapper-100'>
                        <FormInput 
                            type="text"
                            name="nameOnAccount"
                            value={nameOnAccount}
                            onChange={this.handleChange}
                            label="Name on Account *"
                            required
                            icon={<FaUser className='icon' />}
                        />
                    </div>
                    <div className='input-wrapper-48'>
                        <FormInput 
                            type="number"
                            name="accountNumber"
                            value={accountNumber}
                            onChange={this.handleChange}
                            label="Account Number *"
                            required
                            icon={<FaHashtag className='icon' />}
                        />
                    </div>
                    
                    <div className='input-wrapper-48'>
                        <FormInput 
                            type="number"
                            name="bankRouting"
                            value={bankRouting}
                            onChange={this.handleChange}
                            label="Bank Routing *"
                            required
                            icon={<FaHashtag className='icon' />}
                        />
                    </div>
                    <div className='input-wrapper-48'>
                        <FormInput 
                            type="text"
                            name="bankName"
                            value={bankName}
                            onChange={this.handleChange}
                            label="Bank Name *"
                            required
                            icon={<AiFillBank className='icon' />}
                        />
                    </div>
                    <div className='input-wrapper-48'>
                        <FormInput 
                            type="text"
                            name="bankCityState"
                            value={bankCityState}
                            onChange={this.handleChange}
                            label="Bank City / State *"
                            required
                            icon={<TiLocation className='icon' />}
                        />
                    </div>
                    <div className='input-wrapper-48'>
                        <FormInput 
                            type="text"
                            name="signature"
                            value={signature}
                            onChange={this.handleChange}
                            label="Enter your Name *"
                            required
                            icon={<FaSignature className='icon' />}
                        />
                    </div>
                    <div className='input-wrapper-48'>
                        <FormInput 
                            type="string"
                            name="date"
                            value={date}
                            onChange={this.handleChange}
                            label="Date (MM/DD/YYYY) *"
                            required
                            icon={<BsCalendar className='icon' />}
                        />
                    </div>
                    <div className='input-wrapper-100'>
                        <CustomButton type="submit">Save</CustomButton>
                    </div>
                </form>
            </>
        )
    }
}

export default DirectDepositPersonalInfo;