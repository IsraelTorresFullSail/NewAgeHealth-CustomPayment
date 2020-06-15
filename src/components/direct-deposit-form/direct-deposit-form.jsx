import React from 'react';
import Select from 'react-dropdown-select';
import { Redirect } from 'react-router-dom';

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import { FaUser, FaDollarSign } from 'react-icons/fa';


import './direct-deposit-form.scss';

import firebase from '../../firebase/firebase.utils';

const optionsDay = [
    { label: "1st", value: "1st" }, { label: "2nd", value: "2nd" }, { label: "3rd", value: "3rd" }, { label: "4th", value: "4th" }, { label: "5th", value: "5th" }, { label: "6th", value: "6th" }, { label: "7th", value: "7th" }, { label: "8th", value: "8th" }, { label: "9th", value: "9th" },
    { label: "10th", value: "10th" }, { label: "11th", value: "11th" }, { label: "12th", value: "12th" }, { label: "13th", value: "13th" }, { label: "14th", value: "14th" }, { label: "15th", value: "15th" }, { label: "16th", value: "16th" }, { label: "17th", value: "17th" }, { label: "18th", value: "18th" }, { label: "19th", value: "19th" }, { label: "20th", value: "20th" },
    { label: "21st", value: "21st" }, { label: "22nd", value: "22nd" }, { label: "23rd", value: "23rd" }, { label: "24th", value: "24th" }, { label: "25th", value: "25th" }, { label: "26th", value: "26th" }, { label: "27th", value: "27th" }, { label: "28th", value: "28th" }, { label: "29th", value: "29th" }, { label: "30th", value: "30th" },
    { label: "31st", value: "31st" },
];
const optionsMonth = [
    { label: "Month", value: "Month" }, { label: "January", value: "January" }, { label: "February", value: "February" }, { label: "March", value: "March" }, { label: "April", value: "April" },
    { label: "May", value: "May" }, { label: "June", value: "June" }, { label: "July", value: "July" }, { label: "August", value: "August" },
    { label: "September", value: "September" }, { label: "October", value: "October" }, { label: "November", value: "November" }, { label: "December", value: "December" },
];
const optionsTherapy = [
    { label: "Hormone Replacement Therapy", value: "Hormone Replacement Therapy" }, { label: "Peptide Therapy", value: "Peptide Therapy" }, { label: "Vitamins", value: "Vitamins" },
    { label: "Cannabidiol Therapy", value: "Cannabidiol Therapy" }, { label: "Erectile Dysfunction", value: "Erectile Dysfunction" }, { label: "IV Therapy", value: "IV Therapy" },
    { label: "Testosterone Therapy", value: "Testosterone Therapy" },
];
class DirectDepositForm extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('direct-deposit');
        this.state = {
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
            docId: '',
        };
    }

    handleChangeDay = (selectedDay) => {
        this.setState({ day: Object.values(selectedDay[0])[0] });
    }

    handleChangeMonth = (selectedMonth) => {
        this.setState({ month: Object.values(selectedMonth[0])[0] });
    }

    handleChangeTherapy = (selectedTherapy) => {
        this.setState({ therapy: Object.values(selectedTherapy[0])[0] });
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { 
            name, amount, day, month, therapy, address, city, state, zip, email, phone,
            accountType, nameOnAccount, accountNumber, bankRouting, bankName, bankCityState, signature, date, termsConditionsAgreement, termsConditionsSignature
        } = this.state;

        this.ref.add({
            name, amount, day, month, therapy, address, city, state, zip, email, phone,
            accountType, nameOnAccount, accountNumber, bankRouting, bankName, bankCityState, signature, date, termsConditionsAgreement, termsConditionsSignature
          }).then((docRef) => {
            this.setState({
                name: '',
                amount: '',
                day: '',
                month: '',
                therapy: '',
                // address: '',
                // city: '',
                // state: '',
                // zip: '',
                // email: '',
                // phone: '',
            });
            // Get the current doc Id and set the state
            this.setState({ docId: docRef.Pc.path.segments[1] })
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
        // eslint-disable-next-line
        const { name, amount, day, month, therapy } = this.state;
        // Redirect to the next step if the doc id exist.
        const { docId } = this.state;
        if(docId !== '') return <Redirect to={`/personal-info/${docId}`} />;
        return(
            <>
                <h1>New Age Health And Wellness</h1>
                <h2>12785 West Forest Hill Blvd, Wellington, Florida 33414</h2>
                <h2>866-921-8779</h2>
                <h1>Recurring Payment Authorization Form</h1>
                <p>Schedule your payment to be automatically deducted from your bank account. Just complete and sign this form to get started!</p>
                <h3>Here’s How Recurring Payments Work:</h3>
                <p>You authorize regularly scheduled charges to your checking/savings account. You will be charged the amount indicated below each billing period. The charge will appear on your bank statement as an “ACH Debit.” You agree that no prior-notification will be provided unless the date or amount changes.</p>
                <h3 className='red'>Address changes must be reported right away, if not and shipment goes out the patient is responsible for all loss of medications and shipping expenses.</h3>
                <form method="POST" className='form' onSubmit={this.handleSubmit}>
                    <div className='input-wrapper-65'>
                        <FormInput 
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                            label="Full Name *"
                            required
                            icon={<FaUser className='icon' />}
                        />
                    </div>
                    <div className='input-wrapper-30'>
                        <FormInput 
                            type="number"
                            name="amount"
                            value={amount}
                            onChange={this.handleChange}
                            label="Amount *"
                            required
                            icon={<FaDollarSign className='icon' />}
                        />
                    </div>
                    <div className='input-wrapper-30'>
                        <Select 
                            name="day"
                            options={optionsDay}
                            onChange={this.handleChangeDay}
                            className='select'
                            placeholder='Day *'
                            required
                        />
                    </div>
                    <div className='input-wrapper-30'>
                        <Select 
                            name="month"
                            options={optionsMonth}
                            onChange={this.handleChangeMonth}
                            className='select'
                            placeholder='Month *'
                            required
                        />
                    </div>
                    <div className='input-wrapper-30'>
                        <Select 
                            name="therapy"
                            options={optionsTherapy}
                            onChange={this.handleChangeTherapy}
                            className='select'
                            placeholder='Select service... *'
                            required
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

export default DirectDepositForm;