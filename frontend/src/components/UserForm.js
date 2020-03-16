// import React, { Component } from "react";
// import FormUserDetails from "./FormUserDetails";
// import FormPersonalDetails from "./FormPersonalDetails";
// import Confirm from "./Confirm";
// import Sucess from "./Sucess";

// export class UserForm extends Component {
//   state = {
//     step: 1,
//     firstName: "",
//     lastName: "",
//     email: "",
//     occupation: "",
//     city: "",
//     bio: ""
//   };

//   // next step
//   nextStep = () => {
//     const { step } = this.state;
//     this.setState({
//       step: step + 1
//     });
//   };

//   prevStep = () => {
//     const { step } = this.state;
//     this.setState({
//       step: step - 1
//     });
//   };

//   handleChange = input => e => {
//     this.setState({ [input]: e.target.value });
//   };

//   render() {
//     const { step } = this.state;
//     const { firstName, lastName, email, occupation, city, bio } = this.state;
//     const values = { firstName, lastName, email, occupation, city, bio };

//     switch (step) {
//       case 1:
//         return (
//           <FormUserDetails
//             nextStep={this.nextStep}
//             handleChange={this.handleChange}
//             values={values}
//           />
//         );
//       case 2:
//         return (
//           <FormPersonalDetails
//             prevStep={this.prevStep}
//             nextStep={this.nextStep}
//             handleChange={this.handleChange}
//             values={values}
//           />
//         );
//       case 3:
//         return (
//           <Confirm
//             prevStep={this.prevStep}
//             nextStep={this.nextStep}
//             values={values}
//           />
//         );
//       case 4:
//         return <Sucess />;
//     }
//   }
// }

// export default UserForm;

import React from "react";
import { render } from "react-dom";
import Styles from "./Styles";
import { Field } from "react-final-form";
import Wizard from "./Wizard";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const Error = ({ name }) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
);

const required = value => (value ? undefined : "Required");

const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);

export const UserForm = () => (
  <Styles>
    <h1>Simulation Tool</h1>
    <Wizard
      initialValues={{
        environment: "",
        QC_Check: "",
        user_type: ""
      }}
      onSubmit={onSubmit}
    >
      <Wizard.Page
        validate={values => {
          const errors = {};
          // if (!values.email) {
          //   errors.email = "Required";
          // }
          if (!values.environment) {
            errors.environment = "Required";
          }
          return errors;
        }}
      >
        {/* <div>
          <label>Email</label>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
          <Error name="email" />
        </div> */}
        <div>
          <label>Select Environment</label>
          <Field name="environment" component="select">
            <option />
            <option value="Environment #1">Environment #1</option>
            <option value="Environment #2">Environment #2</option>
            <option value="Environment #3">Environment #3</option>
          </Field>
          <Error name="environment" />
        </div>
      </Wizard.Page>

      {/* QC CHECK */}
      <Wizard.Page
        validate={values => {
          const errors = {};
          if (!values.QC_Check) {
            errors.QC_Check = "Required";
          } else if (values.QC_Check.length < 2) {
            errors.QC_Check = "Choose more";
          }
          return errors;
        }}
      >
        {/* <div>
          <label>Employed?</label>
          <Field name="employed" component="input" type="checkbox" />
        </div> */}
        <div>
          <label>QC Check</label>
          <Field name="QC_Check" component="select" multiple>
            <option value="check-one">Check #1</option>
            <option value="check-two">Check #2</option>
            <option value="check-three">Check #3</option>
            <option value="check-four">Check #4</option>
            <option value="check-five">Check #5</option>
          </Field>
          <Error name="QC_Check" />
        </div>
      </Wizard.Page>

      {/* Client or Lab */}
      <Wizard.Page
        validate={values => {
          if (values.client) {
            console.log("hey");
          }

          const errors = {};
          // if (!values.notes) {
          //   errors.notes = "Required";
          // }
          return errors;
        }}
      >
        <div>
          <label>Transport</label>
          <div>
            <Field
              name="user_type"
              component="input"
              type="radio"
              value="client"
            />{" "}
            Client
            <Field
              name="user_type"
              component="input"
              type="radio"
              value="lab"
            />{" "}
            Lab
          </div>
          <Error name="user_type" />
        </div>
        <Condition when="user_type" is="client">
          <div>
            <label>Client Information</label>
            <Field
              name="street"
              component="input"
              type="text"
              placeholder="Street Address"
            />
            <Error name="street" />
          </div>
        </Condition>
        <Condition when="user_type" is="lab">
          <br />
          <label>Lab Information</label>
          <br />

          <div>
            <label>Racks</label>
            <div>
              <Field name="racks" component="input" type="radio" value="1" /> 1
              Rack
              <Field name="racks" component="input" type="radio" value="2" /> 2
              Racks
            </div>
          </div>

          <label>Sample + Rack Metadata</label>
          <br />

          <div>
            <label>Type</label>
            <div>
              <Field
                name="test_type"
                component="input"
                type="radio"
                value="Listeria"
              />{" "}
              Listeria
              <Field
                name="test_type"
                component="input"
                type="radio"
                value="Salmonella"
              />{" "}
              Salmonella
            </div>
          </div>

          <div>
            <label>Index Plate (Optional)</label>
            <Field name="index_plate" component="select">
              <option />
              <option value="IP1">IP1</option>
              <option value="IP2">IP2</option>
            </Field>
          </div>
        </Condition>
      </Wizard.Page>
    </Wizard>
  </Styles>
);

export default UserForm;
