import { useFormik } from 'formik';
import React from 'react';
import Layout from '../../layout/Layout';
import { addCase } from '../../store/actions/caseActions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireAuth from '../../hoc/requireAuth';
import { loadMe } from '../../store/actions/authActions';
import { withRouter } from 'react-router-dom';
function AddCase({
    addCase,
    loadMe,
    history,
  }) {
    const caseForm = useFormik({
        initialValues:{
            email:'',
            firstname:'',
            lastname:''
        },
        onSubmit:function(values){
            addCase(values)
            console.log("case::",values)
        }
    })
    return (
        <Layout>
            <div>
                <h1>Add Case</h1>
                <form onSubmit={caseForm.handleSubmit}>
                    <input type="text" name='email' value={caseForm.values.email} placeholder='email' onChange={caseForm.handleChange} /><br/>
                    <input type="text" name='firstname' value={caseForm.values.firstname} placeholder='firstname' onChange={caseForm.handleChange} /><br/>
                    <input type="text" name='lastname' value={caseForm.values.lastname} placeholder='lastname' onChange={caseForm.handleChange} /><br/>
                    <button>Save case</button>
                </form>
            </div>
        </Layout>
    );
}
const mapStateToProps = (state) => ({
    user: state.user,
    auth: state.auth,
  });
  
export default compose(
    requireAuth,
    withRouter,
    connect(mapStateToProps, { addCase, loadMe     }),
  )(AddCase);